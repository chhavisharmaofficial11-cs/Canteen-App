import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import StudentCard from "../components/StudentCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

const Students = () => {
  const { students, fetchStudents, createStudent } = useAppContext();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setSubmitting(true);
    const success = await createStudent(trimmed);
    if (success) setName("");
    setSubmitting(false);
  };

  // Loading state
  if (students.loading && students.data.length === 0) {
    return <Spinner size="lg" message="Loading students…" />;
  }

  // Error state
  if (students.error && students.data.length === 0) {
    return <ErrorMessage message={students.error} onRetry={fetchStudents} />;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Students</h1>
        <p className="page-subtitle">
          {students.data.length} registered student{students.data.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Create student form */}
      <form className="form-inline" onSubmit={handleCreateStudent} style={{ marginBottom: "var(--space-8)" }}>
        <div className="form-group">
          <label className="form-label" htmlFor="new-student-name">
            Add New Student
          </label>
          <input
            id="new-student-name"
            type="text"
            className="form-input"
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
          />
        </div>
        <button
          type="submit"
          className="btn btn-success"
          disabled={submitting || !name.trim()}
        >
          {submitting ? "Adding…" : "Add Student"}
        </button>
      </form>

      {/* Student list */}
      {students.data.length === 0 ? (
        <EmptyState
          icon="👩‍🎓"
          title="No students yet"
          description="Add a student to get started."
        />
      ) : (
        <div className="card-grid">
          {students.data.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Students;
