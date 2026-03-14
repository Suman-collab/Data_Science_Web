/**
 * MemberCard - Team member profile card
 */
import { motion } from "framer-motion";
import { Github, Linkedin, User } from "lucide-react";

export default function MemberCard({ member }) {
  return (
    <motion.div
      className="glass-card"
      style={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "0.75rem",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid rgba(34, 197, 94, 0.5)",
          background: "rgba(34, 197, 94, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {member.image ? (
          <img src={member.image} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <User size={40} color="#22c55e" />
        )}
      </div>

      <div>
        <h3 style={{ fontWeight: 700, color: "#fff", fontSize: "1rem" }}>{member.name}</h3>
        <p
          style={{
            color: "#22c55e",
            fontSize: "0.8rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginTop: "0.2rem",
          }}
        >
          {member.position}
        </p>
      </div>

      {member.bio && (
        <p style={{ color: "#9ca3af", fontSize: "0.82rem", lineHeight: 1.6 }}>{member.bio}</p>
      )}

      {/* Social Links */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#6b7280", transition: "color 0.2s", display: "flex" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#22c55e")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            <Github size={18} />
          </a>
        )}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#6b7280", transition: "color 0.2s", display: "flex" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#22c55e")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            <Linkedin size={18} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
