import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import api from "../api/client";

const DashboardPage = () => {
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">
            Welcome back! Here's an overview of your tasks.
          </p>
        </div>

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
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Create Task</h3>
              <p className="text-sm text-slate-600">
                Add a new task to your project
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                View Projects
              </h3>
              <p className="text-sm text-slate-600">
                Manage your project portfolio
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Team Overview
              </h3>
              <p className="text-sm text-slate-600">Check team performance</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default DashboardPage;
