window.addEventListener('load', function() {
  // Initialize
  // SpatialNavigation.init();

  // Define navigable elements (anchors and elements with "focusable" class).
  SpatialNavigation.add({
    selector: 'input, select, textarea, a, button'
  });

  // Make the *currently existing* navigable elements focusable.
  // SpatialNavigation.makeFocusable();

  // Focus the first navigable element.
  // SpatialNavigation.focus();
});

$.getScript('https://luke-chang.github.io/js-spatial-navigation/spatial_navigation.js', function() {
$('input, select, textarea, a, button')
  .SpatialNavigation()
  .focus(function() 
    { 
      $(this).css('outline', '2px solid white'); 
    })
  .blur(function() { 
      $(this).css('outline', ''); 
    })
  // .first();
  // .focus();
});