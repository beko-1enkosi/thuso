import { useEffect, useRef, useState } from 'react';
import { emptyInterview, validateInterview } from './journey';

export default function AppointmentForm({ initial, onSave, onCancel }) {
  const [values, setValues] = useState({ ...emptyInterview, ...initial });
  const [errors, setErrors] = useState({});
  const form = useRef(null);
  useEffect(() => { form.current?.querySelector('input')?.focus(); }, []);

  function submit(event) {
    event.preventDefault();
    const clean = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()]));
    const nextErrors = validateInterview(clean);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => form.current?.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    onSave(clean);
  }

  function field(name, label, type = 'text', required = false, placeholder = '') {
    return <label className={name === 'location' ? 'appointment-field-wide' : ''} key={name} htmlFor={`appointment-${name}`}>
      {label}{required ? ' *' : <span className="field-optional"> (optional)</span>}
      <input id={`appointment-${name}`} name={name} type={type} value={values[name]} required={required}
        placeholder={placeholder} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `error-${name}` : undefined}
        onChange={event => setValues(current => ({ ...current, [name]: event.target.value }))} />
      {errors[name] && <span className="field-error" id={`error-${name}`}>{errors[name]}</span>}
    </label>;
  }

  return <section className="appointment-form-panel" aria-labelledby="appointment-form-title">
    <div className="appointment-section-title"><div><span className="home-eyebrow">MAKE A PLAN</span><h2 id="appointment-form-title">{initial ? 'Edit interview' : 'Add an interview'}</h2></div><button className="appointment-button subtle" onClick={onCancel}>Cancel</button></div>
    <p>Keep the essentials close. Fields marked * are required.</p>
    <form ref={form} onSubmit={submit} noValidate>
      <fieldset><legend>Interview details</legend><div className="appointment-form-grid">
        {field('company', 'Company name', 'text', true, 'e.g. Ubuntu Retail')}
        {field('role', 'Job title / role', 'text', false, 'e.g. Sales assistant')}
        {field('location', 'Interview location', 'text', true, 'Street address, building and area')}
        {field('date', 'Date', 'date', true)}{field('time', 'Time', 'time', true)}
        {field('recruiterName', 'Recruiter / interviewer name')}{field('recruiterPhone', 'Recruiter phone number', 'tel')}
      </div></fieldset>
      <fieldset><legend>Your trusted contact</legend><p>Choose someone you trust who can check in with you.</p><div className="appointment-form-grid">
        {field('contactName', 'Trusted contact name', 'text', true)}
        {field('contactPhone', 'Trusted contact phone number', 'tel', true, '082 123 4567')}
      </div></fieldset>
      <label htmlFor="appointment-notes">Notes <span className="field-optional">(optional)</span><textarea id="appointment-notes" value={values.notes} onChange={event => setValues(current => ({ ...current, notes: event.target.value }))} placeholder="What would help you feel prepared?" /></label>
      {Object.keys(errors).length > 0 && <p className="field-error" role="alert">A few details need attention. Please check the highlighted fields.</p>}
      <div className="appointment-form-footer"><p>Saved on this device. Your trusted contact is not notified automatically.</p><button className="appointment-button" type="submit">Save interview <span aria-hidden="true">→</span></button></div>
    </form>
  </section>;
}
