//some default pre init
var Countly = Countly || {};
Countly.q = Countly.q || [];

//provide countly initialization parameters
Countly.app_key = config.COUNTLY_APP_KEY;
Countly.url = config.COUNTLY_URL;
Countly.debug = true;
Countly.app_version = "1.2";

Countly.q.push(['track_sessions']);
Countly.q.push(['track_pageview']);
// Countly.q.push(['track_clicks']);
Countly.q.push(['track_scrolls']);
Countly.q.push(['track_errors']);
// Countly.q.push(['track_links']);
Countly.q.push(['track_forms']);
Countly.q.push(['collect_from_forms']);

//automatically report traces
Countly.q.push(["track_performance", {
  //page load timing
  RT:{},
  //required for automated networking traces
  instrument_xhr: true,
  captureXhrRequestResponse: true,
  AutoXHR: {
      alwaysSendXhr: true,
      monitorFetch: true,
      captureXhrRequestResponse: true
  },
  //required for screen freeze traces
  Continuity: {
      enabled: true,
      monitorLongTasks: true,
      monitorPageBusy: true,
      monitorFrameRate: true,
      monitorInteractions: true,
      afterOnload: true
  }
}]);

function countlyEvent(ob){
  Countly.add_event({
    key: ob.id, 
    segmentation: {
      "id": ob.id
    }
  });
  console.log('You clicked OneplayEvent',ob.id);
}

//load countly script asynchronously
(function() {
  var cly = document.createElement('script'); cly.type = 'text/javascript';
  cly.async = true;
  //enter url of script here
  cly.src = config.COUNTLY_SRC;
  cly.onload = function(){Countly.init()};
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(cly, s);

})();