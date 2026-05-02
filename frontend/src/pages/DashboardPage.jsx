import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
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
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
              Loading dashboard...
            </span>
          </div>
        </div>
      </Layout>
    );
  }

  const completionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0;

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mb-12 overflow-hidden rounded-3xl p-8 md:p-12 ${
            theme === "dark"
              ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50"
              : "bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200/50"
          }`}
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="space-y-4">
                <div className="inline-block">
                  <span className={`text-xs font-bold uppercase tracking-widest ${
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  }`}>
                    📊 DASHBOARD
                  </span>
                </div>
                <h1 className={`text-5xl md:text-6xl font-black tracking-tight ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}>
                  Your Team's Pulse
                </h1>
                <p className={`text-lg leading-relaxed max-w-lg ${
                  theme === "dark" ? "text-slate-300" : "text-slate-600"
                }`}>
                  Real-time insights into project progress, task completion, and team performance. Stay informed, stay ahead.
                </p>
              </div>
            </motion.div>

            {/* Right - Project Health Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20"></div>
              <div className={`relative rounded-2xl p-8 ${
                theme === "dark"
                  ? "bg-slate-950 border border-slate-700"
                  : "bg-white border border-slate-200"
              }`}>
                <div className="space-y-6">
                  <div>
                    <p className={`text-sm font-semibold uppercase tracking-wider ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}>
                      Project Health
                    </p>
                    <p className={`text-5xl font-black mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent`}>
                      {completionRate}%
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${
                        theme === "dark" ? "text-slate-300" : "text-slate-700"
                      }`}>
                        Completion Rate
                      </span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        completionRate >= 75 
                          ? "bg-emerald-500/20 text-emerald-400"
                          : completionRate >= 50
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}>
                        {completionRate >= 75 ? "🎯 On Track" : completionRate >= 50 ? "⚡ Active" : "⚠️ Needs Attention"}
                      </span>
                    </div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${completionRate}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12"
        >
          <motion.div variants={itemVariants}>
            <div className={`rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 border ${
              theme === "dark"
                ? "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600"
                : "bg-white/40 border-slate-200/50 hover:bg-white/60 hover:border-slate-300"
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm font-semibold uppercase tracking-wider ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}>
                    Total Tasks
                  </p>
                  <p className={`text-5xl font-black mt-3 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}>
                    {stats.totalTasks}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">
                  📋
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className={`text-xs font-medium ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}>
                  Across all projects
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className={`rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 border ${
              theme === "dark"
                ? "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600"
                : "bg-white/40 border-slate-200/50 hover:bg-white/60 hover:border-slate-300"
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm font-semibold uppercase tracking-wider ${
                    theme === "dark" ? "text-emerald-400" : "text-emerald-600"
                  }`}>
                    Completed
                  </p>
                  <p className="text-5xl font-black mt-3 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    {stats.completedTasks}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center text-2xl">
                  ✅
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-700/30">
                <p className={`text-xs font-medium ${
                  theme === "dark" ? "text-emerald-300/70" : "text-emerald-700"
                }`}>
                  Keep up the momentum!
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className={`rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 border ${
              theme === "dark"
                ? "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600"
                : "bg-white/40 border-slate-200/50 hover:bg-white/60 hover:border-slate-300"
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm font-semibold uppercase tracking-wider ${
                    theme === "dark" ? "text-amber-400" : "text-amber-600"
                  }`}>
                    Pending
                  </p>
                  <p className="text-5xl font-black mt-3 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    {stats.pendingTasks}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl">
                  ⏳
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-amber-200 dark:border-amber-700/30">
                <p className={`text-xs font-medium ${
                  theme === "dark" ? "text-amber-300/70" : "text-amber-700"
                }`}>
                  In progress or waiting
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className={`rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 border ${
              theme === "dark"
                ? "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600"
                : "bg-white/40 border-slate-200/50 hover:bg-white/60 hover:border-slate-300"
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm font-semibold uppercase tracking-wider ${
                    theme === "dark" ? "text-rose-400" : "text-rose-600"
                  }`}>
                    Overdue
                  </p>
                  <p className="text-5xl font-black mt-3 bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                    {stats.overdueTasks}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-rose-500/20 flex items-center justify-center text-2xl">
                  ⚡
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-rose-200 dark:border-rose-700/30">
                <p className={`text-xs font-medium ${
                  theme === "dark" ? "text-rose-300/70" : "text-rose-700"
                }`}>
                  Requires immediate action
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="mb-8">
            <h2 className={`text-3xl font-black ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}>
              Quick Actions
            </h2>
            <p className={`text-sm mt-2 ${
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}>
              Get things done faster with instant access to common tasks
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* Create Task Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ translateY: -4 }}
              className={`group relative rounded-2xl p-8 cursor-pointer overflow-hidden transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-800 border border-slate-700 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20"
                  : "bg-white border border-slate-200 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/10 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-blue-500/20 group-hover:bg-blue-500/30"
                    : "bg-blue-100 group-hover:bg-blue-200"
                }`}>
                  ✏️
                </div>
                <h3 className={`font-bold text-lg ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}>
                  Create Task
                </h3>
                <p className={`text-sm mt-1 ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}>
                  Start a new task instantly
                </p>
              </div>
            </motion.div>

            {/* View Projects Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ translateY: -4 }}
              className={`group relative rounded-2xl p-8 cursor-pointer overflow-hidden transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-800 border border-slate-700 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/20"
                  : "bg-white border border-slate-200 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-emerald-500/10 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-emerald-500/20 group-hover:bg-emerald-500/30"
                    : "bg-emerald-100 group-hover:bg-emerald-200"
                }`}>
                  📊
                </div>
                <h3 className={`font-bold text-lg ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}>
                  View Projects
                </h3>
                <p className={`text-sm mt-1 ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}>
                  Manage all projects
                </p>
              </div>
            </motion.div>

            {/* Team Overview Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ translateY: -4 }}
              className={`group relative rounded-2xl p-8 cursor-pointer overflow-hidden transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-800 border border-slate-700 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20"
                  : "bg-white border border-slate-200 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-purple-500/10 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-purple-500/20 group-hover:bg-purple-500/30"
                    : "bg-purple-100 group-hover:bg-purple-200"
                }`}>
                  👥
                </div>
                <h3 className={`font-bold text-lg ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}>
                  Team Overview
                </h3>
                <p className={`text-sm mt-1 ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}>
                  Check team performance
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default DashboardPage;
