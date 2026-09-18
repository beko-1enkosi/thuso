import Icon from './Icon';
const steps = [
  ['01', 'shield', 'Verify', 'Check job messages, adverts, recruiter details and links for warning signals.'],
  ['02', 'calendar', 'Prepare', "Save interview information and make sure someone you trust knows where you’re going."],
  ['03', 'chat', 'Stay connected', 'Use Thuso safety check-ins during the interview journey.'],
];
export default function HowItWorks() {
  return <section className="how-section" id="how-it-works" aria-labelledby="how-title" tabIndex="-1">
    <div className="home-section-heading"><div><span className="home-eyebrow">FROM OPPORTUNITY TO INTERVIEW</span><h2 id="how-title">How Thuso helps</h2></div><p>Three simple steps.<br />Your safety at the centre.</p></div>
    <div className="help-steps">{steps.map(([number, icon, title, copy]) => <article className="help-step" key={number}><div className="step-top"><span className="step-icon"><Icon name={icon} /></span><span className="step-number">{number}</span></div><h3>{title}</h3><p>{copy}</p></article>)}</div>
  </section>;
}
