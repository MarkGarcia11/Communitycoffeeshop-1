import React from "react";
import { Home } from "lucide-react";
import { useApp } from "../utils/store";
import { BrandLogo } from "../components/BrandLogo";

export const NotFound: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="pt-28 min-h-screen bg-white text-brand flex items-center justify-center p-6">
      <div className="text-center max-w-lg py-20 space-y-6">
        <BrandLogo className="w-40" />

        <div className="space-y-2">
          <h1 className="font-serif text-4xl font-medium text-brand">This cup is empty.</h1>
          <p className="text-brand font-sans text-base">
            404. We couldn't find that page.
          </p>
        </div>

        <p className="text-stone-500 text-sm leading-relaxed">
          The link you clicked might be broken, or perhaps the barista spilled a bit of espresso over our keyboard. Let's get you back to the warmth of our main room.
        </p>

        <button
          onClick={() => {
            setActiveTab("home");
            window.location.hash = "home";
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="brand-button"
        >
          <Home className="w-4 h-4" />
          <span>Back to Main Room</span>
        </button>
      </div>
    </div>
  );
};
