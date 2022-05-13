const roadmaps = [
  {
    title: "2021, Q3",
    description:
      "Website & Dashboard & Mac/Windows Application over Moonlight Port",
    done: true,
  },
  {
    title: "2021, Q4",
    description: "Backend using Proxmox, Python, QTC++, Node, Custom Sunshine Port",
    done: true,
  },
  {
    title: "2022, Q1",
    description: "Android Client based on Moonlight with custom OnePlay Integration - Beta",
    done: true,
  },
  {
    title: "2022, Q1",
    description: "Live Streaming Integration for Streaming directly to Youtube/Twitch etc - Beta",
    done: true,
  },
  {
    title: "2022, Q1",
    description: "Acquire Custom Servers",
    done: true,
  },
  {
    title: "2022, Q2",
    description: "Bug Fixing and End2End Integration",
    done: false,
  },
  {
    title: "2022, Q2",
    description: "Going fully open source from server and client side",
    done: false,
  },
  {
    title: "2022, Q2",
    description: "WebRTC Implementation for Gaming over Browser",
    done: false,
  },
  {
    title: "2022, Q3",
    description: "VR Client for Oculus",
    done: false,
  },
  {
    title: "2022, Q4",
    description: "Release First OneOS designed for de-centralized cloud gaming - completely open source",
    done: false,
  },
  {
    title: "2023, Q1",
    description: "Run your own node or join the OnePlay Network - completely open source over blockchain for decentralized cloud gaming",
    done: false,
  },
  {
    title: "2023, Q2",
    description: "Custom Servers tuned for Cloud Streaming",
    done: false,
  },
  {
    title: "2023, Q3",
    description: "Bring More open nodes to join the decentralized network",
    done: false,
  },  
  {
    title: "2023, Q4",
    description: "Run Custom DApp/Meta-Verse App or 3D application over the decentralized network for Developers",
    done: false,
  }
];

const roadmapList = document.getElementById("roadmap");

roadmaps.forEach((roadmap, index) => {
  const roadmapItem = document.createElement("li");
  roadmapItem.classList.add("timeline-inverted");
  roadmapItem.innerHTML = `
          <div class="timeline-heading d-none d-lg-block">
            <h4 class="timeline-title fw-bold">${roadmap.title}</h4>
          </div>
          <div class="timeline-badge">
            ${roadmap.done ? '<i class="fas fa-check"></i>' : ""}
          </div>
          <div class="timeline-panel">
          <h4 class="timeline-title d-block d-lg-none">${roadmap.title}</h4>
            <ul class="timeline-body">
              ${roadmap.description
                .split("\n")
                .map((line) => `<li class="mb-3">${line}</li>`)
                .join("")}
            </ul>
          </div>
    `;
  roadmapList.appendChild(roadmapItem);
});
