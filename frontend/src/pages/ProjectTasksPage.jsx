import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

const ProjectTasksPage = () => {
  const { projectId } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: "", overdue: false });
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "",
  });

  const isAdmin = useMemo(() => user?.role === "admin", [user]);

  const loadProject = async () => {
    const { data } = await api.get("/projects");
    const found = data.projects.find((item) => item._id === projectId);
    setProject(found || null);
    if (found?.members?.[0] && !form.assignedTo) {
      setForm((prev) => ({ ...prev, assignedTo: found.members[0]._id }));
    }
  };

  const loadTasks = async () => {
    const params = {};
    if (filters.status) params.status = filters.status;
    if (filters.overdue) params.overdue = "true";
    const { data } = await api.get(`/tasks/projects/${projectId}`, { params });
    setTasks(data.tasks);
  };

  useEffect(() => {
    loadProject();
  }, [projectId]);

  useEffect(() => {
    loadTasks();
  }, [projectId, filters.status, filters.overdue]);

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/tasks/projects/${projectId}`, form);
      toast.success("Task created");
      setForm({ title: "", description: "", dueDate: "", assignedTo: project.members?.[0]?._id || "" });
      loadTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not create task");
    }
  };

  const updateStatus = async (taskId, status) => {
    await api.patch(`/tasks/${taskId}/status`, { status });
    loadTasks();
  };

  return (
    <Layout>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold">{project?.name || "Project"} tasks</h1>
        <select className="input w-40" value={filters.status} onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}>
          <option value="">All status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In-progress</option>
          <option value="done">Done</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={filters.overdue} onChange={(e) => setFilters((prev) => ({ ...prev, overdue: e.target.checked }))} />
          Overdue only
        </label>
      </div>

      {isAdmin && project && (
        <form onSubmit={createTask} className="mb-6 rounded-xl bg-white p-4 shadow">
          <h2 className="mb-3 text-lg font-semibold">Create task</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <input className="input" placeholder="Task title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="input" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            <input className="input md:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <select className="input" value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}>
              {project.members?.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name} ({member.role})
                </option>
              ))}
            </select>
          </div>
          <button className="btn mt-4">Create task</button>
        </form>
      )}

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div key={task._id} className="rounded-xl bg-white p-4 shadow">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-slate-600">{task.description}</p>
                <p className="mt-2 text-xs text-slate-500">
                  Due: {new Date(task.dueDate).toLocaleDateString()} | Assigned: {task.assignedTo?.name}
                </p>
              </div>
              <select className="input w-40" value={task.status} onChange={(e) => updateStatus(task._id, e.target.value)}>
                <option value="todo">Todo</option>
                <option value="in-progress">In-progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProjectTasksPage;
