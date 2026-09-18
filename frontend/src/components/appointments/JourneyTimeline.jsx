import Icon from '../Icon';
export default function JourneyTimeline({ appointment }) {
  const { status, arrived } = appointment;
  const steps = [
    ['Journey started', 'Your next step is underway.', status !== 'not-started'],
    ['Arrived at interview', 'Let your check-in reflect where you are.', arrived],
    ['Safety check-in', 'Confirm when you are safe.', status === 'safe'],
    ['Journey completed', 'Your safety check-in is saved.', status === 'safe'],
  ];
  return <ol className="safety-timeline" aria-label="Safe Journey progress">{steps.map(([title, copy, complete], index) =>
    <li key={title} className={complete ? 'is-complete' : ''}><span className="safety-timeline-marker">{complete ? <Icon name="check" width="14" height="14" /> : index + 1}</span><div><strong>{title}</strong><p>{complete ? (index === 1 ? 'Arrival confirmed.' : copy) : 'Awaiting your check-in'}</p></div><span className="sr-only">{complete ? 'Complete' : 'Not confirmed'}</span></li>
  )}</ol>;
}
