export default function Help() {
  return (
    <section id="contact" class="bg-light mt-4" style={{ backgroundColor: "rgb(240, 238, 238)" }}>
      <div class="container-lg">
        <div class="text-center">
          <h2>
            <i class="bi bi-hand-index-thumb-fill"></i> Get in Touch
          </h2>
          <p class="lead text-muted">
            Questions to ask? Fill out the form to contact me directly...
          </p>
        </div>

        <div class="row justify-content-center my-5">
          <div class="col-lg-6">
            <form action="">
              <label for="email" class="form-label">
                Email address:
              </label>
              <div class="mb-4 input-group">
                <span class="input-group-text">
                  <i class="bi bi-envelope-fill"></i>
                </span>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="e.g. xyz@gmail.com"
                  required
                />

                <span class="input-group-text">
                  <span
                    class="tt"
                    data-bs-placement="bottom"
                    title="Enter an email address we can reply to"
                  >
                    <i class="bi bi-question-circle text-muted"></i>
                  </span>
                </span>
              </div>

              <label for="name" class="form-label">
                Name:
              </label>
              <div class="mb-4 input-group">
                <span class="input-group-text">
                  <i class="bi bi-person-fill"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="e.g. John Doe"
                  required
                />

                <span class="input-group-text">
                  <span
                    class="tt"
                    data-bs-placement="bottom"
                    title="Pretty self explanatory really..."
                  >
                    <i class="bi bi-question-circle text-muted"></i>
                  </span>
                </span>
              </div>

              <label for="subject" class="form-label">
                What is your question about?
              </label>
              <div class="input-group mb-4">
                <span class="input-group-text">
                  <i class="bi bi-question-circle-fill"></i>
                </span>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  id="subject"
                >
                  <option selected>Open this select menu</option>
                  <option value="Notes">Notes</option>
                  <option value="PYQ's">PYQ's</option>
                  <option value="Books">Books</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div class="form-floating mb-4">
                <textarea class="form-control" id="query" rows="5"></textarea>
                <label for="query" class="form-label">
                  Your query...
                </label>
              </div>

              <div class="mb-4 text-center">
                <button type="submit" class="btn btn-warning">
                  Submit <i class="bi bi-send-fill"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}