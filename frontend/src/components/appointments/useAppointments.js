import { useEffect, useRef, useState } from 'react';
import { emptyInterview, getBrowserLocation, statusLabels, validateInterview } from './journey';

const STORAGE_KEY = 'thuso-safe-journey';
const isActive = (item) => ['travelling', 'arrived', 'alert'].includes(item.status);

function normalise(item) {
  const interview = Object.fromEntries(Object.keys(emptyInterview).map(key =>
    [key, typeof item.interview?.[key] === 'string' ? item.interview[key] : '']));
  const status = Object.hasOwn(statusLabels, item.status) ? item.status : 'not-started';
  return { ...item, id: item.id || crypto.randomUUID(), interview, status,
    currentLocation: item.currentLocation || null,
    arrived: item.arrived ?? ['arrived', 'safe'].includes(status) };
}

function readAppointments() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved?.appointments)) {
      return { appointments: saved.appointments.filter(item => item && typeof item === 'object').map(normalise), selectedId: saved.selectedId };
    }
    if (saved?.interview && (Object.values(saved.interview).some(Boolean) || saved.status !== 'not-started')) {
      const item = normalise({ ...saved, id: 'saved-journey' });
      return { appointments: [item], selectedId: item.id };
    }
    return { appointments: [], selectedId: null };
  } catch {
    return { appointments: [], selectedId: null, storageError: 'Saved interviews could not be loaded. New changes may not survive a refresh.' };
  }
}

export default function useAppointments() {
  const [data, setData] = useState(readAppointments);
  const [storageError, setStorageError] = useState(data.storageError || '');
  const [notices, setNotices] = useState({});
  const [error, setError] = useState('');
  const requests = useRef({});
  const appointments = data.appointments;
  const selected = appointments.find(item => item.id === data.selectedId) || null;
  const active = appointments.find(isActive);

  useEffect(() => {
    try {
      const current = data.appointments.find(item => item.id === data.selectedId) || data.appointments[0];
      // Retain the original fields as well as the new multi-appointment collection.
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 2, ...data,
        interview: current?.interview || emptyInterview, status: current?.status || 'not-started',
        currentLocation: current?.currentLocation || null }));
    } catch {
      // Report a failed write without interrupting safety actions.
      queueMicrotask(() => setStorageError('Your browser could not save these changes. Keep this tab open; details may be lost on refresh.'));
    }
  }, [data]);

  function select(id) {
    setError('');
    setData(current => ({ ...current, selectedId: id }));
  }

  function update(id, patch) {
    setData(current => ({ ...current, appointments: current.appointments.map(item => item.id === id ? { ...item, ...patch } : item) }));
  }

  function save(interview, existingId) {
    const id = existingId || crypto.randomUUID();
    setData(current => ({ ...current, selectedId: id,
      appointments: existingId
        ? current.appointments.map(item => item.id === id ? { ...item, interview } : item)
        : [...current.appointments, { id, interview, status: 'not-started', currentLocation: null, arrived: false }] }));
    setError('');
    return id;
  }

  async function captureLocation(id) {
    const token = Symbol();
    requests.current[id] = token;
    setNotices(current => ({ ...current, [id]: { pending: true, message: 'Requesting your location. You can continue checking in.' } }));
    const result = await getBrowserLocation();
    if (requests.current[id] !== token) return;
    if (result.location) update(id, { currentLocation: result.location });
    setNotices(current => ({ ...current, [id]: { pending: false, message: result.location
      ? 'Location captured. It is available in your safety message; it is not tracked live.' : result.error } }));
  }

  function start(id) {
    const item = appointments.find(appointment => appointment.id === id);
    if (!item || item.status !== 'not-started') return;
    select(id);
    if (active && active.id !== id) {
      setError('You already have an active Safe Journey. Complete that check-in before starting another.');
      return;
    }
    const validation = Object.values(validateInterview(item.interview));
    if (validation.length) { setError(`${validation[0]} Choose Edit details to finish this interview.`); return; }
    update(id, { status: 'travelling', currentLocation: null, arrived: false });
    void captureLocation(id);
  }

  function arrive(id) {
    if (appointments.find(item => item.id === id)?.status === 'travelling') update(id, { status: 'arrived', arrived: true });
  }

  function safe(id) {
    if (['arrived', 'alert'].includes(appointments.find(item => item.id === id)?.status)) update(id, { status: 'safe' });
  }

  function help(id) {
    const item = appointments.find(item => item.id === id);
    if (!item || !['travelling', 'arrived'].includes(item.status)) return;
    update(id, { status: 'alert' });
    void captureLocation(id);
  }

  function reset(id) {
    requests.current[id] = null;
    update(id, { status: 'not-started', currentLocation: null, arrived: false });
    setNotices(current => ({ ...current, [id]: null }));
    setError('');
  }

  return { appointments, selected, active, select, save, start, arrive, safe, help, reset, error, storageError, notices };
}
