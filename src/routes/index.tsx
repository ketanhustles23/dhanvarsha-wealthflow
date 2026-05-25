import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AsaanLoan — Instant Personal Loans up to ₹2 Lakhs" },
      {
        name: "description",
        content:
          "Get an instant personal loan up to ₹2 Lakhs with AsaanLoan. 100% digital, no hidden charges, money in 24 hours.",
      },
      { property: "og:title", content: "AsaanLoan — Instant Personal Loans" },
      {
        property: "og:description",
        content: "Quick approval, secure process, instant disbursal.",
      },
    ],
  }),
  component: LandingPage,
});

/* ---------------- Apply Modal ---------------- */
function ApplyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-card w-full max-w-md rounded-2xl shadow-2xl p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition"
        >
          ✕
        </button>
        <h3 className="text-2xl font-bold text-primary">Let's Find You the Right Loan</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          Fill in a few details and we'll show you personalized offers.
        </p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you! We'll be in touch shortly.");
            onClose();
          }}
        >
          <div>
            <label className="text-sm font-medium text-foreground">Full Name</label>
            <input
              required
              type="text"
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Mobile Number</label>
            <input
              required
              type="tel"
              pattern="[0-9]{10}"
              maxLength={10}
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="10-digit mobile"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Loan Amount Required</label>
            <select
              required
              defaultValue=""
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="" disabled>Select amount</option>
              <option>₹25,000</option>
              <option>₹50,000</option>
              <option>₹1,00,000</option>
              <option>₹1,50,000</option>
              <option>₹2,00,000</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Employment Type</label>
            <select
              required
              defaultValue=""
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="" disabled>Select type</option>
              <option>Salaried</option>
              <option>Self-Employed</option>
              <option>Business Owner</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-light text-primary-foreground font-bold py-3.5 rounded-xl transition shadow-md hover:shadow-lg"
          >
            Get My Loan Offer
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------------- Navbar ---------------- */
function Navbar({ onApply }: { onApply: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "How It Works", href: "#how" },
    { label: "Features", href: "#features" },
    { label: "FAQs", href: "#faqs" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-card transition-all ${
        scrolled ? "border-b border-border shadow-sm" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-1.5 font-extrabold text-xl text-primary">
          <span className="text-gold text-2xl leading-none">₹</span>
          <span>AsaanLoan</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground hover:text-primary transition"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onApply}
            className="bg-primary hover:bg-primary-light text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-xl transition shadow-sm hover:shadow-md"
          >
            Apply Now
          </button>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        >
          <span className={`block w-6 h-0.5 bg-foreground transition ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-5 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-foreground font-medium"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              onApply();
            }}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl"
          >
            Apply Now
          </button>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ onApply }: { onApply: () => void }) {
  return (
    <section
      id="top"
      className="pt-24 pb-16 md:pt-32 md:pb-24 px-5 sm:px-8"
      style={{
        background:
          "linear-gradient(135deg, #0A6E4F 0%, #0D8F66 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-3 text-white">
          <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
            <span className="text-gold">★</span> Trusted by 10,000+ borrowers
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
            Get an Instant Personal Loan — Up to ₹2 Lakhs
          </h1>
          <p className="mt-5 text-lg text-white/85 max-w-xl leading-relaxed">
            Quick approval, secure process, instant disbursal and expert support.
            From last-minute travel to unexpected emergencies — we've got you covered.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={onApply}
              className="bg-white hover:bg-white/95 text-primary font-bold px-7 py-3.5 rounded-xl shadow-lg transition hover:-translate-y-0.5"
            >
              Apply Now
            </button>
            <a
              href="#eligibility"
              className="border border-white/70 hover:bg-white/10 text-white font-semibold px-7 py-3.5 rounded-xl transition"
            >
              Check Eligibility
            </a>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
            <span className="flex items-center gap-2"><span className="text-gold">✓</span> 100% Digital Process</span>
            <span className="flex items-center gap-2"><span className="text-gold">✓</span> No Hidden Charges</span>
            <span className="flex items-center gap-2"><span className="text-gold">✓</span> Money in 24 Hours</span>
          </div>
        </div>

        {/* Loan Card Mock */}
        <div className="md:col-span-2">
          <div className="bg-card rounded-2xl shadow-2xl p-7 max-w-sm mx-auto md:ml-auto relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Loan Summary</p>
                <p className="text-sm text-foreground font-medium mt-0.5">Personal Loan</p>
              </div>
              <span className="bg-primary-soft text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                Approved ✓
              </span>
            </div>

            <div className="mt-6">
              <p className="text-xs text-muted-foreground">Loan Amount</p>
              <p className="text-3xl font-extrabold text-foreground mt-0.5">₹1,50,000</p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="bg-muted/60 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">Monthly EMI</p>
                <p className="text-lg font-bold text-primary">₹4,823</p>
              </div>
              <div className="bg-muted/60 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">Tenure</p>
                <p className="text-lg font-bold text-foreground">36 months</p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
              <span>Interest: 18% p.a.</span>
              <span className="text-gold font-bold">★ 4.8/5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */
function StatsBar() {
  const items = [
    "₹50 Cr+ Disbursed",
    "10,000+ Happy Borrowers",
    "24 Hr Disbursal",
    "4.8★ App Rating",
  ];
  return (
    <section className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-7 grid grid-cols-2 md:grid-cols-4 gap-y-4 divide-y md:divide-y-0 md:divide-x divide-border">
        {items.map((s) => (
          <div key={s} className="text-center px-3">
            <p className="font-bold text-foreground text-base md:text-lg">{s}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- How It Works ---------------- */
function HowItWorks() {
  const steps = [
    { t: "Choose Your Amount", d: "Select the loan amount and repayment tenure that fits your budget." },
    { t: "Submit Basic Documents", d: "PAN, Aadhaar, and income proof — that's all we need." },
    { t: "Quick Verification", d: "Our loan specialists verify your details instantly and digitally." },
    { t: "Money in Your Account", d: "Once approved, the loan amount is disbursed directly to your bank account." },
  ];
  return (
    <section id="how" className="py-20 md:py-28 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Get Your Loan in 4 Simple Steps</h2>
          <p className="mt-3 text-muted-foreground text-lg">
            No branch visits. No long waits. Just a simple digital process.
          </p>
        </div>
        <div className="mt-14 grid md:grid-cols-4 gap-6 relative">
          {steps.map((s, i) => (
            <div key={s.t} className="relative">
              <div className="bg-card rounded-2xl shadow-md p-6 h-full hover:shadow-lg transition hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-lg">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-bold text-foreground text-lg">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-primary text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Features ---------------- */
function Features() {
  const items = [
    { i: "⚡", t: "Instant Approval", d: "Apply online and get a decision within minutes — no branch visits needed." },
    { i: "🔒", t: "100% Secure", d: "Your data is protected with bank-grade encryption at every step." },
    { i: "📋", t: "Zero Hidden Charges", d: "Complete transparency. The rate you see is the rate you pay." },
    { i: "🎯", t: "Up to ₹2 Lakhs", d: "Get the funds you need — from ₹10,000 to ₹2,00,000 — on your terms." },
    { i: "📱", t: "Fully Digital", d: "Apply from your phone in under 10 minutes, anytime, anywhere." },
    { i: "🤝", t: "Expert Support", d: "Real people available to guide you through every step of your journey." },
  ];
  return (
    <section id="features" className="py-20 md:py-28 px-5 sm:px-8 bg-primary-soft">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Why AsaanLoan?</h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Built for speed, transparency, and your convenience.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.t} className="bg-card rounded-2xl shadow-md p-7 hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-primary-soft flex items-center justify-center text-2xl">
                {it.i}
              </div>
              <h3 className="mt-4 font-bold text-foreground text-lg">{it.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Eligibility + EMI Calc ---------------- */
function Eligibility() {
  const [amount, setAmount] = useState(100000);
  const [tenure, setTenure] = useState(24);
  const rate = 18;

  const emi = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure;
    const p = amount;
    const e = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(e);
  }, [amount, tenure]);

  const totalPay = emi * tenure;
  const interest = totalPay - amount;

  const checks = [
    "Indian citizen aged 21 to 55 years",
    "Salaried or self-employed individual",
    "Monthly income of ₹15,000 or above",
    "Valid PAN card and Aadhaar card",
    "Active bank account",
  ];

  return (
    <section id="eligibility" className="py-20 md:py-28 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Are You Eligible?</h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Quick eligibility — most applicants qualify in minutes.
          </p>
          <ul className="mt-8 space-y-4">
            {checks.map((c) => (
              <li key={c} className="flex items-start gap-3 bg-card rounded-2xl p-4 shadow-sm">
                <span className="w-7 h-7 rounded-full bg-gold/15 text-gold font-bold flex items-center justify-center flex-shrink-0">
                  ✓
                </span>
                <span className="text-foreground font-medium">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-2xl shadow-md p-7 md:p-9">
          <h3 className="text-xl font-bold text-foreground">EMI Calculator</h3>
          <p className="text-sm text-muted-foreground">Estimate your monthly payment instantly.</p>

          <div className="mt-7">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Loan Amount</label>
              <span className="font-bold text-primary">₹{amount.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={200000}
              step={5000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-[#0A6E4F]"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>₹10,000</span>
              <span>₹2,00,000</span>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-foreground">Tenure</label>
            <select
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {[6, 12, 18, 24, 36].map((m) => (
                <option key={m} value={m}>{m} months</option>
              ))}
            </select>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Interest Rate: <span className="font-semibold text-foreground">18% p.a.</span> (fixed)
          </div>

          <div
            className="mt-6 rounded-2xl p-6 text-white"
            style={{ background: "linear-gradient(135deg, #0A6E4F 0%, #0D8F66 100%)" }}
          >
            <p className="text-sm text-white/85">Your Monthly EMI</p>
            <p className="text-4xl font-extrabold mt-1">₹{emi.toLocaleString("en-IN")}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-white/90">
              <div>
                <p className="text-white/70">Total Interest</p>
                <p className="font-bold text-base text-white">₹{interest.toLocaleString("en-IN")}</p>
              </div>
              <div>
                <p className="text-white/70">Total Payable</p>
                <p className="font-bold text-base text-white">₹{totalPay.toLocaleString("en-IN")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  const items = [
    {
      q: "Getting a loan used to feel so complicated. AsaanLoan made it incredibly simple — I had the money in my account within a day. Highly recommended.",
      n: "Priya Sharma",
      r: "Salaried Professional, Delhi",
    },
    {
      q: "I needed funds urgently for a medical emergency. AsaanLoan came through faster than I expected. The process was fully digital and completely transparent.",
      n: "Rohit Verma",
      r: "Business Owner, Mumbai",
    },
    {
      q: "No hidden charges, no confusing terms. Just a clean, fast loan process. I've already referred three of my friends to AsaanLoan.",
      n: "Anita Desai",
      r: "Freelancer, Bengaluru",
    },
  ];
  return (
    <section className="py-20 md:py-28 px-5 sm:px-8 bg-primary-soft">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">What Our Borrowers Say</h2>
          <p className="mt-3 text-muted-foreground text-lg">Real stories from real customers.</p>
        </div>
        <div className="mt-12 flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 -mx-5 md:mx-0 px-5 md:px-0">
          {items.map((t) => (
            <div
              key={t.n}
              className="min-w-[85%] md:min-w-0 snap-center bg-card rounded-2xl shadow-md p-7 hover:shadow-lg transition"
            >
              <div className="text-gold text-lg tracking-wide">★★★★★</div>
              <p className="mt-4 text-foreground leading-relaxed">"{t.q}"</p>
              <div className="mt-6 pt-5 border-t border-border">
                <p className="font-bold text-foreground">{t.n}</p>
                <p className="text-sm text-muted-foreground">{t.r}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: "What is the maximum loan amount I can get?", a: "You can borrow from ₹10,000 up to ₹2,00,000 depending on your eligibility, income, and credit profile." },
    { q: "How long does it take to get the money?", a: "Once your documents are verified and loan is approved, funds are disbursed within 24 hours directly to your bank account." },
    { q: "What documents do I need to apply?", a: "You need your PAN card, Aadhaar card, last 3 months bank statement, and latest salary slips or income proof." },
    { q: "Is there any processing fee?", a: "A minimal processing fee is applicable and will be clearly communicated upfront. There are absolutely no hidden charges." },
    { q: "Can I repay my loan early?", a: "Yes, AsaanLoan allows foreclosure after a minimum lock-in period. Applicable charges will be disclosed before you apply." },
  ];
  return (
    <section id="faqs" className="py-20 md:py-28 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Frequently Asked Questions</h2>
          <p className="mt-3 text-muted-foreground text-lg">Everything you need to know.</p>
        </div>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="bg-card rounded-2xl shadow-sm overflow-hidden border border-border">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-muted/40 transition"
                >
                  <span className="font-semibold text-foreground">{f.q}</span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-primary-soft text-primary flex items-center justify-center font-bold transition ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA Banner ---------------- */
function CTABanner({ onApply }: { onApply: () => void }) {
  return (
    <section
      className="px-5 sm:px-8 py-20 md:py-24"
      style={{ background: "linear-gradient(135deg, #0A6E4F 0%, #0D8F66 100%)" }}
    >
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Ready to Get Started?</h2>
        <p className="mt-4 text-lg text-white/85">
          Apply in under 10 minutes. No branch visits. No paperwork stress.
        </p>
        <button
          onClick={onApply}
          className="mt-8 bg-white hover:bg-white/95 text-primary font-bold text-lg px-10 py-4 rounded-2xl shadow-xl transition hover:-translate-y-0.5"
        >
          Apply for a Loan Now
        </button>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer({ onApply }: { onApply: () => void }) {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-white/10">
          <a href="#top" className="flex items-center gap-1.5 font-extrabold text-2xl">
            <span className="text-gold text-2xl">₹</span>
            <span>AsaanLoan</span>
          </a>
          <div className="flex flex-wrap gap-6 text-sm text-white/80">
            <a href="#how" className="hover:text-white transition">How It Works</a>
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#eligibility" className="hover:text-white transition">Eligibility</a>
            <a href="#faqs" className="hover:text-white transition">FAQs</a>
          </div>
          <button
            onClick={onApply}
            className="bg-primary hover:bg-primary-light text-primary-foreground font-semibold px-6 py-3 rounded-xl transition"
          >
            Apply Now
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 py-10">
          <div>
            <h4 className="font-bold mb-3">About AsaanLoan</h4>
            <p className="text-sm text-white/70 leading-relaxed">
              AsaanLoan is a digital personal loan platform offering quick, transparent, and accessible loans to individuals across India.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#top" className="hover:text-white">Home</a></li>
              <li><a href="#how" className="hover:text-white">How It Works</a></li>
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#eligibility" className="hover:text-white">Eligibility</a></li>
              <li><a href="#faqs" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>support@asaanloan.com</li>
              <li>+91 98765 43210</li>
              <li>Mon–Sat, 9 AM to 6 PM</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 text-xs text-white/60 text-center">
          © 2026 AsaanLoan. All rights reserved. | Powered by WeCredit — wecredit.co.in
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */
function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  return (
    <div className="bg-background text-foreground">
      <Navbar onApply={open} />
      <main>
        <Hero onApply={open} />
        <StatsBar />
        <HowItWorks />
        <Features />
        <Eligibility />
        <Testimonials />
        <FAQ />
        <CTABanner onApply={open} />
      </main>
      <Footer onApply={open} />
      <ApplyModal open={modalOpen} onClose={close} />
    </div>
  );
}
