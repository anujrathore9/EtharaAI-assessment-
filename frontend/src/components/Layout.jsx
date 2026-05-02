import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Team Task Manager
            </Link>
          </motion.div>

          <nav className="flex items-center gap-6">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-200 hover:text-blue-600 ${
                  isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-slate-600"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-200 hover:text-blue-600 ${
                  isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-slate-600"
                }`
              }
            >
              Projects
            </NavLink>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 text-xs font-medium text-white uppercase shadow-sm">
                {user?.role}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:shadow-md transition-all duration-200"
              >
                Logout
              </motion.button>
            </div>
          </nav>
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
