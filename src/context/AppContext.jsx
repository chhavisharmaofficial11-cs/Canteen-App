// src/context/AppContext.jsx
import { createContext, useState } from "react";
import { studentsData as mockStudents, snacksData as mockSnacks } from "../data/mockData";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState(mockStudents);
  const [snacks, setSnacks] = useState(mockSnacks);

  const addStudent = (name) => {
    const newStudent = {
      id: students.length + 1,
      name,
      referralCode: "REF" + Math.floor(Math.random() * 1000),
      totalSpent: 0,
      orders: []
    };
    setStudents([...students, newStudent]);
  };

  const addOrder = (studentId, snackId, quantity) => {
    const snack = snacks.find((s) => s.id === snackId);
    if (!snack) return;

    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const orderAmount = snack.price * quantity;

    // Update student orders and totalSpent
    const updatedStudents = students.map((s) => {
      if (s.id === studentId) {
        return {
          ...s,
          totalSpent: s.totalSpent + orderAmount,
          orders: [
            ...s.orders,
            { snackName: snack.name, quantity, amount: orderAmount }
          ]
        };
      }
      return s;
    });

    setStudents(updatedStudents);

    // Update snack ordersCount
    const updatedSnacks = snacks.map((s) => {
      if (s.id === snackId) {
        return { ...s, ordersCount: s.ordersCount + quantity };
      }
      return s;
    });

    setSnacks(updatedSnacks);
  };

  return (
    <AppContext.Provider value={{ students, snacks, addStudent, addOrder }}>
      {children}
    </AppContext.Provider>
  );
};