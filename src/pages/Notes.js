import React from "react";
import Card from "../components/Card";

const Notes = () => {
  return (
    <section
      id="books"
      class="bg-light mt-4"
      style={{ padding: "60px 0px", backgroundColor: "rgb(240, 238, 238)" }}
    >
      <div class="container-lg">
        <div class="text-center">
          <h2>
            <i class="bi bi-info-circle-fill d-none d-md-inline"></i> Notes
          </h2>
          <p class="lead text-muted">Lorem ipsum dolor sit amet.</p>
        </div>
        <Card />
      </div>
    </section>
  );
};

export default Notes;
