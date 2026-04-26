import { createContext, useContext, useReducer, useCallback } from "react";

const AppContext = createContext(null);

const API_BASE = "http://localhost:3001";

// ===== Reducer =====

const initialState = {
  snacks: { data: [], loading: false, error: null },
  students: { data: [], loading: false, error: null },
  currentStudent: { data: null, loading: false, error: null },
  toasts: [],
};

function appReducer(state, action) {
  switch (action.type) {
    // Snacks
    case "SNACKS_LOADING":
      return { ...state, snacks: { ...state.snacks, loading: true, error: null } };
    case "SNACKS_SUCCESS":
      return { ...state, snacks: { data: action.payload, loading: false, error: null } };
    case "SNACKS_ERROR":
      return { ...state, snacks: { ...state.snacks, loading: false, error: action.payload } };

    // Students
    case "STUDENTS_LOADING":
      return { ...state, students: { ...state.students, loading: true, error: null } };
    case "STUDENTS_SUCCESS":
      return { ...state, students: { data: action.payload, loading: false, error: null } };
    case "STUDENTS_ERROR":
      return { ...state, students: { ...state.students, loading: false, error: action.payload } };

    // Current Student (detail)
    case "CURRENT_STUDENT_LOADING":
      return { ...state, currentStudent: { data: null, loading: true, error: null } };
    case "CURRENT_STUDENT_SUCCESS":
      return { ...state, currentStudent: { data: action.payload, loading: false, error: null } };
    case "CURRENT_STUDENT_ERROR":
      return { ...state, currentStudent: { ...state.currentStudent, loading: false, error: action.payload } };

    // Toasts
    case "ADD_TOAST":
      return { ...state, toasts: [...state.toasts, action.payload] };
    case "REMOVE_TOAST":
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.payload) };

    default:
      return state;
  }
}

// ===== Provider =====

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // --- Toast helpers ---
  const addToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    dispatch({ type: "ADD_TOAST", payload: { id, message, type } });
    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", payload: id });
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({ type: "REMOVE_TOAST", payload: id });
  }, []);

  // --- API actions ---
  const fetchSnacks = useCallback(async () => {
    dispatch({ type: "SNACKS_LOADING" });
    try {
      const res = await fetch(`${API_BASE}/snacks`);
      if (!res.ok) throw new Error("Failed to fetch snacks");
      const data = await res.json();
      dispatch({ type: "SNACKS_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "SNACKS_ERROR", payload: err.message });
    }
  }, []);

  const fetchStudents = useCallback(async () => {
    dispatch({ type: "STUDENTS_LOADING" });
    try {
      const res = await fetch(`${API_BASE}/students`);
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();
      dispatch({ type: "STUDENTS_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "STUDENTS_ERROR", payload: err.message });
    }
  }, []);

  const fetchStudent = useCallback(async (id) => {
    dispatch({ type: "CURRENT_STUDENT_LOADING" });
    try {
      const res = await fetch(`${API_BASE}/students/${id}`);
      if (!res.ok) throw new Error("Student not found");
      const data = await res.json();
      dispatch({ type: "CURRENT_STUDENT_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "CURRENT_STUDENT_ERROR", payload: err.message });
    }
  }, []);

  const createStudent = useCallback(async (name) => {
    try {
      const res = await fetch(`${API_BASE}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          referralCode: "REF" + Math.floor(Math.random() * 10000),
          totalSpent: 0,
          orders: [],
        }),
      });
      if (!res.ok) throw new Error("Failed to create student");
      addToast(`${name} added successfully`);
      await fetchStudents(); // Refetch list
      return true;
    } catch (err) {
      addToast(err.message, "error");
      return false;
    }
  }, [addToast, fetchStudents]);

  const placeOrder = useCallback(async (studentId, snackId, quantity) => {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, snackId, quantity }),
      });
      if (!res.ok) throw new Error("Failed to place order");
      addToast("Order placed successfully!");
      // Refetch to update counts
      await Promise.all([fetchSnacks(), fetchStudents()]);
      return true;
    } catch (err) {
      addToast(err.message, "error");
      return false;
    }
  }, [addToast, fetchSnacks, fetchStudents]);

  const value = {
    ...state,
    fetchSnacks,
    fetchStudents,
    fetchStudent,
    createStudent,
    placeOrder,
    addToast,
    removeToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ===== Custom hook =====

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}