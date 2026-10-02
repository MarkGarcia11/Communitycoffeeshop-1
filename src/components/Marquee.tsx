import React from "react";

const WORDS = [
  { en: "Welcome", he: "ברוכים הבאים" },
  { en: "Gather", he: "להתכנס" },
  { en: "Shalom", he: "שלום" },
  { en: "Learn", he: "ללמוד" },
  { en: "Coffee", he: "קפה" },
  { en: "Community", he: "קהילה" },
  { en: "Shtibl", he: "שטיבל" },
  { en: "Roots", he: "שורשים" }
];

export const Marquee: React.FC = () => {
  const list = [...WORDS, ...WORDS];

  return (
    <div className="relative w-full overflow-hidden bg-white py-5 border-y border-brand/15 no-print" aria-label="Welcome. Gather. Shalom. Learn. Coffee. Community.">
      <div className="animate-marquee whitespace-nowrap flex items-center" aria-hidden="true">
        {list.map((item, index) => (
          <div key={index} className="inline-flex items-center mx-8 text-stone-700">
            {/* English word - sans-serif, spaced caps */}
            <span className="font-sans text-base tracking-widest font-medium text-brand">
              {item.en}
            </span>
            {/* Elegant Separator */}
            <span className="mx-4 text-brand/30 font-serif text-lg">/</span>
            {/* Hebrew word - Frank Ruhl Libre, RTL fallbacks */}
            <span className="font-hebrew text-xl font-medium text-brand tracking-wider" dir="rtl">
              {item.he}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
