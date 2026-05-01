import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await api.get("/dashboard/stats");
      setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <Layout>
      <h1 className="mb-5 text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total tasks" value={stats.totalTasks} tone="border-slate-200" />
        <StatCard label="Completed" value={stats.completedTasks} tone="border-emerald-300" />
        <StatCard label="Pending" value={stats.pendingTasks} tone="border-amber-300" />
        <StatCard label="Overdue" value={stats.overdueTasks} tone="border-rose-300" />
      </div>
    </Layout>
  );
};

export default DashboardPage;
