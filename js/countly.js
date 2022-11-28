//some default pre init
var Countly = Countly || {};
Countly.q = Countly.q || [];

//provide countly initialization parameters
Countly.app_key = '5cfd6a960ace7f7faaafabb7bc7a52d0a6d85815';
Countly.url = 'https://countly.dev.oneplay.co';

Countly.q.push(['track_sessions']);
Countly.q.push(['track_pageview']);
Countly.q.push(['track_clicks']);
Countly.q.push(['track_scrolls']);
Countly.q.push(['track_errors']);
Countly.q.push(['track_links']);
Countly.q.push(['track_forms']);
Countly.q.push(['collect_from_forms']);

//load countly script asynchronously
(function() {
  var cly = document.createElement('script'); cly.type = 'text/javascript';
  cly.async = true;
  //enter url of script here
  cly.src = 'https://countly.dev.oneplay.co/sdk/web/countly.min.js';
  cly.onload = function(){Countly.init()};
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(cly, s);
})();