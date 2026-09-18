import Icon from '../Icon';
import ResponseTemplates from '../safety/ResponseTemplates';
import '../safety/safety.css';

const checklists = [
  ['Prepare with confidence', [
    'Research the company and read the job description again.',
    'Prepare examples of your experience and questions for the interviewer.',
    'Confirm the interview date, time, exact location and who you are meeting.',
    'Save the recruiter’s contact details.',
    'Plan your transport, leave enough travel time and carry necessary documents only.',
  ]],
  ['Interview safety precautions', [
    'Share the company name, address and interview time with someone you trust. Use Thuso to save your appointment and plan a Safe Journey.',
    'Avoid interviews where the location is kept secret until the last minute.',
    'Be cautious of private homes, hotel rooms or unusual venues. Meet in professional or public environments where possible.',
    'Do not bring large amounts of cash or pay registration, training, uniform or placement fees.',
    'Keep your ID and bank information private unless genuinely required later in a legitimate employment process.',
    'Never share passwords, PINs or OTPs.',
    'Arrange safe transport and know how you are getting home.',
    'Trust your instincts. Leave the location if you feel unsafe.',
  ]],
  ['During the interview', [
    'Arrive early and introduce yourself confidently.',
    'Listen carefully and answer clearly and honestly.',
    'Take your time before answering. Ask for clarification when necessary.',
    'Ask questions and take note of important information.',
    'Do not feel pressured into signing immediately. Ask for time to review contracts or offers.',
    'If anything feels unsafe, you are allowed to leave.',
  ]],
  ['After the interview', [
    'Check in with your trusted contact and end your Thuso Safe Journey when safe.',
    'Write down important interview details.',
    'Send a professional thank-you email if appropriate.',
    'Verify unexpected follow-up requests. Be careful if payment is suddenly requested after the interview.',
    'Read an employment contract before signing it.',
  ]],
];

const warningGroups = [
  ['Money & private information', ['Recruitment or application fees; requests for cash.', 'Requests for banking PINs or OTPs.', 'Requests to purchase equipment before employment.', 'Unnecessary identity documents requested too early.']],
  ['Promises & pressure', ['Guaranteed employment.', 'Extremely high salary for little or no experience.', 'Pressure to act immediately.', 'Poorly explained job responsibilities.']],
  ['People & places', ['Company information you cannot independently verify.', 'A recruiter who refuses official communication channels.', 'Strange or imitation website domains.', 'Interview location only provided at the last minute.', 'Requests to attend alone.']],
];

const responseSteps = [
  ['Stop before responding', 'Do not click links or download unknown attachments. Take a moment to check the request.'],
  ['Do not send money', 'Do not pay application, registration, training, placement or processing fees.'],
  ['Protect your information', 'Do not send banking credentials, passwords, OTPs or card details. Be cautious with identity documents.'],
  ['Verify independently', 'Search for the organisation yourself instead of relying on links provided by the sender.'],
  ['Report and block', 'Use the reporting tools on WhatsApp, your email provider, social media or the job platform where the message arrived.'],
  ['Tell someone', 'If you have already shared sensitive information or money, speak to someone you trust and contact the relevant financial or service provider as soon as possible.'],
];

export default function SafetyGuide({ onNavigate }) {
  return <div className="safety-page safety-guide">
    <header className="safety-intro"><span className="home-eyebrow">SAFETY GUIDE</span><h1>Prepare well. Travel smart.<br />Stay connected.</h1><p>Practical guidance for safer job applications, interviews and recruitment conversations.</p></header>
    <nav className="guide-jump-links" aria-label="Safety guide sections"><a href="#interview-preparation">Your interview</a><a href="#scam-signs">Warning signs</a><a href="#scam-message">Suspicious messages</a><a href="#safe-responses">Response templates</a></nav>
    <section id="interview-preparation" className="guide-section">
      <div className="guide-section-heading"><span className="safety-icon"><Icon name="calendar" /></span><div><span className="home-eyebrow">01 / MAKE A PLAN</span><h2>Before your interview</h2><p>A few practical checks can help you arrive prepared and stay connected.</p></div></div>
      <aside className="charge-tip"><span className="safety-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="6" width="17" height="12" rx="2" /><path d="M22 10v4M12 8l-3 5h5l-3 4" /></svg></span><div><span className="home-eyebrow">A SMALL CHECK THAT MATTERS</span><h3>Charge before you leave</h3><ul className="safety-list charge-list"><li>Fully charge your phone and carry a power bank if possible.</li><li>Make sure you have mobile data or airtime.</li><li>Save important contact numbers and keep your phone accessible during the journey.</li><li>Check that location services work if you plan to use them with Thuso Safe Journey.</li></ul></div></aside>
      <div className="guide-checklists">{checklists.map(([title, items], index) => <details className="safety-disclosure" key={title} open={index === 0}><summary><span><span className="checklist-number">0{index + 1}</span>{title}</span><span aria-hidden="true">+</span></summary><ul className="safety-list disclosure-body">{items.map(item => <li key={item}>{item}</li>)}</ul></details>)}</div>
      <button className="safety-button secondary" onClick={() => onNavigate('appointments')}>Plan your Safe Journey <Icon name="arrow" width="18" /></button>
    </section>
    <section id="scam-signs" className="guide-section"><div className="guide-section-heading"><span className="safety-icon"><Icon /></span><div><span className="home-eyebrow">02 / KNOW WHAT TO CHECK</span><h2>Common recruitment scam warning signs</h2><p>One warning sign does not automatically prove a job is fraudulent. Multiple warning signs should increase caution and independent verification.</p></div></div>
      <div className="guide-warning-grid">{warningGroups.map(([title, items]) => <article className="safety-panel" key={title}><h3>{title}</h3><ul className="safety-list">{items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div>
      <button className="safety-button secondary" onClick={() => onNavigate('verify')}>Check an opportunity <Icon name="arrow" width="18" /></button>
    </section>
    <section id="scam-message" className="guide-section"><div className="guide-section-heading"><span className="safety-icon"><Icon name="chat" /></span><div><span className="home-eyebrow">03 / PAUSE & PROTECT</span><h2>If you think someone sent you a recruitment scam</h2><p>You can step back at any point. You do not owe the sender a conversation.</p></div></div>
      <ol className="response-steps">{responseSteps.map(([title, body]) => <li key={title}><h3>{title}</h3><p>{body}</p></li>)}</ol>
    </section>
    <section id="safe-responses" className="guide-section"><span className="home-eyebrow">04 / KEEP IT BRIEF</span><h2>How can I respond?</h2><ResponseTemplates /></section>
    <aside className="guide-immediate"><Icon name="pin" /><div><h2>If you feel unsafe</h2><p>If you are already at an interview and feel unsafe, prioritise leaving the situation. Move toward a public or populated area, contact someone you trust and use the Thuso safety tools if available.</p><p className="safety-small">Thuso does not automatically contact emergency services or your trusted contact.</p></div></aside>
  </div>;
}

