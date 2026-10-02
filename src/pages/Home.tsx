import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Moon, Sun } from "lucide-react";
import { brand } from "../brand";
import { BrandLogo } from "../components/BrandLogo";
import { Marquee } from "../components/Marquee";
import { useApp } from "../utils/store";

export function Home() {
  const { classes, setActiveTab, subscribeNewsletter } = useApp();
  const [email, setEmail] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const reduceMotion = useReducedMotion();
  const navigate = (id: string) => {
    setActiveTab(id);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
  };
  const subscribe = (event: FormEvent) => {
    event.preventDefault();
    const result = subscribeNewsletter(email.trim(), "both");
    setSignupStatus(result.success ? "You're on this preview list. Opening emails will be available once our newsletter service is connected." : result.msg);
    if (result.success) setEmail("");
  };
  const reveal = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .15 },
    transition: { duration: .7 },
  };

  return (
    <div className="brand-home bg-white">
      <section className="home-hero on-green">
        <motion.img
          className="hero-photo"
          src={brand.images.hero}
          alt="A sunlit coffee shop interior, illustrating the welcoming atmosphere planned for Shoresh"
          fetchPriority="high"
          width={2200}
          height={1467}
          initial={{ scale: reduceMotion ? 1 : 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content">
          <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
            <BrandLogo className="hero-logo" tone="white" />
          </motion.div>
          <h1 className="text-fluid-hero">
            <span className="sr-only">Shoresh. </span>
            {"Community coffee shop and Jewish third space.".split(" ").map((word, index) => (
              <motion.span key={`${word}-${index}`} initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 + index * .065, duration: .65 }} className="inline-block mr-[.22em]">{word}</motion.span>
            ))}
          </h1>
          <p className="hero-description">By day, a great cup of coffee with your neighbors. By night, a place of Jewish learning, prayer, and community. Come as you are.</p>
          <div className="hero-actions">
            <button className="brand-button brand-button--white" onClick={() => navigate("classes")}>Take a class <ArrowUpRight aria-hidden="true" /></button>
            <button className="brand-button brand-button--light-outline" onClick={() => navigate("donate")}>Help us open <ArrowRight aria-hidden="true" /></button>
          </div>
        </div>
      </section>

      <div className="opening-note">
        <span className="opening-dot" aria-hidden="true" />
        <p>We're renovating and can't wait to open. <strong>Classes are happening now.</strong></p>
        <button onClick={() => document.getElementById("renovation")?.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth" })}>Watch us grow <ArrowUpRight size={18} /></button>
      </div>

      <motion.section className="home-section two-lives" {...reveal}>
        <div className="section-intro">
          <span className="eyebrow">Rooted in the everyday</span>
          <h2 className="text-fluid-section">Two lives. One room.</h2>
          <p>Good coffee brings us to the table. Curiosity keeps us there.</p>
        </div>
        <div className="two-lives-grid">
          <div>
            <div className="life-photo"><img src="https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?auto=format&fit=crop&w=1000&q=85" alt="Coffee served at a wooden table, an atmosphere reference" loading="lazy" width={1000} height={667} /></div>
            <div className="life-label"><Sun size={20} aria-hidden="true" /><span>By day</span></div>
            <h3>Coffee. Neighbors. A seat for you.</h3>
            <p>A place to grab a great cup, work for a while, or simply sit with your neighbors. No agenda. Just a warm welcome.</p>
            <button className="text-link" onClick={() => navigate("coffee-shop")}>Meet your neighborhood coffee shop <ArrowUpRight size={18} /></button>
          </div>
          <div>
            <div className="life-photo"><img src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1000&q=85" alt="Books and open study texts, an illustration of Jewish learning by night" loading="lazy" width={1000} height={667} /></div>
            <div className="life-label"><Moon size={20} aria-hidden="true" /><span>By night</span></div>
            <h3>Old texts. New questions. Together.</h3>
            <p>Jewish learning, prayer, and community in a room that feels like home. Bring a friend or your spouse. You both belong here.</p>
            <button className="text-link" onClick={() => navigate("classes")}>Find a class that speaks to you <ArrowUpRight size={18} /></button>
          </div>
        </div>
      </motion.section>

      <Marquee />

      <section className="classes-at-night on-green">
        <div className="home-section">
          <motion.div className="classes-intro" {...reveal}>
            <div><span className="eyebrow">A little learning goes a long way</span><h2 className="text-fluid-section">Pull up a chair.</h2><p>Bring your questions. We'll make room for them.</p></div>
            <button className="brand-button brand-button--light-outline" onClick={() => navigate("classes")}>All classes & events <ArrowUpRight /></button>
          </motion.div>
          <div className="home-class-list">
            {classes.slice(0, 3).map((item, index) => (
              <motion.article className="home-class" key={item.id} {...reveal} transition={{ duration: .6, delay: reduceMotion ? 0 : index * .1 }}>
                <div className="class-photo"><img src={item.imageUrl} alt={`Study materials for ${item.title}`} loading="lazy" width={600} height={400} /></div>
                <div className="class-preview-content">
                  <span className="class-level">{item.level}</span>
                  <h3>{item.title}</h3>
                  <p className="class-preview-description">{item.description}</p>
                  <div className="class-preview-schedule">{item.day}<br />{item.time}</div>
                  <div className="class-preview-bottom"><span>{item.teacher}</span><button onClick={() => navigate("classes")} aria-label={`Details and RSVP for ${item.title}`}><ArrowUpRight size={22} /></button></div>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="preview-caption">Class details are preview data. Dates, prices, and availability will be confirmed before live registration.</p>
        </div>
      </section>

      <motion.section className="home-section founders-intro" {...reveal}>
        <div><span className="eyebrow">People, not an institution</span><h2 className="text-fluid-section">A rabbi. An educator.<br />One very good idea.</h2></div>
        <div><p>Rabbi Mark Asher Goodman and Frances Lasday are building a place where the sacred and the everyday sit side by side. Prayer, learning, or just a really good cup of coffee.</p><button className="text-link" onClick={() => navigate("about")}>Get to know the people behind Shoresh <ArrowUpRight size={18} /></button></div>
      </motion.section>

      <section id="renovation" className="renovation-section">
        <div className="home-section renovation-grid">
          <motion.div className="renovation-photo" {...reveal}><img src={brand.images.storefront} alt="The real front door of Shoresh at 4300 Murray Avenue in Greenfield, Pittsburgh" loading="lazy" width={776} height={1102} /><span>Our roots, at 4300 Murray Avenue.</span></motion.div>
          <motion.div className="renovation-copy" {...reveal}>
            <span className="eyebrow">Good things take root</span>
            <h2 className="text-fluid-section">A new chapter<br />for Greenfield.</h2>
            <p>We're making a home at 4300 Murray Avenue. There are renovations to finish and plenty of dreams to bring to life. We'd love to bring you along.</p>
            <a className="text-link" href="https://shoreshpgh.substack.com/" target="_blank" rel="noopener noreferrer">Follow the renovation story <ArrowUpRight size={18} /></a>
            <div className="opening-signup"><h3>Be here for the first cup.</h3><p>Leave your email. We'll let you know when the doors open.</p>
              <form onSubmit={subscribe}><label htmlFor="opening-email" className="sr-only">Email for opening updates</label><input id="opening-email" type="email" autoComplete="email" required placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} /><button className="brand-button" type="submit">Keep me posted <ArrowRight /></button></form>
              {signupStatus && <div className="opening-signup-status" role="status"><Check size={18} />{signupStatus}</div>}
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section className="home-section home-giving" {...reveal}>
        <span className="eyebrow">A place we build together</span>
        <h2 className="text-fluid-section">Help put down roots.</h2>
        <p>Your gift helps turn a neighborhood storefront into a welcoming coffee shop and Jewish third space. Every chair, every bookshelf, every shared conversation starts with people like you.</p>
        <button className="brand-button" onClick={() => navigate("donate")}>Give together <ArrowUpRight /></button>
      </motion.section>

      <div className="first-visit-note"><h2>New here? You're exactly who we're hoping to meet.</h2><button className="text-link" onClick={() => navigate("about")}>What your first visit looks like <ArrowUpRight size={18} /></button></div>
    </div>
  );
}