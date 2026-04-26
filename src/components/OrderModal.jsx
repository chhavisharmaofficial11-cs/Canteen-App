import { useState, useEffect, useCallback } from "react";

const OrderModal = ({ snack, students, onClose, onSubmit }) => {
  const [studentId, setStudentId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && !loading) onClose();
    },
    [onClose, loading]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const totalAmount = snack.price * quantity;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!studentId) {
      setError("Please select a student.");
      return;
    }

    if (quantity < 1 || quantity > 10) {
      setError("Quantity must be between 1 and 10.");
      return;
    }

    setLoading(true);
    const success = await onSubmit(Number(studentId), snack.id, quantity);
    setLoading(false);

    if (success) {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Order {snack.name}</h2>
          <button
            className="modal-close"
            onClick={onClose}
            disabled={loading}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="inline-alert inline-alert-error">{error}</div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="order-student">
              Student
            </label>
            <select
              id="order-student"
              className="form-select"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              disabled={loading}
            >
              <option value="">Select a student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="order-quantity">
              Quantity
            </label>
            <input
              id="order-quantity"
              type="number"
              className="form-input"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              disabled={loading}
            />
          </div>

          <div className="order-preview">
            <span className="order-preview-label">Total</span>
            <span className="order-preview-amount">₹{totalAmount}</span>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? "Placing…" : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
