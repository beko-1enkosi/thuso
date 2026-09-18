const pages = {
  appointments: ['Appointments', 'Your interview plans, all in one place.', 'We’re preparing a dedicated space for interview planning and safety. You can still use the existing Safe Journey tools below.'],
  community: ['Community', 'A safer search starts with connection.', 'A space for job seekers to connect is coming soon.'],
  info: ['Info', 'Get to know Thuso.', 'More information and resources for safer job seeking are coming soon.'],
  login: ['Log in', 'Welcome back.', 'Account access is coming soon. You can use job verification and Safe Journey now, without signing in.'],
  signup: ['Sign up', 'Your next chapter starts here.', 'Account registration is coming soon. You can use job verification and Safe Journey now, without an account.'],
};
export default function PlaceholderPage({ page, onNavigate }) {
  const [title, heading, copy] = pages[page];
  return <section className="placeholder-page"><span className="home-eyebrow">{title} · COMING SOON</span><h1>{heading}</h1><p>{copy}</p><button className="home-button" onClick={() => onNavigate(page === 'appointments' ? 'journey' : 'dashboard')}>{page === 'appointments' ? 'Open Safe Journey' : 'Back to home'} <span aria-hidden="true">→</span></button></section>;
}
