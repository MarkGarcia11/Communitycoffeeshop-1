import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Check, Mail, RotateCcw } from "lucide-react";
import { useApp } from "../utils/store";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  const { setActiveTab, subscribeNewsletter } = useApp();
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState<"coffee" | "learning" | "both">("both");
  const [status, setStatus] = useState<{ success: boolean; msg: string } | null>(null);

  const navigate = (id: string) => {
    setActiveTab(id);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const subscribe = (event: FormEvent) => {
    event.preventDefault();
    const result = subscribeNewsletter(email.trim(), interest);
    setStatus(result.success ? { success: true, msg: "You're on this preview list. Live email updates will activate when the newsletter service is connected." } : result);
    if (result.success) setEmail("");
  };

  return (
    <footer className="brand-footer on-green no-print">
      <div className="footer-grid">
        <div className="footer-brand">
          <button onClick={() => navigate("home")} aria-label="Shoresh home"><BrandLogo className="footer-logo" tone="white" decorative /></button>
          <p>A little coffee.<br />A lot of connection.</p>
          <address>4300 Murray Ave<br />Pittsburgh, PA 15217</address>
          <a href="https://maps.google.com/?q=4300+Murray+Ave,+Pittsburgh,+PA+15217" target="_blank" rel="noopener noreferrer">Find us in Greenfield <ArrowUpRight size={16} /></a>
        </div>
        <div className="footer-column">
          <h2>Explore</h2>
          {[{ id: "home", label: "Home" }, { id: "about", label: "Our story" }, { id: "coffee-shop", label: "Coffee shop" }, { id: "shop", label: "Shoresh shop" }].map((link) => <button key={link.id} onClick={() => navigate(link.id)}>{link.label}</button>)}
        </div>
        <div className="footer-column">
          <h2>Pull up a chair</h2>
          {[{ id: "classes", label: "Classes & events" }, { id: "contact", label: "Visit & contact" }, { id: "donate", label: "Support Shoresh" }, { id: "legal", label: "Your questions, answered" }].map((link) => <button key={link.id} onClick={() => navigate(link.id)}>{link.label}</button>)}
        </div>
        <div className="footer-newsletter">
          <h2>Good things, as they grow.</h2>
          <p>New classes. Opening news. A note from your neighbors. Stay in the loop.</p>
          <form onSubmit={subscribe}>
            <label className="sr-only" htmlFor="footer-email">Your email address</label>
            <div className="footer-email-field">
              <input id="footer-email" type="email" autoComplete="email" required placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} />
              <button type="submit" aria-label="Subscribe to Shoresh updates"><ArrowRight size={21} /></button>
            </div>
            <fieldset className="footer-interests">
              <legend className="sr-only">What would you like to hear about?</legend>
              {(["coffee", "learning", "both"] as const).map((value) => (
                <label key={value}><input type="radio" name="footer-interest" checked={interest === value} onChange={() => setInterest(value)} />{value[0].toUpperCase() + value.slice(1)}</label>
              ))}
            </fieldset>
          </form>
          {status && <div className="footer-signup-status" role="status">{status.success && <Check size={18} />}{status.msg}</div>}
          <div className="footer-socials">
            <a href="https://www.instagram.com/shoreshpgh" target="_blank" rel="noopener noreferrer" aria-label="Shoresh on Instagram">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="https://shoreshpgh.substack.com/" target="_blank" rel="noopener noreferrer" aria-label="Read Shoresh's newsletter"><Mail size={21} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Shoresh PGH. Rooted in community.</span>
        <div>
          <button onClick={() => navigate("legal")}>Privacy</button>
          <button onClick={() => navigate("legal")}>Accessibility</button>
          <button onClick={() => navigate("legal")}>Terms</button>
          <button className="replay-welcome" onClick={() => window.dispatchEvent(new Event("shoresh:replay-welcome"))} aria-label="Replay Shoresh's logo welcome animation"><RotateCcw size={15} />Replay welcome</button>
        </div>
      </div>
    </footer>
  );
}