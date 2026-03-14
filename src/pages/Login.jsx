/**
 * Login Page - Admin authentication
 */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Terminal, Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (result.success) {
      navigate(result.data.role === "admin" ? "/admin" : "/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        background: "radial-gradient(ellipse at center, rgba(34,197,94,0.06) 0%, #000 60%)",
        position: "relative",
      }}
    >
      {/* Grid BG */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(34,197,94,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.04) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <motion.div
        className="glass-card"
        style={{ width: "100%", maxWidth: "420px", padding: "2.5rem", position: "relative" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "rgba(34,197,94,0.1)",
              border: "2px solid rgba(34,197,94,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
            }}
          >
            <Terminal size={28} color="#22c55e" />
          </div>
          <h1 style={{ fontWeight: 800, fontSize: "1.6rem", color: "#fff" }}>Welcome Back</h1>
          <p style={{ color: "#9ca3af", fontSize: "0.9rem", marginTop: "0.3rem" }}>
            Sign in to Data Science Club
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "0.5rem",
              padding: "0.75rem 1rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#f87171",
              fontSize: "0.85rem",
            }}
          >
            <AlertCircle size={15} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Email */}
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.85rem", display: "block", marginBottom: "0.4rem" }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={15} color="#6b7280" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="email"
                className="input-field"
                placeholder="admin@datascienceclub.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ paddingLeft: "2.25rem" }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.85rem", display: "block", marginBottom: "0.4rem" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={15} color="#6b7280" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type={showPassword ? "text" : "password"}
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingLeft: "2.25rem", paddingRight: "2.75rem" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-glow"
            disabled={loading}
            style={{ width: "100%", padding: "0.75rem", fontSize: "0.95rem", marginTop: "0.25rem", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{ color: "#6b7280", fontSize: "0.8rem", textAlign: "center", marginTop: "1.5rem" }}>
          Don't have an account?{" "}
          <span style={{ color: "#22c55e", cursor: "pointer" }} onClick={() => {}}>
            Contact an admin
          </span>
        </p>

        <p style={{ color: "#374151", fontSize: "0.72rem", textAlign: "center", marginTop: "1rem", fontFamily: "monospace" }}>
          &gt; secure_login [ AES-256 encrypted ]
        </p>
      </motion.div>
    </div>
  );
}
