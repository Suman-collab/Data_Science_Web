/**
 * Home Page - Hero + Club Intro + Upcoming Events + Featured Projects + CTA
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { eventsAPI, projectsAPI } from "../services/api";
import EventCard from "../components/EventCard";
import ProjectCard from "../components/ProjectCard";
import { Terminal, Database, Brain, TrendingUp, ChevronRight } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

/* ── Typing effect hook ── */
function useTypingEffect(words, speed = 100) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text === current) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setWordIndex((i) => i + 1);
        }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed]);

  return text;
}

/* ── Mini sparkline chart ── */
const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [12, 28, 22, 45, 38, 60],
      fill: true,
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      borderColor: "#22c55e",
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: "#22c55e",
    },
  ],
};
const chartOptions = {
  responsive: true,
  plugins: { legend: { display: false }, tooltip: { mode: "index" } },
  scales: { x: { display: false }, y: { display: false } },
};

const stats = [
  { icon: <Terminal size={28} color="#22c55e" />, value: "200+", label: "Active Members" },
  { icon: <Database size={28} color="#22c55e" />, value: "50+", label: "Projects" },
  { icon: <Brain size={28} color="#22c55e" />, value: "100+", label: "Events Hosted" },
  { icon: <TrendingUp size={28} color="#22c55e" />, value: "95%", label: "Placement Rate" },
];

export default function Home() {
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);
  const typedText = useTypingEffect(
    ["Data Science", "Machine Learning", "Deep Learning", "AI Research", "Data Analytics"],
    90
  );

  useEffect(() => {
    eventsAPI.getAll().then((r) => setEvents(r.data.slice(0, 3))).catch(() => {});
    projectsAPI.getAll().then((r) => setProjects(r.data.filter((p) => p.featured).slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div>
      {/* ── Hero Section ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "8rem 1.5rem 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(34,197,94,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.05) 1px,transparent 1px)",
            backgroundSize: "50px 50px",
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="tag-badge" style={{ fontSize: "0.8rem", marginBottom: "1.5rem", display: "inline-block" }}>
            🟢 Welcome to the future of data
          </span>

          <h1
            className="glow-green"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: "1rem",
              color: "#22c55e",
            }}
          >
            DATA SCIENCE<br />
            <span style={{ color: "#fff" }}>CLUB</span>
          </h1>

          <div
            style={{
              fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
              color: "#9ca3af",
              marginBottom: "2rem",
              minHeight: "2.5rem",
            }}
          >
            Mastering{" "}
            <span style={{ color: "#22c55e", fontWeight: 700 }}>
              {typedText}
              <span className="animate-blink" style={{ marginLeft: "2px", borderRight: "2px solid #22c55e" }}>&nbsp;</span>
            </span>
          </div>

          <p style={{ color: "#9ca3af", maxWidth: "560px", margin: "0 auto 2.5rem", lineHeight: 1.8, fontSize: "1rem" }}>
            A university organization empowering students with real-world data science skills,
            AI research, and industry connections.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/events">
              <button className="btn-glow" style={{ padding: "0.8rem 2rem", fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Join an Event <ChevronRight size={16} />
              </button>
            </Link>
            <Link to="/about">
              <button className="btn-outline" style={{ padding: "0.8rem 2rem", fontSize: "1rem" }}>
                Learn More
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Chart card floating */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            marginTop: "4rem",
            padding: "1.5rem",
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <TrendingUp size={16} color="#22c55e" />
            <span style={{ color: "#22c55e", fontSize: "0.8rem", fontWeight: 600, fontFamily: "monospace" }}>
              member_growth.chart
            </span>
          </div>
          <Line data={chartData} options={chartOptions} height={80} />
        </motion.div>
      </section>

      {/* ── Stats Section ── */}
      <section style={{ padding: "4rem 1.5rem", background: "rgba(15,23,42,0.5)" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="glass-card"
              style={{ padding: "2rem", textAlign: "center" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div style={{ marginBottom: "0.75rem" }}>{stat.icon}</div>
              <p style={{ fontSize: "2rem", fontWeight: 800, color: "#22c55e" }}>{stat.value}</p>
              <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
            <h2 className="section-title">Upcoming Events</h2>
            <Link to="/events">
              <button className="btn-outline" style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem" }}>
                View All <ChevronRight size={14} />
              </button>
            </Link>
          </div>
          {events.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {events.map((event) => <EventCard key={event._id} event={event} />)}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: "3rem", textAlign: "center", color: "#6b7280" }}>
              <Terminal size={40} style={{ margin: "0 auto 1rem" }} color="rgba(34,197,94,0.3)" />
              <p>No events yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section style={{ padding: "5rem 1.5rem", background: "rgba(15,23,42,0.3)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
            <h2 className="section-title">Featured Projects</h2>
            <Link to="/projects">
              <button className="btn-outline" style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem" }}>
                View All <ChevronRight size={14} />
              </button>
            </Link>
          </div>
          {projects.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {projects.map((project) => <ProjectCard key={project._id} project={project} />)}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: "3rem", textAlign: "center", color: "#6b7280" }}>
              <p>Featured projects coming soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section style={{ padding: "6rem 1.5rem", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            padding: "3rem 2rem",
            background: "radial-gradient(circle at center, rgba(34,197,94,0.08) 0%, transparent 70%)",
            border: "1px solid rgba(34,197,94,0.2)",
            borderRadius: "1.5rem",
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", marginBottom: "1rem" }}>
            Ready to{" "}
            <span className="text-gradient">Level Up?</span>
          </h2>
          <p style={{ color: "#9ca3af", marginBottom: "2rem", lineHeight: 1.7 }}>
            Join Data Science Club and connect with like-minded students passionate about data, AI, and building real-world projects.
          </p>
          <Link to="/events">
            <button className="btn-glow" style={{ padding: "0.9rem 2.5rem", fontSize: "1rem" }}>
              Get Involved
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
