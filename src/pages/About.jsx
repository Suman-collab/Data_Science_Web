/**
 * About Page - Mission, Vision, Faculty Advisors
 */
import { motion } from "framer-motion";
import { Target, Eye, Users, BookOpen, Award, Zap } from "lucide-react";

const values = [
  { icon: <Zap size={22} color="#22c55e" />, title: "Innovation", desc: "Pushing boundaries with cutting-edge data science research and projects." },
  { icon: <Users size={22} color="#22c55e" />, title: "Community", desc: "Building a collaborative environment where every member thrives." },
  { icon: <BookOpen size={22} color="#22c55e" />, title: "Learning", desc: "Continuous skill development through workshops, bootcamps, and projects." },
  { icon: <Award size={22} color="#22c55e" />, title: "Excellence", desc: "Setting high standards in data literacy and technical expertise." },
];

const advisors = [
  { name: "Dr. Ananya Sharma", role: "Faculty Advisor", dept: "Computer Science & Engineering", image: "" },
  { name: "Prof. Rajiv Menon", role: "Co-Advisor", dept: "Department of Statistics", image: "" },
];

export default function About() {
  return (
    <div style={{ paddingTop: "4rem" }}>
      {/* Header */}
      <section style={{ padding: "5rem 1.5rem 3rem", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="tag-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>About Us</span>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "1rem", color: "#fff" }}>
            Who We <span className="text-gradient">Are</span>
          </h1>
          <p style={{ color: "#9ca3af", maxWidth: "600px", margin: "0 auto", lineHeight: 1.8, fontSize: "1rem" }}>
            Data Science Club is a student-led organization at the forefront of data science education, research, and
            innovation within our university ecosystem.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: "3rem 1.5rem" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {[
            {
              icon: <Target size={32} color="#22c55e" />,
              title: "Our Mission",
              content:
                "To bridge the gap between academic learning and industry demands by providing students with hands-on data science experience, mentorship from industry professionals, and a platform to collaborate on real-world projects.",
            },
            {
              icon: <Eye size={32} color="#22c55e" />,
              title: "Our Vision",
              content:
                "To become the leading student data science community in the region, producing graduates who are proficient in AI/ML, equipped with critical analytical thinking, and ready to contribute to the data-driven world.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="glass-card"
              style={{ padding: "2.5rem" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div style={{ marginBottom: "1rem" }}>{item.icon}</div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: "1rem" }}>
                {item.title}
              </h2>
              <p style={{ color: "#9ca3af", lineHeight: 1.8 }}>{item.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "4rem 1.5rem", background: "rgba(15,23,42,0.4)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 className="section-title" style={{ marginBottom: "2.5rem" }}>Our Values</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.5rem" }}>
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="glass-card"
                style={{ padding: "1.75rem" }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{ marginBottom: "0.75rem" }}>{v.icon}</div>
                <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: "0.5rem" }}>{v.title}</h3>
                <p style={{ color: "#9ca3af", fontSize: "0.88rem", lineHeight: 1.6 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Advisors */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 className="section-title" style={{ marginBottom: "2.5rem" }}>Faculty Advisors</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {advisors.map((a, i) => (
              <motion.div
                key={i}
                className="glass-card"
                style={{ padding: "2rem", textAlign: "center" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(34,197,94,0.3), rgba(22,163,74,0.1))",
                    border: "2px solid rgba(34,197,94,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#22c55e",
                  }}
                >
                  {a.name.charAt(0)}
                </div>
                <h3 style={{ fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>{a.name}</h3>
                <p style={{ color: "#22c55e", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}>{a.role}</p>
                <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>{a.dept}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
