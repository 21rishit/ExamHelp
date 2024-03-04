import {HashRouter, Routes, Route} from 'react-router-dom';
// import './components/style.css'
import Navbar from './components/Navbar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Books from './pages/Books';
import Help from './pages/Help';
import Notes from './pages/Notes';
import PYQs from './pages/PYQs';

function App() {
  return (
    <div>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Notes" element={<Notes/>} />
          <Route path="/PYQs" element={<PYQs/>} />
          <Route path="/Books" element={<Books/>} />
          <Route path="/Contribute" element={<Help/>} />
          {/* <Route path="/Contribute" element={<Contribute/>} /> */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
