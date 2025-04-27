import "./App.css";
import FeedbackForm from "./components/feedbackForm";
import Dashboard from "./components/dashboard";
import { Link, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#131341] to-[#050517] text-white">
      <div className="h-20 border-b-2 border-[#2c2c5c] w-full flex justify-end items-center px-10">
        <div className="flex gap-4">
          <Link
            to="/"
            className="px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full py-2 font-semibold hover:opacity-90 transition"
          >
            Form
          </Link>
          <Link
            to="/dashboard"
            className="px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full py-2 font-semibold hover:opacity-90 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
