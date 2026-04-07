const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let students = [
  { id: 1, name: "Hazel", referralCode: "REF123", totalSpent: 0, orders: [] },
  { id: 2, name: "Rachel", referralCode: "REF456", totalSpent: 0, orders: [] },
  { id: 3, name: "Elsa", referralCode: "REF789", totalSpent: 0, orders: [] },
];

let snacks = [
  { id: 1, name: "Samosa", price: 20, ordersCount: 0 },
  { id: 2, name: "Burger", price: 50, ordersCount: 0 },
  { id: 3, name: "Pizza", price: 100, ordersCount: 0 },
  { id: 4, name: "Sandwich", price: 40, ordersCount: 0 },
  { id: 5, name: "Cold Drink", price: 30, ordersCount: 0 },
  { id: 6, name: "French Fries", price: 60, ordersCount: 0 },
  { id: 7, name: "Momos", price: 70, ordersCount: 0 },
  { id: 8, name: "Pasta", price: 90, ordersCount: 0 },
  { id: 9, name: "Ice Cream", price: 50, ordersCount: 0 },
  { id: 10, name: "Chocolate Shake", price: 80, ordersCount: 0 },
];


let orders = [];

app.get("/snacks", (req, res) => {
  res.json(snacks);
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/students", (req, res) => {
  const newStudent = {
    id: students.length + 1,
    ...req.body,
  };
  students.push(newStudent);
  res.json(newStudent);
});

app.post("/orders", (req, res) => {
  const { studentId, snackId, quantity } = req.body;

  const student = students.find(s => s.id === studentId);
  const snack = snacks.find(s => s.id === snackId);

  if (!student || !snack) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const amount = snack.price * quantity;

  const newOrder = {
    id: Date.now(),
    snackName: snack.name,
    quantity,
    amount,
  };

  student.totalSpent += amount;
  student.orders.push(newOrder);
  snack.ordersCount += quantity;

  orders.push(newOrder);

  res.json(newOrder);
});
// GET single student
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id === Number(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});

