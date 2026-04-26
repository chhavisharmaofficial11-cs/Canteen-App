import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

const StudentDetail = () => {
  const { id } = useParams();
  const { currentStudent, fetchStudent } = useAppContext();

  useEffect(() => {
    fetchStudent(id);
  }, [id, fetchStudent]);

  if (currentStudent.loading) {
    return <Spinner size="lg" message="Loading student details…" />;
  }

  if (currentStudent.error) {
    return (
      <ErrorMessage
        message={currentStudent.error}
        onRetry={() => fetchStudent(id)}
      />
    );
  }

  const student = currentStudent.data;
  if (!student) return null;

  // Get initials for avatar
  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="page-container">
      <Link to="/students" className="back-link">
        ← Back to Students
      </Link>

      <div className="detail-header">
        <div className="detail-avatar">{initials}</div>
        <div className="detail-info">
          <h1>{student.name}</h1>
          <div className="detail-meta">
            <span className="detail-stat">
              Code: <strong className="detail-stat-value">{student.referralCode}</strong>
            </span>
            <span className="detail-stat">
              Spent: <strong className="detail-stat-value">₹{student.totalSpent ?? 0}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h2 className="detail-section-title">Order History</h2>

        {!student.orders || student.orders.length === 0 ? (
          <EmptyState
            icon="🧾"
            title="No orders yet"
            description="This student hasn't placed any orders."
          />
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Snack</th>
                  <th>Qty</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {student.orders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.snackName}</td>
                    <td>{order.quantity}</td>
                    <td>₹{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetail;