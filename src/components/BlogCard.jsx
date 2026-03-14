/**
 * BlogCard - Displays a blog post snippet
 */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { User, Clock, ArrowRight } from "lucide-react";

export default function BlogCard({ blog }) {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const readTime = Math.ceil(blog.content?.split(" ").length / 200) || 1;

  return (
    <motion.div
      className="glass-card"
      style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Cover Image */}
      {blog.coverImage && (
        <div style={{ height: "180px", overflow: "hidden" }}>
          <img
            src={blog.coverImage}
            alt={blog.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          />
        </div>
      )}

      <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
            {blog.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-badge">{tag}</span>
            ))}
          </div>
        )}

        <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: "0.6rem", lineHeight: 1.4 }}>
          {blog.title}
        </h3>

        <p style={{ color: "#9ca3af", fontSize: "0.85rem", lineHeight: 1.6, flex: 1, marginBottom: "1rem" }}>
          {blog.content?.replace(/[#*_]/g, "").slice(0, 120)}...
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.78rem", color: "#6b7280" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <User size={12} /> {blog.author}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Clock size={12} /> {readTime} min read
            </span>
          </div>
          <Link to={`/blog/${blog._id}`} style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "transparent",
                border: "none",
                color: "#22c55e",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "0.82rem",
                fontWeight: 600,
                transition: "gap 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = "0.5rem")}
              onMouseLeave={(e) => (e.currentTarget.style.gap = "0.3rem")}
            >
              Read <ArrowRight size={13} />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
