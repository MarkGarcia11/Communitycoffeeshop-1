import React from "react";
import { ArrowRight } from "lucide-react";
import { ShareButton } from "../components/ShareButton";
import { useApp } from "../utils/store";
import { BrandLogo } from "../components/BrandLogo";
import { brand } from "../brand";

export const About: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="pt-28 min-h-screen bg-white text-brand">
      {/* Page Header Hero */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <span className="eyebrow text-brand">
          Our story & values
        </span>
        <h1 className="text-fluid-section font-serif font-medium tracking-tight leading-tight max-w-4xl mx-auto text-brand">
          "Where Sacred Study and Everyday Neighbors Gather Over Coffee"
        </h1>
        <p className="text-lg sm:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
          Shoresh aims to blend the sacred and the everyday by providing a welcoming space where the Jewish community can gather for prayer, learning, or just a really good cup of coffee.
        </p>
        <div className="pt-2 flex justify-center">
          <ShareButton
            title="Our Story - Shoresh PGH"
            text="Read about Rabbi Mark Asher Goodman and Frances Lasday's dream of building Shoresh in Pittsburgh!"
          />
        </div>
      </section>

      {/* Origin Story - Rabbi Mark's Crazy Idea */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="absolute inset-0 bg-brand/5 rounded-[32px] blur-xl transform scale-105" />
          <div className="relative rounded-[24px] overflow-hidden border border-brand/15 aspect-[4/3] bg-white">
            <img
              src="https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?q=80&w=600&auto=format&fit=crop"
              alt="Hands studying classic text beside an espresso with steam"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-3xl font-serif font-medium text-brand leading-tight">
            How a "Crazy Idea" Became a Community Anchor
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            It started as a conversation between Rabbi Mark Asher Goodman and experiential educator Frances Lasday, both residents of Pittsburgh's Greenfield neighborhood. Greenfield, while rich in history and diversity, has never had a dedicated neighborhood coffee shop. 
          </p>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Meanwhile, traditional houses of study and prayer (called <span className="font-semibold italic text-brand">Shtibls</span> in Yiddish) were historically informal, cozy, and embedded in everyday shops. Goodman and Lasday asked: <span className="italic">"Why not fuse them together? Why can't we create a physical space that serves great coffee by day and acts as a lively, low-barrier, intellectually rigorous Jewish space by night?"</span>
          </p>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-semibold">
            By creating an open-door coffee house, Shoresh breaks down the emotional walls that some feel when entering formal Jewish synagogues. Here, you're always invited simply to pull up a chair, sit with friends, or listen in.
          </p>
        </div>
      </section>

      {/* Founders Section with authentic details */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-100">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="eyebrow text-brand">Meet the Founders</span>
            <h2 className="text-3xl font-serif font-medium text-brand">The Co-Founders & Head Baristas</h2>
            <p className="text-stone-500 text-sm">
              Authentic community leaders and educators who live right here in the neighborhood.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Rabbi Mark Asher Goodman */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <BrandLogo format="mark" className="w-20 opacity-60" decorative />
                <div className="text-center sm:text-left">
                  <h3 className="font-serif text-xl font-medium text-brand">Rabbi Mark Asher Goodman</h3>
                  <p className="text-brand text-xs font-semibold mt-0.5">Co-Founder & Head Barista</p>
                  <p className="text-stone-400 text-xs mt-1">rabbimark@shoreshpgh.org</p>
                </div>
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed pt-2">
                Rabbi Mark (he/him) is an educator, spiritual leader, and community pastor whose rabbinic career began in 2006. He has served congregations in Erie, PA, and Beth Shalom in Pittsburgh. Mark believes deeply in breaking down institutional boundaries to make authentic Jewish texts and prayer accessible. He enjoys roasting single-origin beans and is a self-proclaimed coffee nerd who loves pouring perfect micro-foam.
              </p>
            </div>

            {/* Frances Lasday */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <BrandLogo format="mark" className="w-20 opacity-60" decorative />
                <div className="text-center sm:text-left">
                  <h3 className="font-serif text-xl font-medium text-brand">Frances Lasday</h3>
                  <p className="text-brand text-xs font-semibold mt-0.5">Co-Founder & Head Barista</p>
                  <p className="text-stone-400 text-xs mt-1">frances@shoreshpgh.org</p>
                </div>
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed pt-2">
                Frances is an experienced community organizer and experiential educator based in Greenfield. She was the driving force behind creating the highly successful monthly pop-up minyan at the Jewish Community Center in Squirrel Hill. As an educator who loves hands-on textile crafts like spinning, weaving, and dyeing, Frances brings a unique tactile perspective to Jewish ritual classes, teaching historical Tabernacle crafts with fun, contemporary materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who is Shoresh For? / Value Prop */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-serif font-black">Who is Shoresh For?</h2>
          <p className="text-stone-600 text-sm">
            Our door is open to every neighbor. Designed especially for partner sharing and collaborative deciding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 space-y-4 text-center">
            <h4 className="font-serif text-2xl font-medium text-brand">Couples & Partners</h4>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              We design our text classes and space to encourage partner-study. If you decide together, you both are completely welcome to bring a friend or your spouse, learn side-by-side, and discuss what you hear.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200 space-y-4 text-center">
            <h4 className="font-serif text-2xl font-medium text-brand">Text Beginners & Seekers</h4>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Never read Talmud or Hebrew before? That's our specialty. No assumptions, no preachy jargon. Everything is printed with parallel English translation and guided step-by-step in a comfortable environment.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200 space-y-4 text-center">
            <h4 className="font-serif text-2xl font-medium text-brand">Greenfield Neighbors</h4>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              If you just want a perfectly crafted morning cappuccino or a hot tea and a quiet desk space, we're your home. There's no pressure or expectation to engage in classes—we are your friendly neighborhood coffee house!
            </p>
          </div>
        </div>
      </section>

      {/* First Visit Reassurance */}
      <section className="on-green py-24 px-4 sm:px-6 lg:px-8 bg-brand text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-serif font-black">What Your First Visit Looks Like</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/15">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white text-brand font-bold text-xs flex items-center justify-center">1</span>
                <h4 className="font-bold font-serif text-lg text-white">Grab a Seat</h4>
              </div>
              <p className="text-stone-300 text-sm leading-relaxed">
                When you walk into 4300 Murray Ave, you'll hear soft acoustic music, smell freshly ground Guatemala coffee, and see neighbors chatting. Order at the bar or take a window seat.
              </p>
            </div>

            <div className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/15">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white text-brand font-bold text-xs flex items-center justify-center">2</span>
                <h4 className="font-bold font-serif text-lg text-white">Choose Your Level</h4>
              </div>
              <p className="text-stone-300 text-sm leading-relaxed">
                If you're attending a night class, worksheets will be on the table. You both can read along in translation or jump straight into discussions. There are absolutely no tests or religious prerequisites.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveTab("classes");
              window.location.hash = "classes";
              window.scrollTo({ top: 0 });
            }}
            className="brand-button brand-button--white"
          >
            <span>See Classes Happening Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Physical Building History Section (4300 Murray Ave) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="eyebrow text-brand">Our Physical Roots</span>
          <h2 className="text-3xl font-serif font-medium text-brand">The Story of 4300 Murray Ave</h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Our home sits on the corner of Loretta Street and Murray Avenue in Pittsburgh. This historic brick building was originally a local bank branch, complete with thick, secure masonry and high arched windows that let in incredible natural morning light.
          </p>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            By keeping the historic structural elements—like exposed brick and original framing—we're weaving Greenfield's hardworking commercial history with Jewish study values. It's a space that feels solid, warm, quiet, and slightly luxurious but completely unpretentious.
          </p>
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <h5 className="font-semibold text-brand text-base mb-1">Transit & Parking Details:</h5>
            <p className="text-xs text-stone-500">
              Convenient street parking is available along both Murray Ave and Loretta Street. Direct access is available via Pittsburgh PRT Bus Route 58. Our space features step-free ramp access.
            </p>
          </div>
        </div>

        <div className="relative rounded-[24px] overflow-hidden border border-brand/15 aspect-[4/3] bg-white">
          <img
            src={brand.images.storefront}
            alt="Historic front door of 4300 Murray Ave in Greenfield"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
};
