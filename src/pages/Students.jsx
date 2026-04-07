import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import CreateStudent from "./CreateStudent";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch(() => setError("Failed to load students"));
  }, []);

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  if (!students.length) {
    return <p style={{ textAlign: "center" }}>Loading students...</p>;
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        👩‍🎓 Students
      </h2>

      <CreateStudent />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "25px",
        }}
      >
        {students.map((student) => (
          <Card key={student.id}>
            <h3>{student.name}</h3>

            <p style={{ color: "#555" }}>
              Referral: {student.referralCode}
            </p>

            <p
              style={{
                fontWeight: "bold",
                color: "#2e7d32",
                marginTop: "8px",
              }}
            >
              💰 ₹{student.totalSpent}
            </p>

            <button
              onClick={() => navigate(`/student/${student.id}`)}
              style={{
                marginTop: "12px",
                padding: "8px",
                width: "100%",
                background: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              View Details
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Students;
