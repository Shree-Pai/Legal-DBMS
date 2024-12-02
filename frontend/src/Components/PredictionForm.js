import React, { useState } from "react";
import api from "../Services/api";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    lawyer_experience: "",
    case_type: "",
    client_history: ""
  });
  const [prediction, setPrediction] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/predict", formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error predicting case:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Predict Lawyer Success</h2>
      <input
        type="number"
        placeholder="Lawyer Experience"
        value={formData.lawyer_experience}
        onChange={(e) => setFormData({ ...formData, lawyer_experience: e.target.value })}
      />
      <input
        type="text"
        placeholder="Case Type"
        value={formData.case_type}
        onChange={(e) => setFormData({ ...formData, case_type: e.target.value })}
      />
      <input
        type="number"
        placeholder="Client History"
        value={formData.client_history}
        onChange={(e) => setFormData({ ...formData, client_history: e.target.value })}
      />
      <button type="submit">Predict</button>
      {prediction && <p>Prediction: {prediction}</p>}
    </form>
  );
};

export default PredictionForm;
