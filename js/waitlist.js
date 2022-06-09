async function saveRequest(first_name, last_name, email, phone_number) {
  return fetch(config.BASE_API + "/logging/waitlist", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    mode: "cors",
    credentials: "omit",
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      phone_number,
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
}

function submitForm() {
  const formEl = document.querySelector("#form");
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    // disable submit button
    const submitBtn = document.querySelector("#submit-btn");
    submitBtn.disabled = true;
    const first_name = formEl.querySelector("#first_name").value;
    const last_name = formEl.querySelector("#last_name").value;
    const email = formEl.querySelector("#email").value;
    const phone_number = formEl.querySelector("#phone_number").value;
    saveRequest(first_name, last_name, email, phone_number)
      .then((data) => {
        console.log(data);
        alert(
          "Thank you for your interest in the platform. We will contact you shortly."
        );
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred. Please try again later.");
      })
      .finally(() => {
        // enable submit button
        submitBtn.disabled = false;
      });
  });
}

async function getWaitlistCount() {
  return fetch(config.BASE_API + "/logging/waitlist/count", {
    method: "GET",
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

function loadWaitlistCount() {
  getWaitlistCount().then((data) => {
    const countEl = document.querySelector("#waitlist-count");
    countEl.innerHTML = data.count + 500;
  });
}

submitForm();
loadWaitlistCount();
