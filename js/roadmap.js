const roadmaps = [
  {
    title: "2018, Q1",
    description:
      "ICO Pre-Sale\nPKT ICO and Blockchain Integration\nThe first cryptocurrency exchanges are entered",
    done: true,
  },
  {
    title: "2018, Q2",
    description: "ICO Sale\nThe first cryptocurrency exchanges are entered",
    done: true,
  },
  {
    title: "2018, Q3",
    description: "ICO Sale\nThe first cryptocurrency exchanges are entered",
    done: false,
  },
];

const roadmapList = document.getElementById("roadmap");

roadmaps.forEach((roadmap, index) => {
  const isEven = index % 2 === 0;
  const roadmapItem = document.createElement("li");
  if (isEven) {
    roadmapItem.classList.add("timeline-inverted");
  }
  roadmapItem.innerHTML = `
          <div class="timeline-heading d-none d-lg-block">
            <h4 class="timeline-title">${roadmap.title}</h4>
          </div>
          <div class="timeline-badge">
            ${roadmap.done ? '<i class="fas fa-check"></i>' : ""}
          </div>
          <div class="timeline-panel">
          <h4 class="timeline-title d-block d-lg-none">${roadmap.title}</h4>
            <ul class="timeline-body">
              ${roadmap.description
                .split("\n")
                .map((line) => `<li class="my-3">${line}</li>`)
                .join("")}
            </ul>
          </div>
    `;
  roadmapList.appendChild(roadmapItem);
});
