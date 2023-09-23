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
    { selector: "#starter", url: config.APP_URL + "?subscribe=Starter" },
    { selector: "#founder", url: config.APP_URL + "?subscribe=Founder" },
    { selector: "#elite", url: config.APP_URL + "?subscribe=Elite" },
    { selector: "#speed-test", url: config.SPEED_TEST_URL },
  ];

  map.forEach((item) => {
    const elementList = document.querySelectorAll(item.selector);
    elementList.forEach((element) => {
      element.setAttribute("href", item.url);
    });
  });
}

function handleAuth() {
  const session = document.cookie.match(/op_session_token=(.*?);/);
  const login = document.querySelectorAll("#login");
  const signup = document.querySelectorAll("#signup");
  const home = document.querySelectorAll('#home');
  // const logout = document.querySelector("#logout");
  if (session) {
    login.forEach((l) => {
      l.style.display = "none";
    });
    signup.forEach((s) => {
      s.style.display = "none";
    });
    home.forEach((h) => {
      h.setAttribute('href', '/dashboard/');
    });
    // logout.style.display = "block";
  } else {
    login.forEach((l) => {
      l.style.display = "inline-block";
    });
    signup.forEach((s) => {
      s.style.display = "inline-block";
    });
    // logout.style.display = "none";
  }
}

function loadSeriousNotification() {
  fetch(config.BASE_API + "/notification/serious?partnerId=" + config.PARTNER_ID, {
    headers: {
      "content-type": "application/json",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    mode: "cors",
    credentials: "omit",
  })
    .then((res) => res.json())
    .then((data) => {
      if (!!data.text) {
        const html = `
          <div class="container-fluid">
            <div id="serious" class="row alertCookieBg font16 py-3 text-center">
              <div class="col align-self-center pe-0">
                <p class="text-white mb-0">
                  ${data.text}
                </p>
              </div>
              <div class="col-auto">
                <button 
                  class="btn text-nowrap borderRadius50 p-0 text-white pe-lg-3"
                  style="float: right"
                  onclick="closeSeriousNotification()"
                >
                  <i class="fas fa-times-circle font16"></i>
                </button>
              </div>
            </div>
          </div>
        `;
        document.body.insertAdjacentHTML("afterbegin", html);
      }
    });
}

function closeSeriousNotification() {
  document.getElementById("serious").remove();
}

loadLinks();
handleAuth();
loadSeriousNotification();
