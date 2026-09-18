import Icon from './Icon';

export default function Hero({ onVerify }) {
  return <section className="home-hero" aria-labelledby="home-title">
    <div className="hero-copy">
      <span className="home-eyebrow"><span /> A SAFER WAY FORWARD</span>
      <h1 id="home-title">Job hunting should <span>open doors.</span><br />Not put you<br className="desktop-break" /> in danger.</h1>
      <p>Your next opportunity deserves a closer look. Thuso helps you spot suspicious jobs, prepare for interviews, and stay connected along the way.</p>
      <div className="hero-actions"><button className="home-button" onClick={onVerify}>Verify a job <Icon name="arrow" width="19" /></button><a className="home-button home-button-secondary" href="#how-it-works">How Thuso works <span aria-hidden="true">↗</span></a></div>
      <div className="hero-footnote"><Icon width="17" height="17" /> A little more clarity. A safer next step.</div>
    </div>
    <div className="hero-art" role="img" aria-label="Illustration of a Thuso safety companion on a phone, with a shield and interview preparation reminders.">
      <div className="art-grid" />
      <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
      <div className="device">
        <div className="device-camera" /><div className="device-top"><strong>thuso.</strong><span>YOUR SAFETY COMPANION</span></div>
        <div className="device-shield"><Icon width="80" height="80" /></div>
        <div className="device-heading">Your next step.<br /><strong>With more confidence.</strong></div>
        <div className="device-row"><span><Icon width="18" /></span><div>Check the opportunity<small>Know what to look for</small></div><Icon name="check" width="15" /></div>
        <div className="device-row"><span><Icon name="pin" width="18" /></span><div>Plan your journey<small>Keep someone in the loop</small></div></div>
        <div className="device-bottom" />
      </div>
      <div className="floating-note note-verify"><span className="note-icon"><Icon /></span><div>A closer look matters<small>Verify before you go</small></div></div>
      <div className="floating-note note-connected"><span className="note-icon"><Icon name="pin" /></span><div>Every step, connected<small>Your journey. Your people.</small></div><span className="connection-dot" /></div>
      <span className="art-spark spark-one">+</span><span className="art-spark spark-two">+</span>
      <div className="art-caption">VERIFY <span /> PREPARE <span /> STAY CONNECTED</div>
    </div>
  </section>;
}
