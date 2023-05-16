function checkSessionToken() {
  const cookie = document.cookie.match(/op_session_token=(.*?);/);

  if (cookie) {
    window.location.href = "/dashboard/";
  }
}

// Execute the checkSessionToken function before the HTML loads.
window.addEventListener("load", checkSessionToken);