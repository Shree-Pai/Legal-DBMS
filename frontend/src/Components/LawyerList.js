import React, { useEffect, useState } from "react";
import api from "../Services/api";
import { Link } from "react-router-dom";

const LawyerList = () => {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    api.get("/lawyers")
      .then(response => setLawyers(response.data))
      .catch(error => console.error("Error fetching lawyers", error));
  }, []);

  return (
    <div>
      <h2>Lawyers</h2>
      <Link to="/lawyers/form">Add New Lawyer</Link>
      <ul>
        {lawyers.map(lawyer => (
          <li key={lawyer.id}>
            {lawyer.name} - {lawyer.specialization}
            <Link to={`/lawyers/form/${lawyer.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LawyerList;
