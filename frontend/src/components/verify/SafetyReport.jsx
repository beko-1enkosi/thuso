import ResponseTemplates from '../safety/ResponseTemplates';
import Icon from '../Icon';

const explanations = [
  [/fee|payment/i, 'Legitimate employers generally do not require applicants to pay to apply for a job. Verify any payment request independently before proceeding.'],
  [/guaranteed/i, 'A promise of employment before a genuine selection process needs verification. Ask the company to confirm the vacancy.'],
  [/whatsapp/i, 'Using WhatsApp is not automatically suspicious, but refusing to use official company channels should be verified.'],
  [/banking|authentication/i, 'Passwords, banking PINs and OTPs are private. A recruiter should not need them to assess your application.'],
  [/urgency|pressure/i, 'Pressure to act immediately can be used to stop job seekers from verifying an opportunity.'],
  [/alone/i, 'Being asked to attend alone can limit your support. Confirm the arrangements independently and tell someone you trust.'],
  [/cash/i, 'A request to bring cash needs verification. Do not pay to secure an interview or job.'],
  [/venue/i, 'A private or unusual venue needs additional checks. Confirm the location and request a professional or public meeting place.'],
  [/withheld/i, 'You need the exact address to verify the venue and plan safe transport before travelling.'],
  [/public email/i, 'The recruiter is using a public email provider instead of a company email address. Confirm their identity through the company.'],
  [/shortener/i, 'A shortened link hides its destination. Find the company website independently instead of opening an unfamiliar link.'],
  [/domain/i, 'The website address may require additional verification before you share personal information. A domain ending alone does not prove fraud.'],
];

const nextSteps = [
  'Search for the company independently, check its website and call a publicly listed company number to verify the recruiter and vacancy.',
  'Never pay recruitment fees or share passwords, banking PINs or OTPs.',
  'Confirm the exact interview location before travelling and tell someone you trust where you are going.',
];

export default function SafetyReport({ result, moveToInterview }) {
  const warnings = result.warnings || [];
  const level = ['low', 'medium', 'high'].includes(result.risk_level) ? result.risk_level : 'medium';
  const extracted = result.extracted || {};
  const groups = [['Email', extracted.emails], ['Phone', extracted.phone_numbers], ['Domain', extracted.domains], ['URL', extracted.urls]];
  return <div className="safety-report-content">
    <div className={`report-risk risk-${level}`}><div><span className="safety-small">Risk score</span><div className="report-score">{result.risk_score}<span>/100</span></div></div><span className="report-risk-badge">{level.toUpperCase()} RISK</span></div>
    <meter className={`report-meter risk-${level}`} min="0" max="100" value={result.risk_score} aria-label="Risk score out of 100" />
    <p className="safety-small">{result.disclaimer || 'This screening indicator is not a guarantee that an opportunity is legitimate or fraudulent.'}</p>
    <section className="report-block"><h3>{warnings.length} warning signal{warnings.length === 1 ? '' : 's'} detected</h3>
      {warnings.length ? <ul className="warning-list">{warnings.map((warning, index) => <li key={`${index}-${warning}`}><span className="warning-marker" aria-hidden="true">!</span><div><h4>{warning}</h4><p>{explanations.find(([pattern]) => pattern.test(warning))?.[1] || 'This detail needs independent verification. Confirm it through an official company contact before continuing.'}</p></div></li>)}</ul> : <p>No major warning signals were detected. This does not confirm that the opportunity is safe; continue with independent checks.</p>}
    </section>
    <section className="report-block"><h3>Contact & website information</h3><p className="safety-small">Extracted from your submission; these details have not been independently verified. Links are shown as text for safer review.</p>
      <dl className="report-facts">{groups.map(([label, values]) => <div key={label}><dt>{label}</dt><dd>{values?.length ? [...new Set(values)].map(value => <span key={value}>{value}</span>) : 'None found'}</dd></div>)}</dl>
    </section>
    <section className="report-block"><h3>What should I do next?</h3><ul className="safety-list">{[...new Set([...(result.recommendations || []), ...nextSteps])].map(step => <li key={step}>{step}</li>)}</ul>
      <div className="report-journey"><h4>Still planning an interview?</h4><p>Verify the details first, then save your interview and plan your check-ins.</p><button className="safety-button secondary" onClick={moveToInterview}>Add Safe Journey <Icon name="arrow" width="18" /></button></div>
    </section>
    {warnings.length > 0 && <details className="safety-disclosure scam-guidance"><summary>What if this is a scam? <span aria-hidden="true">+</span></summary><div className="disclosure-body"><p>The safest option is often to stop engaging. You do not need to argue or explain your decision.</p><ul className="safety-list"><li>Do not send money, documents or sensitive information.</li><li>Do not click suspicious links or download unknown attachments.</li><li>Block the account if necessary and report the advert or account through the platform where you received it.</li></ul><ResponseTemplates /></div></details>}
  </div>;
}
