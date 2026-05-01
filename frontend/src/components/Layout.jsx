import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold">
            Team Task Manager
          </Link>
          <nav className="flex items-center gap-4">
            <NavLink to="/dashboard" className="text-sm hover:text-cyan-300">
              Dashboard
            </NavLink>
            <NavLink to="/projects" className="text-sm hover:text-cyan-300">
              Projects
            </NavLink>
            <span className="rounded bg-slate-800 px-3 py-1 text-xs uppercase">{user?.role}</span>
            <button onClick={logout} className="rounded bg-rose-500 px-3 py-1 text-sm">
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-4">{children}</main>
    </div>
  );
};

export default Layout;
