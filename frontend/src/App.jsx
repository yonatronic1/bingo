import { useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

const emptyForm = {
  fullName: "",
  email: "",
  company: "",
  monthlyBudget: 2000,
  challenge: ""
};

export default function App() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const roiPreview = useMemo(() => {
    const multiplier = form.monthlyBudget >= 5000 ? 3.2 : form.monthlyBudget >= 2500 ? 2.4 : 1.8;
    return Math.round(form.monthlyBudget * multiplier);
  }, [form.monthlyBudget]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const payload = {
        ...form,
        monthlyBudget: Number(form.monthlyBudget)
      };

      const response = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setStatus("success");
      setMessage("Your growth strategy request has been submitted. We'll contact you soon.");
      setForm(emptyForm);
    } catch (_error) {
      setStatus("error");
      setMessage("Could not submit right now. Please retry in a moment.");
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <p className="badge">High-converting growth funnel starter</p>
        <h1>Legendary Growth Studio</h1>
        <p>
          A polished landing page + lead capture flow to help you attract attention ethically,
          validate demand quickly, and convert interest into qualified calls.
        </p>
      </header>

      <main className="layout">
        <section className="card metrics">
          <h2>Offer Snapshot</h2>
          <ul>
            <li><strong>7 days:</strong> Launch ad-ready funnel</li>
            <li><strong>1 dashboard:</strong> Track your incoming leads</li>
            <li><strong>ROI simulator:</strong> Estimated pipeline ${roiPreview.toLocaleString()}</li>
          </ul>
          <p className="note">Preview only — real outcomes depend on execution, market, and offer quality.</p>
        </section>

        <section className="card form-card">
          <h2>Book Your Growth Plan</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Full Name
              <input
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
            </label>

            <label>
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>

            <label>
              Company
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </label>

            <label>
              Monthly Budget (USD)
              <input
                required
                type="number"
                min="0"
                value={form.monthlyBudget}
                onChange={(e) => setForm({ ...form, monthlyBudget: e.target.value })}
              />
            </label>

            <label>
              Biggest Growth Challenge
              <textarea
                rows="4"
                value={form.challenge}
                onChange={(e) => setForm({ ...form, challenge: e.target.value })}
              />
            </label>

            <button disabled={status === "loading"} type="submit">
              {status === "loading" ? "Submitting..." : "Get My Strategy"}
            </button>
          </form>
          {message && <p className={`flash ${status}`}>{message}</p>}
        </section>
      </main>
    </div>
  );
}
