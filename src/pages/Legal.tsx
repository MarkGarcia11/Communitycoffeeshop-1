import React from "react";
import { HelpCircle, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";

export const Legal: React.FC = () => {
  return (
    <div className="pt-28 min-h-screen bg-white text-brand">
      {/* Header section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <span className="eyebrow text-brand">
          FAQs & accessibility
        </span>
        <h1 className="text-fluid-section font-serif font-medium tracking-tight leading-tight max-w-4xl mx-auto text-brand">
          Frequently Asked Questions & Site Policies
        </h1>
        <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
          We want everyone to feel confident, comfortable, and respected when reading about Shoresh or entering our doors. Read our values, compliance details, and guidelines.
        </p>
      </section>

      {/* Main Workspace */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-24 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Jump menus */}
        <div className="md:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2 sticky top-28 no-print shadow-xs">
            <h4 className="font-serif font-medium text-xl text-brand border-b border-stone-100 pb-2">Jump to Policy</h4>
            <a href="#faq" className="block py-3 text-base font-medium hover:underline text-brand">Frequently Asked Questions</a>
            <a href="#accessibility" className="block py-3 text-base font-medium hover:underline text-brand">Accessibility Statement</a>
            <a href="#privacy" className="block py-3 text-base font-medium hover:underline text-brand">Privacy Policy</a>
            <a href="#terms" className="block py-3 text-base font-medium hover:underline text-brand">Terms of Use</a>
          </div>
        </div>

        {/* Right Column: Content blocks */}
        <div className="md:col-span-8 space-y-12">
          
          {/* FAQ BLOCK */}
          <div id="faq" className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="font-serif text-2xl font-medium text-brand border-b border-stone-100 pb-2 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-brand shrink-0" />
              <span>Frequently Asked Questions</span>
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-stone-650">
              <div className="space-y-1.5">
                <p className="font-semibold text-brand">What does the name "Shoresh" mean?</p>
                <p>Shoresh (שֹׁרֶשׁ) is the Hebrew word for "root". We chose this name to represent our grounding in deep Jewish ancestral texts and traditions, while creating a warm, organic, and rooted presence in the Greenfield, Pittsburgh neighborhood.</p>
              </div>

              <div className="space-y-1.5 border-t border-stone-100 pt-4">
                <p className="font-semibold text-brand">What is a "Shtibl"?</p>
                <p>A "Shtibl" (שטיבל) is Yiddish for "small room" or "informal house of prayer and study." Unlike large, formal institutional synagogues, historical shtibls were embedded in neighborhood shops, homes, or general stores—making them cozy, warm, and highly accessible. Shoresh is Greenfield's modern, well-caffeinated shtibl!</p>
              </div>

              <div className="space-y-1.5 border-t border-stone-100 pt-4">
                <p className="font-semibold text-brand">What is your Kosher certification status?</p>
                <p>We are currently working closely with Rabbi Yitzi Genack of the Vaad Harabonim of Pittsburgh to outline certification protocols. Our baked pastries and bagels will be kosher-certified, and we will update our community once certification is fully finalized before grand opening!</p>
              </div>

              <div className="space-y-1.5 border-t border-stone-100 pt-4">
                <p className="font-semibold text-brand">Do I need prior Hebrew or text-study background?</p>
                <p>Absolutely not! Every class is printed with parallel English translation, full transliteration, and guided glossary lists. We welcome total beginners, seekers, and advanced learners alike. Bring a partner, friend, or spouse and pull up a chair.</p>
              </div>
            </div>
          </div>

          {/* ACCESSIBILITY STATEMENT */}
          <div id="accessibility" className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="font-serif text-2xl font-medium text-brand border-b border-stone-100 pb-2 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-brand shrink-0" />
              <span>Accessibility Commitment</span>
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-stone-650">
              <p>We are committed to making our digital experience and our physical space completely welcoming and accessible to everyone, including older adults, couples studying together, and visitors with disabilities.</p>
              <div className="space-y-2 border-l-2 border-brand pl-4">
                <p className="font-semibold text-brand">Designed for clarity:</p>
                <ul className="list-disc pl-4 space-y-1 text-xs text-stone-500">
                  <li><span className="font-bold">Typography sizes:</span> Standard body text is maintained at a minimum of 18px size on both mobile and desktop views to support comfortable reading.</li>
                  <li><span className="font-bold">Color Contrast:</span> All texts adhere to WCAG AA color contrast guidelines (4.5:1 ratio or higher) against page backgrounds.</li>
                  <li><span className="font-bold">Partner Deciding:</span> Multi-user RSVP forms, web sharing, and print styles let you review and print lists to decide comfortably side-by-side.</li>
                  <li><span className="font-bold">Keyboard Navigation:</span> Focus outlines are fully visible and logical tab navigation is maintained sitewide.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* PRIVACY POLICY */}
          <div id="privacy" className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="font-serif text-2xl font-medium text-brand border-b border-stone-100 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-brand shrink-0" />
              <span>Privacy Policy</span>
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-stone-650">
              <p>At Shoresh, your privacy is deeply respected. We only collect details (like email addresses, subscriber interests, and names) when you explicitly fill out a newsletter signup, register for a class, or submit a donation message.</p>
              <p>This preview stores form entries and cart contents locally in your browser. It does not send email or process payments. When live checkout is enabled, payment details will be handled on Stripe's hosted checkout rather than this site.</p>
            </div>
          </div>

          {/* TERMS OF USE */}
          <div id="terms" className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="font-serif text-2xl font-medium text-brand border-b border-stone-100 pb-2 flex items-center gap-2">
              <FileText className="w-6 h-6 text-brand shrink-0" />
              <span>Terms & nonprofit disclosures</span>
            </h2>

            <div className="space-y-4 text-base leading-relaxed text-brand-muted">
              <p>Shoresh PGH is a nonprofit organization. Its verified EIN, tax-deductibility details, and final legal policies must be confirmed before launch.</p>
              <p>Class dates and registration details in this build are demonstration data. Please contact the team at <span className="font-semibold text-brand">rabbimark@shoreshpgh.org</span> for the current schedule.</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
