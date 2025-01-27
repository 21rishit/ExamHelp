import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "../context/searchContext";
import { useEffect, useState } from "react";
import defaultProfilePic from "./images/dp.png"; // Import the default DP

function Navbar() {
  const { searchQuery, updateSearchQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("User"); // For dynamic user greeting
  const token = localStorage.getItem("authToken");
  const storedUserName = localStorage.getItem("userName");

  useEffect(() => {
    // Check if user is logged in by verifying the presence of a token in localStorage
    // const token = localStorage.getItem("authToken");
    // const storedUserName = localStorage.getItem("userName");
    // setIsLoggedIn(!!token); // Update login status
    // setUserName(storedUserName || "User"); // Update user name

    setIsLoggedIn(!token ? false : true); // Update login status
  }, [token]); // Runs once when the component mounts

  const handleSearch = (e) => {
    e.preventDefault();

    if (location.pathname === "/Books") {
      navigate(`/Books?search=${searchQuery}`);
    } else if (location.pathname === "/Notes") {
      navigate(`/Notes?search=${searchQuery}`);
    } else if (location.pathname === "/PYQs") {
      navigate(`/PYQs?search=${searchQuery}`);
    } else {
      alert("Search is only available on Books, Notes, or PYQs pages.");
    }
  };

  const handleLogout = () => {
    // Clear user data and token on logout
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setIsLoggedIn(false); // Update login state
    navigate("/"); // Redirect to login page
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-secondary fixed-top">
        <div className="container-xxl">
          {/* Logo that redirects to Home */}
          <Link to="/" className="navbar-brand fw-bold text-light">
            <i className="bi bi-circle"></i> eXAMhELP
          </Link>

          {/* Left Section - Notes, PYQs, Books */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/Notes" className="nav-link text-light fw-semibold">
                Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/PYQs" className="nav-link text-light fw-semibold">
                PYQs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Books" className="nav-link text-light fw-semibold">
                Books
              </Link>
            </li>
          </ul>

          {/* Middle Section - Search Bar */}
          <form className="d-flex mx-auto" role="search" onSubmit={handleSearch}>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
            />
          </form>

          {/* Right Section */}
          <div className="d-flex align-items-center">
            {!isLoggedIn ? (
              <>
                {/* Show Login/Register when NOT logged in */}
                <Link to="/login" className="btn btn-sm btn-light fw-semibold me-2">
                  Login
                </Link>
                <Link to="/register" className="btn btn-sm btn-warning fw-semibold">
                  Register
                </Link>
              </>
            ) : (
              <>
                {/* Show User Greeting and Dropdown when logged in */}
                {/* Contribute Button */}
                <Link to="/Contribute" className="btn btn-md btn-warning fw-bold me-3">
                  Contribute
                </Link>
                <div className="dropdown">
                  <button
                    className="btn btn-light d-flex align-items-center dropdown-toggle"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {/* User Image */}
                    <img
                      src={defaultProfilePic} // Use the default profile picture from the local folder
                      alt="User"
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                    />
                    {/* User Greeting */}
                    <span className="text-dark">Hi, {userName}</span>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdown"
                  >
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
