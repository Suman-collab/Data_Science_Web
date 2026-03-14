/**
 * ProjectCard - Showcases a student data science project
 */
import { motion } from "framer-motion";
import { Github, ExternalLink, Code2, Star } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      className="glass-card"
      style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Project Image / Placeholder */}
      <div style={{ height: "160px", overflow: "hidden", position: "relative" }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              height: "100%",
              background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(15, 23, 42, 0.9))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Code2 size={48} color="rgba(34, 197, 94, 0.4)" />
          </div>
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }} />
        {project.featured && (
          <span
            style={{
              position: "absolute",
              top: "0.75rem",
              right: "0.75rem",
              padding: "0.2rem 0.6rem",
              borderRadius: "999px",
              fontSize: "0.7rem",
              fontWeight: 700,
              background: "rgba(34, 197, 94, 0.9)",
              color: "#000",
              display: "flex",
              alignItems: "center",
              gap: "0.2rem",
            }}
          >
            <Star size={9} fill="#000" /> Featured
          </span>
        )}
      </div>

      <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: "0.6rem" }}>
          {project.title}
        </h3>

        <p style={{ color: "#9ca3af", fontSize: "0.85rem", lineHeight: 1.6, flex: 1, marginBottom: "1rem" }}>
          {project.description?.slice(0, 120)}...
        </p>

        {/* Tech Tags */}
        {project.technologies?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="tag-badge">{tech}</span>
            ))}
          </div>
        )}

        {/* Links */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
              <button className="btn-outline" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "0.82rem", padding: "0.45rem" }}>
                <Github size={13} /> GitHub
              </button>
            </a>
          )}
          {project.demoLink && (
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
              <button className="btn-glow" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "0.82rem", padding: "0.45rem" }}>
                <ExternalLink size={13} /> Demo
              </button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
