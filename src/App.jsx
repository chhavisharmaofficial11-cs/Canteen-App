import { Routes, Route, Link } from "react-router-dom";
import Snacks from "./pages/Snacks";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";


function App() {
  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      
      <nav
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    padding: "16px",
    background: "linear-gradient(135deg, #1e1e1e, #333)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  }}
>
  <Link
    style={{
      color: "white",
      fontWeight: "bold",
      fontSize: "16px",
      textDecoration: "none",
    }}
    to="/"
  >
    🍔 Snacks
  </Link>

  <Link
    style={{
      color: "white",
      fontWeight: "bold",
      fontSize: "16px",
      textDecoration: "none",
    }}
    to="/students"
  >
    👩‍🎓 Students
  </Link>
</nav>
     
    <Routes>
  <Route path="/" element={<Snacks />} />
  <Route path="/students" element={<Students />} />
  <Route path="/student/:id" element={<StudentDetail />} />
</Routes>

    </div>
  );
}

export default App;