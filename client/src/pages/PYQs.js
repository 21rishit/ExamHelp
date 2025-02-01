import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import SkeletonCard from "../components/shimmerCard";
import { useSearch } from "../context/searchContext";

const PYQs = () => {
  const [pyqs, setPyqs] = useState([]); // Stores all fetched PYQs
  const [loading, setLoading] = useState(true); // Controls the loading state
  const { searchQuery } = useSearch(); // Access search query from SearchContext

  useEffect(() => {
    const fetchPYQs = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/pyqs`
        );
        const data = await response.json();
        console.log(data);
        setPyqs(data); // Store fetched PYQs
        setLoading(false); // Stop the loading state
      } catch (error) {
        console.error("Error fetching PYQs:", error.message);
        setLoading(false);
      }
    };

    fetchPYQs();
  }, []);

  // Filter PYQs based on the search query across all fields
  const filteredPYQs = pyqs.filter((pyq) =>
    [
      "courseTitle",
      "courseCode",
      "facultyName",
      "term",
      "academicYear",
      "contributor",
    ].some((key) =>
      pyq[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <section
      id="pyqs"
      className="bg-light mt-4"
      style={{ padding: "60px 0px", backgroundColor: "rgb(240, 238, 238)" }}
    >
      <div className="container-lg">
        <div className="text-center">
          <h2>
            <i className="bi bi-info-circle-fill d-none d-md-inline m-auto"></i>{" "}
            Previous Sem Papers
          </h2>
        </div>

        {/* Render Skeleton Cards while loading */}
        {loading ? (
          <ul className="list-unstyled">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <li key={index}>
                  <SkeletonCard />
                </li>
              ))}
          </ul>
        ) : filteredPYQs.length > 0 ? (
          // Render filtered PYQs
          <ul className="list-unstyled">
            {filteredPYQs.map((pyq) => (
              <li key={pyq._id}>
                <Card
                  courseTitle={pyq.courseTitle}
                  courseCode={pyq.courseCode}
                  facultyName={pyq.facultyName}
                  term={pyq.term}
                  academicYear={pyq.academicYear}
                  contributor={pyq.contributor}
                  link={pyq.link}
                />
              </li>
            ))}
          </ul>
        ) : (
          // Show no results message if no PYQs match the query
          <div className="text-center">
            <p className="text-muted">No PYQs found for "{searchQuery}".</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PYQs;
