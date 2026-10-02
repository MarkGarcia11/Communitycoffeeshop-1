import React, { useEffect, useState } from "react";
import { useApp, ClassEvent } from "../utils/store";
import { Calendar, MapPin, Award, CheckCircle2, ChevronRight } from "lucide-react";
import { ShareButton } from "../components/ShareButton";
import { PrintButton } from "../components/PrintButton";

export const Classes: React.FC = () => {
  const { classes, submitRSVP } = useApp();

  // Filters
  const [levelFilter, setLevelFilter] = useState("all");
  const [teacherFilter, setTeacherFilter] = useState("all");
  const [dayFilter, setDayFilter] = useState("all");

  // Selected Class detail modal
  const [selectedClass, setSelectedClass] = useState<ClassEvent | null>(null);

  useEffect(() => {
    if (selectedClass) {
      document.getElementById("class-syllabus")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    }
  }, [selectedClass]);

  // RSVP Form States
  const [name1, setName1] = useState("");
  const [isCouple, setIsCouple] = useState(false);
  const [name2, setName2] = useState("");
  const [email, setEmail] = useState("");
  const [accessibilityNotes, setAccessibilityNotes] = useState("");
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Filter lists
  const levels = ["all", "Beginner", "Intermediate", "Intermediate Text Study", "Advanced Text Study", "Experiential Workshop"];
  const teachers = ["all", "Rabbi Mark Asher Goodman", "Frances Lasday"];
  const days = ["all", "Tuesdays", "Wednesdays", "Thursdays", "Sundays"];

  const filteredClasses = classes.filter((c) => {
    const matchesLevel = levelFilter === "all" || c.level === levelFilter;
    const matchesTeacher = teacherFilter === "all" || c.teacher === teacherFilter;
    const matchesDay = dayFilter === "all" || c.day.toLowerCase().includes(dayFilter.toLowerCase().replace("s", ""));
    return matchesLevel && matchesTeacher && matchesDay;
  });

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass || !name1 || !email) return;

    const rsvpPayload = {
      classId: selectedClass.id,
      classTitle: selectedClass.title,
      name1,
      name2: isCouple ? name2 : undefined,
      email,
      accessibilityNotes: accessibilityNotes || undefined,
      dietaryNotes: dietaryNotes || undefined
    };

    const success = submitRSVP(rsvpPayload);
    if (success) {
      setRsvpSuccess(true);
      setTimeout(() => {
        setRsvpSuccess(false);
        // Clear form
        setName1("");
        setName2("");
        setIsCouple(false);
        setEmail("");
        setAccessibilityNotes("");
        setDietaryNotes("");
        setSelectedClass(null); // Close modal
      }, 4500);
    }
  };

  // Google Calendar helper
  const getGoogleCalendarUrl = (c: ClassEvent) => {
    const title = encodeURIComponent(c.title);
    const details = encodeURIComponent(`${c.description}\n\nTaught by ${c.teacher}\nLevel: ${c.level}`);
    const location = encodeURIComponent(c.location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  // ICS download helper
  const getICSUrl = (c: ClassEvent) => {
    const calendarText = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Shoresh PGH//NONSGML Event//EN
BEGIN:VEVENT
SUMMARY:${c.title}
DESCRIPTION:${c.description} (Teacher: ${c.teacher})
LOCATION:${c.location}
END:VEVENT
END:VCALENDAR`;
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(calendarText)}`;
  };

  return (
    <div className="pt-28 min-h-screen bg-white text-brand">
      {/* Page Header */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <span className="eyebrow text-brand">
          Classes & events
        </span>
        <h1 className="text-fluid-section font-serif font-medium tracking-tight leading-tight max-w-4xl mx-auto text-brand">
          Unpretentious Text Study & Experiential Torah
        </h1>
        <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
          No experience or religious background assumed. Bring your curiosity, your doubts, and your partner or spouse. We learn sitting side-by-side.
        </p>
      </section>

      {/* FILTER CONTROLS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8 no-print">
        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm flex flex-col md:flex-row flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            {/* Level Selector */}
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase text-stone-400">Class Level</label>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="max-w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-3 text-base font-medium focus:border-brand text-brand"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl === "all" ? "All Levels" : lvl}</option>
                ))}
              </select>
            </div>

            {/* Teacher Selector */}
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase text-stone-400">Teacher</label>
              <select
                value={teacherFilter}
                onChange={(e) => setTeacherFilter(e.target.value)}
                className="max-w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-3 text-base font-medium focus:border-brand text-brand"
              >
                {teachers.map((t) => (
                  <option key={t} value={t}>{t === "all" ? "All Instructors" : t.replace("Rabbi ", "")}</option>
                ))}
              </select>
            </div>

            {/* Day Selector */}
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase text-stone-400">Day of Week</label>
              <select
                value={dayFilter}
                onChange={(e) => setDayFilter(e.target.value)}
                className="max-w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-3 text-base font-medium focus:border-brand text-brand"
              >
                {days.map((d) => (
                  <option key={d} value={d}>{d === "all" ? "Any Day" : d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-xs text-stone-500 font-medium">
            Showing <span className="font-semibold text-brand">{filteredClasses.length}</span> preview classes
          </div>
        </div>
      </section>

      {/* CLASSES GRID */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-2">
              <p className="font-serif text-lg text-stone-600">No classes match your search.</p>
              <p className="text-xs text-stone-400">Try loosening your filters or resetting the category fields.</p>
              <button
                onClick={() => {
                  setLevelFilter("all");
                  setTeacherFilter("all");
                  setDayFilter("all");
                }}
                className="mt-2 text-base font-semibold text-brand hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredClasses.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo area */}
                  <div className="relative aspect-video bg-stone-100 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute bottom-3 left-3 bg-brand/95 backdrop-blur-sm text-white text-sm font-medium px-2.5 py-1 rounded-lg border border-white/20">
                      {item.level}
                    </span>
                  </div>

                  {/* Body details */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-base font-medium text-brand">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.day} • {item.time}</span>
                      </div>
                      <h3 className="font-serif text-2xl font-medium text-brand leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-brand-muted text-base leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-stone-500 border-t border-stone-100">
                      <p><span className="font-semibold text-brand">Teacher:</span> {item.teacher}</p>
                      <p><span className="font-semibold text-brand">Sample cost:</span> ${item.cost}</p>
                    </div>
                  </div>
                </div>

                {/* Card footer actions */}
                <div className="px-6 pb-6 pt-2 flex flex-wrap items-center justify-between border-t border-stone-50 gap-3">
                  <div className="text-left">
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Capacity</p>
                    <p className="text-base font-semibold text-brand">
                      {item.spotsLeft === 0 ? "Class Full" : `${item.spotsLeft} spots left`}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedClass(item);
                    }}
                    className="brand-button"
                  >
                    <span>View Syllabus</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CLASS DETAILS MODAL / EXPANDED SYLLABUS SECTION */}
      {selectedClass && (
        <section id="class-syllabus" className="bg-stone-50 border-t border-b border-stone-200/80 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-brand/15 p-6 sm:p-10 space-y-8 relative">
            
            {/* Close detail button */}
            <button
              onClick={() => setSelectedClass(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-stone-200 hover:bg-stone-100 text-stone-500 cursor-pointer text-xs uppercase font-bold tracking-widest"
              title="Close Syllabus"
            >
              Close ✕
            </button>

            {/* Header outline */}
            <div className="space-y-4">
              <span className="inline-block text-base font-medium text-brand mt-12">
                {selectedClass.level} Level
              </span>
              <h2 className="font-serif text-3xl font-medium text-brand leading-tight">
                {selectedClass.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-stone-100 text-sm">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-5 h-5 text-brand shrink-0" />
                  <div>
                    <p className="font-bold text-stone-800">Schedule</p>
                    <p className="text-xs text-stone-500">{selectedClass.date} ({selectedClass.day})</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-brand shrink-0" />
                  <div>
                    <p className="font-bold text-stone-800">Instruction & Fee</p>
                    <p className="text-xs text-stone-500">{selectedClass.teacher} • ${selectedClass.cost}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-brand shrink-0" />
                  <div>
                    <p className="font-bold text-stone-800">Location</p>
                    <p className="text-xs text-stone-500 leading-snug">{selectedClass.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum syllabus */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7 space-y-6">
                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-800 mb-2">What We Will Explore</h4>
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                    {selectedClass.longDescription}
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-800 mb-2">What to Expect & Prep</h4>
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                    {selectedClass.whatToExpect}
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-800 mb-2">Accessibility Statement</h4>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {selectedClass.accessibility}
                  </p>
                </div>

                {/* Print & Share actions for couples */}
                <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-3 items-center">
                  <ShareButton
                    title={selectedClass.title}
                    text={`Check out "${selectedClass.title}" with me at Shoresh!`}
                  />
                  <PrintButton label="Print Class Summary" />
                </div>

                {/* Add to calendar widgets */}
                <div className="flex flex-wrap gap-4 items-center pt-2">
                  <span className="text-xs text-stone-400 font-bold uppercase">Add to Calendar:</span>
                  <a
                    href={getGoogleCalendarUrl(selectedClass)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-brand hover:underline font-semibold"
                  >
                    Google Calendar ↗
                  </a>
                  <span className="text-stone-300">|</span>
                  <a
                    href={getICSUrl(selectedClass)}
                    download={`${selectedClass.title.toLowerCase().replace(/ /g, "-")}.ics`}
                    className="text-base text-brand hover:underline font-semibold"
                  >
                    Download .ics File
                  </a>
                </div>
              </div>

              {/* RSVP Form Column (Optimized for partners study) */}
              <div className="md:col-span-5 bg-stone-50 p-6 rounded-2xl border border-stone-200">
                {rsvpSuccess ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-xl font-medium text-brand">Preview RSVP saved.</h3>
                    <p className="text-xs text-stone-600">
                      Your RSVP for <span className="font-semibold">{email}</span> is saved in this browser only. No confirmation email has been sent. Contact the team to confirm a live class.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRSVP} className="space-y-4">
                    <h3 className="font-serif text-lg font-bold text-stone-800">Secure Your Seat</h3>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      This is a preview registration form. Schedule, cost, location, and accessibility details must be confirmed before live RSVPs open.
                    </p>

                    <div>
                      <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="First and Last name"
                        value={name1}
                        onChange={(e) => setName1(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                      />
                    </div>

                    {/* Joint study option toggle */}
                    <div className="pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isCouple}
                          onChange={(e) => setIsCouple(e.target.checked)}
                          className="accent-brand"
                        />
                        <span className="text-base font-medium text-brand">I am bringing my partner or a spouse</span>
                      </label>
                    </div>

                    {isCouple && (
                      <div>
                        <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Partner's Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Spouse / Friend's name"
                          value={name2}
                          onChange={(e) => setName2(e.target.value)}
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Sensory or Physical Accessibility Needs</label>
                      <input
                        type="text"
                        placeholder="e.g. step-free access, large-print texts"
                        value={accessibilityNotes}
                        onChange={(e) => setAccessibilityNotes(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Dietary Restrictions (Pastry tastings)</label>
                      <input
                        type="text"
                        placeholder="e.g. gluten-free, dairy-free"
                        value={dietaryNotes}
                        onChange={(e) => setDietaryNotes(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={selectedClass.spotsLeft === 0}
                      className="brand-button w-full disabled:opacity-50"
                    >
                      {selectedClass.spotsLeft === 0 ? "Class Full" : "Register Attendance"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
