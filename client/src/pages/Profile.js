import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css"; 
import "../styles/profileShimmer.css"; // Import shimmer effect styles

const Profile = () => {
  const [user, setUser] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pyqs");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          navigate("/login");
          return;
        }

        const userResponse = await axios.get(
          `http://localhost:5000/auth/profile/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(userResponse.data);

        const contributionsResponse = await axios.get(
          `http://localhost:5000/auth/contributions/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setContributions(contributionsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Filter contributions by type
  const filterContributions = (type) => {
    return contributions.filter((item) =>
      type === "pyqs"
        ? item.term !== undefined
        : type === "notes"
        ? item.year !== undefined
        : type === "books"
        ? item.author !== undefined
        : false
    );
  };

  return (
    <div className="container profile-container" style={{ marginTop: "120px" }}>
      <div className="row">
        {/* Left: User Profile Card */}
        <div className="col-md-3 d-flex justify-content-start">
          {loading ? (
            // **Shimmer Effect for User Profile**
            <div className="shimmer-card">
              <div className="shimmer-profile-pic"></div>
              <div className="shimmer-text shimmer-name"></div>
              <div className="shimmer-text shimmer-line"></div>
              <div className="shimmer-text shimmer-line"></div>
            </div>
          ) : (
            <div className="card shadow-sm p-3" style={{ width: "100%" }}>
              <div className="text-center">
                <img
                  src={user.profileImage || "/default-profile.png"}
                  alt="Profile"
                  className="rounded-circle border border-secondary"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
              </div>
              <div className="card-body text-center">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text"><strong>Username:</strong> {user.username}</p>
                <p className="card-text"><strong>Email:</strong> {user.email}</p>
                <p className="card-text"><strong>College:</strong> {user.college}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Contributions Section */}
        <div className="col-md-9">
          <h4 className="text-center fw-bold">Your Contributions</h4>
          <div className="tabs-container">
            {/* Tabs for PYQs, Notes, Books, Downloads */}
            <ul className="nav nav-pills justify-content-center">
              <li className="nav-item">
                <button className={`nav-link ${activeTab === "pyqs" ? "active" : ""}`} onClick={() => setActiveTab("pyqs")}>
                  PYQs
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeTab === "notes" ? "active" : ""}`} onClick={() => setActiveTab("notes")}>
                  Notes
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeTab === "books" ? "active" : ""}`} onClick={() => setActiveTab("books")}>
                  Books
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link disabled">Downloads (Coming Soon)</button>
              </li>
            </ul>
          </div>

          {/* Contributions Grid */}
          <div className="row mt-4">
            {loading ? (
              // **Shimmer Effect for Contributions**
              <div className="shimmer-list">
                <div className="shimmer-card"></div>
                <div className="shimmer-card"></div>
                <div className="shimmer-card"></div>
              </div>
            ) : filterContributions(activeTab).length > 0 ? (
              filterContributions(activeTab).map((item) => (
                <div className="col-md-4 mb-3" key={item._id}>
                  <div className="card shadow-sm">
                    <div className="card-body text-center">
                      <h6 className="fw-bold">{item.title || item.courseTitle}</h6>
                      <p className="small">{item.subject || item.courseCode}</p>
                      <a href={item.link} className="btn btn-outline-primary btn-sm" target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted mt-3">No contributions yet in this section.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
