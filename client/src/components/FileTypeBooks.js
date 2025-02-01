import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Filetypebooks = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    subject: "",
    publishYear: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("subject", formData.subject);
    data.append("publishYear", formData.publishYear);
    data.append("file", formData.file);
    data.append("contributor", localStorage.getItem("userId"));

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/books/upload`, {
        method: "POST",
        body: data,
      });

      console.log(response);
      if (response.ok) {
        alert("Book submitted successfully!");
        setFormData({
          title: "",
          author: "",
          subject: "",
          publishYear: "",
          file: null,
        });
        navigate("/Books");
      } else {
        alert("Failed to submit Book. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting Book:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <section
      id="contribute"
      className="bg-light mt-4"
      style={{ backgroundColor: "rgb(240, 238, 238)" }}
    >
      <div className="container-lg">
        <div className="row justify-content-center my-5">
          <div className="col-lg-6">
            <form onSubmit={handleSubmit}>
              <label htmlFor="title" className="form-label">
                Book Title:
              </label>
              <div className="mb-4 input-group">
                <span className="input-group-text">
                  <i className="bi bi-person-fill"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="e.g. Let Us C"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <label htmlFor="author" className="form-label">
                Author:
              </label>
              <div className="mb-4 input-group">
                <span className="input-group-text">
                  <i className="bi bi-person-fill"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  name="author"
                  placeholder="e.g. Yashwant Knetkar"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>

              <label htmlFor="subject" className="form-label">
                Subject:
              </label>
              <div className="mb-4 input-group">
                <span className="input-group-text">
                  <i className="bi bi-person-fill"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  placeholder="e.g. Computer Language"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <label htmlFor="publishYear" className="form-label">
                Publish Year:
              </label>
              <div className="mb-4 input-group">
                <span className="input-group-text">
                  <i className="bi bi-person-fill"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="publishYear"
                  name="publishYear"
                  placeholder="e.g. 2002"
                  value={formData.publishYear}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formFileSm" className="form-label">
                  Upload Book (pdf or docx)
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
                <button
                  type="submit"
                  className="btn btn-warning"
                  onClick={handleSubmit}
                >
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

export default Filetypebooks;
