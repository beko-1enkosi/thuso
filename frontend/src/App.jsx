import { useState } from "react";

const demoScam = `Congratulations! You have been selected for an interview.

Pay a R350 registration fee before attending.
WhatsApp only.

Send your CV to thusojobs@gmail.com.

Visit https://thuso-careers.xyz/apply immediately.`;

function App() {
  const [activePage, setActivePage] = useState("verify");

  const [jobText, setJobText] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [interview, setInterview] = useState({
    company: "",
    location: "",
    date: "",
    time: "",
    contactName: "",
    contactPhone: "",
  });

  const [journeyStatus, setJourneyStatus] = useState("not-started");

  async function verifyOpportunity() {
    if (!jobText.trim() && !jobUrl.trim()) {
      setError("Paste a job advert, message, email, or URL first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/verify", {
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
    } catch (err) {
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
    setActivePage("journey");

    if (result?.extracted?.domains?.length) {
      setInterview((current) => ({
        ...current,
        company: result.extracted.domains[0],
      }));
    }
  }

  function startJourney() {
    setJourneyStatus("travelling");
  }

  function markArrived() {
    setJourneyStatus("arrived");
  }

  function markSafe() {
    setJourneyStatus("safe");
  }

  function triggerAlert() {
    setJourneyStatus("alert");
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand" onClick={() => setActivePage("dashboard")}>
          <div className="brand-mark">T</div>

          <div>
            <h1>Thuso</h1>
            <p>Verify. Prepare. Arrive safely.</p>
          </div>
        </div>

        <nav>
          <button
            className={activePage === "dashboard" ? "nav-active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={activePage === "verify" ? "nav-active" : ""}
            onClick={() => setActivePage("verify")}
          >
            Verify
          </button>

          <button
            className={activePage === "journey" ? "nav-active" : ""}
            onClick={() => setActivePage("journey")}
          >
            Safe Journey
          </button>
        </nav>
      </header>

      <main className="page">
        {activePage === "dashboard" && (
          <section>
            <div className="hero compact-hero">
              <div>
                <span className="eyebrow">JOB SEEKER SAFETY</span>
                <h2>Good morning.</h2>
                <p>
                  Check an opportunity before you trust it, then use Thuso to
                  stay connected during your interview journey.
                </p>
              </div>

              <button
                className="primary-button"
                onClick={() => setActivePage("verify")}
              >
                Verify an opportunity
              </button>
            </div>

            <div className="dashboard-grid">
              <article className="card">
                <span className="card-label">NEXT INTERVIEW</span>
                <h3>No interview scheduled</h3>
                <p>
                  Verify an opportunity first, then add it to your Safe Journey.
                </p>

                <button
                  className="text-button"
                  onClick={() => setActivePage("verify")}
                >
                  Start verification →
                </button>
              </article>

              <article className="card">
                <span className="card-label">HOW THUSO HELPS</span>

                <div className="mini-step">
                  <strong>01</strong>
                  <span>Analyse suspicious job messages</span>
                </div>

                <div className="mini-step">
                  <strong>02</strong>
                  <span>Explain the warning signals</span>
                </div>

                <div className="mini-step">
                  <strong>03</strong>
                  <span>Stay connected during interviews</span>
                </div>
              </article>

              <article className="card wide-card">
                <span className="card-label">THE THUSO PROMISE</span>

                <h3>We give you evidence — not false certainty.</h3>

                <p>
                  Thuso highlights risk indicators so that job seekers can make
                  safer decisions. A low-risk result is not a guarantee that an
                  opportunity is legitimate.
                </p>
              </article>
            </div>
          </section>
        )}

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
                    type="url"
                    value={jobUrl}
                    onChange={(event) => setJobUrl(event.target.value)}
                    placeholder="https://example.com/job"
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

        {activePage === "journey" && (
          <section>
            <div className="hero">
              <div>
                <span className="eyebrow">SAFE JOURNEY</span>

                <h2>Stay connected while attending your interview.</h2>

                <p>
                  Save the interview details, nominate a trusted contact and
                  check in as your journey progresses.
                </p>
              </div>
            </div>

            <div className="journey-layout">
              <article className="card">
                <span className="card-label">INTERVIEW DETAILS</span>

                <div className="form-grid">
                  <label>
                    Company
                    <input
                      value={interview.company}
                      onChange={(event) =>
                        setInterview({
                          ...interview,
                          company: event.target.value,
                        })
                      }
                      placeholder="Company name"
                    />
                  </label>

                  <label>
                    Location
                    <input
                      value={interview.location}
                      onChange={(event) =>
                        setInterview({
                          ...interview,
                          location: event.target.value,
                        })
                      }
                      placeholder="Sandton, Johannesburg"
                    />
                  </label>

                  <label>
                    Date
                    <input
                      type="date"
                      value={interview.date}
                      onChange={(event) =>
                        setInterview({
                          ...interview,
                          date: event.target.value,
                        })
                      }
                    />
                  </label>

                  <label>
                    Time
                    <input
                      type="time"
                      value={interview.time}
                      onChange={(event) =>
                        setInterview({
                          ...interview,
                          time: event.target.value,
                        })
                      }
                    />
                  </label>

                  <label>
                    Trusted contact
                    <input
                      value={interview.contactName}
                      onChange={(event) =>
                        setInterview({
                          ...interview,
                          contactName: event.target.value,
                        })
                      }
                      placeholder="Contact name"
                    />
                  </label>

                  <label>
                    Contact number
                    <input
                      value={interview.contactPhone}
                      onChange={(event) =>
                        setInterview({
                          ...interview,
                          contactPhone: event.target.value,
                        })
                      }
                      placeholder="082 000 0000"
                    />
                  </label>
                </div>

                {journeyStatus === "not-started" && (
                  <button
                    className="primary-button full-button"
                    onClick={startJourney}
                  >
                    Start Safe Journey
                  </button>
                )}

                {journeyStatus !== "not-started" && (
                  <div className="journey-actions">
                    <button
                      className="secondary-button"
                      onClick={markArrived}
                    >
                      I've arrived
                    </button>

                    <button className="safe-button" onClick={markSafe}>
                      I'm safe
                    </button>

                    <button className="danger-button" onClick={triggerAlert}>
                      I need help
                    </button>
                  </div>
                )}
              </article>

              <article className="card">
                <span className="card-label">LIVE SAFETY STATUS</span>

                <div className="timeline">
                  <div
                    className={`timeline-item ${
                      journeyStatus !== "not-started" ? "complete" : ""
                    }`}
                  >
                    <div className="timeline-dot"></div>

                    <div>
                      <strong>Journey started</strong>
                      <p>
                        Location sharing begins only when the user chooses to
                        start their safety journey.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`timeline-item ${
                      ["arrived", "safe", "alert"].includes(journeyStatus)
                        ? "complete"
                        : ""
                    }`}
                  >
                    <div className="timeline-dot"></div>

                    <div>
                      <strong>Interview arrival</strong>
                      <p>User confirms they arrived at the interview.</p>
                    </div>
                  </div>

                  <div
                    className={`timeline-item ${
                      journeyStatus === "safe" ? "complete" : ""
                    }`}
                  >
                    <div className="timeline-dot"></div>

                    <div>
                      <strong>Safety check-in</strong>
                      <p>Thuso asks the user to confirm that they are safe.</p>
                    </div>
                  </div>
                </div>

                {journeyStatus === "not-started" && (
                  <div className="status-box neutral">
                    Safe Journey has not started yet.
                  </div>
                )}

                {journeyStatus === "travelling" && (
                  <div className="status-box active">
                    Journey active — waiting for arrival confirmation.
                  </div>
                )}

                {journeyStatus === "arrived" && (
                  <div className="status-box active">
                    Arrival confirmed. Thuso will check in again after the
                    interview.
                  </div>
                )}

                {journeyStatus === "safe" && (
                  <div className="status-box success">
                    Safety confirmed. Trusted contact does not need to be
                    alerted.
                  </div>
                )}

                {journeyStatus === "alert" && (
                  <div className="emergency-card">
                    <span>TRUSTED CONTACT ALERT</span>

                    <h3>Safety check requires attention</h3>

                    <p>
                      The job seeker requested help or missed their expected
                      safety confirmation.
                    </p>

                    <div className="alert-details">
                      <strong>
                        {interview.company || "Interview company"}
                      </strong>

                      <span>
                        {interview.location || "Interview location"}
                      </span>

                      <span>
                        Trusted contact:{" "}
                        {interview.contactName || "Emergency contact"}
                      </span>
                    </div>

                    <p className="alert-note">
                      Prototype: In production, Thuso would send this alert
                      through an approved messaging or SMS provider.
                    </p>
                  </div>
                )}
              </article>
            </div>
          </section>
        )}
      </main>

      <footer>
        <strong>Thuso</strong>
        <span>Built for safer job seeking.</span>
      </footer>
    </div>
  );
}

export default App;