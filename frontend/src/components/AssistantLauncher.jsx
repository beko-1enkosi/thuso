import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
export default function AssistantLauncher() {
  const [open, setOpen] = useState(false);
  const launcher = useRef(null);
  const closeButton = useRef(null);
  useEffect(() => { if (open) closeButton.current?.focus(); }, [open]);
  function close() { setOpen(false); launcher.current?.focus(); }
  return <aside className="assistant-widget" aria-label="Thuso assistant" onKeyDown={event => { if (event.key === 'Escape' && open) close(); }}>
    {open && <section className="assistant-panel" id="assistant-panel" role="region" aria-labelledby="assistant-title"><div className="assistant-panel-heading"><Icon name="chat" /><strong id="assistant-title">Ask Thuso</strong><button ref={closeButton} aria-label="Close assistant" onClick={close}><Icon name="close" width="20" /></button></div><p>Thuso Assistant is coming soon.</p><span>A little guidance, when you need it.</span></section>}
    <button ref={launcher} className="assistant-launcher" aria-expanded={open} aria-controls={open ? 'assistant-panel' : undefined} onClick={() => setOpen(!open)}><Icon name="chat" width="21" height="21" /><span>Ask Thuso</span></button>
  </aside>;
}
