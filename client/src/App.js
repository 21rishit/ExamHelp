import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './pages/style.css';
import Navbar from './components/Navbar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Books from './pages/Books';
import Contribute from './pages/Contribute';
import Notes from './pages/Notes';
import PYQs from './pages/PYQs';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedPage from './components/ProtectedPage';
import { useEffect } from 'react';


function App() {
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    // api call agar toekn hai toh, check its validity, if yes, ok, if not, remove, username remove
  })
  return (
    <div>
      <Router>
        {/* Navbar with integrated search */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Notes" element={<Notes />} />
          <Route path="/PYQs" element={<PYQs />} />
          <Route path="/Books" element={<Books />} />
          <Route path="/Contribute" element={<Contribute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          <Route path="/protected" element={<ProtectedPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
