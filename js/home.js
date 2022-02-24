function loadGames() {
  return fetch("https://103.242.119.222/api/games?page=0&limit=90", {
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
    const start = (page - 1) * 30;
    const end = start + 30;
    data.slice(start, end).forEach((game) => {
      const gameEl = document.createElement("div");
      gameEl.className = "swiper-slide";
      gameEl.innerHTML = `
      <img src="${
        "https://cdn.edge-net.co/game_assets/" +
        game.oplay_id +
        game.text_background_image
      }" class="img-list" alt="" />
    `;
      listEl.appendChild(gameEl);
    });
  });
});
