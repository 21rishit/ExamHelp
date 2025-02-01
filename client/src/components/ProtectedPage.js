import React, { useEffect, useState } from "react";
import api from "../services/api"; // Import the API service

const ProtectedPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch protected data when the component mounts
    const fetchData = async () => {
      try {
        // Make a GET request to the protected route using the API service
        const response = await api.get("/protected"); // Replace with your protected endpoint
        setData(response.data);
      } catch (err) {
        console.error("Error fetching protected data:", err);
        setError("You are not authorized or token has expired.");
      }
    };

    fetchData();
  }, []); // Empty dependency array to only run once on mount

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Protected Data</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default ProtectedPage;
