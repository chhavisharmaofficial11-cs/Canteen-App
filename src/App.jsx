import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import Snacks from "./pages/Snacks";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Snacks />} />
        <Route path="/students" element={<Students />} />
        <Route path="/student/:id" element={<StudentDetail />} />
      </Routes>
      <Toast />
    </div>
  );
}

export default App;