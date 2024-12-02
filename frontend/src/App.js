import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LawyerList from "./Components/LawyerList";
import AddLawyer from "./Components/addLawyer";

function App() {
  return (
    <Router>
      <div>
        <h1>Legal Case Management System</h1>
        <nav>
          <ul>
            <li><Link to="/lawyers">View Lawyers</Link></li>
            <li><Link to="/add-lawyer">Add Lawyer</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/lawyers" element={<LawyerList />} />
          <Route path="/add-lawyer" element={<AddLawyer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
