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

function getSession() {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const [name, value] = cookies[i].trim().split('=');

    if (name === 'op_session_token') {
      return value;
    }
  }

  return null;
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
  const session = getSession();
  const login = document.querySelectorAll("#login");
  const signup = document.querySelectorAll("#signup");
  // const logout = document.querySelector("#logout");
  if (session) {
    login.forEach((l) => {
      l.style.display = "none";
    });
    signup.forEach((s) => {
      s.style.display = "none";
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
  fetch(config.BASE_API + "/notification/serious", {
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
          <div id="serious" class="bg-danger p-3 text-center">
            <span class="text-white">
              ${data.text}
            </span>
            <button 
              class="btn btn-sm btn-danger"
              style="float: right"
              onclick="closeSeriousNotification()"
            >
              <i class="fas fa-times"></i>
            </button>
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
