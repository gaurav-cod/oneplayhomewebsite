async function loadJobs() {
  return fetch(config.BASE_API + "/career/jobs?page=0&limit=100", {
    headers: {
      "content-type": "application/json",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    mode: "cors",
    credentials: "omit",
  })
    .then((res) => res.json())
    .then((data) => data);
}

loadJobs().then((data) => {
  const listEl = document.querySelector("#jobs-list");

  if (data.length === 0) {
    listEl.innerHTML = `
    <div class="col-12">
      <div class="alert alert-info text-center">
        <strong>No jobs posted yet!</strong>
      </div>
    </div>
    `;
    return;
  }

  data.forEach((job) => {
    const jobEl = document.createElement("a");
    jobEl.className = "card bg-dark mb-4 text-decoration-none";
    jobEl.href = "job.html?id=" + job.id;
    jobEl.innerHTML = `
    <div
        class="card-body row align-items-center text-center text-md-start"
    >
        <div class="col-12 col-md-6 text-white mb-4 mb-md-0">
            <h6 class="fw-bold">${job.title}</h6>
            <div class="small">${job.category}</div>
        </div>
        <div
            class="col-12 col-md-6 d-block d-md-flex justify-content-between text-white small align-items-center"
        >
            <div class="mb-3 mb-md-0">
                <i class="fa fa-location-arrow"></i>
                <span>${job.location} / ${
      job.is_remote === "true" ? "Remote Friendly" : "In Office"
    }</span>
            </div>
            <div class="text-capitalize">${job.type}</div>
            <i class="fa fa-arrow-right d-none d-md-block"></i>
        </div>
    </div>
        `;
    listEl.appendChild(jobEl);
  });
});
