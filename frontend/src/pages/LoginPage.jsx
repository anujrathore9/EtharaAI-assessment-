import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme } = useTheme();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      login(data);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
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
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative px-8 py-12 sm:px-12 lg:px-16 lg:py-16">
            <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/10 opacity-90 blur-3xl"></div>
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100/90 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-slate-800/80 dark:text-cyan-200">
                <span className="text-base">✨</span>
                Modern workspace experience
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
                Fast, clean task management for your team
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
                A polished UI with smart workflows, dark mode, and secure
                authentication so your team can stay productive with confidence.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    Smooth Workflow
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Organize tasks visually
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    Secure Login
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Password visibility toggle
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
            className={
              theme === "dark"
                ? "relative z-10 px-8 py-10 sm:px-10 sm:py-12"
                : "relative z-10 px-8 py-10 sm:px-10 sm:py-12"
            }
          >
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-cyan-300">
                Sign in
              </p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
                Welcome back
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            <div className="space-y-4">
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
                    placeholder="••••••••"
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
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </motion.button>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              New here?{" "}
              <Link
                className="font-semibold text-blue-600 hover:text-blue-700 dark:text-cyan-300"
                to="/signup"
              >
                Create an account
              </Link>
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
