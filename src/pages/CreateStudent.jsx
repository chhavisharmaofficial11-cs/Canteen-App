import { useState } from "react";

const CreateStudent = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name required");
      return;
    }

    try {
      await fetch("http://localhost:3001/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          referralCode: "REF" + Math.floor(Math.random() * 1000),
          totalSpent: 0,
          orders: [],
        }),
      });

      setName("");
      alert("Student added!");
      window.location.reload(); // refresh
    } catch (err) {
      alert("Error adding student");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Enter student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "8px",
          marginRight: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "8px 12px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Add Student
      </button>
    </form>
  );
};

export default CreateStudent;