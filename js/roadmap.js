// colorClass = warning, success, info, danger

const roadmaps = [
  {
    title: "2018, Q1",
    description:
      "- ICO Pre-Sale\n- PKT ICO and Blockchain Integration\n- The first cryptocurrency exchanges are entered",
    done: true,
    colorClass: "danger",
  },
  {
    title: "2018, Q2",
    description: "- ICO Sale\n- The first cryptocurrency exchanges are entered",
    done: true,
    colorClass: "warning",
  },
  {
    title: "2018, Q3",
    description: "- ICO Sale\n- The first cryptocurrency exchanges are entered",
    done: false,
    colorClass: "info",
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
          <div class="timeline-badge ${roadmap.colorClass}">
            ${roadmap.done ? '<i class="fas fa-check"></i>' : ""}
          </div>
          <div class="timeline-panel">
            <div class="timeline-heading">
              <h4 class="timeline-title">${roadmap.title}</h4>
            </div>
            <div class="timeline-body">
              ${roadmap.description
                .split("\n")
                .map((line) => `<p>${line}</p>`)
                .join("")}
            </div>
          </div>
    `;
  roadmapList.appendChild(roadmapItem);
});
