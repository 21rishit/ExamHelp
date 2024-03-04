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
    <section id="home" class=" mt-4" style={{ padding: "60px 0px", backgroundColor: "rgb(240, 238, 238)" }}>
      <div class="container-lg">
        <div class="text-center">
          <h2>
            <i class="bi bi-info-circle-fill d-none d-md-inline"></i>eXAMhELP
          </h2>
          <p class="lead text-muted">
            Your Last Minute Solution..
            <FontAwesomeIcon icon={faCloudArrowDown} />
          </p>
        </div>
        <div class="row my-5 aligh-items-center justify-content-center">
          <div class="col-8 col-lg-4 col-xl-3">
            <div class="card border-info border-2">
              <h4 class="card-header border-info text-center">Notes</h4>
              <div class="card-body text-center py-4">
                <h5 class="card-title">Class Notes</h5>
                <p class="card-text mx-3 my-1 text-muted d-none d-lg-block">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad
                  amet deserunt laborum. Odit ea ut voluptas amet quasi facilis
                  ipsa.
                </p>
                <Link to="/Notes" class="btn btn-outline-danger btn-md mt-3">View</Link>
              </div>
            </div>
          </div>
          <div class="col-8 col-lg-4 col-xl-3">
            <div class="card border-primary border-2">
              <h4 class="card-header border-primary text-center">PYQ's</h4>
              <div class="card-body text-center py-4">
                <h5 class="card-title">Previous Year Papers</h5>
                <p class="card-text mx-3 my-1 text-muted d-none d-lg-block">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi qui voluptatibus aspernatur aperiam maiores, iusto
                  sit, quos earum sapiente sequi impedit molestias voluptates
                  nobis quisquam.
                </p>
                <Link to="/PYQs" class="btn btn-outline-danger btn-md mt-3">View</Link>
              </div>
            </div>
          </div>
          <div class="col-8 col-lg-4 col-xl-3">
            <div class="card border-info border-2">
              <h4 class="card-header border-info text-center">Books</h4>
              <div class="card-body text-center py-4">
                <h5 class="card-title">Get your reference books.</h5>
                <p class="card-text mx-3 my-1 text-muted d-none d-lg-block">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad
                  amet deserunt laborum. Odit ea ut voluptas amet quasi facilis
                  ipsa.
                </p>
                <Link to="/books" class="btn btn-outline-danger btn-md mt-3">View</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
