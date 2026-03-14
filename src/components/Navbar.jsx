/**
 * Navbar Component - Navigation with green/black hacker theme
 */
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  Terminal,
  LogOut,
  LayoutDashboard,
  User,
} from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Events", path: "/events" },
  { label: "Blog", path: "/blog" },
  { label: "Projects", path: "/projects" },
  { label: "Team", path: "/team" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(34, 197, 94, 0.2)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "4rem",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
          }}
        >
          <Terminal size={24} color="#22c55e" />
          <span
            className="text-gradient"
            style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "0.05em" }}
          >
            DSC
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div
          className="hidden md:flex"
          style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: "0.4rem 0.9rem",
                borderRadius: "0.375rem",
                fontSize: "0.9rem",
                fontWeight: 500,
                textDecoration: "none",
                color: pathname === link.path ? "#22c55e" : "#9ca3af",
                background:
                  pathname === link.path
                    ? "rgba(34, 197, 94, 0.1)"
                    : "transparent",
                transition: "all 0.2s ease",
                borderBottom:
                  pathname === link.path ? "1px solid #22c55e" : "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (pathname !== link.path) e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                if (pathname !== link.path) e.target.style.color = "#9ca3af";
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Area */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin">
                  <button className="btn-outline" style={{ padding: "0.35rem 0.8rem", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <LayoutDashboard size={14} />
                    Admin
                  </button>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="btn-glow"
                style={{ padding: "0.35rem 0.8rem", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.3rem" }}
              >
                <LogOut size={14} />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="btn-glow" style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}>
                Login
              </button>
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#22c55e",
              padding: "0.25rem",
            }}
            className="mobile-menu-btn"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              overflow: "hidden",
              borderTop: "1px solid rgba(34, 197, 94, 0.15)",
              background: "rgba(0, 0, 0, 0.97)",
            }}
          >
            <div style={{ padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: "0.6rem 1rem",
                    borderRadius: "0.375rem",
                    textDecoration: "none",
                    color: pathname === link.path ? "#22c55e" : "#9ca3af",
                    background:
                      pathname === link.path
                        ? "rgba(34, 197, 94, 0.1)"
                        : "transparent",
                    fontWeight: 500,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .hidden { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
