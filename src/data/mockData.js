// src/mockData.js

export const snacksData = [
  { id: 1, name: "Choco Bar", price: 20, ordersCount: 5 },
  { id: 2, name: "Sandwich", price: 50, ordersCount: 3 },
  { id: 3, name: "Burger", price: 80, ordersCount: 10 },
  { id: 4, name: "Pizza Slice", price: 60, ordersCount: 8 },
  { id: 5, name: "Cold Drink", price: 25, ordersCount: 15 },
  { id: 6, name: "Fries", price: 40, ordersCount: 12 },
  { id: 7, name: "Cupcake", price: 30, ordersCount: 7 },
  { id: 8, name: "Ice Cream", price: 35, ordersCount: 20 }
];

export const studentsData = [
  {
    id: 1,
    name: "Alice",
    referralCode: "REF123",
    totalSpent: 70,
    orders: [
      { snackName: "Choco Bar", quantity: 2, amount: 40 },
      { snackName: "Sandwich", quantity: 1, amount: 30 }
    ]
  },
  {
    id: 2,
    name: "Bob",
    referralCode: "REF456",
    totalSpent: 120,
    orders: [
      { snackName: "Burger", quantity: 1, amount: 80 },
      { snackName: "Cold Drink", quantity: 2, amount: 40 }
    ]
  },
  {
    id: 3,
    name: "Charlie",
    referralCode: "REF789",
    totalSpent: 95,
    orders: [
      { snackName: "Pizza Slice", quantity: 1, amount: 60 },
      { snackName: "Cupcake", quantity: 1, amount: 30 },
      { snackName: "Cold Drink", quantity: 1, amount: 5 }
    ]
  },
  {
    id: 4,
    name: "David",
    referralCode: "REF321",
    totalSpent: 50,
    orders: [
      { snackName: "Fries", quantity: 1, amount: 40 },
      { snackName: "Choco Bar", quantity: 1, amount: 10 }
    ]
  },
  {
    id: 5,
    name: "Eva",
    referralCode: "REF654",
    totalSpent: 75,
    orders: [
      { snackName: "Ice Cream", quantity: 2, amount: 70 },
      { snackName: "Choco Bar", quantity: 1, amount: 5 }
    ]
  }
];