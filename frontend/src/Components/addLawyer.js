import React, { useState } from "react";
import axios from "axios";

const AddLawyer = () => {
  const [lawyer, setLawyer] = useState({
    name: "",
    specialization: "",
    email: "",
    contact_number: "",
    experience: ""
  });

  const handleChange = (e) => {
    setLawyer({ ...lawyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:5000/add_lawyer", lawyer)
      .then(response => {
        alert(response.data.message || "Lawyer added successfully!");
        setLawyer({ name: "", specialization: "", email: "", contact_number: "", experience: "" });
      })
      .catch(error => {
        console.error("Error adding lawyer:", error);
        alert("Failed to add lawyer. Please try again.");
      });
  };

  return (
    <div>
      <h2>Add New Lawyer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={lawyer.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Specialization:</label>
          <input type="text" name="specialization" value={lawyer.specialization} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={lawyer.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact Number:</label>
          <input type="text" name="contact_number" value={lawyer.contact_number} onChange={handleChange} required />
        </div>
        <div>
          <label>Experience (years):</label>
          <input type="number" name="experience" value={lawyer.experience} onChange={handleChange} required />
        </div>
        <button type="submit">Add Lawyer</button>
      </form>
    </div>
  );
};

export default AddLawyer;
