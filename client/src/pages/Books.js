import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import SkeletonCard from "../components/shimmerCard.js";
import { useSearch } from "../context/searchContext";

const Books = () => {
  const [books, setBooks] = useState([]); // Stores all fetched books
  const [loading, setLoading] = useState(true); // Controls the loading state
  const { searchQuery } = useSearch(); // Access search query from SearchContext

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/books`
        );
        const data = await response.json();
        setBooks(data); // Store fetched books
        setLoading(false); // Stop the loading state
      } catch (error) {
        console.error("Error fetching books:", error.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on the search query across all fields
  const filteredBooks = books.filter((book) =>
    ["title", "author", "subject", "publishYear"].some((key) =>
      book[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <section
      id="books"
      className="bg-light mt-4"
      style={{ padding: "60px 0px", backgroundColor: "rgb(240, 238, 238)" }}
    >
      <div className="container-lg">
        <div className="text-center">
          <h2>
            <i className="bi bi-info-circle-fill d-none d-md-inline"></i>{" "}
            Reference Books
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
        ) : filteredBooks.length > 0 ? (
          // Render filtered books
          <ul className="list-unstyled">
            {filteredBooks.map((book) => (
              <li key={book._id}>
                <Card
                  title={book.title}
                  author={book.author}
                  subject={book.subject}
                  publishYear={book.publishYear}
                  link={book.link}
                />
              </li>
            ))}
          </ul>
        ) : (
          // Show no results message if no books match the query
          <div className="text-center">
            <p className="text-muted">No books found for "{searchQuery}".</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Books;
