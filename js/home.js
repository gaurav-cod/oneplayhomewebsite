function loadGames() {
  return fetch(config.GAMES_API + "?page=0&limit=30", {
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

loadGames().then((data) => {
  [1, 2, 3].forEach((page) => {
    const listEl = document.querySelector("#swiper" + page);
    const start = (page - 1) * 10;
    const end = start + 10;
    data.slice(start, end).forEach((game) => {
      const gameEl = document.createElement("div");
      gameEl.className = "swiper-slide";
      gameEl.innerHTML = `
      <img src="${
        config.GAMES_ASSETS_PREFIX +
        game.oplay_id +
        game.text_background_image
      }" class="img-list" alt="" />
    `;
      listEl.appendChild(gameEl);
    });
  });

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
});
