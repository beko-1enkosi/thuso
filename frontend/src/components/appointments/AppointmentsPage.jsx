import { useRef, useState } from 'react';
import Icon from '../Icon';
import AppointmentCard from './AppointmentCard';
import AppointmentForm from './AppointmentForm';
import JourneyTimeline from './JourneyTimeline';
import TrustedContactAlert from './TrustedContactAlert';
import { formatDate, statusLabels } from './journey';
import './appointments.css';

const journeyCopy = {
  'not-started': ['Ready to leave?', 'When you start your Safe Journey, Thuso will keep track of your interview check-ins and make your trusted contact details easily available if you need help.'],
  travelling: ['You’re on your way.', 'When you reach the interview, take a moment to confirm your arrival.'],
  arrived: ['You’ve arrived.', 'When the interview is over and you are safe, confirm your final check-in.'],
  safe: ['Safe and checked in.', 'Your journey is complete. Thanks for taking a moment to check in.'],
  alert: ['Let someone know you need help.', 'Your trusted contact details and safety message are ready below.'],
};

function Details({ appointment, manager, onEdit }) {
  const { interview, status, id } = appointment;
  const [title, copy] = journeyCopy[status];
  const notice = manager.notices[id];
  const rows = [['Company', interview.company], ['Role', interview.role], ['Date', formatDate(interview.date)], ['Time', interview.time], ['Location', interview.location], ['Recruiter', [interview.recruiterName, interview.recruiterPhone].filter(Boolean).join(' · ')]];
  return <section className="appointment-details" id="appointment-details" tabIndex="-1" aria-labelledby="appointment-details-title">
    <div className="appointment-section-title"><div><span className="home-eyebrow">YOUR INTERVIEW PLAN</span><h2 id="appointment-details-title">{interview.company || 'Saved interview'}</h2></div><button className="appointment-button subtle" onClick={onEdit}>Edit details</button></div>
    <div className="appointment-detail-grid">
      <div className="interview-information"><h3>Interview information</h3><dl className="interview-facts">{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || 'Not added'}</dd></div>)}</dl>
        {interview.notes && <div className="interview-notes"><h3>Notes</h3><p>{interview.notes}</p></div>}
        <div className="trusted-contact"><span className="appointment-calendar"><Icon name="chat" /></span><div><span className="home-eyebrow">TRUSTED CONTACT</span><h3>{interview.contactName || 'Add your trusted person'}</h3><p>{interview.contactPhone || 'Phone number not added'}</p><small>No message is sent automatically.</small></div></div>
      </div>
      <div className="safety-companion"><div className="appointment-section-title"><span className="home-eyebrow"><Icon width="17" height="17" /> SAFE JOURNEY</span><span className={`appointment-status status-${status}`} role="status">{statusLabels[status]}</span></div><h3>{title}</h3><p>{copy}</p>
        {manager.error && <div className="appointment-notice" role="alert">{manager.error}{manager.active && <button className="appointment-button subtle" onClick={() => manager.select(manager.active.id)}>Open active journey</button>}</div>}
        {status !== 'not-started' && <JourneyTimeline appointment={appointment} />}
        {notice?.message && <p className="location-notice" role="status">{notice.message}</p>}
        <div className="safety-action-buttons">
          {status === 'not-started' && <button className="appointment-button" onClick={() => manager.start(id)}>Start Safe Journey <Icon name="arrow" width="18" /></button>}
          {status === 'travelling' && <button className="appointment-button" onClick={() => manager.arrive(id)}>I’ve arrived</button>}
          {['arrived', 'alert'].includes(status) && <button className="appointment-button" onClick={() => manager.safe(id)}>I’m safe</button>}
          {['travelling', 'arrived'].includes(status) && <button className="appointment-button help-button" onClick={() => {
            manager.help(id);
            requestAnimationFrame(() => {
              const alert = document.getElementById('trusted-alert');
              alert?.focus({ preventScroll: true });
              alert?.scrollIntoView({ block: 'start', behavior: 'instant' });
            });
          }}>I need help</button>}
          {status === 'alert' && <button className="appointment-button outline" onClick={() => manager.reset(id)}>Reset Safe Journey</button>}
          {status === 'safe' && <button className="appointment-button outline" onClick={() => manager.reset(id)}>Start another journey</button>}
        </div>
        {status === 'not-started' && <p className="appointment-fine-print">Location is optional. Check-ins are yours to make; this is not automatic monitoring.</p>}
      </div>
    </div>
    {status === 'alert' && <TrustedContactAlert key={id} appointment={appointment} />}
  </section>;
}

export default function AppointmentsPage({ manager, initialDraft, onClearDraft }) {
  const [form, setForm] = useState(initialDraft ? { initial: initialDraft } : null);
  const addButton = useRef(null);
  const { appointments, selected, active } = manager;
  const today = new Date();
  const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const upcoming = appointments.filter(item => item.status !== 'safe' && (!item.interview.date || item.interview.date >= localDate));
  const previous = appointments.filter(item => !upcoming.includes(item));
  const completed = appointments.filter(item => item.status === 'safe').length;

  function focusDetails() {
    requestAnimationFrame(() => { const panel = document.getElementById('appointment-details'); panel?.focus({ preventScroll: true }); panel?.scrollIntoView({ block: 'start', behavior: 'instant' }); });
  }
  function view(id) { manager.select(id); setForm(null); onClearDraft(); focusDetails(); }
  function start(id) { manager.start(id); setForm(null); onClearDraft(); focusDetails(); }
  function closeForm() { setForm(null); onClearDraft(); requestAnimationFrame(() => addButton.current?.focus()); }
  function showForm(values = null, id = null) {
    setForm({ initial: values, id, key: crypto.randomUUID() });
    requestAnimationFrame(() => document.querySelector('.appointment-form-panel')?.scrollIntoView({ block: 'start', behavior: 'instant' }));
  }
  function cards(items) {
    return <div className="appointment-list">{[...items].sort((a, b) => `${a.interview.date}${a.interview.time}`.localeCompare(`${b.interview.date}${b.interview.time}`)).map(item => <AppointmentCard key={item.id} appointment={item} selected={!form && selected?.id === item.id} onView={() => view(item.id)} onStart={() => start(item.id)} />)}</div>;
  }

  return <div className="appointments-page">
    <header className="appointments-heading"><div><span className="home-eyebrow">INTERVIEW SAFETY</span><h1>Your interviews,<br />in one safe place.</h1><p>Keep track of where you’re going, who you’re meeting and who should know you’re there.</p></div><button ref={addButton} className="appointment-button" onClick={() => showForm()}><span aria-hidden="true">+</span> Add interview</button></header>
    {manager.storageError && <p className="appointment-notice" role="alert">{manager.storageError}</p>}
    <section className="appointment-overview" aria-label="Interview overview">
      <div><span className="overview-icon"><Icon name="calendar" /></span><div><strong>{upcoming.length}</strong><span>Upcoming interviews</span></div></div>
      <div><span className="overview-icon"><Icon /></span><div><strong>{active ? 'In progress' : 'None active'}</strong><span>Active Safe Journey</span></div>{active && <button className="appointment-button subtle" onClick={() => view(active.id)}>Open <span aria-hidden="true">↗</span></button>}</div>
      <div><span className="overview-icon"><Icon name="check" /></span><div><strong>{completed}</strong><span>Completed check-ins</span></div></div>
    </section>
    {form && <AppointmentForm key={form.key || form.id || 'new'} initial={form.initial} onCancel={closeForm} onSave={values => { manager.save(values, form.id); setForm(null); onClearDraft(); focusDetails(); }} />}
    <section className="upcoming-section" aria-labelledby="upcoming-title"><div className="appointment-section-title"><div><span className="home-eyebrow">A LITTLE PREPARATION GOES A LONG WAY</span><h2 id="upcoming-title">Upcoming interviews</h2></div><span className="appointment-count">{upcoming.length} saved</span></div>
      {!appointments.length ? <div className="empty-appointments"><span className="empty-appointment-icon"><Icon name="calendar" width="30" height="30" /></span><h3>No interviews added yet.</h3><p>When you schedule an interview, save the details here so Thuso can help you prepare and stay connected.</p><button className="appointment-button outline" onClick={() => showForm()}>Add your first interview <span aria-hidden="true">→</span></button></div> : upcoming.length ? cards(upcoming) : <p className="appointment-empty-line">No upcoming interviews yet. Add your next interview whenever you’re ready.</p>}
    </section>
    {!form && selected && <Details key={selected.id} appointment={selected} manager={manager} onEdit={() => showForm(selected.interview, selected.id)} />}
    {!form && !selected && <div className="journey-empty"><Icon /><div><h3>{active ? 'Your Safe Journey is in progress.' : 'Your safety companion, ready when you are.'}</h3><p>{active ? 'Open your active journey to check in.' : 'Choose an interview to see its details and start a Safe Journey when you’re ready to leave.'}</p></div></div>}
    {previous.length > 0 && <section className="previous-appointments"><div className="appointment-section-title"><h2>Past interviews & completed check-ins</h2></div>{cards(previous)}</section>}
    <div className="appointment-bottom-note"><Icon width="18" height="18" /><p>A shared plan can make a difference. Let your trusted person know about your interview before you leave.</p></div>
  </div>;
}
