//some default pre init
var Countly = Countly || {};
Countly.q = Countly.q || [];

//provide countly initialization parameters
Countly.app_key = '293826549c121b1284fd77dc1d359235126c6318';
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

  const divs = document.querySelectorAll('.SubscriptionClicked');

  divs.forEach(el => el.addEventListener('click', event => {
    Countly.add_event({
      key:"SubscriptionClicked", 
      // segmentation: {
      //   "id": ob.id
      // }
    });
    console.log('You clicked SubscriptionClicked');
  }));

})();