function getOS() {
  const userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = document.getElementById("os");

  if (macosPlatforms.indexOf(platform) !== -1) {
    os.innerText = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os.innerText = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os.innerText = "Windows";
  } else if (/Android/.test(userAgent)) {
    os.innerText = "Android";
  } else if (!os && /Linux/.test(platform)) {
    os.innerText = "Linux";
  }
}

function getDownloadLink() {
  const userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = document.getElementById("download");

  if (macosPlatforms.indexOf(platform) !== -1) {
    os.setAttribute("href", config.MACOS_DOWNLOAD_URL);
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os.setAttribute("href", config.WINDOWS_DOWNLOAD_URL);
  }
}

getOS();
getDownloadLink();
