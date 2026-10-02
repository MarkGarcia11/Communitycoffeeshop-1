import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react";
import { useApp } from "../utils/store";
import { BrandLogo } from "./BrandLogo";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "Our story" },
  { id: "classes", label: "Classes & events" },
  { id: "coffee-shop", label: "Coffee shop" },
  { id: "shop", label: "Shop" },
  { id: "donate", label: "Support us" },
  { id: "contact", label: "Visit & contact" },
];

export function Navbar() {
  const { activeTab, setActiveTab, cart, setCartOpen } = useApp();
  const [scrolled, setScrolled] = useState(window.scrollY > 15);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const overHero = activeTab === "home" && !scrolled;
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) setActiveTab("home");
      else if ([...links.map((link) => link.id), "legal", "admin"].includes(hash)) setActiveTab(hash);
      else if (["faq", "accessibility", "privacy", "terms"].includes(hash)) {
        setActiveTab("legal");
        requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
      } else if (hash !== "main-content") setActiveTab("not-found");
    };
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [setActiveTab]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key !== "Tab") return;
      const elements = menuRef.current?.querySelectorAll<HTMLElement>("button, a[href]");
      if (!elements?.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [menuOpen]);

  const navigate = (id: string) => {
    setActiveTab(id);
    window.location.hash = id;
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
  };

  return (
    <>
      <header className={`site-nav no-print ${overHero ? "site-nav--hero" : "site-nav--light"} ${scrolled ? "site-nav--scrolled" : ""}`}>
        <div className="site-nav-inner">
          <button className="site-nav-brand" onClick={() => navigate("home")} aria-label="Shoresh home">
            <BrandLogo className="site-nav-logo" tone={overHero ? "white" : "green"} decorative />
          </button>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.filter((link) => !["home", "donate"].includes(link.id)).map((link) => (
              <button key={link.id} onClick={() => navigate(link.id)} aria-current={activeTab === link.id ? "page" : undefined}>
                {link.label}
                {activeTab === link.id && <motion.span className="nav-underline" layoutId="brand-nav-underline" transition={{ duration: .3 }} />}
              </button>
            ))}
          </nav>
          <div className="site-nav-actions">
            <button className="nav-give" onClick={() => navigate("donate")}>Give <ArrowUpRight aria-hidden="true" size={16} /></button>
            <button className={`brand-button nav-class ${overHero ? "brand-button--white" : ""}`} onClick={() => navigate("classes")}>Take a class</button>
            <button className="nav-icon" onClick={() => setCartOpen(true)} aria-label={`Open shopping bag${cartCount ? `, ${cartCount} items` : ""}`}>
              <ShoppingBag size={21} aria-hidden="true" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            <button ref={triggerRef} className="nav-icon mobile-menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen} aria-controls="brand-mobile-menu">
              <Menu size={25} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="brand-mobile-menu"
            ref={menuRef}
            className="mobile-menu no-print"
            role="dialog"
            aria-modal="true"
            aria-label="Shoresh navigation"
            initial={{ opacity: 0, x: reduceMotion ? 0 : 35 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : 35 }}
            transition={{ duration: .3 }}
          >
            <div className="mobile-menu-header">
              <BrandLogo className="mobile-menu-logo" />
              <button ref={closeRef} className="nav-icon" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={26} /></button>
            </div>
            <nav aria-label="Mobile navigation" className="mobile-menu-links">
              {links.map((link, index) => (
                <motion.button
                  key={link.id}
                  onClick={() => navigate(link.id)}
                  aria-current={activeTab === link.id ? "page" : undefined}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : .06 * index }}
                >
                  {link.label}<ArrowUpRight size={20} aria-hidden="true" />
                </motion.button>
              ))}
            </nav>
            <div className="mobile-menu-bottom">
              <button className="brand-button" onClick={() => navigate("classes")}>Pull up a chair <ArrowUpRight /></button>
              <p>A well-caffeinated shtibl.<br />Greenfield, Pittsburgh.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}