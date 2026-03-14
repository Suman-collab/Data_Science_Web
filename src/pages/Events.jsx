/**
 * Events Page - Lists all upcoming and past events
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { eventsAPI } from "../services/api";
import EventCard from "../components/EventCard";
import { Calendar, Search, Filter } from "lucide-react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | upcoming | past

  useEffect(() => {
    eventsAPI
      .getAll()
      .then((r) => setEvents(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const filtered = events.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const isUpcoming = new Date(e.date) >= now;
    if (filter === "upcoming") return matchSearch && isUpcoming;
    if (filter === "past") return matchSearch && !isUpcoming;
    return matchSearch;
  });

  return (
    <div style={{ paddingTop: "4rem" }}>
      <section style={{ padding: "5rem 1.5rem 3rem" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ marginBottom: "2.5rem" }}>
              <span className="tag-badge" style={{ marginBottom: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                <Calendar size={12} /> Events
              </span>
              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff" }}>
                Club <span className="text-gradient">Events</span>
              </h1>
              <p style={{ color: "#9ca3af", marginTop: "0.5rem" }}>
                Workshops, hackathons, seminars and more.
              </p>
            </div>

            {/* Search + Filter */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
              <div style={{ flex: 1, position: "relative", minWidth: "200px" }}>
                <Search size={16} color="#6b7280" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  className="input-field"
                  placeholder="Search events..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ paddingLeft: "2.25rem" }}
                />
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {["all", "upcoming", "past"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      border: "1px solid",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      textTransform: "capitalize",
                      background: filter === f ? "rgba(34,197,94,0.15)" : "transparent",
                      borderColor: filter === f ? "#22c55e" : "rgba(34,197,94,0.2)",
                      color: filter === f ? "#22c55e" : "#9ca3af",
                      transition: "all 0.2s",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="glass-card" style={{ height: "320px", background: "rgba(13,27,42,0.5)" }} />
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
                {filtered.map((event) => <EventCard key={event._id} event={event} />)}
              </div>
            ) : (
              <div className="glass-card" style={{ padding: "4rem", textAlign: "center", color: "#6b7280" }}>
                <Calendar size={48} style={{ margin: "0 auto 1rem" }} color="rgba(34,197,94,0.3)" />
                <p style={{ fontSize: "1.1rem" }}>No events found.</p>
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
