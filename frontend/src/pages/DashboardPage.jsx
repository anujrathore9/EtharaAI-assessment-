import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import api from "../api/client";
import { useTheme } from "../context/ThemeContext";

const DashboardPage = () => {
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/dashboard/stats");
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-slate-600">Loading dashboard...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section
          className={
            theme === "dark"
              ? "mb-10 rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20"
              : "mb-10 rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/50"
          }
        >
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300">
                Your workspace
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
                A clean dashboard for fast team decisions
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                Monitor progress, track overdue tasks, and stay aligned with
                modern visuals and fast interactions.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-cyan-500/10 via-slate-50 to-blue-500/10 p-6 dark:from-cyan-500/10 dark:via-slate-900 dark:to-slate-950">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl"></div>
              <div className="absolute -left-10 bottom-0 h-44 w-44 rounded-full bg-blue-400/10 blur-3xl"></div>
              <div className="relative z-10 grid gap-4 rounded-[1.5rem] border border-slate-200/70 bg-white/90 p-6 shadow-lg dark:border-slate-700/70 dark:bg-slate-950/95">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Project health
                    </p>
                    <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                      95% on track
                    </p>
                  </div>
                  <span className="rounded-2xl bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-800 dark:bg-emerald-200/10 dark:text-emerald-300">
                    Stable
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={itemVariants}>
            <StatCard
              label="Total Tasks"
              value={stats.totalTasks}
              tone="border-slate-200"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Completed"
              value={stats.completedTasks}
              tone="border-emerald-300"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Pending"
              value={stats.pendingTasks}
              tone="border-amber-300"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Overdue"
              value={stats.overdueTasks}
              tone="border-rose-300"
            />
          </motion.div>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <h2
            className={
              theme === "dark"
                ? "text-2xl font-semibold text-slate-100 mb-6"
                : "text-2xl font-semibold text-slate-900 mb-6"
            }
          >
            Quick Actions
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={
                theme === "dark"
                  ? "p-6 rounded-2xl border border-slate-800 bg-slate-900 shadow-lg shadow-slate-950/20 hover:border-slate-700"
                  : "p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md"
              }
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-2xl text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                📝
              </div>
              <h3
                className={
                  theme === "dark"
                    ? "font-semibold text-slate-100 mb-2"
                    : "font-semibold text-slate-900 mb-2"
                }
              >
                Create Task
              </h3>
              <p
                className={
                  theme === "dark"
                    ? "text-sm text-slate-400"
                    : "text-sm text-slate-600"
                }
              >
                Add a new task to your project
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={
                theme === "dark"
                  ? "p-6 rounded-2xl border border-slate-800 bg-slate-900 shadow-lg shadow-slate-950/20 hover:border-slate-700"
                  : "p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md"
              }
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 text-2xl text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                📊
              </div>
              <h3
                className={
                  theme === "dark"
                    ? "font-semibold text-slate-100 mb-2"
                    : "font-semibold text-slate-900 mb-2"
                }
              >
                View Projects
              </h3>
              <p
                className={
                  theme === "dark"
                    ? "text-sm text-slate-400"
                    : "text-sm text-slate-600"
                }
              >
                Manage your project portfolio
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={
                theme === "dark"
                  ? "p-6 rounded-2xl border border-slate-800 bg-slate-900 shadow-lg shadow-slate-950/20 hover:border-slate-700"
                  : "p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md"
              }
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 text-2xl text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                👥
              </div>
              <h3
                className={
                  theme === "dark"
                    ? "font-semibold text-slate-100 mb-2"
                    : "font-semibold text-slate-900 mb-2"
                }
              >
                Team Overview
              </h3>
              <p
                className={
                  theme === "dark"
                    ? "text-sm text-slate-400"
                    : "text-sm text-slate-600"
                }
              >
                Check team performance
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default DashboardPage;
