import React, { useState } from "react";
import { useApp } from "../utils/store";
import { Plus, Trash, Eye, Check, Users, Mail, DollarSign, Calendar, Sliders } from "lucide-react";

export const AdminPanel: React.FC = () => {
  const {
    classes,
    rsvps,
    subscribers,
    messages,
    donations,
    goalRaised,
    goalTarget,
    addClass,
    deleteClass
  } = useApp();

  const [activeTab, setActiveTab] = useState<"classes" | "rsvps" | "subscribers" | "donations" | "messages">("rsvps");

  // Form states for creating a class
  const [title, setTitle] = useState("");
  const [teacher, setTeacher] = useState("Rabbi Mark Asher Goodman");
  const [day, setDay] = useState("Tuesdays");
  const [time, setTime] = useState("7:00 PM - 8:30 PM");
  const [cost, setCost] = useState(18);
  const [level, setLevel] = useState<"Beginner" | "Intermediate" | "Intermediate Text Study" | "Advanced Text Study" | "Experiential Workshop">("Beginner");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [whatToExpect, setWhatToExpect] = useState("");
  const [accessibility, setAccessibility] = useState("Wheelchair accessible, step-free access.");
  const [totalSpots, setTotalSpots] = useState(15);
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop");
  const [date, setDate] = useState("Weekly starting soon");
  const [location, setLocation] = useState("4300 Murray Ave, Pittsburgh");

  const [showAddForm, setShowAddForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    addClass({
      title,
      teacher,
      day,
      time,
      cost,
      level,
      description,
      longDescription: longDescription || description,
      whatToExpect: whatToExpect || "Group text study and conversation over fresh coffee.",
      accessibility,
      spotsLeft: totalSpots,
      totalSpots,
      imageUrl,
      date,
      location
    });

    setTitle("");
    setDescription("");
    setLongDescription("");
    setWhatToExpect("");
    setShowAddForm(false);
    setSuccessMsg("Class added successfully! It is now live under Classes & Events.");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-20 min-h-screen">
      <div className="bg-white rounded-3xl border border-brand/15 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-100 pb-6 mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-brand text-base font-medium mb-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>Shoresh Dashboard</span>
            </div>
            <h1 className="text-3xl font-serif font-medium text-brand">
              Shtibl Preview Admin
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              Local demonstration data only. This is not an authenticated production admin panel.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-stone-400">Total Funds Raised</p>
              <p className="text-lg font-semibold text-brand">
                ${goalRaised.toLocaleString()} / ${goalTarget.toLocaleString()}
              </p>
            </div>
            <div className="h-10 w-[1px] bg-stone-200 hidden sm:block" />
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="brand-button"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Class</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="mb-6 p-4 bg-brand-soft border border-brand/15 rounded-2xl flex items-center gap-3 text-brand text-base font-medium" role="status">
            <Check className="w-5 h-5 text-brand shrink-0" />
            <p>{successMsg}</p>
          </div>
        )}

        {/* Add Class Form Overlay */}
        {showAddForm && (
          <form onSubmit={handleAddClass} className="mb-10 p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
            <h3 className="font-serif text-2xl font-medium text-brand">Create a New Jewish Learning Event</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Class Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Intro to Hassidut"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Teacher *</label>
                <select
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                >
                  <option value="Rabbi Mark Asher Goodman">Rabbi Mark Asher Goodman</option>
                  <option value="Frances Lasday">Frances Lasday</option>
                  <option value="Guest Scholar">Guest Scholar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Day of Week *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Tuesdays"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Time Range *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 10:00 AM - 11:30 AM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Suggested Donation ($) *</label>
                <input
                  type="number"
                  required
                  value={cost}
                  onChange={(e) => setCost(parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Level *</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as any)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Intermediate Text Study">Intermediate Text Study</option>
                  <option value="Advanced Text Study">Advanced Text Study</option>
                  <option value="Experiential Workshop">Experiential Workshop</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Total Class Capacity *</label>
                <input
                  type="number"
                  required
                  value={totalSpots}
                  onChange={(e) => setTotalSpots(parseInt(e.target.value) || 15)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Specific Start Date / Frequency</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                  placeholder="e.g. Weekly on Tuesdays"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Physical Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                  placeholder="e.g. 4300 Murray Ave"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Accessibility Details</label>
                <input
                  type="text"
                  value={accessibility}
                  onChange={(e) => setAccessibility(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                  placeholder="e.g. Wheelchair accessible"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Short Card Description *</label>
              <textarea
                required
                rows={2}
                placeholder="A high-level sentence summarizing the class content."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Full Detailed Class Curriculum / Syllabus</label>
              <textarea
                rows={3}
                placeholder="Detailed outline of topics covered, materials used, etc."
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-1">What to Expect & Preparation</label>
              <textarea
                rows={2}
                placeholder="e.g., Reading translations, cozy conversational atmosphere."
                value={whatToExpect}
                onChange={(e) => setWhatToExpect(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
              />
            </div>

            <div className="flex gap-3 justify-end pt-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-5 py-2.5 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-700 text-sm font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="brand-button"
              >
                Publish Class to Site
              </button>
            </div>
          </form>
        )}

        {/* Database Section Selectors */}
        <div className="flex flex-wrap gap-2 border-b border-stone-100 pb-4 mb-6">
          <button
            onClick={() => setActiveTab("rsvps")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors cursor-pointer ${
              activeTab === "rsvps" ? "bg-brand text-white" : "bg-stone-50 hover:bg-stone-100 text-brand"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Class RSVPs ({rsvps.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("classes")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors cursor-pointer ${
              activeTab === "classes" ? "bg-brand text-white" : "bg-stone-50 hover:bg-stone-100 text-brand"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Active Classes ({classes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("subscribers")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors cursor-pointer ${
              activeTab === "subscribers" ? "bg-brand text-white" : "bg-stone-50 hover:bg-stone-100 text-brand"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Newsletter List ({subscribers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("donations")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors cursor-pointer ${
              activeTab === "donations" ? "bg-brand text-white" : "bg-stone-50 hover:bg-stone-100 text-brand"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Donation Log ({donations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors cursor-pointer ${
              activeTab === "messages" ? "bg-brand text-white" : "bg-stone-50 hover:bg-stone-100 text-brand"
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Contact Messages ({messages.length})</span>
          </button>
        </div>

        {/* Database Tables rendering */}
        <div className="overflow-x-auto">
          {activeTab === "rsvps" && (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-bold uppercase text-xs">
                  <th className="py-3 px-4">Attendee(s)</th>
                  <th className="py-3 px-4">Email Address</th>
                  <th className="py-3 px-4">Class Title</th>
                  <th className="py-3 px-4">Accessibility / Dietary</th>
                  <th className="py-3 px-4">Date Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-stone-400">
                      No Class RSVPs received yet. Try RSVP-ing to a class to see it appear here!
                    </td>
                  </tr>
                ) : (
                  rsvps.map((r) => (
                    <tr key={r.id} className="hover:bg-stone-50/50">
                      <td className="py-3.5 px-4 font-semibold">
                        {r.name1} {r.name2 ? `& ${r.name2} (Partner)` : ""}
                      </td>
                      <td className="py-3.5 px-4 text-stone-500">{r.email}</td>
                      <td className="py-3.5 px-4 text-brand font-semibold">{r.classTitle}</td>
                      <td className="py-3.5 px-4 text-xs space-y-1">
                        {r.accessibilityNotes && (
                          <p><span className="font-semibold text-brand">Access:</span> {r.accessibilityNotes}</p>
                        )}
                        {r.dietaryNotes && (
                          <p><span className="font-semibold text-brand">Diet:</span> {r.dietaryNotes}</p>
                        )}
                        {!r.accessibilityNotes && !r.dietaryNotes && (
                          <span className="text-stone-400 font-light">None</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-stone-400">
                        {new Date(r.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {activeTab === "classes" && (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-bold uppercase text-xs">
                  <th className="py-3 px-4">Class Image</th>
                  <th className="py-3 px-4">Title & Level</th>
                  <th className="py-3 px-4">Instructor</th>
                  <th className="py-3 px-4">Schedule</th>
                  <th className="py-3 px-4">Spots Left</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {classes.map((c) => (
                  <tr key={c.id} className="hover:bg-stone-50/50">
                    <td className="py-3 px-4">
                      <img src={c.imageUrl} alt={c.title} className="w-12 h-12 object-cover rounded-xl" />
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-brand">{c.title}</p>
                      <span className="inline-block text-base px-2 py-0.5 rounded-full bg-brand/5 text-brand mt-1">
                        {c.level}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-stone-600">{c.teacher}</td>
                    <td className="py-3 px-4 text-stone-500">
                      <p>{c.day}</p>
                      <p className="text-xs text-stone-400">{c.time}</p>
                    </td>
                    <td className="py-3 px-4 font-semibold text-brand">
                      {c.spotsLeft} / {c.totalSpots}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => deleteClass(c.id)}
                        className="p-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                        title="Delete Class"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "subscribers" && (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-bold uppercase text-xs">
                  <th className="py-3 px-4">Email Address</th>
                  <th className="py-3 px-4">Interests Selected</th>
                  <th className="py-3 px-4">Date Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-stone-400">
                      No Newsletter subscribers yet. Fill out any footer signup or newsletter popup to populate.
                    </td>
                  </tr>
                ) : (
                  subscribers.map((s, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/50">
                      <td className="py-3.5 px-4 font-semibold">{s.email}</td>
                      <td className="py-3.5 px-4 capitalize">
                        <span className="px-2.5 py-1 rounded-full text-base font-medium bg-brand/5 text-brand">
                          {s.interest}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-stone-400">
                        {new Date(s.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {activeTab === "donations" && (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-bold uppercase text-xs">
                  <th className="py-3 px-4">Donor Name</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Frequency</th>
                  <th className="py-3 px-4">Dedicated To</th>
                  <th className="py-3 px-4">Fees Covered</th>
                  <th className="py-3 px-4">Date Logged</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {donations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-stone-400">
                      No donations registered yet. Support Shoresh on the Give & Support page to see a receipt here!
                    </td>
                  </tr>
                ) : (
                  donations.map((d) => (
                    <tr key={d.id} className="hover:bg-stone-50/50">
                      <td className="py-3.5 px-4 font-semibold text-brand">
                        {d.name} {d.isJoint && d.jointName ? `& ${d.jointName}` : ""}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-brand">${d.amount.toFixed(2)}</td>
                      <td className="py-3.5 px-4 capitalize text-stone-500">{d.frequency}</td>
                      <td className="py-3.5 px-4 text-xs">
                        {d.dedicationType && d.dedicationType !== "none" ? (
                          <p>
                            <span className="font-semibold text-brand capitalize">{d.dedicationType}:</span>{" "}
                            {d.dedicationText}
                          </p>
                        ) : (
                          <span className="text-stone-400">None</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-brand">
                        {d.coverFees ? "Yes (+2.9%)" : "No"}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-stone-400">
                        {new Date(d.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {activeTab === "messages" && (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-bold uppercase text-xs">
                  <th className="py-3 px-4">Sender Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4">Date Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-stone-400">
                      No contact form entries received yet. Try submitting a message in the Visit & Contact page!
                    </td>
                  </tr>
                ) : (
                  messages.map((m) => (
                    <tr key={m.id} className="hover:bg-stone-50/50">
                      <td className="py-3.5 px-4 font-bold">{m.name}</td>
                      <td className="py-3.5 px-4 text-stone-500">{m.email}</td>
                      <td className="py-3.5 px-4 text-stone-600 leading-relaxed text-xs max-w-xs truncate" title={m.message}>
                        {m.message}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-stone-400">
                        {new Date(m.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};
