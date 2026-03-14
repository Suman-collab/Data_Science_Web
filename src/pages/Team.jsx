/**
 * Team Page - Club member directory
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { membersAPI } from "../services/api";
import MemberCard from "../components/MemberCard";
import { Users } from "lucide-react";

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    membersAPI.getAll().then((r) => setMembers(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ paddingTop: "4rem" }}>
      <section style={{ padding: "5rem 1.5rem 3rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="tag-badge" style={{ marginBottom: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <Users size={12} /> Team
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", marginBottom: "0.5rem" }}>
              Meet the <span className="text-gradient">Team</span>
            </h1>
            <p style={{ color: "#9ca3af", marginBottom: "3rem" }}>
              The brilliant minds driving the Data Science Club forward.
            </p>
          </motion.div>

          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
              {[1, 2, 3, 4].map((i) => <div key={i} className="glass-card" style={{ height: "260px" }} />)}
            </div>
          ) : members.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
              {members.map((member, i) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <MemberCard member={member} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: "4rem", textAlign: "center", color: "#6b7280" }}>
              <Users size={48} style={{ margin: "0 auto 1rem" }} color="rgba(34,197,94,0.3)" />
              <p>Team information coming soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
