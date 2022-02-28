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

var swiper = new Swiper(".image-firstrow", {
  slidesPerView: 5.5,
  spaceBetween: 1,
  speed: 1000,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
});

var swiper = new Swiper(".image-secondrow", {
  slidesPerView: 5.5,
  spaceBetween: 1,
  speed: 1500,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// var swiper = new Swiper(".image-thirdrow", {
//     slidesPerView: 4,
//     spaceBetween: 5,
//     centeredSlides: true,
//     loop: true,
//     autoplay: {
//         delay: 2000,
//         disableOnInteraction: false,
//     },
// });

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
  ga('send', {
    hitType: 'event',
    eventCategory: 'Home',
    eventAction: 'login',
    eventLabel: 'User hit login button',
  });
}

function signUpEvent() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Home',
    eventAction: 'signup',
    eventLabel: 'User hit signup button',
  });
}

function loadLinks() {
  const map = [
    {selector: "#login", url: config.APP_URL + "/login"},
    {selector: "#signup", url: config.SIGNUP_URL},
    {selector: "#starter", url: config.APP_URL + "?subscribe=Starter"},
    {selector: "#founder", url: config.APP_URL + "?subscribe=Founder"},
    {selector: "#elite", url: config.APP_URL + "?subscribe=Elite"},
  ];

  map.forEach((item) => {
    const el = document.querySelector(item.selector);
    if (el) {
      el.setAttribute("href", item.url);
    }
  });
}

loadLinks();
