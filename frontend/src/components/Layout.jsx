import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen bg-slate-950 text-slate-100"
          : "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900"
      }
    >
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={
          theme === "dark"
            ? "bg-slate-900/95 border-b border-slate-700/50 shadow-xl"
            : "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm"
        }
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
            >
              Team Task Manager
            </Link>
          </motion.div>

          <nav className="flex flex-wrap items-center gap-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-200 hover:text-blue-400 ${
                  isActive
                    ? "text-blue-500 border-b-2 border-blue-500 pb-1"
                    : theme === "dark"
                      ? "text-slate-200"
                      : "text-slate-600"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-200 hover:text-blue-400 ${
                  isActive
                    ? "text-blue-500 border-b-2 border-blue-500 pb-1"
                    : theme === "dark"
                      ? "text-slate-200"
                      : "text-slate-600"
                }`
              }
            >
              Projects
            </NavLink>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={toggleTheme}
              className={
                theme === "dark"
                  ? "rounded-full border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 hover:bg-slate-700 transition"
                  : "rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm hover:bg-slate-50 transition"
              }
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
            <span className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 text-xs font-medium text-white uppercase shadow-sm">
              {user?.role}
            </span>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </motion.header>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto max-w-7xl p-4 lg:p-8"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
