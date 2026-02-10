import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";

const defaultForm = {
  type: "Patient Support",
  name: "",
  phone: "",
  location: "",
  urgency: "Low",
  message: "",
  availability: "",
  language: "",
  consent: true,
};

const impactCards = [
  {
    title: "Coverage Map",
    body: "Track support coverage by neighborhood and language needs.",
  },
  {
    title: "Escalation",
    body: "Urgent requests are auto-flagged for case managers.",
  },
  {
    title: "Volunteer Ops",
    body: "Match volunteers to clinics based on availability.",
  },
  {
    title: "Supply Tracker",
    body: "Monitor medicine stock and fast-moving items in real time.",
  },
  {
    title: "Referral Network",
    body: "Coordinate referrals with partner hospitals and specialists.",
  },
  {
    title: "Follow-up Care",
    body: "Automated reminders for check-ins and repeat visits.",
  },
];

const contactDetails = [
  { label: "Support Email", value: "support@healthngo.org" },
  { label: "Phone", value: "+91 98765 12345" },
  { label: "Address", value: "12 MG Road, Bengaluru, Karnataka" },
];

const staffProfiles = [
  {
    name: "Dr. Ananya Sharma",
    role: "Medical Director",
    focus: "Primary care, chronic care coordination",
    phone: "+91 98100 22110",
  },
  {
    name: "Dr. Arjun Mehta",
    role: "Community Physician",
    focus: "Pediatrics, preventive care",
    phone: "+91 98220 33445",
  },
  {
    name: "Nurse Priya Iyer",
    role: "Nurse Lead",
    focus: "Triage, vaccination clinics",
    phone: "+91 98765 44321",
  },
  {
    name: "Rohit Verma",
    role: "Volunteer Coordinator",
    focus: "Onboarding, scheduling support teams",
    phone: "+91 98999 55667",
  },
];

const faqItems = [
  {
    q: "What documents do I need?",
    a: "Bring a photo ID. If you don't have one, we can still assist you.",
  },
  { q: "Do you accept walk-ins?", a: "Yes, based on availability." },
  { q: "Are services free?", a: "We offer sliding-scale options and free care for qualifying households." },
  { q: "What languages are supported?", a: "English, Hindi, Urdu, and Spanish are supported." },
  { q: "Can I bring a family member?", a: "Yes, caregivers are welcome to join appointments." },
  { q: "How long are wait times?", a: "Average wait time is under 30 minutes." },
  { q: "Do you offer tele-consultation?", a: "Limited tele-consults are available for follow-ups." },
  { q: "What if I miss an appointment?", a: "Call us to reschedule at the earliest." },
  { q: "Is there emergency care?", a: "We handle urgent cases; for emergencies call your local emergency number." },
];

const stories = [
  { name: "Meera S.", text: "The mobile clinic reached our neighborhood when we needed help most." },
  { name: "Ravi K.", text: "Staff explained my treatment plan clearly and followed up the next day." },
  { name: "Asha P.", text: "Vaccination day was smooth and welcoming for my family." },
  { name: "Nitin B.", text: "The volunteer team helped me arrange transport for my father." },
  { name: "Kavita D.", text: "I received support in Hindi, which made everything easier." },
  { name: "Imran Q.", text: "Quick triage and respectful care — grateful for the team." },
  { name: "Neha G.", text: "Counseling referrals were handled with empathy and speed." },
  { name: "Suresh T.", text: "They coordinated my specialist referral within two days." },
  { name: "Pooja R.", text: "Consistent follow-ups helped me manage my condition." },
  { name: "Aman J.", text: "Volunteer orientation was clear and well organized." },
  { name: "Farah N.", text: "I felt safe and heard during my visit." },
  { name: "Vikram L.", text: "Community outreach teams were excellent and informative." },
];

const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Topbar = () => (
  <header className="topbar">
    <div>
      <p className="eyebrow">Mini Healthcare Support</p>
      <h1>Community care, streamlined.</h1>
    </div>
    <nav className="nav">
      <a className="nav-link" href="/#support-form">
        Support
      </a>
      <a className="nav-link" href="/#services">
        Services
      </a>
      <a className="nav-link" href="/#volunteers">
        Volunteers
      </a>
      <a className="nav-link" href="/#faq">
        FAQ
      </a>
      <a className="nav-link" href="/stories" target="_blank" rel="noreferrer">
        Stories
      </a>
      <a className="nav-link" href="/#locations">
        Locations
      </a>
      <a className="nav-link" href="/#contact-us">
        Contact
      </a>
      <a className="nav-link" href="/#donate">
        Donate
      </a>
      <a className="nav-link" href="/#our-team">
        Our Team
      </a>
    </nav>
  </header>
);

const ContactPage = () => (
  <div className="page">
    <header className="page-header">
      <h2>Contact Us</h2>
      <p>Reach out for partnerships, referrals, or general support questions.</p>
      <a className="ghost link-button" href="/">
        Back to Home
      </a>
    </header>
    <section className="panel contact">
      <div className="contact-header">
        <div>
          <h3>Support Desk</h3>
          <p>We reply within 1 business day.</p>
        </div>
        <a className="primary link-button" href="mailto:support@healthngo.org">
          Email Support
        </a>
      </div>
      <div className="contact-grid">
        <div className="contact-card">
          <h3>Office Hours</h3>
          <p>Monday - Saturday, 9:00am - 6:00pm</p>
          <p>Sunday: On-call only</p>
        </div>
        <div className="contact-card">
          <h3>Direct Lines</h3>
          <ul>
            {contactDetails.map((item) => (
              <li key={item.label}>
                <strong>{item.label}:</strong> {item.value}
              </li>
            ))}
          </ul>
        </div>
        <div className="contact-card">
          <h3>Quick Message</h3>
          <form className="contact-form">
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Email address" required />
            <textarea rows="3" placeholder="How can we help?" required />
            <button className="ghost" type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  </div>
);

const TeamPage = () => (
  <div className="page">
    <header className="page-header">
      <h2>Our Doctors & Staff</h2>
      <p>Meet the people who keep community care moving every day.</p>
      <div className="page-actions">
        <a className="ghost link-button" href="/">
          Back to Home
        </a>
      </div>
    </header>
    <section className="panel staff">
      <div className="staff-grid">
        {staffProfiles.map((member) => (
          <div key={member.name} className="staff-card">
            <div className="staff-avatar">{member.name.charAt(0)}</div>
            <div>
              <h3>{member.name}</h3>
              <p className="staff-role">{member.role}</p>
              <p className="staff-focus">{member.focus}</p>
              <p className="staff-phone">{member.phone}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="staff-footer">
        <p>
          Interested in joining? Email{" "}
          <a href="mailto:careers@healthngo.org">careers@healthngo.org</a>.
        </p>
      </div>
    </section>
  </div>
);

const StoriesPage = () => (
  <div className="page">
    <header className="page-header">
      <h2>Patient Stories</h2>
      <p>Community voices and experiences from our healthcare partners.</p>
      <div className="page-actions">
        <a className="ghost link-button" href="/">
          Back to Home
        </a>
      </div>
    </header>
    <section className="panel stories">
      <div className="stories-grid">
        {stories.map((story) => (
          <div key={story.name} className="story-card">
            <p>“{story.text}”</p>
            <span>- {story.name}</span>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const HomePage = ({
  formData,
  handleChange,
  handleSubmit,
  submitMessage,
  submitStatus,
  lastSubmission,
  summary,
  summaryTags,
  onDonate,
}) => (
  <main className="stack">
    <section className="hero">
      <div className="hero-copy">
        <h2>Fast, human-centered healthcare support.</h2>
        <p>
          A streamlined experience for NGOs and community clinics to collect support requests,
          mobilize volunteers, and keep triage organized.
        </p>
        <div className="hero-stats">
          <div>
            <span className="stat-value">48</span>
            <span className="stat-label">Active cases</span>
          </div>
          <div>
            <span className="stat-value">13</span>
            <span className="stat-label">Volunteer shifts</span>
          </div>
          <div>
            <span className="stat-value">2.1 hrs</span>
            <span className="stat-label">Avg response</span>
          </div>
        </div>
      </div>
      <div className="hero-card">
        <h3>Today’s priorities</h3>
        <ul>
          <li>Critical: 3 cases awaiting transport</li>
          <li>Medium: 7 follow-ups due today</li>
          <li>Language support: Hindi, Kannada</li>
        </ul>
        <a className="primary link-button" href="#support-form">
          Start a Request
        </a>
      </div>
    </section>

    <section className="panel split" id="services">
      <div>
        <h2>Services We Offer</h2>
        <p>Community-first care across primary, pediatric, and preventive services.</p>
        <ul className="list">
          <li>Primary care and chronic disease management</li>
          <li>Vaccination drives and mobile clinics</li>
          <li>Mental health referrals and support groups</li>
          <li>Maternal and child health screenings</li>
        </ul>
      </div>
      <div className="highlight-card">
        <h3>Walk-in Friendly</h3>
        <p>Same-day support for urgent, non-emergency cases.</p>
        <div className="pill-row">
          <span className="pill">Mon-Sat</span>
          <span className="pill">9am - 6pm</span>
          <span className="pill">Sliding scale</span>
        </div>
      </div>
    </section>

    <section id="support-form" className="panel">
      <h2>Support / Volunteer Form</h2>
      <p>One form for patient support, volunteers, and partners.</p>

      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <label>Request Type</label>
          <div className="chips">
            {[
              "Patient Support",
              "Volunteer Registration",
              "Contact / Partner",
            ].map((type) => (
              <label key={type} className="chip">
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={formData.type === type}
                  onChange={handleChange}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label>Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="field">
            <label>Phone</label>
            <input name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label>Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option value="">Select location</option>
              <option>Bengaluru</option>
              <option>Hyderabad</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Chennai</option>
              <option>Pune</option>
              <option>Kolkata</option>
              <option>Ahmedabad</option>
              <option>Other</option>
            </select>
          </div>
          <div className="field">
            <label>Urgency</label>
            <select name="urgency" value={formData.urgency} onChange={handleChange}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label>How can we help?</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label>Availability</label>
            <select name="availability" value={formData.availability} onChange={handleChange}>
              <option value="">Select availability</option>
              <option>Weekdays (Morning)</option>
              <option>Weekdays (Afternoon)</option>
              <option>Weekdays (Evening)</option>
              <option>Weekends</option>
              <option>Flexible</option>
            </select>
          </div>
          <div className="field">
            <label>Preferred Language</label>
            <select name="language" value={formData.language} onChange={handleChange}>
              <option value="">Select language</option>
              <option>English</option>
              <option>Hindi</option>
              <option>Kannada</option>
              <option>Tamil</option>
              <option>Telugu</option>
              <option>Marathi</option>
              <option>Bengali</option>
              <option>Urdu</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <label className="checkbox">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
          />
          I consent to be contacted by the NGO support team.
        </label>

        <button className="primary" type="submit" disabled={submitStatus === "loading"}>
          {submitStatus === "loading" ? "Submitting..." : "Submit Request"}
        </button>

        {submitMessage && (
          <p className={`status ${submitStatus}`}>{submitMessage}</p>
        )}
      </form>
    </section>

    <section className="panel auto-response">
      <h2>Auto Response</h2>
      <p>Instant confirmation and next steps for your request.</p>
      <div className="auto-card">
        {submitStatus === "success" && lastSubmission ? (
          <>
            <p>
              Thanks, {lastSubmission.name}! We received your{" "}
              {lastSubmission.type.toLowerCase()} request. A coordinator will reach
              out within 24 hours.
            </p>
            <ul>
              <li>We will verify your contact details.</li>
              <li>If urgent, please call emergency services.</li>
              <li>Check your email/SMS for updates.</li>
            </ul>
          </>
        ) : (
          <p>
            Submit the form to receive an automated confirmation and next steps.
          </p>
        )}
      </div>
    </section>

    <section className="panel summary-panel">
      <h2>AI Intake Summary</h2>
      <p>Immediate guidance based on the issue described.</p>
      <div className="summary-box">
        <p className="summary-text">{summary}</p>
        <div className="tag-row">
          {summaryTags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="summary-footer">
        <h3>How this helps</h3>
        <ul>
          <li>Instant triage overview for staff.</li>
          <li>Auto-tagging for routing and escalation.</li>
          <li>Highlights language support needs.</li>
        </ul>
      </div>
    </section>

    <section className="panel volunteers" id="volunteers">
      <div className="volunteer-header">
        <h2>Volunteer With Us</h2>
        <a className="ghost link-button" href="/team" target="_blank" rel="noreferrer">
          Meet the Team
        </a>
      </div>
      <p>Join outreach events, triage days, and logistics shifts that keep care moving.</p>
      <div className="volunteer-grid">
        <div className="impact-card">
          <h4>Community Outreach</h4>
          <p>Help with health education, language support, and wellness fairs.</p>
        </div>
        <div className="impact-card">
          <h4>Clinic Support</h4>
          <p>Assist with intake, patient navigation, and follow-ups.</p>
        </div>
        <div className="impact-card">
          <h4>Logistics Team</h4>
          <p>Coordinate supplies, mobile clinic setup, and transport.</p>
        </div>
      </div>
    </section>

    <section className="panel faq" id="faq">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-grid">
        {faqItems.map((item) => (
          <div key={item.q} className="faq-card">
            <h4>{item.q}</h4>
            <p>{item.a}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="panel">
      <h2>Operational Impact</h2>
      <p>Get visibility into demand, coverage, and volunteer capacity.</p>
      <div className="impact-grid">
        {impactCards.map((card) => (
          <div key={card.title} className="impact-card">
            <h4>{card.title}</h4>
            <p>{card.body}</p>
          </div>
        ))}
      </div>
      <div className="emergency">
        Emergency? Call 911 or your local emergency number immediately.
      </div>
    </section>

    <section className="panel locations" id="locations">
      <h2>Clinic Locations</h2>
      <p>Find the closest care point for your neighborhood.</p>
      <div className="location-grid">
        <div className="location-card">
          <h4>Bengaluru Hub</h4>
          <p>12 MG Road, Bengaluru, Karnataka</p>
          <span className="pill">Primary Care</span>
        </div>
        <div className="location-card">
          <h4>Hyderabad Mobile Unit</h4>
          <p>Rotating stops - Wed & Fri</p>
          <span className="pill">Vaccinations</span>
        </div>
        <div className="location-card">
          <h4>Mumbai Family Center</h4>
          <p>118 Linking Road, Mumbai, Maharashtra</p>
          <span className="pill">Pediatrics</span>
        </div>
      </div>
    </section>

    <section className="panel donate" id="donate">
      <h2>Support Our Work</h2>
      <p>Your donations fund mobile clinics, translators, and medicine supplies.</p>
      <button className="primary" type="button" onClick={onDonate}>Donate Now</button>
    </section>

    <section className="panel contact" id="contact-us">
      <div className="contact-header">
        <div>
          <h2>Contact Us</h2>
          <p>Reach out for partnerships, referrals, or general support questions.</p>
        </div>
        <a className="primary link-button" href="mailto:support@healthngo.org">
          Email Support
        </a>
      </div>
      <div className="contact-grid">
        <div className="contact-card">
          <h3>Office Hours</h3>
          <p>Monday - Saturday, 9:00am - 6:00pm</p>
          <p>Sunday: On-call only</p>
        </div>
        <div className="contact-card">
          <h3>Direct Lines</h3>
          <ul>
            {contactDetails.map((item) => (
              <li key={item.label}>
                <strong>{item.label}:</strong> {item.value}
              </li>
            ))}
          </ul>
        </div>
        <div className="contact-card">
          <h3>Quick Message</h3>
          <form className="contact-form">
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Email address" required />
            <textarea rows="3" placeholder="How can we help?" required />
            <button className="ghost" type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>

    <section className="panel staff" id="our-team">
      <div className="staff-header">
        <div>
          <h2>Our Doctors & Staff</h2>
          <p>Meet the people who keep community care moving every day.</p>
        </div>
        <button className="ghost" type="button" onClick={onDonate}>
          Support the Team
        </button>
      </div>
      <div className="staff-grid">
        {staffProfiles.map((member) => (
          <div key={member.name} className="staff-card">
            <div className="staff-avatar">{member.name.charAt(0)}</div>
            <div>
              <h3>{member.name}</h3>
              <p className="staff-role">{member.role}</p>
              <p className="staff-focus">{member.focus}</p>
              <p className="staff-phone">{member.phone}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="staff-footer">
        <p>
          Interested in joining? Email{" "}
          <a href="mailto:careers@healthngo.org">careers@healthngo.org</a>.
        </p>
      </div>
    </section>
  </main>
);

export default function App() {
  const [formData, setFormData] = useState(defaultForm);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [donateOpen, setDonateOpen] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(null);

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);


  const summary = useMemo(() => {
    const message = (formData.message || "").toLowerCase();
    if (!message.trim()) {
      return "Type the issue in the form to see immediate guidance here.";
    }
    const fallback =
      "If this is an emergency (severe pain, trouble breathing, uncontrolled bleeding), call 911 immediately.";

    const rules = [
      {
        keywords: ["breath", "breathing", "asthma", "chest pain"],
        advice:
          "If breathing is difficult or chest pain is severe, call 911. Sit upright, loosen tight clothing, and use a prescribed inhaler if available.",
      },
      {
        keywords: ["cough", "cold", "flu", "sore throat"],
        advice:
          "Rest, drink fluids, and monitor symptoms. Seek urgent care if breathing worsens, fever is high, or symptoms persist.",
      },
      {
        keywords: ["headache", "migraine", "dizzy", "dizziness"],
        advice:
          "Rest in a quiet area, hydrate, and avoid bright light. Seek urgent care if headache is sudden/severe or with confusion.",
      },
      {
        keywords: ["bleed", "bleeding", "cut", "wound"],
        advice:
          "Apply firm pressure with a clean cloth for 10 minutes. If bleeding won’t stop or is heavy, call 911.",
      },
      {
        keywords: ["fever", "high temperature"],
        advice:
          "Encourage fluids, rest, and monitor temperature. Seek urgent care if fever is very high, persistent, or with confusion.",
      },
      {
        keywords: ["vomit", "vomiting", "nausea", "diarrhea", "stomach"],
        advice:
          "Sip clear fluids and rest. Seek urgent care if there is severe abdominal pain, dehydration, or blood in stool/vomit.",
      },
      {
        keywords: ["burn", "scald"],
        advice:
          "Cool the burn under running water for 10-20 minutes. Do not apply ice. Cover with a clean cloth. Seek urgent care for large or blistering burns.",
      },
      {
        keywords: ["fall", "head", "injury", "fracture", "broken"],
        advice:
          "If there is severe pain, swelling, or head injury symptoms (vomiting, confusion), call 911. Keep the person still and supported.",
      },
      {
        keywords: ["pain", "hurt", "swelling"],
        advice:
          "Rest the area and apply a cold pack for 10-15 minutes. Seek urgent care if pain is severe or worsening.",
      },
    ];

    const match = rules.find((rule) =>
      rule.keywords.some((keyword) => message.includes(keyword))
    );

    return match ? match.advice : fallback;
  }, [formData]);

  const summaryTags = [
    `${formData.urgency} urgency`,
    formData.type,
    formData.location || "Location pending",
    formData.language ? `Language: ${formData.language}` : "Language flexible",
  ];

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus("loading");
    setSubmitMessage("Submitting...");
    try {
      const response = await fetch(`${apiBase}/api/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      setSubmitStatus("success");
      setSubmitMessage(`Submitted successfully. Reference ID: ${data.id}`);
      setLastSubmission({ name: formData.name || "there", type: formData.type });
      setFormData(defaultForm);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Submission failed. Please try again.");
    }
  };

  return (
    <div className="app">
      <Topbar />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              submitMessage={submitMessage}
              submitStatus={submitStatus}
              lastSubmission={lastSubmission}
              summary={summary}
              summaryTags={summaryTags}
              onDonate={() => setDonateOpen(true)}
            />
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/stories" element={<StoriesPage />} />
      </Routes>

      {donateOpen && (
        <div className="modal-backdrop" onClick={() => setDonateOpen(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3>Donate to Support Care</h3>
              <button className="ghost" onClick={() => setDonateOpen(false)}>
                Close
              </button>
            </div>
            <p>
              Demo checkout (Paytm-style). This is a mock flow for the project only.
            </p>
            <div className="donate-options">
              <button className="ghost" type="button">$25</button>
              <button className="ghost" type="button">$50</button>
              <button className="ghost" type="button">$100</button>
              <button className="primary" type="button">Custom Amount</button>
            </div>
            <div className="payment-grid">
              <div className="payment-card">
                <h4>UPI</h4>
                <input type="text" placeholder="upi_id@paytm" />
                <button className="ghost" type="button">Pay via UPI</button>
                <p className="muted">Example UPI: healthngo@paytm</p>
              </div>
              <div className="payment-card">
                <h4>Card</h4>
                <input type="text" placeholder="Card number" />
                <div className="payment-row">
                  <input type="text" placeholder="MM/YY" />
                  <input type="text" placeholder="CVV" />
                </div>
                <button className="primary" type="button">Pay with Card</button>
                <p className="muted">Demo only. No real payment processed.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div>
          <h4>Mini Healthcare Support</h4>
          <p>Community-first healthcare support for every neighborhood.</p>
        </div>
        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#volunteers">Volunteers</a>
          <a href="/stories" target="_blank" rel="noreferrer">Stories</a>
          <a href="/contact" target="_blank" rel="noreferrer">Contact</a>
          <a href="/team" target="_blank" rel="noreferrer">Our Team</a>
        </div>
        <div className="footer-links">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
