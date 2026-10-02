import React from "react";
import { Printer } from "lucide-react";

interface PrintButtonProps {
  label?: string;
  className?: string;
}

export const PrintButton: React.FC<PrintButtonProps> = ({
  label = "Print a one-page summary",
  className = ""
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className={`inline-flex items-center gap-2 px-4 py-3 rounded-full border border-brand/20 hover:border-brand bg-white hover:bg-brand-soft text-brand text-base font-medium transition-colors duration-300 cursor-pointer no-print ${className}`}
      title="Print a physical copy to read together with your partner"
    >
      <Printer className="w-4 h-4 text-stone-500" />
      <span>{label}</span>
    </button>
  );
};
