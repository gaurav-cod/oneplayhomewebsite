if(config.HAS_COUNTLY === "true") {
  //some default pre init
  var Countly = Countly || {};
  Countly.q = Countly.q || [];

  //provide countly initialization parameters
  Countly.app_key = config.COUNTLY_APP_KEY;
  Countly.url = config.COUNTLY_URL;
  Countly.heatmap_whitelist = config.BASE_URL;
  Countly.debug = true;
  Countly.offline_mode = true;
  Countly.remote_config = true;
  // Countly.app_version = "1.2";

  Countly.q.push(['track_sessions']);
  Countly.q.push(['track_pageview',location.pathname+location.hash]);
  Countly.q.push(['track_clicks']);
  Countly.q.push(['track_scrolls']);
  Countly.q.push(['track_errors']);
  Countly.q.push(['track_links']);
  Countly.q.push(['collect_from_forms']);
  //Fetch user's NPS and Survey feedbacks from the server


  //will collect hidden inputs
  Countly.q.push(['track_forms', null, true]);

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
    $(window).on('hashchange', function() {
      Countly.q.push(['track_pageview',location.pathname+location.hash]);
      syncScripts();
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
}