import "./style.css";
import * as bootstrap from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const tooltips = document.querySelectorAll(".tt");
tooltips.forEach((tooltip) => {
  new bootstrap.Tooltip(tooltip);
});

export default function Home() {
  return (
    <section
      id="home"
      className=" mt-4"
      style={{ padding: "60px 0px", backgroundColor: "rgb(240, 238, 238)" }}
    >
      <div className="container-lg">
        <div className="text-center">
          <h2>
            <i className="bi bi-info-circle-fill d-none d-md-inline"></i>
            eXAMhELP
          </h2>
          <p className="lead text-muted">
            Your Last Minute Solution..
            <FontAwesomeIcon icon={faCloudArrowDown} />
          </p>
        </div>
        <div className="row my-5 aligh-items-center justify-content-center">
          <div className="col-8 col-lg-4 col-xl-3">
            <div className="card border-info border-2">
              <h4 className="card-header border-info text-center">Notes</h4>
              <div className="card-body text-center py-4">
                <h5 className="card-title">class Notes</h5>
                <p className="card-text mx-3 my-1 text-muted d-none d-lg-block">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad
                  amet deserunt laborum. Odit ea ut voluptas amet quasi facilis
                  ipsa.
                </p>
                <Link
                  to="/Notes"
                  className="btn btn-outline-danger btn-md mt-3"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
          <div className="col-8 col-lg-4 col-xl-3">
            <div className="card border-primary border-2">
              <h4 className="card-header border-primary text-center">PYQ's</h4>
              <div className="card-body text-center py-4">
                <h5 className="card-title">Previous Year Papers</h5>
                <p className="card-text mx-3 my-1 text-muted d-none d-lg-block">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi qui voluptatibus aspernatur aperiam maiores, iusto
                  sit, quos earum sapiente sequi impedit molestias voluptates
                  nobis quisquam.
                </p>
                <Link to="/PYQs" className="btn btn-outline-danger btn-md mt-3">
                  View
                </Link>
              </div>
            </div>
          </div>
          <div className="col-8 col-lg-4 col-xl-3">
            <div className="card border-info border-2">
              <h4 className="card-header border-info text-center">Books</h4>
              <div className="card-body text-center py-4">
                <h5 className="card-title">Get your reference books.</h5>
                <p className="card-text mx-3 my-1 text-muted d-none d-lg-block">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad
                  amet deserunt laborum. Odit ea ut voluptas amet quasi facilis
                  ipsa.
                </p>
                <Link
                  to="/books"
                  className="btn btn-outline-danger btn-md mt-3"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
