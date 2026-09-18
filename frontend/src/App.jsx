import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AssistantLauncher from "./components/AssistantLauncher";
import PlaceholderPage from "./components/PlaceholderPage";
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
        "Could not reach the Thuso API. Make sure FastAPI is still running."
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
      <main id="main-content" tabIndex="-1" className={activePage === "verify" ? "page" : "home-page"}>
        {activePage === "dashboard" && <Home onNavigate={navigate} />}
        {["community", "info", "login", "signup"].includes(activePage) && <PlaceholderPage page={activePage} onNavigate={navigate} />}

        {activePage === "verify" && (
          <section>
            <div className="hero">
              <div>
                <span className="eyebrow">VERIFY BEFORE YOU GO</span>

                <h2>Does this job opportunity look safe?</h2>

                <p>
                  Paste the WhatsApp message, email, job advert or recruitment
                  text. Thuso will identify warning signs and explain them.
                </p>
              </div>
            </div>

            <div className="verify-layout">
              <article className="card verification-form">
                <div className="section-heading">
                  <div>
                    <span className="card-label">OPPORTUNITY CHECK</span>
                    <h3>Paste what you received</h3>
                  </div>

                  <button className="demo-button" onClick={loadDemo}>
                    Load demo scam
                  </button>
                </div>

                <label>
                  Job message or advert
                  <textarea
                    value={jobText}
                    onChange={(event) => setJobText(event.target.value)}
                    placeholder="Paste the WhatsApp message, email or job advert here..."
                  />
                </label>

                <div className="divider">
                  <span>OR</span>
                </div>

                <label>
                  Job link
                  <input
                    type="text"
                    value={jobUrl}
                    onChange={(event) => setJobUrl(event.target.value)}
                    placeholder="https://example.com/job or example.com/job"
                  />
                </label>

                {error && <div className="error-message">{error}</div>}

                <button
                  className="primary-button full-button"
                  onClick={verifyOpportunity}
                  disabled={loading}
                >
                  {loading ? "Checking opportunity..." : "Verify opportunity"}
                </button>

                <p className="privacy-note">
                  Thuso analyses the information you submit to identify safety
                  signals. Never share passwords, PINs or banking credentials.
                </p>
              </article>

              <article className="card result-card">
                {!result && !loading && (
                  <div className="empty-result">
                    <div className="shield">✓</div>
                    <h3>Your safety report will appear here</h3>
                    <p>
                      Thuso checks recruitment language, contact information,
                      links and other common warning signals.
                    </p>
                  </div>
                )}

                {loading && (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <h3>Analysing opportunity</h3>
                    <p>Looking for recruitment safety signals...</p>
                  </div>
                )}

                {result && (
                  <div>
                    <span className="card-label">THUSO SAFETY REPORT</span>

                    <div className={`risk-header ${result.risk_level}`}>
                      <div>
                        <span>Risk indicator</span>
                        <strong>{result.risk_score}/100</strong>
                      </div>

                      <div className="risk-level">
                        {result.risk_level.toUpperCase()} RISK
                      </div>
                    </div>

                    <div className="risk-meter">
                      <div
                        className={`risk-fill ${result.risk_level}`}
                        style={{ width: `${result.risk_score}%` }}
                      ></div>
                    </div>

                    <div className="report-section">
                      <h4>
                        {result.warnings.length} warning
                        {result.warnings.length === 1 ? "" : "s"} detected
                      </h4>

                      {result.warnings.length === 0 ? (
                        <div className="signal success-signal">
                          <span>✓</span>
                          <p>No major warning signals were detected.</p>
                        </div>
                      ) : (
                        result.warnings.map((warning, index) => (
                          <div className="signal" key={index}>
                            <span>!</span>
                            <p>{warning}</p>
                          </div>
                        ))
                      )}
                    </div>

                    {result.recommendations?.length > 0 && (
                      <div className="report-section">
                        <h4>What to do next</h4>

                        {result.recommendations.map((recommendation, index) => (
                          <div className="signal success-signal" key={index}>
                            <span>→</span>
                            <p>{recommendation}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {result.extracted.emails.length > 0 && (
                      <div className="report-section">
                        <h4>Contact found</h4>

                        {result.extracted.emails.map((email) => (
                          <div className="detail-row" key={email}>
                            <span>Email</span>
                            <strong>{email}</strong>
                          </div>
                        ))}
                      </div>
                    )}

                    {result.extracted.phone_numbers?.length > 0 && (
                      <div className="report-section">
                        <h4>Phone number found</h4>

                        {result.extracted.phone_numbers.map((phone) => (
                          <div className="detail-row" key={phone}>
                            <span>Phone</span>
                            <strong>{phone}</strong>
                          </div>
                        ))}
                      </div>
                    )}

                    {result.extracted.domains.length > 0 && (
                      <div className="report-section">
                        <h4>Website found</h4>

                        {result.extracted.domains.map((domain) => (
                          <div className="detail-row" key={domain}>
                            <span>Domain</span>
                            <strong>{domain}</strong>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="disclaimer">{result.disclaimer}</div>

                    <button
                      className="secondary-button full-button"
                      onClick={moveToInterview}
                    >
                      I still have an interview → Add Safe Journey
                    </button>
                  </div>
                )}
              </article>
            </div>
          </section>
        )}

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
