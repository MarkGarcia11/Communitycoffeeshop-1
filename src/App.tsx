import React, { useState, useEffect } from "react";
import { MotionConfig, motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { AppProvider, useApp } from "./utils/store";
import { Loader, shouldShowLoader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { RootLine } from "./components/RootLine";
import { CartDrawer } from "./components/CartDrawer";
import { brand } from "./brand";

// Pages
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Classes } from "./pages/Classes";
import { CoffeeShop } from "./pages/CoffeeShop";
import { Shop } from "./pages/Shop";
import { Donate } from "./pages/Donate";
import { Contact } from "./pages/Contact";
import { Legal } from "./pages/Legal";
import { AdminPanel } from "./components/AdminPanel";
import { NotFound } from "./pages/NotFound";

const AppContent: React.FC<{ loading: boolean }> = ({ loading }) => {
  const { activeTab } = useApp();
  const [pointerEnabled, setPointerEnabled] = useState(false);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(-200);
  const pointerY = useMotionValue(-200);
  const x = useSpring(pointerX, { stiffness: 75, damping: 22 });
  const y = useSpring(pointerY, { stiffness: 75, damping: 22 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setPointerEnabled(media.matches);
    update();
    const handleMouseMove = (e: MouseEvent) => {
      pointerX.set(e.clientX - 90);
      pointerY.set(e.clientY - 90);
    };
    media.addEventListener("change", update);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [pointerX, pointerY]);

  // Simple router switching logic
  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "about":
        return <About />;
      case "classes":
        return <Classes />;
      case "coffee-shop":
        return <CoffeeShop />;
      case "shop":
        return <Shop />;
      case "donate":
        return <Donate />;
      case "contact":
        return <Contact />;
      case "legal":
        return <Legal />;
      case "admin":
        return <AdminPanel />;
      default:
        return <NotFound />;
    }
  };

  return (
    <div className="brand-app relative min-h-screen flex flex-col justify-between" inert={loading}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      {pointerEnabled && !reduceMotion && (
        <motion.div
          className="fixed left-0 top-0 pointer-events-none w-[180px] h-[180px] bg-brand/5 rounded-full blur-[65px] z-30 no-print"
          style={{ x, y }}
          aria-hidden="true"
        />
      )}

      {/* 2. Global SVG Scrolling Root-line */}
      <RootLine />

      {/* 3. Primary Top Navigation Bar */}
      <Navbar />

      {/* 4. Page content wrapper with responsive spacing */}
      <main id="main-content" className="flex-grow" tabIndex={-1}>
        {renderPage()}
      </main>

      {/* 5. Dense Footer */}
      <Footer />

      {/* 6. Slide-out Shopping Cart */}
      <CartDrawer />
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(shouldShowLoader);

  useEffect(() => {
    const icon = document.getElementById("brand-favicon");
    icon?.setAttribute("href", brand.logo.favicon);
    const replay = () => setLoading(true);
    window.addEventListener("shoresh:replay-welcome", replay);
    return () => window.removeEventListener("shoresh:replay-welcome", replay);
  }, []);

  useEffect(() => {
    if (!loading) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [loading]);

  return (
    <AppProvider>
      <MotionConfig reducedMotion="user">
        <AppContent loading={loading} />
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </MotionConfig>
    </AppProvider>
  );
}
