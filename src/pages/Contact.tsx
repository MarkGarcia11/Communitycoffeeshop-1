import React, { useState } from "react";
import { useApp } from "../utils/store";
import { MapPin, Mail, Clock, HelpCircle, CheckCircle2, ShieldAlert } from "lucide-react";

export const Contact: React.FC = () => {
  const { submitContact } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [spamCheck, setSpamCheck] = useState(""); // Simple protection question
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    // Anti-spam check: "What is 4 + 3?" => "7"
    if (spamCheck.trim() !== "7") {
      setErrorMsg("Anti-spam security challenge answer is incorrect. Please try again! (Hint: 4 + 3 = 7)");
      return;
    }

    setErrorMsg("");
    const done = submitContact(name, email, message);
    if (done) {
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      setSpamCheck("");
      setTimeout(() => setSuccess(false), 4500);
    }
  };

  return (
    <div className="pt-28 min-h-screen bg-white text-brand">
      {/* Page Header */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <span className="eyebrow text-brand">
          Visit & get in touch
        </span>
        <h1 className="text-fluid-section font-serif font-medium tracking-tight leading-tight max-w-4xl mx-auto text-brand">
          We can't wait to meet you in Greenfield.
        </h1>
        <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
          Whether you have a class question, want to host a private prayer minyan, discuss bean sourcing, or simply check on renovation progress—drop us a line or swing by!
        </p>
      </section>

      {/* Grid: Map Details Left, Contact Form Right */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact details & Map info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="font-serif text-2xl font-medium text-brand">Location & Details</h3>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-850">Shoresh Space</p>
                  <p className="text-stone-600 text-xs mt-0.5">4300 Murray Ave,</p>
                  <p className="text-stone-600 text-xs">Pittsburgh, PA 15217</p>
                  <a
                    href="https://maps.google.com/?q=4300+Murray+Ave,+Pittsburgh,+PA+15217"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center text-brand hover:underline text-base font-semibold mt-1"
                  >
                    View on Google Maps ↗
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-855">Renovation & Event Hours</p>
                  <p className="text-stone-600 text-xs mt-0.5">
                    We're currently under active renovation. Please check the location and schedule of your class under <span className="font-semibold text-brand">Classes & Events</span> before visiting.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-856">Direct Email Channels</p>
                  <p className="text-stone-600 text-xs mt-0.5">Rabbi Mark: <span className="font-semibold text-stone-800">rabbimark@shoreshpgh.org</span></p>
                  <p className="text-stone-600 text-xs">Frances: <span className="font-semibold text-stone-800">frances@shoreshpgh.org</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Transit, parking & Accessibility details */}
          <div className="bg-brand-soft border border-brand/15 rounded-3xl p-6 sm:p-8 space-y-4">
            <h4 className="font-serif text-lg font-bold text-stone-850 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-brand" />
              <span>Getting Here & Accessibility</span>
            </h4>
            
            <div className="space-y-3 text-xs leading-relaxed text-stone-700">
              <p>
                <span className="font-semibold text-brand">Street Parking:</span> Parking details will be confirmed before the coffee shop opens. Contact us if you need help planning your visit.
              </p>
              <p>
                <span className="font-semibold text-brand">Public Transit:</span> Check Pittsburgh Regional Transit's current trip planner for service to 4300 Murray Avenue.
              </p>
              <p>
                <span className="font-semibold text-brand">Physical Accessibility:</span> The building is being renovated. Please contact us for current entrance and restroom accessibility information before attending.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form right */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="font-serif text-3xl font-medium text-brand">Send us a note</h2>

          {success ? (
            <div className="text-center py-12 space-y-4 bg-brand-soft rounded-2xl border border-brand/15 p-6" role="status">
              <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-medium text-brand">Preview message saved.</h3>
              <p className="text-xs text-stone-600 leading-relaxed max-w-md mx-auto">
                This preview saves your message in this browser only. For a reply from the team, please email rabbimark@shoreshpgh.org directly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-500/10 border border-red-200 text-red-700 text-xs rounded-xl font-semibold">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="First and Last name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-base focus:border-brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-base focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help? Let us know if you'd like to collaborate, study together, ask questions about kosher status, etc."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-base focus:border-brand"
                />
              </div>

              {/* Anti-spam security question */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                <label className="block text-xs font-bold text-stone-600 flex items-center gap-1">
                  <HelpCircle className="w-4 h-4 text-brand" />
                  <span>Security challenge: What is 4 + 3? *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Type your answer (Hint: 7)"
                  value={spamCheck}
                  onChange={(e) => setSpamCheck(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-base focus:border-brand"
                />
              </div>

              <button
                type="submit"
                className="brand-button w-full"
              >
                Send note
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
