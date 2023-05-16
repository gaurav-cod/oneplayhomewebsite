const cookie = document.cookie.match(/op_session_token=(.*?);/);

if (cookie) {
  document.body.innerHTML = '';
  window.location.href = "/dashboard/";
}
