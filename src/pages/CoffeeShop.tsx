import React, { useState } from "react";
import { Coffee, ShieldCheck, Truck, CheckCircle2 } from "lucide-react";
import { useApp } from "../utils/store";

export const CoffeeShop: React.FC = () => {
  const { subscribeNewsletter } = useApp();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const res = subscribeNewsletter(email, "coffee");
    setStatus(res.msg);
    if (res.success) setEmail("");
  };

  const espressoMenu = [
    { name: "Espresso", price: "$3.50", desc: "A double-shot of our custom Greenfield medium-dark roast, pulled with rich honey-crust crema." },
    { name: "Macchiato", price: "$4.00", desc: "Classic double espresso marked with a single dollop of sweet velvety milk foam." },
    { name: "Cortado", price: "$4.25", desc: "Equal parts espresso and steamed micro-foam. Perfect balance of rich bean and silky milk." },
    { name: "Shtibl Latte", price: "$5.25", desc: "Espresso with steamed milk, lightly sweetened with a hint of local raw honey and cinnamon." },
    { name: "Single-Origin Pour Over", price: "$4.75", desc: "Slow, hand-brewed cup of our rotating light-roast beans, highlighting delicate fruity notes." }
  ];

  const pastryMenu = [
    { name: "Traditional Babka Slice", price: "$4.50", desc: "Swirled chocolate-fudge brioche, baked fresh and served warm." },
    { name: "Cinnamon Rugelach Trio", price: "$4.00", desc: "Flaky, cream-cheese pastry rolled with toasted pecans, brown sugar, and rich cinnamon." },
    { name: "Homemade Challah Bun", price: "$3.50", desc: "Soft, golden, egg-washed sweet rolls. Perfect for simple afternoon dipping." },
    { name: "Sesame Halva Cookie", price: "$3.75", desc: "A gluten-free almond-flour shortbread studded with crushed sweet sesame halva." }
  ];

  return (
    <div className="pt-28 min-h-screen bg-white text-brand">
      {/* Header section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <span className="eyebrow text-brand">
          Coming soon to Greenfield
        </span>
        <h1 className="text-fluid-section font-serif font-medium tracking-tight leading-tight max-w-4xl mx-auto text-brand">
          A Coffee House Built on Community & Conversation
        </h1>
        <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
          While we hammer away at building the physical coffee bar, preview what we're brewing and sourcing for our early morning neighborhood crowd.
        </p>
      </section>

      {/* Sourcing & Quality story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-[24px] overflow-hidden border border-brand/15 aspect-[4/3] bg-white">
          <img
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
            alt="Barista pouring a heart into a steaming cappuccino cup"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <span className="eyebrow text-brand">Our Coffee philosophy</span>
          <h2 className="text-3xl font-serif font-medium text-brand">Direct Sourcing, Small Batches</h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            We partner with ethical, direct-trade farmers in Huehuetenango, Guatemala, to roast organic, high-altitude beans that deliver consistent honey, roasted almond, and sweet cocoa undertones. Our coffee is locally roasted in Pittsburgh and delivered to our shop weekly so your cup is always at peak freshness.
          </p>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Every barista at Shoresh is trained in the classic Italian tradition. No cold, corporate touch. We weigh every shot and calibrate our grinders daily to ensure your espresso is sweet, heavy, and perfectly balanced.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand" />
              <span>Direct Sourced</span>
            </div>
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-brand" />
              <span>Pittsburgh Roasted</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand" />
              <span>Vaad Kosher Pending</span>
            </div>
          </div>
        </div>
      </section>

      {/* MENU PREVIEW BOX */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-100">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-3xl font-serif font-bold">The Shtibl Menu Preview</h3>
            <p className="text-stone-500 text-sm">
              An unpretentious selection of specialty coffee and classic kosher pastries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Coffee column */}
            <div className="space-y-6">
              <h4 className="font-serif text-xl font-medium text-brand border-b border-brand/20 pb-2">
                Specialty Espresso & Pour
              </h4>
              <div className="space-y-6">
                {espressoMenu.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4">
                    <div className="space-y-1 flex-1">
                      <p className="font-semibold text-sm text-brand">{item.name}</p>
                      <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                    <span className="font-serif font-semibold text-lg text-brand">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pastry column */}
            <div className="space-y-6">
              <h4 className="font-serif text-xl font-medium text-brand border-b border-brand/20 pb-2">
                Kosher Baked Pastries
              </h4>
              <div className="space-y-6">
                {pastryMenu.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4">
                    <div className="space-y-1 flex-1">
                      <p className="font-semibold text-sm text-brand">{item.name}</p>
                      <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                    <span className="font-serif font-semibold text-lg text-brand">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kosher Certification Note */}
          <div className="p-4 bg-white rounded-2xl border border-stone-200 text-center max-w-2xl mx-auto text-xs text-stone-500">
            <span className="font-semibold text-brand">Vaad Certification Update:</span> We have spoken with Rabbi Yitzi Genack of the Vaad Harabonim of Pittsburgh regarding our kosher certification ahead of the opening. We are planning to serve certified kosher baked items!
          </div>
        </div>
      </section>

      {/* RETAIL SIGNUP & ANNOUNCEMENTS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
        <h3 className="text-2xl font-serif font-medium text-brand">Be here for the first cup.</h3>
        <p className="text-stone-600 text-sm max-w-2xl mx-auto leading-relaxed">
          Join our newsletter for renovation progress, opening news, and a warm welcome from your neighbors.
        </p>
        <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="neighbor@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-0 bg-white border border-brand/20 rounded-xl px-4 py-2.5 text-base focus:border-brand"
          />
          <button
            type="submit"
            className="brand-button"
          >
            Keep me posted
          </button>
        </form>
        {status && (
          <p className="text-base text-brand font-medium flex items-center justify-center gap-2" role="status">
            <CheckCircle2 className="w-4 h-4" />
            <span>{status}</span>
          </p>
        )}
      </section>
    </div>
  );
};
