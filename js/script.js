function check() {
  var Password = document.getElementById("enterPassword");
  var Confirmpassword = document.getElementById("repeatPassword");
  if (Password.value == Confirmpassword.value) {
    document.getElementById("CheckPasswordMatch").style.color = "green";
    document.getElementById("CheckPasswordMatch").innerHTML = "Password Match";
  } else {
    document.getElementById("CheckPasswordMatch").style.color = "red";
    document.getElementById("CheckPasswordMatch").innerHTML =
      "Password does not Match";
  }
}

// -------------------------images-Slider---------------

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 *
 * @param {HTMLDivElement} el
 * @param {string} url
 */
const changeVideo = (el) => {
  const otherParagraphs = Array.from(el.parentElement.children)
    .filter((child) => child !== el)
    .map((child) => Array.from(child.querySelectorAll("p")))
    .reduce((acc, cur) => acc.concat(cur), []);
  const paragraphs = el.querySelectorAll("p");

  paragraphs.forEach((p) => {
    p.classList.remove("text-fade");
  });
  otherParagraphs.forEach((p) => {
    if (!p.classList.contains("text-fade")) p.classList.add("text-fade");
  });

  // const video = document.querySelector("#alt-video");
  // if (video.getAttribute("src") === url) return;

  // video.setAttribute("src", url);
  // video.play();
};

function loginEvent() {
  ga("send", {
    hitType: "event",
    eventCategory: "Home",
    eventAction: "login",
    eventLabel: "User hit login button",
  });
}

function signUpEvent() {
  ga("send", {
    hitType: "event",
    eventCategory: "Home",
    eventAction: "signup",
    eventLabel: "User hit signup button",
  });
}

function loadLinks() {
  const map = [
    { selector: "#login", url: config.APP_URL + "/login" },
    { selector: "#signup", url: config.APP_URL + "/register" },
    // { selector: "#starter", url: config.APP_URL + "?subscribe=Starter" },
    // { selector: "#founder", url: config.APP_URL + "?subscribe=Founder" },
    // { selector: "#elite", url: config.APP_URL + "?subscribe=Elite" },
    { selector: "#speed-test", url: config.SPEED_TEST_URL },
  ];

  map.forEach((item) => {
    const elementList = document.querySelectorAll(item.selector);
    elementList.forEach((element) => {
      element.setAttribute("href", item.url);
    });
  });
}

function handleLogout() {
  document.cookie =
    "op_session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.reload();
}

function handleAuth() {
  const session = getCookie("op_session_token");
  const login = document.querySelector("#login");
  const signup = document.querySelector("#signup");
  const logout = document.querySelector("#logout");
  if (session) {
    login.style.display = "none";
    signup.style.display = "none";
    logout.style.display = "block";
  } else {
    login.style.display = "block";
    signup.style.display = "block";
    logout.style.display = "none";
  }
}

loadLinks();
handleAuth();
