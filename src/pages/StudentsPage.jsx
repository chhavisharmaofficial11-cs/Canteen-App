// src/pages/StudentsPage.jsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function StudentsPage() {
  const { students } = useContext(AppContext);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Students List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id} className="mb-2">
            {student.name} - Total Spent: ₹{student.totalSpent}{" "}
            <Link
              to={`/students/${student.id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentsPage;