import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrandLogo } from "./BrandLogo";

const SESSION_KEY = "shoresh:brand-welcome:v2";

export function shouldShowLoader() {
  try {
    return sessionStorage.getItem(SESSION_KEY) !== "seen";
  } catch {
    return true;
  }
}

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    const minimum = new Promise<void>((resolve) => {
      timers.push(window.setTimeout(resolve, reduceMotion ? 250 : 1400));
    });
    const ready = document.fonts?.ready ?? Promise.resolve();
    const timeout = new Promise<void>((resolve) => {
      timers.push(window.setTimeout(resolve, 2300));
    });

    void Promise.race([Promise.all([ready, minimum]), timeout]).then(() => {
      if (!cancelled) setVisible(false);
    });

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [reduceMotion]);

  const finish = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "seen");
    } catch {
      // The logo remains available when browser storage is disabled.
    }
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={finish}>
      {visible && (
        <motion.div
          className="brand-loader no-print"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? .15 : .6, ease: "easeInOut" }}
        >
          <div className="loader-content">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14, scale: reduceMotion ? 1 : .97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: reduceMotion ? .15 : .8, ease: [.22, 1, .36, 1] }}
            >
              <BrandLogo className="loader-logo" />
            </motion.div>
            <motion.p
              className="loader-caption"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : .35, duration: .4 }}
            >
              Putting the coffee on.
            </motion.p>
            <div className="loader-line" aria-hidden="true">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduceMotion ? .15 : 1.3, ease: [.22, 1, .36, 1] }}
              />
            </div>
            <div className="loader-place">Greenfield, Pittsburgh</div>
          </div>
          <button className="loader-skip" onClick={() => setVisible(false)}>Skip welcome</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
