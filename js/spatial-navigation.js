window.addEventListener('load', function() {
    // Initialize
    SpatialNavigation.init();

    // Define navigable elements (anchors and elements with "focusable" class).
    SpatialNavigation.add({
      selector: 'a, .btn'
    });

    // Make the *currently existing* navigable elements focusable.
    SpatialNavigation.makeFocusable();

    // Focus the first navigable element.
    SpatialNavigation.focus();
});

$.getScript('https://luke-chang.github.io/js-spatial-navigation/spatial_navigation.js', function() {
$('a, .btn')
    .SpatialNavigation()
    .focus(function() { $(this).css('outline', '2px solid white'); })
    .blur(function() { $(this).css('outline', ''); })
    .first()
    .focus();
});