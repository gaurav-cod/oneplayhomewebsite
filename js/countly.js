// import { CountlyService } from "./countly.service";
// const countlyService = new CountlyService();
// console.warn('heeh', countlyService)
// console.warn('huhuhuh')

//Countly Device_id Code Start
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

//some default pre init
var Countly = Countly || {};
Countly.q = Countly.q || [];

//provide countly initialization parameters
Countly.app_key = config.COUNTLY_APP_KEY;
Countly.url = config.COUNTLY_URL;
Countly.heatmap_whitelist = config.BASE_URL;
Countly.app_version = config.APP_VERSION;
Countly.debug = config.COUNTLY_DEBUG_MODE ?? false;

Countly.q.push(['track_sessions']);
Countly.q.push(['track_clicks']);
Countly.q.push(['track_scrolls']);
Countly.q.push(['track_errors']);
Countly.q.push(['track_links']);
Countly.q.push(['collect_from_forms']);

//will collect hidden inputs
Countly.q.push(['track_forms', null, true]);

//automatically report traces
// 

function countlyEvent(ob){
  Countly.add_event({
    key: ob, 
    "count": 1,
    segmentation: {
      'click_event': ob
    }
  });
  console.log('You clicked OneplayEvent',ob);
}

//load countly script asynchronously
(function() {
  
  $(window).on('hashchange', function() {
    Countly.q.push(['track_pageview',location.pathname+location.hash]);
  });
  $(window).on('unload', function(e) {
    e.preventDefault();
    const page = window.location.pathname.split("/").pop().split(".")[0];
    console.warn('changeetondee', page)
    switch (page) {
      case "about":
        countlyService.endEvent("websiteAboutUsView");
        break;
      case "download":
        countlyService.endEvent("websiteDownloadView");
        break;
      case "subscription":
        countlyService.endEvent("websiteSubscriptionView");
        break;
      case "decentralization":
        countlyService.endEvent("websiteDecentralizationView");
        break;
      default:
        break;
    }
  });
  
  var cly = document.createElement('script'); cly.type = 'text/javascript';
  cly.async = true;
  
  //enter url of script here
  cly.src = config.COUNTLY_SRC;
  cly.onload = function(){

    // Boomerang related configuration
    // Create boomerang script
    var boomerangScript = document.createElement('script');
    var countlyBoomerangScript =
    document.createElement('script');
    // Set boomerang script attributes
    boomerangScript.async = true;
    countlyBoomerangScript.async = true;

    // Set boomerang script source either locally or from CDN
    boomerangScript.src =
    'https://cdn.jsdelivr.net/npm/countly-sdk-web@latest/plugin/boomerang/boomerang.min.js';
    countlyBoomerangScript.src =
    'https://cdn.jsdelivr.net/npm/countly-sdk-web@latest/plugin/boomerang/countly_boomerang.js';

    // Append boomerang script to the head
    document.getElementsByTagName('head')[0].appendChild(boomerangScript);
    document.getElementsByTagName('head')[0].appendChild(countlyBoomerangScript);
    countlyBoomerangScript.onload = function () {
      // init Countly only after boomerang is loaded
      Countly.init();
    };
    
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
  };
  var s = document.getElementsByTagName('script')[0]; 
  s.parentNode.insertBefore(cly, s);
})();
