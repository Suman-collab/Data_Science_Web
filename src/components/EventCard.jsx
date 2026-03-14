/**
 * EventCard - Displays a club event with date, location, and registration link
 */
import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

export default function EventCard({ event }) {
  const eventDate = new Date(event.date);
  const isUpcoming = eventDate >= new Date();
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      className="glass-card"
      style={{ overflow: "hidden" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Poster */}
      {event.poster && (
        <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
          <img
            src={event.poster}
            alt={event.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }} />
          <span
            style={{
              position: "absolute",
              top: "0.75rem",
              right: "0.75rem",
              padding: "0.2rem 0.6rem",
              borderRadius: "999px",
              fontSize: "0.7rem",
              fontWeight: 700,
              background: isUpcoming ? "rgba(34, 197, 94, 0.9)" : "rgba(107, 114, 128, 0.9)",
              color: isUpcoming ? "#000" : "#fff",
            }}
          >
            {isUpcoming ? "UPCOMING" : "PAST"}
          </span>
        </div>
      )}

      <div style={{ padding: "1.25rem" }}>
        <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: "0.75rem", lineHeight: 1.4 }}>
          {event.title}
        </h3>

        <p style={{ color: "#9ca3af", fontSize: "0.85rem", marginBottom: "1rem", lineHeight: 1.6 }}>
          {event.description?.slice(0, 100)}...
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#22c55e", fontSize: "0.82rem" }}>
            <Calendar size={13} />
            <span>{formattedDate}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#9ca3af", fontSize: "0.82rem" }}>
            <MapPin size={13} />
            <span>{event.location}</span>
          </div>
        </div>

        {event.registrationLink && isUpcoming && (
          <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
            <button className="btn-glow" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "0.85rem" }}>
              Register <ExternalLink size={13} />
            </button>
          </a>
        )}
      </div>
    </motion.div>
  );
}
