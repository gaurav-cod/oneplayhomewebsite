function getQueryJSON() {
  const query = location.search.split("?")[1];
  if (!query) return {};
  const queryJSON = JSON.parse(
    '{"' +
      decodeURI(query)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
  return queryJSON;
}

function getOsByTarget(target) {
  switch (target) {
    case "macos":
      return "Mac OS";
    case "windows":
      return "Windows";
    case "ios":
      return "iOS";
    case "android":
      return "Android";
    case "linux":
      return "Linux";
    default:
      return "";
  }
}

function getLinkByTarget(target) {
  switch (target) {
    case "macos":
      return config.MACOS_DOWNLOAD_URL;
    case "windows":
      return config.WINDOWS_DOWNLOAD_URL;
    case "android":
      return config.ANDROID_DOWNLOAD_URL;
    default:
      return "";
  }
}

function getOS() {
  const userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = document.getElementById("os"),
    target = getQueryJSON().target;

  if (target) {
    os.innerHTML = getOsByTarget(target);
  } else if (macosPlatforms.indexOf(platform) !== -1) {
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
    os = document.getElementById("download"),
    target = getQueryJSON().target;

  if (target) {
    os.setAttribute("href", getLinkByTarget(target));
  } else if (macosPlatforms.indexOf(platform) !== -1) {
    os.setAttribute("href", config.MACOS_DOWNLOAD_URL);
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os.setAttribute("href", config.WINDOWS_DOWNLOAD_URL);
  } else if (/Android/.test(userAgent)) {
    os.setAttribute("href", config.ANDROID_DOWNLOAD_URL);
  }
}

getOS();
getDownloadLink();
