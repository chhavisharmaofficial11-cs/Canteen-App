import { useEffect, useState } from "react";
import Card from "../components/Card";
import OrderForm from "../components/OrderForm";

const Snacks = () => {
  const [snacks, setSnacks] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSnack, setSelectedSnack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch snacks and students
    Promise.all([
      fetch("http://localhost:3001/snacks").then((res) => res.json()),
      fetch("http://localhost:3001/students").then((res) => res.json())
    ])
      .then(([snacksData, studentsData]) => {
        setSnacks(snacksData);
        setStudents(studentsData);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load snacks or students");
        setLoading(false);
      });
  }, []);

  // Get recent orders from localStorage safely
  const recentOrders = JSON.parse(localStorage.getItem("recentOrders") || "[]");

  const handleOrderClick = (snack) => {
    setSelectedSnack(snack);
  };

  const closeModal = () => {
    setSelectedSnack(null);
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading snacks...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "auto", padding: "20px" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "25px",
          fontSize: "28px",
          color: "#333",
        }}
      >
        🍔 Snacks Menu
      </h2>

      {/* RECENT ORDERS */}
      {recentOrders.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3>🕒 Recent Orders</h3>
          <ul>
            {recentOrders.slice(-5).map((o, i) => (
              <li key={i}>
                {o.student} ordered {o.snack} x{o.quantity} → ₹{o.amount}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SNACKS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "25px",
        }}
      >
        {snacks.map((snack) => (
          <Card key={snack.id}>
            <h3 style={{ marginBottom: "10px" }}>{snack.name}</h3>
            <p>💰 ₹{snack.price}</p>
            <p style={{ color: "#777" }}>📦 Orders: {snack.ordersCount}</p>
            <button
              onClick={() => handleOrderClick(snack)}
              style={{
                marginTop: "12px",
                padding: "10px",
                width: "100%",
                background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              Order Now
            </button>
          </Card>
        ))}
      </div>

      {/* ORDER FORM MODAL */}
      {selectedSnack && (
        <OrderForm
          snack={selectedSnack}
          students={students}
          onClose={closeModal}
          onSuccess={() => window.location.reload()}
        />
      )}
    </div>
  );
};

export default Snacks;