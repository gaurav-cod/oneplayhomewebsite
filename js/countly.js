//some default pre init
var Countly = Countly || {};
Countly.q = Countly.q || [];

//provide countly initialization parameters
Countly.app_key = config.COUNTLY_APP_KEY;
Countly.url = config.COUNTLY_URL;
Countly.heatmap_whitelist = config.BASE_URL;
Countly.app_version = config.APP_VERSION;

Countly.q.push(['track_sessions']);
// Countly.q.push(['track_pageview',location.pathname+location.hash]);
Countly.q.push(['track_clicks']);
Countly.q.push(['track_scrolls']);
Countly.q.push(['track_errors']);
Countly.q.push(['track_links']);
Countly.q.push(['collect_from_forms']);

//will collect hidden inputs
Countly.q.push(['track_forms', null, true]);

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
    key: ob, 
    "count": 1,
    "sum": 1.5,
    "dur": 30,
    segmentation: {
      "click_event": ob
    }
  });
  console.log('You clicked OneplayEvent',ob);
}

//load countly script asynchronously
(function() {
  $(window).on('hashchange', function() {
    Countly.q.push(['track_pageview',location.pathname+location.hash]);
  });
  var cly = document.createElement('script'); cly.type = 'text/javascript';
  cly.async = true;
  //enter url of script here
  cly.src = config.COUNTLY_SRC;
  cly.onload = function(){
    Countly.init()   
  };
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(cly, s);
})();