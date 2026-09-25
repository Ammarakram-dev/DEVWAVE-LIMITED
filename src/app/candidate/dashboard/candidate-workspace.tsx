"use client";

import { FormEvent, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type Application = {
  id: string;
  full_name: string;
  email: string;
  domain: string;
  duration: string;
  status: string;
};

type Task = {
  id: string;
  title: string;
  description: string;
  domain: string;
  deadline: string | null;
};

type Submission = {
  id: string;
  submission_url: string | null;
  submission_text: string | null;
  file_path: string | null;
  status: string;
  submitted_at: string;
};

type Assignment = {
  id: string;
  status: string;
  assigned_at: string;
  application_id: string;
  task_id: string;
  internship_tasks: Task | Task[] | null;
  task_submissions: Submission | Submission[] | null;
};

type Props = {
  email: string;
};

function normalizeTask(value: Task | Task[] | null): Task | null {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? value[0] : null;
  }

  return value;
}

function normalizeSubmission(
  value: Submission | Submission[] | null,
): Submission | null {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? value[0] : null;
  }

  return value;
}

export default function CandidateWorkspace({ email }: Props) {
  const [applications, setApplications] = useState<Application[]>([]);

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const [submissionText, setSubmissionText] = useState("");

  const [submissionUrl, setSubmissionUrl] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const supabase = createSupabaseBrowserClient();

  /*
   * LOAD WORKSPACE
   *
   * Kept directly inside useEffect so React's
   * hook/lint rules do not complain about a
   * separately declared function.
   */
  useEffect(() => {
    let cancelled = false;

    async function loadWorkspace() {
      try {
        await fetch("/api/candidate/claim", {
          method: "POST",
        });
        const response = await fetch("/api/candidate/tasks", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const result = await response.json();

        if (cancelled) {
          return;
        }

        setApplications(
          Array.isArray(result.applications) ? result.applications : [],
        );

        setAssignments(
          Array.isArray(result.assignments) ? result.assignments : [],
        );
      } catch (error) {
        console.error("Unable to load candidate workspace:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadWorkspace();

    return () => {
      cancelled = true;
    };
  }, []);

  function openAssignment(assignment: Assignment) {
    const submission = normalizeSubmission(assignment.task_submissions);

    setSelectedAssignment(assignment);

    setSubmissionText(submission?.submission_text || "");

    setSubmissionUrl(submission?.submission_url || "");
  }

  async function refreshWorkspace() {
    try {
      const response = await fetch("/api/candidate/tasks", {
        cache: "no-store",
      });

      if (!response.ok) {
        return;
      }

      const result = await response.json();

      setApplications(
        Array.isArray(result.applications) ? result.applications : [],
      );

      setAssignments(
        Array.isArray(result.assignments) ? result.assignments : [],
      );
    } catch (error) {
      console.error("Unable to refresh workspace:", error);
    }
  }

  async function submitTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedAssignment) {
      return;
    }

    if (!submissionText.trim() && !submissionUrl.trim()) {
      alert("Please add submission details or a project URL.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch("/api/candidate/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignmentId: selectedAssignment.id,
          submissionText,
          submissionUrl,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Unable to submit the task.");
        return;
      }

      alert(result.message || "Task submitted successfully.");

      await refreshWorkspace();

      setSelectedAssignment(null);
      setSubmissionText("");
      setSubmissionUrl("");
    } catch (error) {
      console.error(error);

      alert("Unable to connect to DEVWAVE.");
    } finally {
      setSubmitting(false);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/candidate";
  }

  const application = applications.length > 0 ? applications[0] : null;

  return (
    <main className="dw-candidate-page">
      <header className="dw-candidate-header">
        <div>
          <span className="dw-eyebrow">DEVWAVE CANDIDATE WORKSPACE</span>

          <h1>Candidate Workspace</h1>

          <p>
            Manage your application, assigned internship tasks and submissions
            from one secure workspace.
          </p>
        </div>

        <button type="button" className="dw-secondary-button" onClick={signOut}>
          Sign Out
        </button>
      </header>

      <section className="dw-candidate-identity">
        <div>
          <span>Signed in as</span>
          <strong>{email}</strong>
        </div>

        {application && (
          <div>
            <span>Application status</span>
            <strong>{application.status}</strong>
          </div>
        )}
      </section>

      {loading ? (
        <section className="dw-candidate-panel">
          <p className="dw-candidate-muted">Loading your workspace...</p>
        </section>
      ) : (
        <>
          {application && (
            <section className="dw-candidate-panel">
              <div className="dw-candidate-panel-heading">
                <div>
                  <span className="dw-eyebrow">APPLICATION</span>

                  <h2>{application.full_name}</h2>
                </div>

                <span className="dw-candidate-status">
                  {application.status}
                </span>
              </div>

              <div className="dw-candidate-grid">
                <div>
                  <span>Domain</span>
                  <strong>{application.domain}</strong>
                </div>

                <div>
                  <span>Duration</span>
                  <strong>{application.duration}</strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>{application.email}</strong>
                </div>
              </div>
            </section>
          )}

          <section className="dw-candidate-panel">
            <div className="dw-candidate-panel-heading">
              <div>
                <span className="dw-eyebrow">INTERNSHIP TASKS</span>

                <h2>Assigned Work</h2>
              </div>

              <span className="dw-task-count">
                {assignments.length}{" "}
                {assignments.length === 1 ? "Task" : "Tasks"}
              </span>
            </div>

            {assignments.length === 0 ? (
              <div className="dw-candidate-empty">
                <div className="dw-candidate-empty-icon">01</div>

                <h3>No tasks assigned yet</h3>

                <p>
                  When DEVWAVE assigns you an internship task, it will appear
                  here.
                </p>
              </div>
            ) : (
              <div className="dw-candidate-task-list">
                {assignments.map((assignment) => {
                  const task = normalizeTask(assignment.internship_tasks);

                  const submission = normalizeSubmission(
                    assignment.task_submissions,
                  );

                  if (!task) {
                    return null;
                  }

                  return (
                    <article key={assignment.id} className="dw-candidate-task">
                      <div className="dw-candidate-task-main">
                        <div className="dw-candidate-task-top">
                          <span>{task.domain}</span>

                          <small>
                            {submission ? "Submitted" : assignment.status}
                          </small>
                        </div>

                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        {task.deadline && (
                          <div className="dw-candidate-deadline">
                            Deadline: {new Date(task.deadline).toLocaleString()}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        className="dw-main-button"
                        onClick={() => openAssignment(assignment)}
                      >
                        {submission ? "View Submission" : "Open Task"}
                      </button>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </>
      )}

      {selectedAssignment && (
        <section className="dw-candidate-panel dw-candidate-submit-panel">
          {(() => {
            const task = normalizeTask(selectedAssignment.internship_tasks);

            const submission = normalizeSubmission(
              selectedAssignment.task_submissions,
            );

            if (!task) {
              return null;
            }

            return (
              <>
                <div className="dw-candidate-panel-heading">
                  <div>
                    <span className="dw-eyebrow">TASK WORKSPACE</span>

                    <h2>{task.title}</h2>
                  </div>

                  <button
                    type="button"
                    className="dw-secondary-button"
                    onClick={() => setSelectedAssignment(null)}
                  >
                    Close
                  </button>
                </div>

                <div className="dw-candidate-task-description">
                  <h3>Instructions</h3>

                  <p>{task.description}</p>

                  {task.deadline && (
                    <p>
                      <strong>Deadline:</strong>{" "}
                      {new Date(task.deadline).toLocaleString()}
                    </p>
                  )}
                </div>

                <form
                  className="dw-candidate-submit-form"
                  onSubmit={submitTask}
                >
                  <label>
                    Project or Repository URL
                    <input
                      type="url"
                      value={submissionUrl}
                      onChange={(event) => setSubmissionUrl(event.target.value)}
                      placeholder="https://github.com/..."
                    />
                  </label>

                  <label>
                    Submission Details
                    <textarea
                      value={submissionText}
                      onChange={(event) =>
                        setSubmissionText(event.target.value)
                      }
                      placeholder="Describe your completed work..."
                      rows={7}
                    />
                  </label>

                  {submission && (
                    <div className="dw-candidate-existing">
                      <span>Existing Submission</span>

                      <p>
                        Submitted:{" "}
                        {new Date(submission.submitted_at).toLocaleString()}
                      </p>

                      <strong>{submission.status}</strong>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="dw-main-button"
                    disabled={submitting}
                  >
                    {submitting
                      ? "Submitting..."
                      : submission
                        ? "Update Submission"
                        : "Submit Task"}
                  </button>
                </form>
              </>
            );
          })()}
        </section>
      )}
    </main>
  );
}
