import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AssistantLauncher from "./components/AssistantLauncher";
import PlaceholderPage from "./components/PlaceholderPage";
import VerifyPage from "./components/verify/VerifyPage";
import SafetyGuide from "./components/info/SafetyGuide";
import "./home.css";
import AppointmentsPage from "./components/appointments/AppointmentsPage";
import useAppointments from "./components/appointments/useAppointments";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const demoScam = `Congratulations! You have been selected for an interview.

Pay a R350 registration fee before attending.
WhatsApp only.
Come alone and bring cash.

Send your CV to thusojobs@gmail.com.

Visit https://thuso-careers.xyz/apply immediately.`;

function App() {
  const appointments = useAppointments();
  const [appointmentDraft, setAppointmentDraft] = useState(null);

  const [activePage, setActivePage] = useState("dashboard");

  const [jobText, setJobText] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function verifyOpportunity() {
    if (loading) return;
    if (!jobText.trim() && !jobUrl.trim()) {
      setError("Paste a job advert, message, email, or URL first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/api/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: jobText,
          url: jobUrl || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Verification request failed.");
      }

      const data = await response.json();
      setResult(data);
    } catch {
      setError(
        "We could not check this opportunity right now. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  }

  function loadDemo() {
    setJobText(demoScam);
    setJobUrl("");
    setResult(null);
    setError("");
  }

  function moveToInterview() {
    setAppointmentDraft({ company: result?.extracted?.domains?.[0] || '' });
    navigate("appointments");
  }

  function navigate(page) {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => document.getElementById("main-content")?.focus({ preventScroll: true }));
  }

  return (
    <div className="app thuso-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar activePage={activePage} onNavigate={navigate} />
      <main id="main-content" tabIndex="-1" className="home-page">
        {activePage === "dashboard" && <Home onNavigate={navigate} />}
        {["community", "login", "signup"].includes(activePage) && <PlaceholderPage page={activePage} onNavigate={navigate} />}

        {activePage === "info" && <SafetyGuide onNavigate={navigate} />}
        {activePage === "verify" && <VerifyPage
          jobText={jobText} setJobText={setJobText}
          jobUrl={jobUrl} setJobUrl={setJobUrl}
          result={result} loading={loading} error={error}
          loadDemo={loadDemo} verifyOpportunity={verifyOpportunity}
          moveToInterview={moveToInterview}
        />}

        {["appointments", "journey"].includes(activePage) && (
          <AppointmentsPage manager={appointments} initialDraft={appointmentDraft} onClearDraft={() => setAppointmentDraft(null)} />
        )}
      </main>

      <footer className="site-footer">
        <div><strong>thuso.</strong><span>Opportunity with peace of mind.</span></div>
        <span>Built for safer job seeking.</span>
      </footer>
      <AssistantLauncher />
    </div>
  );
}

export default App;
