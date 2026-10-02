import React, { useState } from "react";
import { useApp } from "../utils/store";
import { Heart, ShieldCheck, DollarSign, Star, CheckCircle2, Award, Clipboard } from "lucide-react";
import { ShareButton } from "../components/ShareButton";
import { PrintButton } from "../components/PrintButton";

export const Donate: React.FC = () => {
  const { goalRaised, goalTarget, submitDonation, donations } = useApp();

  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [amount, setAmount] = useState<number>(36);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [isJoint, setIsJoint] = useState(false);
  const [jointName, setJointName] = useState("");
  const [dedicationType, setDedicationType] = useState<"none" | "honor" | "memory">("none");
  const [dedicationText, setDedicationText] = useState("");
  const [coverFees, setCoverFees] = useState(true);

  // Form payment modal
  const [isPaying, setIsPaying] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Suggested Tiers
  const TIERS = [
    { value: 18, desc: "Fund a hot espresso & pastry for a neighbor in need." },
    { value: 36, desc: "Fund a double-sided Hebrew text source sheet for study night." },
    { value: 72, desc: "Help stock a new book on our shared community library bookshelf." },
    { value: 180, desc: "Sponsor a fully-heated study night session at the shteibl." },
    { value: 500, desc: "Engrave a brass nameplate onto one of our beautiful oak library study tables." },
    { value: 1800, desc: "Establish a perpetual seed grant to launch a new community pop-up minyan!" }
  ];

  const handleAmountSelect = (val: number) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount(parseFloat(e.target.value) || 0);
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !Number.isFinite(amount) || amount <= 0) return;
    setIsPaying(true);
  };

  const handleConfirmPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaySuccess(true);

      // Submit donation details to state
      submitDonation({
        amount: coverFees ? amount * 1.029 : amount,
        frequency,
        name: donorName,
        isJoint,
        jointName: isJoint ? jointName : undefined,
        dedicationType,
        dedicationText: dedicationText || undefined,
        coverFees
      });

      setTimeout(() => {
        setPaySuccess(false);
        setIsPaying(false);
        // Clear Form
        setDonorName("");
        setIsJoint(false);
        setJointName("");
        setDedicationType("none");
        setDedicationText("");
        setAmount(36);
      }, 5000);
    }, 2000);
  };

  return (
    <div className="pt-28 min-h-screen bg-white text-brand">
      {/* Hero Intro */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <span className="eyebrow text-brand">
          Build roots with us
        </span>
        <h1 className="text-fluid-section font-serif font-medium tracking-tight leading-tight max-w-4xl mx-auto text-brand">
          Your Gift Builds Greenfield's Warmest Jewish Home
        </h1>
        <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
          A welcoming coffee shop. A place to learn together. A home for neighbors. Your gift helps bring Shoresh to life at 4300 Murray Avenue.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <ShareButton
            title="Support Shoresh PGH"
            text="Let's build a community coffee shop and Jewish third space in Greenfield together!"
          />
          <PrintButton label="Print tax receipt details" />
        </div>
      </section>

      {/* Progress tracking details */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-12">
        <div className="bg-brand-soft rounded-3xl p-6 sm:p-8 border border-brand/15 text-center space-y-4">
          <p className="text-base font-medium text-brand">Sample fundraising progress</p>
          <div className="flex justify-between items-end text-sm">
            <p className="text-2xl font-serif font-medium text-brand">
              ${goalRaised.toLocaleString()} <span className="font-sans text-sm text-stone-400 font-normal">raised</span>
            </p>
            <p className="font-bold text-stone-600">Goal: ${goalTarget.toLocaleString()}</p>
          </div>

          <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
            <div
              style={{ width: `${Math.min(100, (goalRaised / goalTarget) * 100)}%` }}
              className="h-full bg-brand"
            />
          </div>

          <p className="text-xs text-stone-400 font-light italic">
            These figures are demonstration data, not verified fundraising totals. The real goal and amount raised will be confirmed before launch.
          </p>
        </div>
      </section>

      {/* Main Donation workspace */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form & Dedication */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="font-serif text-3xl font-medium text-brand">Make a Gift</h2>

          <form onSubmit={handleDonateSubmit} className="space-y-6">
            {/* Toggle Frequency */}
            <div>
              <label className="block text-xs font-bold uppercase text-stone-400 mb-2">Giving Frequency</label>
              <div className="grid grid-cols-2 gap-2 border border-stone-200 rounded-full p-1 bg-stone-50">
                <button
                  type="button"
                  onClick={() => setFrequency("one-time")}
                  className={`py-2 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
                    frequency === "one-time" ? "bg-brand text-white" : "text-brand"
                  }`}
                >
                  One-time Gift
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency("monthly")}
                  className={`py-2 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
                    frequency === "monthly" ? "bg-brand text-white" : "text-brand"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Giving amount presets */}
            <div>
              <label className="block text-xs font-bold uppercase text-stone-400 mb-2">Select Donation Amount</label>
              <div className="grid grid-cols-3 gap-2.5">
                {TIERS.slice(0, 5).map((tier) => (
                  <button
                    key={tier.value}
                    type="button"
                    onClick={() => handleAmountSelect(tier.value)}
                    className={`py-3 px-2 rounded-xl border text-sm font-bold font-serif transition-all cursor-pointer text-center ${
                      amount === tier.value && !customAmount
                        ? "bg-brand border-brand text-white"
                        : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    ${tier.value}
                  </button>
                ))}
                {/* Custom entry box */}
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    aria-label="Custom donation amount in dollars"
                    placeholder="Custom"
                    value={customAmount}
                    onChange={handleCustomChange}
                    className="w-full h-full text-center bg-white border border-stone-200 rounded-xl py-3 text-base font-medium focus:border-brand"
                  />
                  <span className="absolute left-3.5 top-3.5 text-brand font-semibold text-base">$</span>
                </div>
              </div>

              {/* Dynamic outcome label */}
              <div className="mt-3.5 p-3.5 bg-stone-50 rounded-xl border border-stone-150 text-xs text-stone-600 leading-relaxed flex items-center gap-2">
                <Star className="w-5 h-5 text-brand shrink-0" />
                <span>
                  <span className="font-bold">Your outcome:</span>{" "}
                  {TIERS.find((t) => t.value === amount)?.desc || `Fund $${amount.toLocaleString()} worth of specialized structural renovation and texts.`}
                </span>
              </div>
            </div>

            {/* Donor detail fields */}
            <div className="space-y-4 border-t border-stone-100 pt-6">
              <h3 className="font-serif text-lg font-bold text-stone-800">Donor Information</h3>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="First and Last name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                />
              </div>

              {/* Joint Study / Gift toggle */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isJoint}
                    onChange={(e) => setIsJoint(e.target.checked)}
                    className="accent-brand"
                  />
                  <span className="text-base font-medium text-brand">Make this a joint household gift ("In honor of us both")</span>
                </label>
              </div>

              {isJoint && (
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Partner's or Family Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. & Frances Lasday"
                    value={jointName}
                    onChange={(e) => setJointName(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                  />
                </div>
              )}
            </div>

            {/* Dedication options */}
            <div className="space-y-4 border-t border-stone-100 pt-6">
              <h3 className="font-serif text-lg font-bold text-stone-800">Tribute & Dedication</h3>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-400 mb-1.5">Dedicate this Gift</label>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="dedication"
                      checked={dedicationType === "none"}
                      onChange={() => setDedicationType("none")}
                      className="accent-brand"
                    />
                    <span>No Dedication</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="dedication"
                      checked={dedicationType === "honor"}
                      onChange={() => setDedicationType("honor")}
                      className="accent-brand"
                    />
                    <span>In Honor of...</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="dedication"
                      checked={dedicationType === "memory"}
                      onChange={() => setDedicationType("memory")}
                      className="accent-brand"
                    />
                    <span>In Memory of...</span>
                  </label>
                </div>
              </div>

              {dedicationType !== "none" && (
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Dedication Statement *</label>
                  <input
                    type="text"
                    required
                    placeholder="Write a sweet message or dedicated name..."
                    value={dedicationText}
                    onChange={(e) => setDedicationText(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                  />
                </div>
              )}
            </div>

            {/* Cover Fee check */}
            <div className="border-t border-stone-100 pt-6">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={coverFees}
                  onChange={(e) => setCoverFees(e.target.checked)}
                  className="accent-brand mt-0.5"
                />
                <div className="text-xs">
                  <p className="font-semibold text-stone-700">Cover processing fees (+2.9%)</p>
                  <p className="text-stone-400">
                    Add ${(amount * 0.029).toFixed(2)} so that 100% of your primary donation amount goes to our physical building works.
                  </p>
                </div>
              </label>
            </div>

            {/* Total display CTA */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-150 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-stone-600">Subtotal Donation:</span>
                <span className="font-bold font-serif">${amount.toFixed(2)}</span>
              </div>
              {coverFees && (
                <div className="flex justify-between items-center text-xs text-stone-400">
                  <span>Processing Fees Covered:</span>
                  <span>+ ${(amount * 0.029).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center font-bold text-stone-800 text-base border-t border-stone-100 pt-3">
                <span>Total Contribution:</span>
                <span className="text-brand font-serif text-xl">
                  ${(coverFees ? amount * 1.029 : amount).toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                className="brand-button w-full"
              >
                Preview checkout
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Check instructions, EIN details, and Donor Wall */}
        <div className="lg:col-span-5 space-y-8">
          {/* Trust Non-Profit Block */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-sm text-sm">
            <h3 className="font-serif text-lg font-bold text-stone-800 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand" />
              <span>Tax-Exempt Status</span>
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Shoresh is a nonprofit organization. Confirm tax-deductibility and receipt details with the team before making a gift.
            </p>
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1 text-xs text-stone-500">
              <p>Verified EIN: <span className="font-medium text-brand">[CONFIRM]</span></p>
              <p>Live tax receipts will be enabled with the payment service. This preview does not send receipts.</p>
            </div>
          </div>

          {/* Give by Check info */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-sm text-sm">
            <h3 className="font-serif text-lg font-bold text-stone-800 flex items-center gap-2">
              <Clipboard className="w-5 h-5 text-brand" />
              <span>Give By Check</span>
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              If you prefer to avoid digital processing fees, checks can be made payable directly to <span className="font-bold">Shoresh PGH</span> and mailed to our physical location:
            </p>
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 font-semibold space-y-1">
              <p>Shoresh PGH</p>
              <p>4300 Murray Ave,</p>
              <p>Pittsburgh, PA 15217</p>
            </div>
          </div>

          {/* Live Donor Wall */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-sm text-sm max-h-[400px] overflow-y-auto">
            <h3 className="font-serif text-lg font-bold text-stone-800 flex items-center gap-2 border-b border-stone-150 pb-2">
              <Award className="w-5 h-5 text-brand" />
              <span>Preview Donors Wall</span>
            </h3>
            <div className="space-y-3.5">
              {donations.length === 0 ? (
                <div className="text-center py-6 text-stone-400 text-xs font-light">
                  Wall is quiet. Make a gift on the left to be our first showcased founding donor!
                </div>
              ) : (
                donations.map((d, idx) => (
                  <div key={d.id || idx} className="space-y-1 text-xs border-b border-stone-50 pb-3">
                    <p className="font-semibold text-brand">
                      {d.name} {d.isJoint && d.jointName ? `& ${d.jointName}` : ""}
                    </p>
                    <div className="flex gap-2 items-center text-stone-400 text-[10px]">
                      <span className="text-brand font-semibold">${d.amount.toFixed(0)}</span>
                      <span>•</span>
                      <span className="capitalize">{d.frequency} Donor</span>
                      {d.dedicationType && d.dedicationType !== "none" && (
                        <>
                          <span>•</span>
                          <span className="italic text-brand">"{d.dedicationText}"</span>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STRIPE PAYMENT MODAL */}
      {isPaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => !processing && setIsPaying(false)} className="absolute inset-0 bg-black/50 backdrop-blur-xs" />
          
          <div className="bg-white rounded-3xl border border-brand/15 shadow-2xl p-6 sm:p-8 max-w-md w-full relative z-10 text-center space-y-6" role="dialog" aria-modal="true" aria-label="Preview donation checkout">
            {!processing && !paySuccess && (
              <button
                onClick={() => setIsPaying(false)}
                className="absolute top-6 right-6 p-1 rounded-full text-stone-400 hover:text-stone-600 border border-stone-200"
              >
                ✕
              </button>
            )}

            {paySuccess ? (
              <div className="space-y-4 py-6">
                <div className="w-16 h-16 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-brand">Preview gift saved.</h3>
                <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto">
                  Your sample gift under <span className="font-semibold">{donorName}</span> is saved in this browser only. No card was charged, no subscription was started, and no receipt was sent.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-brand">A little generosity goes a long way.</h3>
                  <p className="text-base text-brand-muted mt-3">Preview only. No money will be taken.</p>
                </div>

                <div className="bg-stone-50 p-4 rounded-2xl text-left text-xs text-stone-500 space-y-1.5 border border-stone-200">
                  <p><span className="font-bold text-stone-700">Donor Account:</span> {donorName}</p>
                  <p><span className="font-bold text-stone-700">Contribution Frequency:</span> {frequency === "one-time" ? "One-Time Gift" : "Monthly Sustaining"}</p>
                  <p className="text-base font-semibold text-brand pt-1.5 border-t border-stone-100 flex justify-between">
                    <span>Total Authorized:</span>
                    <span>${(coverFees ? amount * 1.029 : amount).toFixed(2)}</span>
                  </p>
                </div>

                {/* Dummy Card Input */}
                <div className="space-y-3 text-left">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-stone-400">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        disabled
                        value="4242 •••• •••• 4242"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-base pl-10"
                      />
                      <DollarSign className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConfirmPayment}
                  disabled={processing}
                  className="brand-button w-full"
                >
                  {processing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving preview...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-4.5 h-4.5 text-white" />
                      <span>Save sample gift</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
