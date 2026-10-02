import React, { useState } from "react";
import { Share2, Check, Mail } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  variant?: "primary" | "secondary" | "outline";
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  text,
  url,
  variant = "outline"
}) => {
  const [copied, setCopied] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const shareUrl = url || window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `${text} - Come together with me to Shoresh!`,
          url: shareUrl
        });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        await fallbackShare();
      }
    } else {
      await fallbackShare();
    }
  };

  const fallbackShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setShowLink(true);
    }
  };

  const emailFallbackUrl = `mailto:?subject=${encodeURIComponent(
    `Shall we go together? - ${title}`
  )}&body=${encodeURIComponent(
    `${text}\n\nI thought we might enjoy going to this together. Let's look over it: ${shareUrl}`
  )}`;

  const btnClasses =
    variant === "primary"
      ? "bg-brand hover:bg-brand-deep text-white font-medium"
      : variant === "secondary"
      ? "bg-brand hover:bg-brand-deep text-white font-medium"
      : "border border-brand/25 hover:bg-brand-soft text-brand font-medium hover:border-brand";

  return (
    <div className="flex flex-wrap gap-2 items-center no-print">
      <button
        onClick={handleShare}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-base transition-all duration-300 transform active:scale-95 cursor-pointer ${btnClasses}`}
        aria-label="Share with your partner or friend"
      >
        {copied ? (
          <>
            <Check className="w-5 h-5" />
            <span className="text-base font-medium" role="status">Link copied</span>
          </>
        ) : (
          <>
            <Share2 className="w-5 h-5" />
            <span className="text-base font-medium">Share with your partner</span>
          </>
        )}
      </button>

      {/* Direct email quick button for older adults who prefer email over instant shares */}
      <a
        href={emailFallbackUrl}
        className="inline-flex min-w-12 min-h-12 items-center justify-center p-3 rounded-full border border-brand/20 hover:border-brand hover:bg-brand-soft transition-colors duration-300"
        title="Email to your partner"
        aria-label="Email details to your partner"
      >
        <Mail className="w-5 h-5 text-brand" />
      </a>
      {showLink && <label className="w-full text-base text-brand">Copy this link, or use the email button:<input className="mt-2 w-full rounded-lg border border-brand/20 bg-white p-3" readOnly value={shareUrl} onFocus={(event) => event.currentTarget.select()} /></label>}
    </div>
  );
};
