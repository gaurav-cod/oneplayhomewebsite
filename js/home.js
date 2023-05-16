const cookie = document.cookie.match(/op_session_token=(.*?);/);

if (cookie) {
  window.location.href = "/dashboard/";
}
