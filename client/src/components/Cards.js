import Card from "./Card";

export default function Cards() {
  return (
    <section
      id="books"
      className="bg-light mt-4"
      style={{ padding: "60px 0px", backgroundColor: "rgb(240, 238, 238)" }}
    >
      <div className="container-lg">
        <div className="text-center">
          <h2>
            <i className="bi bi-info-circle-fill d-none d-md-inline"></i> Reference
            Books
          </h2>
          <p className="lead text-muted">Lorem ipsum dolor sit amet.</p>
        </div>
        <Card />
      </div>
    </section>
  );
}
