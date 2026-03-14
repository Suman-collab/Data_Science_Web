/**
 * Footer Component - Green/black hacker-themed footer
 */
import { Link } from "react-router-dom";
import { Terminal, Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    Navigate: [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Events", path: "/events" },
      { label: "Blog", path: "/blog" },
    ],
    Explore: [
      { label: "Projects", path: "/projects" },
      { label: "Team", path: "/team" },
    ],
  };

  return (
    <footer
      style={{
        background: "#0f172a",
        borderTop: "1px solid rgba(34, 197, 94, 0.2)",
        padding: "4rem 1.5rem 2rem",
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <Terminal size={22} color="#22c55e" />
              <span className="text-gradient" style={{ fontWeight: 800, fontSize: "1.1rem" }}>
                Data Science Club
              </span>
            </div>
            <p style={{ color: "#9ca3af", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "280px" }}>
              Empowering students with data science, machine learning, and AI skills. Building the next generation of data-driven thinkers.
            </p>
            {/* Social Icons */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
              {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    color: "#9ca3af",
                    transition: "color 0.2s, transform 0.2s",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#22c55e";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#9ca3af";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4
                style={{
                  color: "#22c55e",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {section}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      style={{
                        color: "#9ca3af",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#22c55e")}
                      onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4
              style={{
                color: "#22c55e",
                fontWeight: 700,
                marginBottom: "1rem",
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Newsletter
            </h4>
            <p style={{ color: "#9ca3af", fontSize: "0.85rem", marginBottom: "1rem" }}>
              Stay updated with our latest events and articles.
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <input
                type="email"
                placeholder="your@email.com"
                className="input-field"
                style={{ flex: 1, minWidth: "140px", fontSize: "0.85rem", padding: "0.5rem 0.75rem" }}
              />
              <button className="btn-glow" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="green-divider" />

        {/* Copyright */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>
            © {currentYear} Data Science Club. All rights reserved.
          </p>
          <p style={{ color: "#4b5563", fontSize: "0.75rem", fontFamily: "monospace" }}>
            &gt; built_with(React + Node.js + MongoDB)
          </p>
        </div>
      </div>
    </footer>
  );
}
