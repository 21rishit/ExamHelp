import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

const Card = ({courseTitle, courseCode, facultyName, term, academicYear, link, contributor, title, publishYear, subject, author}) => {
  return ( 
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="list-group">
          <div className="card my-3 mx-10 ">
            <div className="card-header d-flex">
              <div className="px-2 flex-grow-1">
                <h5 className="mb-1">{courseTitle}{title} - {publishYear}{courseCode}</h5>
              </div>
              <div className="px-3">
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                <FontAwesomeIcon icon={faEye} />
              </a>

              </div>
              <div className="px-3">
                <FontAwesomeIcon icon={faFileArrowDown} />
              </div>
            </div>
            <div className="container">
              <h6>{facultyName}</h6>
              <h6>{term}</h6>
              <h6>{academicYear}</h6>
              <h6>{contributor}</h6>
              <h6>{subject}</h6>
              <h6>{author}</h6>
              {/* <div className="d-flex justify-content-between">
                <small>Exam Date: Sep 07, 2023</small>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
