import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const StudentDetail = () => {
  const { id } = useParams(); // Get ID from URL
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch single student by ID
    fetch(`http://localhost:3001/students/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!student) return <p style={{ textAlign: "center" }}>Student not found</p>;

  const handleOrder = async () => {
    const snackId = prompt("Enter Snack ID");
    const quantity = prompt("Enter quantity (1-5)");

    if (!snackId || !quantity) return;

    try {
      await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: Number(id),
          snackId: Number(snackId),
          quantity: Number(quantity),
        }),
      });

      alert("Order placed!");
      window.location.reload();
    } catch (err) {
      alert("Error placing order");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>{student.name}</h2>
      <p>Referral: {student.referralCode}</p>

      <p style={{ fontWeight: "bold", color: "#2e7d32" }}>
        💰 Total Spent: ₹{student.totalSpent ?? 0}
      </p>

      <button
        onClick={handleOrder}
        style={{
          marginTop: "10px",
          padding: "8px 12px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        ➕ Place Order
      </button>

      <h3 style={{ marginTop: "20px" }}>🧾 Orders</h3>

      {student.orders?.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <ul>
          {student.orders?.map((order, index) => (
            <li key={index}>
              {order.snackName} × {order.quantity} → ₹{order.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentDetail;