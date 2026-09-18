import { useRef, useState } from 'react';
import Icon from './Icon';

const links = [['dashboard', 'Home'], ['appointments', 'Appointments'], ['verify', 'Verify Job'], ['community', 'Community'], ['info', 'Info']];

export default function Navbar({ activePage, onNavigate }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  function navigate(page) {
    setOpen(false);
    onNavigate(page);
  }
  return <header className="site-header" onKeyDown={(event) => {
    if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); }
  }}>
    <div className="nav-container">
      <button className="thuso-wordmark" aria-label="Thuso home" onClick={() => navigate('dashboard')}><span className="thuso-logo"><Icon /></span>thuso<span className="wordmark-dot">.</span></button>
      <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
      <nav id="main-navigation" aria-label="Main navigation" className={`site-navigation ${open ? 'is-open' : ''}`}>
        <div className="navigation-links">{links.map(([page, label]) => <button key={page} aria-current={activePage === page || (page === 'appointments' && activePage === 'journey') ? 'page' : undefined} onClick={() => navigate(page)}>{label}</button>)}</div>
        <div className="navigation-account"><button aria-current={activePage === 'login' ? 'page' : undefined} onClick={() => navigate('login')}>Log in</button><button className="signup-button" onClick={() => navigate('signup')}>Sign up <Icon name="arrow" width="16" height="16" /></button></div>
      </nav>
    </div>
  </header>;
}
