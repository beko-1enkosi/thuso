import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Icon from './Icon';
export default function Home({ onNavigate }) {
  return <div className="home-content"><Hero onVerify={() => onNavigate('verify')} /><HowItWorks />
    <section className="trust-section" aria-labelledby="trust-title"><div className="trust-copy"><span className="home-eyebrow"><Icon width="17" height="17" /> INFORMED CHOICES. SAFER STEPS.</span><h2 id="trust-title">Built for safer job seeking.</h2><p>Thuso identifies warning signals to help you make more informed decisions. It doesn’t guarantee that an opportunity is legitimate — you stay in control of your next step.</p></div><ul className="safety-points">{['Never pay recruitment fees', 'Verify companies independently', 'Share interview details with someone you trust'].map(point => <li key={point}><Icon name="check" width="18" height="18" />{point}</li>)}</ul></section>
  </div>;
}
