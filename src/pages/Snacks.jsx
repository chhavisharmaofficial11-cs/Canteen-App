import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import SnackCard from "../components/SnackCard";
import OrderModal from "../components/OrderModal";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

const Snacks = () => {
  const { snacks, students, fetchSnacks, fetchStudents, placeOrder } =
    useAppContext();
  const [selectedSnack, setSelectedSnack] = useState(null);

  useEffect(() => {
    fetchSnacks();
    fetchStudents();
  }, [fetchSnacks, fetchStudents]);

  // Loading state
  if (snacks.loading) {
    return <Spinner size="lg" message="Loading snacks…" />;
  }

  // Error state
  if (snacks.error) {
    return <ErrorMessage message={snacks.error} onRetry={fetchSnacks} />;
  }

  // Empty state
  if (snacks.data.length === 0) {
    return (
      <EmptyState
        icon="🍔"
        title="No snacks available"
        description="Check back later for tasty snacks!"
      />
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Snacks Menu</h1>
        <p className="page-subtitle">
          Browse and order from {snacks.data.length} available snacks
        </p>
      </div>

      <div className="card-grid">
        {snacks.data.map((snack) => (
          <SnackCard
            key={snack.id}
            snack={snack}
            onOrder={setSelectedSnack}
          />
        ))}
      </div>

      {selectedSnack && (
        <OrderModal
          snack={selectedSnack}
          students={students.data}
          onClose={() => setSelectedSnack(null)}
          onSubmit={placeOrder}
        />
      )}
    </div>
  );
};

export default Snacks;