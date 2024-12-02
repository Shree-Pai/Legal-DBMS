import React, { useState, useEffect } from "react";
import axios from "axios";

const LawyerList = () => {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/lawyers")
      .then(response => setLawyers(response.data.lawyers || []))
      .catch(error => console.error("Error fetching lawyers:", error));
  }, []);

  if (!lawyers.length) {
    return <p>No lawyers found.</p>;
  }

  return (
    <div>
      <h2>List of Lawyers</h2>
      <ul>
        {lawyers.map((lawyer) => (
          <li key={lawyer.LawyerID}>
            {lawyer.Name} - {lawyer.Specialization} ({lawyer.Email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LawyerList;
