import Icon from '../Icon';
import SafetyReport from './SafetyReport';
import '../safety/safety.css';

export default function VerifyPage({ jobText, setJobText, jobUrl, setJobUrl, result, loading, error, loadDemo, verifyOpportunity, moveToInterview }) {
  return <section className="safety-page">
    <header className="safety-intro"><span className="home-eyebrow">JOB VERIFICATION</span><h1>Check the opportunity<br className="safety-desktop-break" /> before you trust it.</h1><p>Paste a job advert, WhatsApp message, email or recruitment link and Thuso will highlight possible warning signals.</p></header>
    <div className="verification-columns">
      <form className="safety-panel verification-input" onSubmit={event => { event.preventDefault(); verifyOpportunity(); }}>
        <div className="safety-panel-heading"><span className="safety-icon"><Icon name="shield" /></span><div><span className="home-eyebrow">01 / THE OPPORTUNITY</span><h2>Paste what you received</h2></div></div>
        <p>A little context helps. Add the message, a link, or both.</p>
        <button type="button" className="safety-button secondary" disabled={loading} onClick={loadDemo}>Load demo scam <Icon name="arrow" width="16" /></button>
        <label htmlFor="job-text">Job advert or message</label><textarea id="job-text" value={jobText} disabled={loading} onChange={event => setJobText(event.target.value)} placeholder="Paste the job advert, WhatsApp message or email here…" />
        <label htmlFor="job-url">Job URL <span className="safety-muted">(optional if you added a message)</span></label><input id="job-url" type="text" inputMode="url" autoCapitalize="none" spellCheck={false} value={jobUrl} disabled={loading} onChange={event => setJobUrl(event.target.value)} placeholder="example.com/careers or https://…" />
        {error && <p className="safety-error" role="alert">{error}</p>}
        <button className="safety-button verification-submit" disabled={loading}>{loading ? 'Checking opportunity…' : 'Verify opportunity'}<Icon name="arrow" width="18" /></button>
        <p className="safety-small">Only include information needed for this check. Never submit passwords, PINs, OTPs or banking credentials.</p>
      </form>
      <section className="safety-panel verification-report" aria-label="Safety Report" aria-busy={loading}>
        <div className="safety-panel-heading"><span className="safety-icon"><Icon /></span><div><span className="home-eyebrow">02 / YOUR RESULTS</span><h2>Safety Report</h2></div></div>
        <div role="status" aria-live="polite"><span className="safety-sr-only">{loading ? 'Checking for warning signals.' : result ? `Report ready. ${result.risk_level} risk. ${result.warnings.length} warning signals.` : ''}</span></div>
        {loading ? <div className="report-placeholder"><span className="safety-spinner" aria-hidden="true" /><h3>Checking the opportunity</h3><p>Looking for warning signals in the information you shared.</p></div> : result ? <SafetyReport result={result} moveToInterview={moveToInterview} /> : <div className="report-placeholder"><Icon width="42" height="42" /><h3>A clearer picture starts here.</h3><p>Your report will highlight possible risks, explain warning signals and suggest practical next steps.</p><div className="report-preview"><span>Recruitment language</span><span>Contact details</span><span>Website addresses</span></div></div>}
        {!result && <p className="safety-small report-footnote">A check is a starting point. Always verify the company and vacancy independently.</p>}
      </section>
    </div>
  </section>;
}
