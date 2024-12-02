import React, { useState, useEffect } from "react";
import api from "../Services/api";
import { useNavigate, useParams } from "react-router-dom";

const LawyerForm = () => {
  const [lawyer, setLawyer] = useState({ name: "", specialization: "", email: "", contactNumber: "", experience: "" });
  const navigate = useNavigate();  // Replaced useHistory with useNavigate
  const { id } = useParams();  // Replaced match with useParams

  useEffect(() => {
    if (id) {
      // Fetch lawyer data for editing
      api.get(`/lawyers/${id}`)
        .then(response => setLawyer(response.data))
        .catch(error => console.error("Error fetching lawyer", error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lawyer.id) {
      api.put(`/lawyers/${lawyer.id}`, lawyer)
        .then(() => navigate("/lawyers"))  // Replaced history.push with navigate
        .catch(error => console.error("Error updating lawyer", error));
    } else {
      api.post("/lawyers", lawyer)
        .then(() => navigate("/lawyers"))  // Replaced history.push with navigate
        .catch(error => console.error("Error adding lawyer", error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{lawyer.id ? "Edit" : "Add"} Lawyer</h2>
      <input
        type="text"
        value={lawyer.name}
        onChange={(e) => setLawyer({ ...lawyer, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="text"
        value={lawyer.specialization}
        onChange={(e) => setLawyer({ ...lawyer, specialization: e.target.value })}
        placeholder="Specialization"
      />
      <input
        type="email"
        value={lawyer.email}
        onChange={(e) => setLawyer({ ...lawyer, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="text"
        value={lawyer.contactNumber}
        onChange={(e) => setLawyer({ ...lawyer, contactNumber: e.target.value })}
        placeholder="Contact Number"
      />
      <input
        type="number"
        value={lawyer.experience}
        onChange={(e) => setLawyer({ ...lawyer, experience: e.target.value })}
        placeholder="Experience"
      />
      <button type="submit">{lawyer.id ? "Update" : "Add"} Lawyer</button>
    </form>
  );
};

export default LawyerForm;
