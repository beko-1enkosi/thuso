🛡️ Thuso

Helping job seekers verify opportunities, prepare safely, and make informed decisions before attending interviews.

Thuso is a safety focused web application designed to help protect job seekers from fraudulent job advertisements, fake interviews, recruitment scams, kidnapping risks, and other dangers associated with unverified employment opportunities.

The project was developed by The Smurfs under VeriSafe during the Cisco WISE × WeThinkCode_ She Builds Hackathon 2026, where it placed 3rd.

⸻

🌍 The Problem

Finding employment can already be stressful, especially in communities where opportunities are limited and competition is high.

Unfortunately, scammers take advantage of this vulnerability.

Job seekers may receive convincing messages through WhatsApp, email, social media, or online job platforms inviting them to interviews at unfamiliar locations. Some fraudulent recruiters impersonate legitimate companies, request money, collect personal information, or direct applicants to unsafe locations.

In more serious cases, fake job opportunities can expose people to kidnapping, trafficking, robbery, and other forms of harm.

For someone urgently looking for work, distinguishing between a legitimate opportunity and a dangerous one is not always easy.

Thuso was created to give job seekers a moment to verify before they go.

⸻

💡 Our Solution

Thuso provides job seekers with a simple platform where they can review an opportunity, access safety information, prepare for an interview, and find trusted information before travelling to an unfamiliar location.

The goal is not to replace recruitment platforms.

Instead, Thuso acts as an additional safety layer between receiving an opportunity and physically attending it.

The platform encourages users to:

* Verify job and interview information before travelling
* Check important details about a company or opportunity
* Recognise common warning signs associated with recruitment scams
* Access interview safety precautions
* Prepare for legitimate interviews
* Know what to do when they encounter a suspicious job offer
* Find useful contact and location information

⸻

✨ Core Features

🔎 Verify a Job

The Verify Job page allows users to examine the information surrounding a job opportunity before deciding whether to proceed.

The feature is designed around checking important indicators such as:

* Company information
* Recruiter details
* Interview location
* Contact information
* Suspicious requests
* Recruitment fees
* Communication patterns
* Potential scam warning signs

The long term vision is to combine several verification signals into an easy to understand risk assessment that helps users make more informed decisions.

⸻

📅 Appointments

Users can access an appointments section designed around keeping interview related information organised.

This creates a foundation for future functionality such as:

* Saving upcoming interviews
* Recording interview locations
* Storing company and recruiter details
* Adding trusted emergency contacts
* Interview reminders
* Safety check ins

⸻

🧭 Location Awareness

Thuso incorporates Cisco technology and location based information to strengthen the safety experience.

Location awareness can help job seekers understand where an interview is taking place and encourage them to verify unfamiliar destinations before travelling.

Future versions of Thuso can expand this functionality to include:

* Location risk information
* Nearby police stations
* Hospitals
* Transport information
* Trusted public locations
* Emergency services
* Route sharing with trusted contacts

⸻

📚 Safety & Information Hub

The Info page provides practical guidance users can apply before, during, and after the recruitment process.

Interview preparation

Users are encouraged to:

* Research the company beforehand
* Confirm the role they applied for
* Prepare common interview questions
* Carry the necessary documents
* Confirm the interviewer’s name
* Verify the company’s contact information

Personal safety

Before leaving for an interview, users are encouraged to:

* Fully charge their phone
* Carry a charger or power bank where possible
* Share the interview location with someone they trust
* Tell someone what time they expect to return
* Avoid handing over original identity documents
* Be cautious when asked to meet in unusual or isolated locations

Scam awareness

The platform highlights common warning signs such as:

* Being asked to pay for an interview
* Being asked for money for uniforms, training, equipment, or registration
* Receiving an offer without a proper recruitment process
* Vague job descriptions
* Communication from suspicious email addresses
* Pressure to respond immediately
* Requests for unnecessary personal information
* Interview locations that do not match the company

Responding to suspicious opportunities

Thuso also helps users understand how to respond when they believe an opportunity may be fraudulent.

Users are encouraged not to send money, documents, banking details, passwords, OTPs, or other sensitive information.

⸻

👥 Community

The Community section creates a foundation for collective scam awareness.

The idea is that job seekers should not have to identify dangerous opportunities alone.

Future community functionality could allow users to:

* Report suspicious job advertisements
* Share scam experiences
* Warn others about fraudulent recruiters
* Search previously reported opportunities
* Help identify recurring scam patterns

Over time, community contributed information could become an important source of intelligence for recognising recruitment scams.

⸻

🧠 How Thuso Works

A typical user journey looks like this:

1. Receive an opportunity

A job seeker receives an interview invitation through WhatsApp, email, social media, a recruitment site, or another channel.

2. Open Thuso

Instead of immediately travelling to the interview, the user first opens Thuso.

3. Review the opportunity

The user checks details such as the company, recruiter, location, communication method, and any suspicious requests.

4. Review safety information

The user can access interview preparation tips, scam warning signs, and personal safety precautions.

5. Make an informed decision

Thuso provides information that helps the user decide what additional verification may be necessary before proceeding.

The core principle is simple:

Verify before you go.

⸻

🛠️ Tech Stack

Frontend

* React
* Vite
* JavaScript
* HTML
* CSS
* ESLint
* Prettier

Backend

* Python
* REST API architecture
* CORS configuration

Integrations

* Cisco API integration
* Location based services

Deployment

* Vercel
* GitHub

⸻

🏗️ Project Architecture

thuso/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── ...

The project separates the user interface from backend services, making it easier to extend each part of the platform independently.

⸻

🚀 Running Thuso Locally

Prerequisites

Ensure you have the following installed:

* Python 3
* Node.js
* npm
* Git

⸻

1. Clone the repository

git clone https://github.com/beko-1enkosi/thuso.git
cd thuso

⸻

2. Set up the backend

Create a virtual environment:

Linux / macOS

python3 -m venv .venv
source .venv/bin/activate

Windows PowerShell

python -m venv .venv
.\.venv\Scripts\Activate.ps1

Install the Python dependencies:

pip install -r backend/requirements.txt

Run the backend:

python backend/main.py

⸻

3. Set up the frontend

Open another terminal:

cd frontend
npm install
npm run dev

Vite will display the local development address in your terminal.

Open that address in your browser to use Thuso locally.

⸻

🔐 Safety and Privacy Philosophy

Thuso is being designed around a safety first approach.

A job verification platform may eventually process information such as:

* Company names
* Recruiter contact details
* Interview locations
* User submitted reports
* Scam reports
* Appointment information

Because this information can be sensitive, future development should prioritise:

* Secure authentication
* Minimal collection of personal information
* Encryption
* Secure database access
* Role based permissions
* Careful location handling
* Data retention policies
* Protection against malicious reports

Thuso should collect only the information necessary to provide its service.

⸻

🤖 Future AI Integration

Artificial intelligence could eventually strengthen Thuso’s verification process.

Potential AI functionality includes analysing:

* Job advertisement wording
* Suspicious WhatsApp messages
* Recruitment emails
* Scam patterns
* Company information
* Previously reported incidents
* Common social engineering techniques

Instead of allowing AI to make an absolute decision about whether a job is legitimate, the system could identify risk indicators and explain why something deserves further verification.

For example:

Potential Risk Indicators
⚠ Recruiter is using an unofficial email address
⚠ Interview location could not be associated with the stated company
⚠ Payment was requested before employment
⚠ Message contains urgency commonly associated with recruitment scams

The final decision should remain with the user.

⸻

🗄️ Future Database Architecture

As the platform grows, a database could store structured information such as:

Users
Companies
Recruiters
Job Listings
Interview Appointments
Scam Reports
Verification Requests
Locations
Community Reports

This would allow Thuso to build a searchable history of reported opportunities and recognise repeated scam patterns.

⸻

🔮 What’s Next?

Thuso began as a hackathon MVP, but the concept can grow significantly.

Future development may include:

* 🔐 User authentication
* 🗄️ Persistent database storage
* 🤖 AI assisted scam detection
* 🏢 Company verification
* 🔎 Job advertisement analysis
* 📍 Improved location verification
* 🚨 Emergency contact functionality
* 📱 Trusted contact check ins
* 🗺️ Safe route information
* 📢 Community scam reporting
* 🔔 Interview reminders
* 📊 Scam trend analytics
* 🧾 Recruiter verification
* 📱 Mobile application support
* 🇿🇦 Integration with relevant South African employment and safety resources

The broader vision is to create a trusted digital safety companion for people navigating employment opportunities.

⸻

💼 Business Vision

Thuso forms part of the broader VeriSafe concept.

The business vision is to build a verification and safety ecosystem connecting:

Job seekers

with

Employers

Recruitment agencies

Employment platforms

Safety services

and

trusted verification data.

Potential future revenue models could include:

* Employer verification subscriptions
* Recruiter verification services
* Recruitment platform integrations
* API access
* Enterprise safety solutions
* Verified employer profiles
* Partnerships with employment organisations

The core job seeker safety functionality should remain accessible to the people who need it most.

⸻

🏆 She Builds Hackathon 2026

Thuso was developed during the Cisco WISE × WeThinkCode_ She Builds Hackathon.

Team

The Smurfs

Company

VeriSafe

Project

Thuso

Achievement

🥉 3rd Place

The hackathon challenged participants to identify meaningful problems and use technology to develop practical solutions.

Our team focused on the risks faced by people searching for employment and explored how technology, verification, location awareness, community knowledge, and education could work together to make the job seeking process safer.

⸻

💙 Why the Name “Thuso”?

Thuso means help or assistance in Sesotho and Setswana.

The name reflects the purpose of the platform.

Thuso does not make decisions for job seekers.

It gives them information, tools, and guidance that can help them make safer decisions for themselves.

⸻

🌱 Our Mission

To make seeking employment safer by giving job seekers access to verification tools, safety information, and trusted resources before they place themselves at risk.

⸻

🌍 Our Vision

A future where nobody has to choose between pursuing an opportunity and protecting their safety.

⸻

💬 Final Thought

A job opportunity should be the beginning of someone’s next chapter.

It should never put their life at risk.

Thuso

Verify. Prepare. Stay safe.

⸻

👩🏾‍💻 Built By

The Smurfs

Developed during the 2026 She Builds Hackathon with support from Cisco WISE and WeThinkCode_.

⸻

⭐ If you believe technology can help make job seeking safer, consider starring the repository.