/**
 * Blog Page - Data science articles listing + individual post view
 */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { blogsAPI } from "../services/api";
import BlogCard from "../components/BlogCard";
import { BookOpen, Search, ArrowLeft } from "lucide-react";

/* ── Blog list ── */
export function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    blogsAPI.getAll().then((r) => setBlogs(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ paddingTop: "4rem" }}>
      <section style={{ padding: "5rem 1.5rem 3rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <span className="tag-badge" style={{ marginBottom: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <BookOpen size={12} /> Blog
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff" }}>
              DS <span className="text-gradient">Articles</span>
            </h1>
            <p style={{ color: "#9ca3af", marginTop: "0.5rem" }}>
              Tutorials, research insights, and data science deep-dives.
            </p>
          </div>

          <div style={{ position: "relative", maxWidth: "480px", marginBottom: "2rem" }}>
            <Search size={16} color="#6b7280" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              className="input-field"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "2.25rem" }}
            />
          </div>

          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {[1, 2, 3].map((i) => <div key={i} className="glass-card" style={{ height: "300px" }} />)}
            </div>
          ) : filtered.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {filtered.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: "4rem", textAlign: "center", color: "#6b7280" }}>
              <BookOpen size={48} style={{ margin: "0 auto 1rem" }} color="rgba(34,197,94,0.3)" />
              <p>No articles found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ── Single Blog Post ── */
export function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogsAPI.getById(id).then((r) => setBlog(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ paddingTop: "8rem", textAlign: "center" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid rgba(34,197,94,0.3)", borderTopColor: "#22c55e", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto" }} />
      </div>
    );
  }

  if (!blog) {
    return (
      <div style={{ paddingTop: "8rem", textAlign: "center" }}>
        <p style={{ color: "#9ca3af" }}>Blog post not found.</p>
        <Link to="/blog"><button className="btn-outline" style={{ marginTop: "1rem" }}>Back to Blog</button></Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "4rem" }}>
      {blog.coverImage && (
        <div style={{ height: "400px", overflow: "hidden", position: "relative" }}>
          <img src={blog.coverImage} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000 30%, transparent)" }} />
        </div>
      )}

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <Link to="/blog">
          <button className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", marginBottom: "2rem" }}>
            <ArrowLeft size={14} /> Back to Blog
          </button>
        </Link>

        {blog.tags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            {blog.tags.map((tag) => <span key={tag} className="tag-badge">{tag}</span>)}
          </div>
        )}

        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: "#fff", marginBottom: "1rem", lineHeight: 1.2 }}>
          {blog.title}
        </h1>

        <div style={{ display: "flex", gap: "1rem", color: "#6b7280", fontSize: "0.85rem", marginBottom: "3rem" }}>
          <span>By {blog.author}</span>
          <span>•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
        </div>

        <div
          style={{
            color: "#d1d5db",
            lineHeight: 1.9,
            fontSize: "1rem",
          }}
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", margin: "2rem 0 1rem" }}>{children}</h1>,
              h2: ({ children }) => <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#22c55e", margin: "1.5rem 0 0.75rem" }}>{children}</h2>,
              h3: ({ children }) => <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", margin: "1.25rem 0 0.5rem" }}>{children}</h3>,
              p: ({ children }) => <p style={{ marginBottom: "1.25rem" }}>{children}</p>,
              code: ({ children }) => <code style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", padding: "0.15rem 0.4rem", borderRadius: "0.3rem", fontFamily: "monospace" }}>{children}</code>,
              pre: ({ children }) => <pre style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "0.5rem", padding: "1.25rem", overflowX: "auto", marginBottom: "1.5rem" }}>{children}</pre>,
              ul: ({ children }) => <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.25rem" }}>{children}</ul>,
              li: ({ children }) => <li style={{ marginBottom: "0.4rem" }}>{children}</li>,
              blockquote: ({ children }) => <blockquote style={{ borderLeft: "3px solid #22c55e", paddingLeft: "1rem", color: "#9ca3af", margin: "1.5rem 0", fontStyle: "italic" }}>{children}</blockquote>,
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default BlogList;
