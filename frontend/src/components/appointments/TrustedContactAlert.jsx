import { useState } from 'react';
import { buildAlertMessage, createMapUrl, isValidSaMobileNumber, normaliseSaPhoneNumber } from './journey';

export default function TrustedContactAlert({ appointment }) {
  const [notice, setNotice] = useState('');
  const { interview, currentLocation } = appointment;
  const message = buildAlertMessage(interview, currentLocation);
  const mapUrl = createMapUrl(currentLocation);
  const phone = normaliseSaPhoneNumber(interview.contactPhone);

  function validateContact() {
    if (isValidSaMobileNumber(interview.contactPhone)) return true;
    setNotice('Please edit the interview and add a valid South African mobile number for your trusted contact.');
    return false;
  }
  function whatsapp() {
    if (!validateContact()) return;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setNotice('WhatsApp requested. Send the prepared message in WhatsApp. If it did not open, try SMS or copy.');
  }
  function sms() {
    if (!validateContact()) return;
    window.location.href = `sms:+${phone}?body=${encodeURIComponent(message)}`;
    setNotice('SMS requested. Send the prepared message in your messaging app.');
  }
  async function copy() {
    try { await navigator.clipboard.writeText(message); setNotice('Message copied. Paste it into your preferred messaging app.'); }
    catch { setNotice('Copy is unavailable. You can select the message below and copy it manually.'); }
  }
  async function share() {
    if (!navigator.share) { await copy(); return; }
    try { await navigator.share({ title: 'Thuso safety alert', text: message }); setNotice('Safety message shared.'); }
    catch (error) { if (error.name !== 'AbortError') setNotice('Sharing was unavailable. Try WhatsApp, SMS or copy the message.'); }
  }

  return <section className="trusted-alert" id="trusted-alert" tabIndex="-1" aria-labelledby="trusted-alert-title">
    <span className="home-eyebrow">YOUR TRUSTED PERSON</span><h3 id="trusted-alert-title">You don’t have to handle this alone.</h3>
    <p>Your safety message is ready. Choose how you want to contact your trusted person.</p>
    <dl className="alert-contact-details"><div><dt>Interview</dt><dd>{interview.company} · {interview.location}</dd></div><div><dt>Trusted contact</dt><dd>{interview.contactName}<br />{interview.contactPhone}</dd></div><div><dt>Last captured location</dt><dd>{mapUrl ? <><a href={mapUrl} target="_blank" rel="noreferrer">Open Google Maps ↗</a><small>Captured {new Date(currentLocation.capturedAt).toLocaleString('en-ZA')} · approximately {currentLocation.accuracy} m accuracy. This is not live tracking.</small></> : 'Not shared. You can still send your interview details.'}</dd></div></dl>
    <div className="alert-send-actions"><button className="appointment-button" onClick={whatsapp}>Open WhatsApp</button><button className="appointment-button outline" onClick={sms}>Send SMS</button><button className="appointment-button outline" onClick={share}>Share</button><button className="appointment-button outline" onClick={copy}>Copy message</button></div>
    {notice && <p role="status">{notice}</p>}
    <details><summary>Preview safety message</summary><pre>{message}</pre></details>
    <p className="appointment-fine-print">You choose how to send the alert. Thuso has not contacted your trusted person or emergency services automatically.</p>
  </section>;
}
