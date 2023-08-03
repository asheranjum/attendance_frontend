// import logo from './logo.svg';
// import './App.css';
import Attendance from './Attendance';
import AttendanceUploader from './AttendanceUploader';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
  

      <Router>
      <div className=''>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">Attendance Task</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active"  to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link  className="nav-link"to="/attendance-uploader">Upload Attendance</Link>
              </li>
            
            </ul>
           
          </div>
        </div>
      </nav>


        <Routes>
          <Route path="/attendance-uploader" element={<AttendanceUploader />} />
          <Route path="/" element={<Attendance />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
