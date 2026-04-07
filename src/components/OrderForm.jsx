import { useState } from "react";

const OrderForm = ({ snack, students, onClose, onSuccess }) => {
  const [studentId, setStudentId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId) {
      alert("Select student");
      return;
    }

    if (quantity < 1 || quantity > 5) {
      alert("Quantity must be 1-5");
      return;
    }

    setLoading(true);

    try {
      await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: Number(studentId),
          snackId: snack.id,
          quantity: Number(quantity),
        }),
      });

      alert("Order placed!");

      // Save recent orders only on successful order
      const recentOrders = JSON.parse(localStorage.getItem("recentOrders") || "[]");
      const student = students.find(s => s.id === Number(studentId));
      recentOrders.push({
        snack: snack.name,
        student: student ? student.name : "Unknown",
        quantity,
        amount: snack.price * quantity,
      });
      localStorage.setItem("recentOrders", JSON.stringify(recentOrders));

      onSuccess();
      onClose();
    } catch (err) {
      alert("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Order {snack.name}</h3>

        <form onSubmit={handleSubmit}>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            style={inputStyle}
            disabled={loading}
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            max="5"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={inputStyle}
            disabled={loading}
          />

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{ ...buttonStyle, background: "gray" }}
            disabled={loading}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

// styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "300px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  margin: "10px 0",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  marginTop: "5px",
  cursor: "pointer",
};

export default OrderForm;