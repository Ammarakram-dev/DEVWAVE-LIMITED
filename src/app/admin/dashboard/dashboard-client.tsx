"use client";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type Application = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  university: string;
  semester: string;
  domain: string;
  duration: string;
  github: string | null;
  linkedin: string | null;
  portfolio: string | null;
  skills: string | null;
  goals: string | null;
  experience: string | null;
  cv_path: string | null;
  status: string;
  reviewer_notes: string | null;
  created_at: string;
};

type InternshipTask = {
  id: string;
  title: string;
  description: string;
  domain: string;
  deadline: string | null;
};

const statuses = [
  "Received",
  "Under Review",
  "Shortlisted",
  "Task Assigned",
  "Selected",
  "Rejected",
  "Completed",
];

const domains = [
  "Full Stack Web Development",
  "Front-End Web Development",
  "App Development",
  "Artificial Intelligence",
  "Cyber Security",
  "Data Analytics",
];

export default function DashboardClient({
  initialApplications,
}: {
  initialApplications: Application[];
}) {
  const supabase = createSupabaseBrowserClient();

  const [applications, setApplications] =
    useState<Application[]>(initialApplications);

  const [selected, setSelected] = useState<Application | null>(null);

  const [tasks, setTasks] = useState<InternshipTask[]>([]);

  const [loading, setLoading] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDomain, setTaskDomain] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");

  const total = applications.length;

  const received = applications.filter(
    (application) => application.status === "Received",
  ).length;

  const review = applications.filter(
    (application) => application.status === "Under Review",
  ).length;

  const selectedCount = applications.filter(
    (application) => application.status === "Selected",
  ).length;
  useEffect(() => {
    let cancelled = false;

    async function fetchTasks() {
      try {
        const response = await fetch("/api/admin/tasks");

        if (!response.ok) {
          return;
        }

        const result = await response.json();

        if (!cancelled) {
          setTasks(result.tasks ?? []);
        }
      } catch (error) {
        console.error("Unable to load tasks:", error);
      }
    }

    fetchTasks();

    return () => {
      cancelled = true;
    };
  }, []);

  async function updateStatus(id: string, status: string) {
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          reviewer_notes: selected?.reviewer_notes || "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Unable to update application.");
        return;
      }

      setApplications((current) =>
        current.map((application) =>
          application.id === id
            ? {
                ...application,
                status,
              }
            : application,
        ),
      );

      setSelected((current) =>
        current
          ? {
              ...current,
              status,
            }
          : current,
      );
    } catch (error) {
      console.error(error);
      alert("Unable to update application.");
    } finally {
      setLoading(false);
    }
  }

  async function openCV(id: string) {
    try {
      const response = await fetch(`/api/admin/applications/${id}/cv`);

      const result = await response.json();

      if (!response.ok || !result.url) {
        alert(result.message || "CV could not be opened.");
        return;
      }

      window.open(result.url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error(error);
      alert("Unable to open CV.");
    }
  }

  async function createTask() {
    if (!taskTitle.trim() || !taskDescription.trim() || !taskDomain) {
      alert("Please complete the task title, description and domain.");
      return;
    }

    setTaskLoading(true);

    try {
      const response = await fetch("/api/admin/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: taskTitle.trim(),
          description: taskDescription.trim(),
          domain: taskDomain,
          deadline: taskDeadline || null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Task could not be created.");
        return;
      }

      setTasks((current) => [result.task, ...current]);

      setTaskTitle("");
      setTaskDescription("");
      setTaskDomain("");
      setTaskDeadline("");

      alert("Task created successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to create task.");
    } finally {
      setTaskLoading(false);
    }
  }

  async function assignTask(taskId: string) {
    if (!selected) {
      alert("Please select a candidate first.");
      return;
    }

    try {
      const response = await fetch("/api/admin/assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId: selected.id,
          taskId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Task could not be assigned.");
        return;
      }

      setApplications((current) =>
        current.map((application) =>
          application.id === selected.id
            ? {
                ...application,
                status: "Task Assigned",
              }
            : application,
        ),
      );

      setSelected((current) =>
        current
          ? {
              ...current,
              status: "Task Assigned",
            }
          : current,
      );

      alert("Task assigned successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to assign task.");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/admin";
  }

  return (
    <main className="dw-admin-dashboard">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="dw-admin-header">
        <div>
          <span className="dw-eyebrow">DEVWAVE ADMIN</span>

          <h1>Applications</h1>

          <p>Review internship applications and manage candidate progress.</p>
        </div>

        <button type="button" className="dw-secondary-button" onClick={signOut}>
          Sign out
        </button>
      </header>

      {/* =====================================================
          APPLICATION STATS
          ===================================================== */}

      <section className="dw-admin-stats">
        <div>
          <span>Total</span>
          <strong>{total}</strong>
        </div>

        <div>
          <span>Received</span>
          <strong>{received}</strong>
        </div>

        <div>
          <span>Under Review</span>
          <strong>{review}</strong>
        </div>

        <div>
          <span>Selected</span>
          <strong>{selectedCount}</strong>
        </div>
      </section>

      {/* =====================================================
          TASK MANAGER
          ===================================================== */}

      <section className="dw-task-manager">
        <div className="dw-task-manager-header">
          <div>
            <span className="dw-eyebrow">INTERNSHIP TASKS</span>

            <h2>Task Management</h2>

            <p>
              Create practical internship tasks and assign them directly to
              candidates.
            </p>
          </div>
        </div>

        <div className="dw-task-create">
          <input
            type="text"
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            placeholder="Task title"
          />

          <select
            value={taskDomain}
            onChange={(event) => setTaskDomain(event.target.value)}
          >
            <option value="">Select domain</option>

            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            value={taskDeadline}
            onChange={(event) => setTaskDeadline(event.target.value)}
          />

          <textarea
            value={taskDescription}
            onChange={(event) => setTaskDescription(event.target.value)}
            placeholder="Write complete task instructions..."
            rows={5}
          />

          <button
            type="button"
            className="dw-main-button"
            onClick={createTask}
            disabled={taskLoading}
          >
            {taskLoading ? "Creating..." : "Create Task"}
          </button>
        </div>

        <div className="dw-task-list">
          {tasks.length === 0 ? (
            <p className="dw-task-empty">
              No internship tasks have been created yet.
            </p>
          ) : (
            tasks.map((task) => (
              <article className="dw-task-item" key={task.id}>
                <div>
                  <span>{task.domain}</span>

                  <h3>{task.title}</h3>

                  <p>{task.description}</p>

                  {task.deadline && (
                    <small>
                      Deadline: {new Date(task.deadline).toLocaleString()}
                    </small>
                  )}
                </div>

                <button
                  type="button"
                  className="dw-secondary-button"
                  onClick={() => assignTask(task.id)}
                  disabled={!selected}
                >
                  {selected
                    ? `Assign to ${selected.full_name}`
                    : "Select Candidate"}
                </button>
              </article>
            ))
          )}
        </div>
      </section>

      {/* =====================================================
          APPLICATIONS + DETAILS
          ===================================================== */}

      <section className="dw-admin-layout">
        <div className="dw-admin-list">
          {applications.length === 0 ? (
            <div className="dw-admin-empty">
              <h2>No applications yet</h2>

              <p>New internship applications will appear here.</p>
            </div>
          ) : (
            applications.map((application) => (
              <button
                type="button"
                key={application.id}
                className={`dw-admin-application ${
                  selected?.id === application.id ? "active" : ""
                }`}
                onClick={() => setSelected(application)}
              >
                <div>
                  <strong>{application.full_name}</strong>

                  <span>{application.domain}</span>
                </div>

                <small>{application.status}</small>
              </button>
            ))
          )}
        </div>

        <aside className="dw-admin-detail">
          {!selected ? (
            <div className="dw-admin-empty">
              <h2>Select an application</h2>

              <p>Candidate information will appear here.</p>

              <small>Select a candidate above to enable task assignment.</small>
            </div>
          ) : (
            <>
              <div className="dw-admin-detail-header">
                <div>
                  <span className="dw-eyebrow">CANDIDATE</span>

                  <h2>{selected.full_name}</h2>

                  <p>{selected.email}</p>
                </div>

                {selected.cv_path && (
                  <button
                    type="button"
                    className="dw-main-button"
                    onClick={() => openCV(selected.id)}
                  >
                    Open CV
                  </button>
                )}
              </div>

              <div className="dw-admin-fields">
                <div>
                  <span>Phone</span>
                  <strong>{selected.phone}</strong>
                </div>

                <div>
                  <span>City</span>
                  <strong>{selected.city}</strong>
                </div>

                <div>
                  <span>University</span>
                  <strong>{selected.university}</strong>
                </div>

                <div>
                  <span>Semester</span>
                  <strong>{selected.semester}</strong>
                </div>

                <div>
                  <span>Domain</span>
                  <strong>{selected.domain}</strong>
                </div>

                <div>
                  <span>Duration</span>
                  <strong>{selected.duration}</strong>
                </div>
              </div>

              <div className="dw-admin-section">
                <label>Status</label>

                <select
                  value={selected.status}
                  disabled={loading}
                  onChange={(event) =>
                    updateStatus(selected.id, event.target.value)
                  }
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {selected.github && (
                <div className="dw-admin-section">
                  <label>GitHub</label>

                  <a href={selected.github} target="_blank" rel="noreferrer">
                    {selected.github}
                  </a>
                </div>
              )}

              {selected.linkedin && (
                <div className="dw-admin-section">
                  <label>LinkedIn</label>

                  <a href={selected.linkedin} target="_blank" rel="noreferrer">
                    {selected.linkedin}
                  </a>
                </div>
              )}

              {selected.portfolio && (
                <div className="dw-admin-section">
                  <label>Portfolio</label>

                  <a href={selected.portfolio} target="_blank" rel="noreferrer">
                    {selected.portfolio}
                  </a>
                </div>
              )}

              {selected.skills && (
                <div className="dw-admin-section">
                  <label>Skills</label>

                  <p>{selected.skills}</p>
                </div>
              )}

              {selected.goals && (
                <div className="dw-admin-section">
                  <label>Goals</label>

                  <p>{selected.goals}</p>
                </div>
              )}

              {selected.experience && (
                <div className="dw-admin-section">
                  <label>Experience</label>

                  <p>{selected.experience}</p>
                </div>
              )}

              <div className="dw-admin-section">
                <label>Application date</label>

                <p>{new Date(selected.created_at).toLocaleString()}</p>
              </div>
            </>
          )}
        </aside>
      </section>
    </main>
  );
}
