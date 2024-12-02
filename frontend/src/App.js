import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LawyerForm from "./Components/LawyerForm";
import ClientForm from "./Components/ClientForm";
import CaseForm from "./Components/CaseForm";
import PredictionForm from "./Components/PredictionForm";
import LawyerList from "./Components/LawyerList";
import ClientList from "./Components/ClientList";
import CaseList from "./Components/CaseList";
import './App.css';

fetch('http://localhost:5000/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log('Error:', error));

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Legal Case Management System</h1>
        <Routes>
          <Route path="/" element={<LawyerList />} />
          <Route path="/lawyers" element={<LawyerList />} />
          <Route path="/lawyers/form" element={<LawyerForm />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/form" element={<ClientForm />} />
          <Route path="/cases" element={<CaseList />} />
          <Route path="/cases/form" element={<CaseForm />} />
          <Route path="/predict" element={<PredictionForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
