import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme } = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/signup", form);
      login(data);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={
        theme === "dark"
          ? "flex min-h-screen items-center justify-center bg-slate-950 text-slate-100 p-4"
          : "flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4"
      }
    >
      <div className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white/90 shadow-2xl shadow-slate-200/40 backdrop-blur-xl border border-white/60 dark:bg-slate-900/90 dark:border-slate-700/60">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative px-8 py-12 sm:px-12 lg:px-16 lg:py-16">
            <div className="absolute inset-y-0 right-0 hidden w-1/2 rounded-bl-[4rem] bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/10 blur-3xl lg:block"></div>
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-cyan-100/90 px-4 py-2 text-sm font-semibold text-cyan-800 dark:bg-slate-800/80 dark:text-cyan-300">
                <span className="text-lg">🚀</span>
                Build stronger teams
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
                Smart project collaboration
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
                Create accounts with confidence, choose your role, and manage
                tasks in a polished, professional interface.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    Team roles
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Member or admin access
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    Quick adoption
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Easy onboarding flow
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            onSubmit={submit}
            className="relative z-10 px-8 py-10 sm:px-10 sm:py-12"
          >
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-300">
                Create account
              </p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
                Welcome to your new workspace
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Sign up now to get access to tasks, projects, and collaboration
                tools.
              </p>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                Full name
                <input
                  className="mt-2 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  placeholder="Jane Doe"
                  required
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>

              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                Email address
                <input
                  className="mt-2 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  placeholder="you@example.com"
                  type="email"
                  required
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>

              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                Password
                <div className="relative mt-2">
                  <input
                    className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 pr-24 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="Create a strong password"
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((state) => !state)}
                    className="absolute inset-y-0 right-3 inline-flex items-center rounded-full bg-slate-100 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                Role
                <select
                  className="mt-2 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="member">Team Member</option>
                  <option value="admin">Administrator</option>
                </select>
              </label>
            </div>

            <motion.button
              type="submit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="mt-8 inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-blue-500/10 transition hover:shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </motion.button>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                className="font-semibold text-blue-600 hover:text-blue-700 dark:text-cyan-300"
                to="/login"
              >
                Sign in
              </Link>
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
