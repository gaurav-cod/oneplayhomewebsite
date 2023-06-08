syncScripts();
function syncScripts() {
  // please provide the correct path to these files according to your project structure
  var scripts = ['./js/countly_boomerang.js', 'https://cdn.jsdelivr.net/npm/boomerangjs@1.0.1/boomerang.min.js'];
  var i = 0;
  function loopScriptList(scripts) {
      recursiveScriptMaker(scripts[i], function() {
          i++;
          if(i < scripts.length) {
              loopScriptList(scripts);   
          }
      }); 
  }
  loopScriptList(scripts);      
}
function recursiveScriptMaker(source, callback ) {
  var script = document.createElement('script');
  script.onload = function() {
      console.log('Successfully loaded the source: ' + source)
      callback();
  }
  script.src = source;
  document.getElementsByTagName('head')[0].appendChild(script);
}

//some default pre init
var Countly = Countly || {};
Countly.q = Countly.q || [];

//provide countly initialization parameters
Countly.app_key = config.COUNTLY_APP_KEY;
Countly.url = config.COUNTLY_URL;
Countly.heatmap_whitelist = config.BASE_URL;
Countly.app_version = config.APP_VERSION;
Countly.debug = true;

Countly.q.push(['track_sessions']);
// Countly.q.push(['track_pageview',location.pathname+location.hash]);
Countly.q.push(['track_clicks']);
Countly.q.push(['track_scrolls']);
Countly.q.push(['track_errors']);
Countly.q.push(['track_links']);
Countly.q.push(['collect_from_forms']);

//will collect hidden inputs
Countly.q.push(['track_forms', null, true]);

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
    Countly.init();
  };
  var s = document.getElementsByTagName('script')[0]; 
  s.parentNode.insertBefore(cly, s);
})();