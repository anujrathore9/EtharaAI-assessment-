import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

const ProjectsPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedByProject, setSelectedByProject] = useState({});
  const [form, setForm] = useState({ name: "", description: "", members: [] });

  const isAdmin = useMemo(() => user?.role === "admin", [user]);

  const loadProjects = async () => {
    const { data } = await api.get("/projects");
    setProjects(data.projects);
  };

  const loadUsers = async () => {
    if (!isAdmin) return;
    const { data } = await api.get("/users");
    setMembers(data.users);
  };

  useEffect(() => {
    loadProjects();
    loadUsers();
  }, [isAdmin]);

  const createProject = async (e) => {
    e.preventDefault();
    try {
      await api.post("/projects", form);
      toast.success("Project created");
      setForm({ name: "", description: "", members: [] });
      loadProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not create project");
    }
  };

  const addMember = async (projectId) => {
    const userId = selectedByProject[projectId];
    if (!userId) return;
    await api.patch(`/projects/${projectId}/members`, { userId });
    toast.success("Member added");
    loadProjects();
  };

  const removeMember = async (projectId, userId) => {
    await api.delete(`/projects/${projectId}/members/${userId}`);
    toast.success("Member removed");
    loadProjects();
  };

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
      </div>

      {isAdmin && (
        <form onSubmit={createProject} className="mb-6 rounded-xl bg-white p-4 shadow">
          <h2 className="mb-3 text-lg font-semibold">Create project</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <input className="input" placeholder="Project name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <select
              multiple
              className="input min-h-20"
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions).map((option) => option.value);
                setForm({ ...form, members: selected });
              }}
            >
              {members.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name} ({member.role})
                </option>
              ))}
            </select>
          </div>
          <button className="btn mt-4">Create</button>
        </form>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project._id} className="rounded-xl bg-white p-4 shadow">
            <h3 className="font-semibold">{project.name}</h3>
            <p className="mt-1 text-sm text-slate-600">{project.description}</p>
            <p className="mt-2 text-xs text-slate-500">Members: {project.members.length}</p>
            {isAdmin && (
              <div className="mt-2">
                <select
                  className="input text-sm"
                  value={selectedByProject[project._id] || ""}
                  onChange={(e) =>
                    setSelectedByProject((prev) => ({ ...prev, [project._id]: e.target.value }))
                  }
                >
                  <option value="">Select member</option>
                  {members.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name} ({member.role})
                    </option>
                  ))}
                </select>
                <button className="btn mt-2 text-sm" onClick={() => addMember(project._id)}>
                  Add member
                </button>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.members.map((member) => (
                    <button
                      key={member._id}
                      className="rounded bg-slate-200 px-2 py-1 text-xs"
                      onClick={() => removeMember(project._id, member._id)}
                    >
                      Remove {member.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <Link className="mt-3 inline-block text-sm font-medium text-blue-600" to={`/projects/${project._id}`}>
              Manage tasks
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProjectsPage;
