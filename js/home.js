if (!!localStorage.getItem("op_session_token")) {
  window.location.href = "/dashboard/";
}

function loadGames() {
  return fetch(config.BASE_API + "/games?page=0&limit=30", {
    headers: {
      "content-type": "application/json",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    mode: "cors",
    credentials: "omit",
  })
    .then((res) => res.json())
    .then((data) => data);
}

function getWaitlistCount() {
  return fetch(config.BASE_API + "/accounts/waitlist_users", {
    headers: {
      "content-type": "application/json",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    mode: "cors",
    credentials: "omit",
  })
    .then((res) => res.json())
    .then((data) => data.data);
}

// loadGames().then((data) => {
//   [1, 2, 3].forEach((page) => {
//     const listEl = document.querySelector("#swiper" + page);
//     const start = (page - 1) * 10;
//     const end = start + 10;
//     data.slice(start, end).forEach((game) => {
//       const gameEl = document.createElement("div");
//       gameEl.className = "swiper-slide";
//       gameEl.innerHTML = `
//       <img src="${game.text_background_image}" class="img-list" alt="" />
//     `;
//       listEl.appendChild(gameEl);
//     });
//   });

//   var swiper = new Swiper(".image-firstrow", {
//     slidesPerView: 5.5,
//     spaceBetween: 1,
//     speed: 1000,
//     centeredSlides: true,
//     loop: true,
//     autoplay: {
//       delay: 2000,
//       disableOnInteraction: false,
//     },
//   });

//   var swiper = new Swiper(".image-secondrow", {
//     slidesPerView: 5.5,
//     spaceBetween: 1,
//     speed: 1500,
//     centeredSlides: true,
//     loop: true,
//     autoplay: {
//       delay: 3000,
//       disableOnInteraction: false,
//     },
//   });
// });

// getWaitlistCount().then((data) => {
//   document.querySelector("#waitlist-count").innerHTML = `${data + 50}`;
// });
