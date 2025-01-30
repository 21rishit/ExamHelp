import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import SkeletonCard from "../components/shimmerCard";
import { useSearch } from "../context/searchContext";

const Notes = () => {
  const [notes, setNotes] = useState([]); // Stores all fetched notes
  const [loading, setLoading] = useState(true); // Controls the loading state
  const { searchQuery } = useSearch(); // Access search query from SearchContext

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/notes");
        const data = await response.json();
        setNotes(data); // Store fetched notes
        setLoading(false); // Stop the loading state
      } catch (error) {
        console.error("Error fetching notes:", error.message);
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Filter notes based on the search query across all fields
  const filteredNotes = notes.filter((note) =>
    [
      "courseTitle",
      "courseCode",
      "facultyName",
      "year",
      "contributor",
    ].some((key) =>
      note[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <section
      id="notes"
      className="bg-light mt-4"
      style={{ padding: "60px 0px", backgroundColor: "rgb(240, 238, 238)" }}
    >
      <div className="container-lg">
        <div className="text-center">
          <h2>
            <i className="bi bi-info-circle-fill d-none d-md-inline"></i> Notes
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
        ) : filteredNotes.length > 0 ? (
          // Render filtered notes
          <ul className="list-unstyled">
            {filteredNotes.map((note) => (
              <li key={note._id}>
                <Card
                  courseTitle={note.courseTitle}
                  courseCode={note.courseCode}
                  facultyName={note.facultyName}
                  year={note.year}
                  contributor={note.contributor}
                  link={note.link}
                />
              </li>
            ))}
          </ul>
        ) : (
          // Show no results message if no notes match the query
          <div className="text-center">
            <p className="text-muted">No notes found for "{searchQuery}".</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Notes;
