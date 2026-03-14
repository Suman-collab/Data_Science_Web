/**
 * Admin Dashboard - Full CMS for Events, Blogs, Members, Projects + Analytics
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { eventsAPI, blogsAPI, membersAPI, projectsAPI } from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import {
  LayoutDashboard, Calendar, BookOpen, Users, Code2,
  Plus, Trash2, BarChart3, TrendingUp, Terminal, LogOut
} from "lucide-react";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  PointElement, LineElement, ArcElement, Tooltip, Legend, Filler
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler);

/* ── Typing Spinner ── */
const Spinner = () => (
  <div style={{ width: "20px", height: "20px", border: "2px solid rgba(34,197,94,0.3)", borderTopColor: "#22c55e", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
);

/* ── Tab Config ── */
const TABS = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={16} /> },
  { id: "events", label: "Events", icon: <Calendar size={16} /> },
  { id: "blogs", label: "Blogs", icon: <BookOpen size={16} /> },
  { id: "members", label: "Members", icon: <Users size={16} /> },
  { id: "projects", label: "Projects", icon: <Code2 size={16} /> },
];

/* ── Simple Text Input ── */
const Input = ({ label, ...props }) => (
  <div>
    {label && <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.35rem" }}>{label}</label>}
    <input className="input-field" {...props} />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    {label && <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.35rem" }}>{label}</label>}
    <textarea className="input-field" {...props} style={{ minHeight: "100px", resize: "vertical", ...(props.style || {}) }} />
  </div>
);

export default function AdminDashboard() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState({});

  // Guard - admin only
  useEffect(() => {
    if (!user || !isAdmin) navigate("/login");
  }, [user, isAdmin]);

  // Load all data
  useEffect(() => {
    eventsAPI.getAll().then((r) => setEvents(r.data)).catch(() => {});
    blogsAPI.getAll().then((r) => setBlogs(r.data)).catch(() => {});
    membersAPI.getAll().then((r) => setMembers(r.data)).catch(() => {});
    projectsAPI.getAll().then((r) => setProjects(r.data)).catch(() => {});
  }, []);

  /* ── Generic Delete ── */
  const handleDelete = async (api, id, setter, list, label) => {
    if (!window.confirm(`Delete this ${label}?`)) return;
    try {
      await api.delete(id);
      setter(list.filter((x) => x._id !== id));
      toast.success(`${label} deleted`);
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ── Event Form State ── */
  const [eventForm, setEventForm] = useState({ title: "", description: "", date: "", location: "", registrationLink: "" });
  const [eventFile, setEventFile] = useState(null);

  const submitEvent = async (e) => {
    e.preventDefault();
    setLoading((l) => ({ ...l, event: true }));
    try {
      const fd = new FormData();
      Object.entries(eventForm).forEach(([k, v]) => fd.append(k, v));
      if (eventFile) fd.append("poster", eventFile);
      const { data } = await eventsAPI.create(fd);
      setEvents((prev) => [data, ...prev]);
      setEventForm({ title: "", description: "", date: "", location: "", registrationLink: "" });
      setEventFile(null);
      toast.success("Event created!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading((l) => ({ ...l, event: false }));
    }
  };

  /* ── Blog Form State ── */
  const [blogForm, setBlogForm] = useState({ title: "", content: "", author: "", tags: "" });
  const [blogFile, setBlogFile] = useState(null);

  const submitBlog = async (e) => {
    e.preventDefault();
    setLoading((l) => ({ ...l, blog: true }));
    try {
      const fd = new FormData();
      fd.append("title", blogForm.title);
      fd.append("content", blogForm.content);
      fd.append("author", blogForm.author || "Data Science Club");
      fd.append("tags", JSON.stringify(blogForm.tags.split(",").map((t) => t.trim()).filter(Boolean)));
      if (blogFile) fd.append("coverImage", blogFile);
      const { data } = await blogsAPI.create(fd);
      setBlogs((prev) => [data, ...prev]);
      setBlogForm({ title: "", content: "", author: "", tags: "" });
      setBlogFile(null);
      toast.success("Blog published!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to publish blog");
    } finally {
      setLoading((l) => ({ ...l, blog: false }));
    }
  };

  /* ── Member Form State ── */
  const [memberForm, setMemberForm] = useState({ name: "", position: "", bio: "", linkedin: "", github: "" });
  const [memberFile, setMemberFile] = useState(null);

  const submitMember = async (e) => {
    e.preventDefault();
    setLoading((l) => ({ ...l, member: true }));
    try {
      const fd = new FormData();
      Object.entries(memberForm).forEach(([k, v]) => fd.append(k, v));
      if (memberFile) fd.append("image", memberFile);
      const { data } = await membersAPI.create(fd);
      setMembers((prev) => [data, ...prev]);
      setMemberForm({ name: "", position: "", bio: "", linkedin: "", github: "" });
      setMemberFile(null);
      toast.success("Member added!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add member");
    } finally {
      setLoading((l) => ({ ...l, member: false }));
    }
  };

  /* ── Project Form State ── */
  const [projectForm, setProjectForm] = useState({ title: "", description: "", technologies: "", githubLink: "", demoLink: "", featured: false });
  const [projectFile, setProjectFile] = useState(null);

  const submitProject = async (e) => {
    e.preventDefault();
    setLoading((l) => ({ ...l, project: true }));
    try {
      const fd = new FormData();
      fd.append("title", projectForm.title);
      fd.append("description", projectForm.description);
      fd.append("technologies", JSON.stringify(projectForm.technologies.split(",").map((t) => t.trim()).filter(Boolean)));
      fd.append("githubLink", projectForm.githubLink);
      fd.append("demoLink", projectForm.demoLink);
      fd.append("featured", projectForm.featured.toString());
      if (projectFile) fd.append("image", projectFile);
      const { data } = await projectsAPI.create(fd);
      setProjects((prev) => [data, ...prev]);
      setProjectForm({ title: "", description: "", technologies: "", githubLink: "", demoLink: "", featured: false });
      setProjectFile(null);
      toast.success("Project added!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add project");
    } finally {
      setLoading((l) => ({ ...l, project: false }));
    }
  };

  /* ── Chart Data ── */
  const barData = {
    labels: ["Events", "Blogs", "Members", "Projects"],
    datasets: [{
      label: "Count",
      data: [events.length, blogs.length, members.length, projects.length],
      backgroundColor: ["rgba(34,197,94,0.7)", "rgba(74,222,128,0.7)", "rgba(22,163,74,0.7)", "rgba(21,128,61,0.7)"],
      borderColor: "#22c55e",
      borderWidth: 1,
      borderRadius: 6,
    }],
  };

  const doughnutData = {
    labels: ["Events", "Blogs", "Members", "Projects"],
    datasets: [{
      data: [events.length || 1, blogs.length || 1, members.length || 1, projects.length || 1],
      backgroundColor: ["#22c55e", "#4ade80", "#16a34a", "#166534"],
      borderColor: "#0f172a",
      borderWidth: 2,
    }],
  };

  const chartOpts = {
    responsive: true,
    plugins: { legend: { labels: { color: "#9ca3af", font: { size: 11 } } } },
    scales: {
      x: { ticks: { color: "#6b7280" }, grid: { color: "rgba(34,197,94,0.05)" } },
      y: { ticks: { color: "#6b7280" }, grid: { color: "rgba(34,197,94,0.05)" } },
    },
  };

  /* ── Shared Styles ── */
  const formCard = { padding: "2rem", marginBottom: "2rem" };
  const listItem = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.9rem 1rem",
    borderBottom: "1px solid rgba(34,197,94,0.1)",
  };

  const fileLabel = {
    display: "inline-block",
    padding: "0.4rem 0.85rem",
    border: "1px dashed rgba(34,197,94,0.4)",
    borderRadius: "0.5rem",
    color: "#22c55e",
    cursor: "pointer",
    fontSize: "0.8rem",
    marginTop: "0.25rem",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: "4rem", background: "#000" }}>
      <Toaster position="top-right" toastOptions={{ style: { background: "#0f172a", color: "#fff", border: "1px solid rgba(34,197,94,0.3)" } }} />

      {/* ── Sidebar ── */}
      <aside
        style={{
          width: "220px",
          minHeight: "calc(100vh - 4rem)",
          background: "rgba(15,23,42,0.95)",
          borderRight: "1px solid rgba(34,197,94,0.15)",
          padding: "1.5rem 0",
          position: "sticky",
          top: "4rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "0 1rem 1.5rem", borderBottom: "1px solid rgba(34,197,94,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Terminal size={18} color="#22c55e" />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>Admin Panel</span>
          </div>
          <p style={{ color: "#6b7280", fontSize: "0.75rem", marginTop: "0.25rem" }}>{user?.name}</p>
        </div>

        <nav style={{ flex: 1, padding: "1rem 0" }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                padding: "0.7rem 1rem",
                background: activeTab === tab.id ? "rgba(34,197,94,0.1)" : "transparent",
                border: "none",
                borderLeft: activeTab === tab.id ? "3px solid #22c55e" : "3px solid transparent",
                color: activeTab === tab.id ? "#22c55e" : "#9ca3af",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "0.88rem",
                fontWeight: activeTab === tab.id ? 600 : 400,
                transition: "all 0.2s",
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => { logout(); navigate("/"); }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1rem",
            background: "transparent",
            border: "none",
            color: "#6b7280",
            cursor: "pointer",
            fontSize: "0.85rem",
            borderTop: "1px solid rgba(34,197,94,0.1)",
          }}
        >
          <LogOut size={15} /> Logout
        </button>
      </aside>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, padding: "2rem", overflowX: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

            {/* ── Overview ── */}
            {activeTab === "overview" && (
              <div>
                <h1 style={{ fontWeight: 800, fontSize: "1.6rem", color: "#fff", marginBottom: "0.5rem" }}>Dashboard Overview</h1>
                <p style={{ color: "#6b7280", marginBottom: "2rem", fontSize: "0.9rem" }}>All club statistics at a glance.</p>

                {/* Stat Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
                  {[
                    { label: "Events", value: events.length, icon: <Calendar size={20} color="#22c55e" /> },
                    { label: "Blogs", value: blogs.length, icon: <BookOpen size={20} color="#22c55e" /> },
                    { label: "Members", value: members.length, icon: <Users size={20} color="#22c55e" /> },
                    { label: "Projects", value: projects.length, icon: <Code2 size={20} color="#22c55e" /> },
                  ].map((s, i) => (
                    <div key={i} className="glass-card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                      {s.icon}
                      <div>
                        <p style={{ fontSize: "1.6rem", fontWeight: 800, color: "#22c55e", lineHeight: 1 }}>{s.value}</p>
                        <p style={{ color: "#9ca3af", fontSize: "0.8rem" }}>{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Charts */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                  <div className="glass-card" style={{ padding: "1.5rem" }}>
                    <h3 style={{ color: "#fff", fontWeight: 600, marginBottom: "1rem", fontSize: "0.95rem" }}>Content Overview</h3>
                    <Bar data={barData} options={chartOpts} />
                  </div>
                  <div className="glass-card" style={{ padding: "1.5rem" }}>
                    <h3 style={{ color: "#fff", fontWeight: 600, marginBottom: "1rem", fontSize: "0.95rem" }}>Distribution</h3>
                    <Doughnut data={doughnutData} options={{ ...chartOpts, scales: undefined }} />
                  </div>
                </div>
              </div>
            )}

            {/* ── Events Tab ── */}
            {activeTab === "events" && (
              <div>
                <h1 style={{ fontWeight: 800, fontSize: "1.4rem", color: "#fff", marginBottom: "2rem" }}>Manage Events</h1>

                {/* Create Form */}
                <div className="glass-card" style={formCard}>
                  <h2 style={{ color: "#22c55e", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem" }}>
                    <Plus size={16} /> New Event
                  </h2>
                  <form onSubmit={submitEvent} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
                    <Input label="Title*" placeholder="Event title" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required />
                    <Input label="Date*" type="datetime-local" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} required />
                    <Input label="Location" placeholder="Hall A / Online" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} />
                    <Input label="Registration Link" placeholder="https://..." value={eventForm.registrationLink} onChange={(e) => setEventForm({ ...eventForm, registrationLink: e.target.value })} />
                    <div style={{ gridColumn: "1/-1" }}>
                      <Textarea label="Description*" placeholder="Event description..." value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} required />
                    </div>
                    <div>
                      <label style={{ color: "#9ca3af", fontSize: "0.82rem" }}>Event Poster</label>
                      <br />
                      <label style={fileLabel}>
                        {eventFile ? eventFile.name : "Choose image"}
                        <input type="file" accept="image/*" onChange={(e) => setEventFile(e.target.files[0])} style={{ display: "none" }} />
                      </label>
                    </div>
                    <div style={{ gridColumn: "1/-1" }}>
                      <button type="submit" className="btn-glow" disabled={loading.event} style={{ padding: "0.6rem 1.5rem" }}>
                        {loading.event ? <Spinner /> : "Create Event"}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Events List */}
                <div className="glass-card" style={{ overflow: "hidden" }}>
                  <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(34,197,94,0.1)" }}>
                    <h3 style={{ color: "#fff", fontWeight: 600 }}>All Events ({events.length})</h3>
                  </div>
                  {events.length === 0 ? (
                    <p style={{ padding: "2rem", color: "#6b7280", textAlign: "center" }}>No events yet.</p>
                  ) : (
                    events.map((ev) => (
                      <div key={ev._id} style={listItem}>
                        <div>
                          <p style={{ color: "#fff", fontWeight: 500, fontSize: "0.9rem" }}>{ev.title}</p>
                          <p style={{ color: "#6b7280", fontSize: "0.78rem" }}>{new Date(ev.date).toLocaleDateString()} · {ev.location}</p>
                        </div>
                        <button onClick={() => handleDelete(eventsAPI, ev._id, setEvents, events, "event")} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", borderRadius: "0.4rem", padding: "0.3rem 0.5rem", cursor: "pointer" }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ── Blogs Tab ── */}
            {activeTab === "blogs" && (
              <div>
                <h1 style={{ fontWeight: 800, fontSize: "1.4rem", color: "#fff", marginBottom: "2rem" }}>Manage Blogs</h1>

                <div className="glass-card" style={formCard}>
                  <h2 style={{ color: "#22c55e", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem" }}>
                    <Plus size={16} /> New Article
                  </h2>
                  <form onSubmit={submitBlog} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
                      <Input label="Title*" placeholder="Article title" value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} required />
                      <Input label="Author" placeholder="Your name" value={blogForm.author} onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })} />
                      <Input label="Tags (comma separated)" placeholder="ML, Python, AI" value={blogForm.tags} onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })} />
                      <div>
                        <label style={{ color: "#9ca3af", fontSize: "0.82rem" }}>Cover Image</label>
                        <br />
                        <label style={fileLabel}>
                          {blogFile ? blogFile.name : "Choose image"}
                          <input type="file" accept="image/*" onChange={(e) => setBlogFile(e.target.files[0])} style={{ display: "none" }} />
                        </label>
                      </div>
                    </div>
                    <Textarea label="Content* (Markdown supported)" placeholder="# Article Title&#10;&#10;Write your article in **Markdown**..." value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} required style={{ minHeight: "200px" }} />
                    <div>
                      <button type="submit" className="btn-glow" disabled={loading.blog} style={{ padding: "0.6rem 1.5rem" }}>
                        {loading.blog ? <Spinner /> : "Publish Article"}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="glass-card" style={{ overflow: "hidden" }}>
                  <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(34,197,94,0.1)" }}>
                    <h3 style={{ color: "#fff", fontWeight: 600 }}>All Articles ({blogs.length})</h3>
                  </div>
                  {blogs.length === 0 ? (
                    <p style={{ padding: "2rem", color: "#6b7280", textAlign: "center" }}>No articles yet.</p>
                  ) : (
                    blogs.map((blog) => (
                      <div key={blog._id} style={listItem}>
                        <div>
                          <p style={{ color: "#fff", fontWeight: 500, fontSize: "0.9rem" }}>{blog.title}</p>
                          <p style={{ color: "#6b7280", fontSize: "0.78rem" }}>By {blog.author} · {new Date(blog.createdAt).toLocaleDateString()}</p>
                        </div>
                        <button onClick={() => handleDelete(blogsAPI, blog._id, setBlogs, blogs, "blog")} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", borderRadius: "0.4rem", padding: "0.3rem 0.5rem", cursor: "pointer" }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ── Members Tab ── */}
            {activeTab === "members" && (
              <div>
                <h1 style={{ fontWeight: 800, fontSize: "1.4rem", color: "#fff", marginBottom: "2rem" }}>Manage Members</h1>

                <div className="glass-card" style={formCard}>
                  <h2 style={{ color: "#22c55e", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem" }}>
                    <Plus size={16} /> Add Member
                  </h2>
                  <form onSubmit={submitMember} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
                    <Input label="Name*" placeholder="Full name" value={memberForm.name} onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })} required />
                    <Input label="Position*" placeholder="President / Developer" value={memberForm.position} onChange={(e) => setMemberForm({ ...memberForm, position: e.target.value })} required />
                    <Input label="LinkedIn" placeholder="https://linkedin.com/in/..." value={memberForm.linkedin} onChange={(e) => setMemberForm({ ...memberForm, linkedin: e.target.value })} />
                    <Input label="GitHub" placeholder="https://github.com/..." value={memberForm.github} onChange={(e) => setMemberForm({ ...memberForm, github: e.target.value })} />
                    <div style={{ gridColumn: "1/-1" }}>
                      <Textarea label="Bio" placeholder="Short bio..." value={memberForm.bio} onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ color: "#9ca3af", fontSize: "0.82rem" }}>Profile Photo</label>
                      <br />
                      <label style={fileLabel}>
                        {memberFile ? memberFile.name : "Choose image"}
                        <input type="file" accept="image/*" onChange={(e) => setMemberFile(e.target.files[0])} style={{ display: "none" }} />
                      </label>
                    </div>
                    <div style={{ gridColumn: "1/-1" }}>
                      <button type="submit" className="btn-glow" disabled={loading.member} style={{ padding: "0.6rem 1.5rem" }}>
                        {loading.member ? <Spinner /> : "Add Member"}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="glass-card" style={{ overflow: "hidden" }}>
                  <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(34,197,94,0.1)" }}>
                    <h3 style={{ color: "#fff", fontWeight: 600 }}>All Members ({members.length})</h3>
                  </div>
                  {members.length === 0 ? (
                    <p style={{ padding: "2rem", color: "#6b7280", textAlign: "center" }}>No members yet.</p>
                  ) : (
                    members.map((m) => (
                      <div key={m._id} style={listItem}>
                        <div>
                          <p style={{ color: "#fff", fontWeight: 500, fontSize: "0.9rem" }}>{m.name}</p>
                          <p style={{ color: "#22c55e", fontSize: "0.78rem" }}>{m.position}</p>
                        </div>
                        <button onClick={() => handleDelete(membersAPI, m._id, setMembers, members, "member")} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", borderRadius: "0.4rem", padding: "0.3rem 0.5rem", cursor: "pointer" }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ── Projects Tab ── */}
            {activeTab === "projects" && (
              <div>
                <h1 style={{ fontWeight: 800, fontSize: "1.4rem", color: "#fff", marginBottom: "2rem" }}>Manage Projects</h1>

                <div className="glass-card" style={formCard}>
                  <h2 style={{ color: "#22c55e", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem" }}>
                    <Plus size={16} /> Add Project
                  </h2>
                  <form onSubmit={submitProject} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
                    <Input label="Title*" placeholder="Project title" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} required />
                    <Input label="Technologies (comma separated)" placeholder="Python, TensorFlow, React" value={projectForm.technologies} onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })} />
                    <Input label="GitHub Link" placeholder="https://github.com/..." value={projectForm.githubLink} onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })} />
                    <Input label="Demo Link" placeholder="https://..." value={projectForm.demoLink} onChange={(e) => setProjectForm({ ...projectForm, demoLink: e.target.value })} />
                    <div style={{ gridColumn: "1/-1" }}>
                      <Textarea label="Description*" placeholder="What does this project do?" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} required />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <label style={{ color: "#9ca3af", fontSize: "0.82rem" }}>
                        <input type="checkbox" checked={projectForm.featured} onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })} style={{ marginRight: "0.4rem", accentColor: "#22c55e" }} />
                        Mark as Featured
                      </label>
                    </div>
                    <div>
                      <label style={{ color: "#9ca3af", fontSize: "0.82rem" }}>Project Image</label>
                      <br />
                      <label style={fileLabel}>
                        {projectFile ? projectFile.name : "Choose image"}
                        <input type="file" accept="image/*" onChange={(e) => setProjectFile(e.target.files[0])} style={{ display: "none" }} />
                      </label>
                    </div>
                    <div style={{ gridColumn: "1/-1" }}>
                      <button type="submit" className="btn-glow" disabled={loading.project} style={{ padding: "0.6rem 1.5rem" }}>
                        {loading.project ? <Spinner /> : "Add Project"}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="glass-card" style={{ overflow: "hidden" }}>
                  <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(34,197,94,0.1)" }}>
                    <h3 style={{ color: "#fff", fontWeight: 600 }}>All Projects ({projects.length})</h3>
                  </div>
                  {projects.length === 0 ? (
                    <p style={{ padding: "2rem", color: "#6b7280", textAlign: "center" }}>No projects yet.</p>
                  ) : (
                    projects.map((p) => (
                      <div key={p._id} style={listItem}>
                        <div>
                          <p style={{ color: "#fff", fontWeight: 500, fontSize: "0.9rem" }}>{p.title}</p>
                          <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.25rem", flexWrap: "wrap" }}>
                            {p.technologies?.slice(0, 4).map((t) => <span key={t} className="tag-badge" style={{ fontSize: "0.7rem" }}>{t}</span>)}
                          </div>
                        </div>
                        <button onClick={() => handleDelete(projectsAPI, p._id, setProjects, projects, "project")} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", borderRadius: "0.4rem", padding: "0.3rem 0.5rem", cursor: "pointer" }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
