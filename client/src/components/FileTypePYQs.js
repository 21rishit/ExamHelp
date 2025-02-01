import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Filetypepyqs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseTitle: '',
    courseCode: '',
    facultyName: '',
    term: '',
    academicYear: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('courseTitle', formData.courseTitle);
    data.append('courseCode', formData.courseCode);
    data.append('facultyName', formData.facultyName);
    data.append('term', formData.term);
    data.append('academicYear', formData.academicYear);
    data.append('file', formData.file);
    data.append('contributor', localStorage.getItem('userId'));

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/books/upload`, {
        method: 'POST',
        body: data,
      });

      console.log(response);
      if (response.ok) {
        alert('PYQ submitted successfully!');
        setFormData({
          courseTitle: '',
          courseCode: '',
          facultyName: '',
          term: '',
          academicYear: '',
          file: null,
        });
        navigate('/PYQs');
      } else {
        alert('Failed to submit PYQ. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting PYQ:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <section id="contribute" className="bg-light mt-4" style={{ backgroundColor: "rgb(240, 238, 238)" }}>
      <div className="container-lg">
        <div className="row justify-content-center my-5">
          <div className="col-lg-6">
            <form onSubmit={handleSubmit}>
              <label htmlFor="courseTitle" className="form-label">
                Course Title:
              </label>
              <div className="mb-4 input-group">
                <span className="input-group-text">
                  <i className="bi bi-person-fill"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="courseTitle"
                  name="courseTitle"
                  placeholder="e.g. Operating System"
                  value={formData.courseTitle}
                  onChange={handleChange}
                  required
                />
              </div>

              <label htmlFor="courseCode" className="form-label">
                Course Code:
              </label>
              <div className="mb-4 input-group">
                <span className="input-group-text">
                  <i className="bi bi-person-fill"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="courseCode"
                  name="courseCode"
                  placeholder="e.g. CSE3021"
                  value={formData.courseCode}
                  onChange={handleChange}
                  required
                />
              </div>

              <label htmlFor="facultyName" className="form-label">
                Faculty Name:
              </label>
              <div className="mb-4 input-group">
                <span className="input-group-text">
                  <i className="bi bi-person-fill"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="facultyName"
                  name="facultyName"
                  placeholder="e.g. Dr. G"
                  value={formData.facultyName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Choose Term:</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="term"
                      id="mid-term"
                      value="Mid Term"
                      checked={formData.term === 'Mid Term'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="mid-term">
                      Mid Term
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="term"
                      id="end-term"
                      value="End Term"
                      checked={formData.term === 'End Term'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="end-term">
                      End Term
                    </label>
                  </div>
                </div>
              </div>

              <label htmlFor="academicYear" className="form-label">
                Academic Year:
              </label>
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="bi bi-question-circle-fill"></i>
                </span>
                <select
                  className="form-select"
                  id="academicYear"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="2021">2021-22</option>
                  <option value="2022">2022-23</option>
                  <option value="2023">2023-24</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="formFileSm" className="form-label">
                  Upload PYQ (pdf or docx)
                </label>
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  name="file"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4 text-center">
                <button type="submit" className="btn btn-warning" onClick={handleSubmit}>
                  Submit <i className="bi bi-send-fill"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filetypepyqs;
