/**
 * Projects Page - Student project showcase
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { projectsAPI } from "../services/api";
import ProjectCard from "../components/ProjectCard";
import { Code2, Search } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [techFilter, setTechFilter] = useState("All");

  useEffect(() => {
    projectsAPI.getAll().then((r) => setProjects(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  // Collect unique techs
  const allTechs = ["All", ...new Set(projects.flatMap((p) => p.technologies || []))];

  const filtered = projects.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchTech = techFilter === "All" || p.technologies?.includes(techFilter);
    return matchSearch && matchTech;
  });

  return (
    <div style={{ paddingTop: "4rem" }}>
      <section style={{ padding: "5rem 1.5rem 3rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <span className="tag-badge" style={{ marginBottom: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <Code2 size={12} /> Projects
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff" }}>
              Student <span className="text-gradient">Projects</span>
            </h1>
            <p style={{ color: "#9ca3af", marginTop: "0.5rem" }}>
              Explore what our members are building — from ML models to data dashboards.
            </p>
          </div>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: "400px", marginBottom: "1.5rem" }}>
            <Search size={16} color="#6b7280" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              className="input-field"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "2.25rem" }}
            />
          </div>

          {/* Tech Filter Chips */}
          {allTechs.length > 1 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
              {allTechs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setTechFilter(tech)}
                  style={{
                    padding: "0.3rem 0.9rem",
                    borderRadius: "999px",
                    border: "1px solid",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    background: techFilter === tech ? "rgba(34,197,94,0.15)" : "transparent",
                    borderColor: techFilter === tech ? "#22c55e" : "rgba(34,197,94,0.2)",
                    color: techFilter === tech ? "#22c55e" : "#9ca3af",
                    transition: "all 0.2s",
                  }}
                >
                  {tech}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {[1, 2, 3].map((i) => <div key={i} className="glass-card" style={{ height: "320px" }} />)}
            </div>
          ) : filtered.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {filtered.map((p) => <ProjectCard key={p._id} project={p} />)}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: "4rem", textAlign: "center", color: "#6b7280" }}>
              <Code2 size={48} style={{ margin: "0 auto 1rem" }} color="rgba(34,197,94,0.3)" />
              <p>No projects found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
