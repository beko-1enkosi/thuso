import Icon from '../Icon';
import { formatDate, statusLabels } from './journey';

export default function AppointmentCard({ appointment, selected, onView, onStart }) {
  const { interview, status } = appointment;
  return <article className={`appointment-card ${selected ? 'is-selected' : ''}`}>
    <div className="appointment-card-heading"><span className="appointment-calendar"><Icon name="calendar" /></span><div><h3>{interview.company || 'Your saved interview'}</h3><p>{interview.role || 'Interview appointment'}</p></div><span className={`appointment-status status-${status}`}>{statusLabels[status]}</span></div>
    <div className="appointment-card-meta"><span><Icon name="calendar" width="16" />{formatDate(interview.date)} · {interview.time || 'Time not added'}</span><span><Icon name="pin" width="16" />{interview.location || 'Location not added'}</span><span><Icon name="chat" width="16" />{interview.recruiterName || 'Interview contact not added'}{interview.recruiterPhone && ` · ${interview.recruiterPhone}`}</span></div>
    <div className="appointment-card-actions"><button className="appointment-button subtle" aria-expanded={selected} onClick={onView}>View details <span aria-hidden="true">↗</span></button>{status === 'not-started' && <button className="appointment-button outline" onClick={onStart}>Start Safe Journey</button>}</div>
  </article>;
}
