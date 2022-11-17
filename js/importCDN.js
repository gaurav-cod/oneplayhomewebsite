const CDN = [
    'https://code.jquery.com/jquery-2.2.1.min.js',
];

CDN.forEach(link => {
    console.log("ffff")
    var script = document.createElement('script');
    script.setAttribute('src', link);
    document.body.appendChild(script);
});