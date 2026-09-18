const templates = [
  ['Email', 'Subject: Verification of recruitment opportunity\n\nThank you for reaching out regarding the opportunity. Before I continue, I need to independently verify the vacancy and company details. I do not make payments or provide sensitive banking or authentication information as part of a recruitment process.\n\nPlease provide the official vacancy reference and company contact details that I can verify independently.'],
  ['WhatsApp', 'Thank you for contacting me. I need to verify this vacancy directly with the company before proceeding. I do not make recruitment payments or share sensitive banking or authentication information.'],
  ['Short response', 'I will continue once I have independently verified the company and vacancy.'],
];

export default function ResponseTemplates() {
  return <div className="response-templates">
    <p><strong>You do not have to respond to a suspicious recruiter.</strong> Stopping contact is often the safest option. If you choose to reply, keep it brief.</p>
    {templates.map(([title, body]) => <details key={title} className="safety-disclosure"><summary>{title} template <span aria-hidden="true">+</span></summary><blockquote>{body}</blockquote></details>)}
    <p className="safety-small">If the sender becomes threatening, aggressive or continues pressuring you, stop replying and block/report the account.</p>
  </div>;
}
