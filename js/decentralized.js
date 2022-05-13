const faqs = [
  {
    icon: "./assets/decentralize/Group 227.png",
    question: "Hosters",
    answer:
      "Rent your hardware to run either the Open Metaverse or a VR Party Game or the upcoming GTA 6.",
  },
  {
    icon: "./assets/decentralize/Group 221.png",
    question: "Developers",
    answer:
      "Design and push the Game/VR App/DApp and sit back and watch how we distribute and run it over the decentralized super computing network and deliver it to the end user.",
  },
  {
    icon: "./assets/decentralize/Group 234.png",
    question: "Consumers",
    answer:
      "Whether it's a FIFA game with friends or joining a tour of 7 Worlds in VR or Using the DApp, all running/streaming directly from the nearest edge nodes.",
  },
  {
    icon: "./assets/decentralize/Group 225.png",
    question: "For the chain breakers",
    answer:
      "Completely open source OS, Network and Streaming Technology, host your own to run your own node or connect to the network to run the next generation internet.",
  },
  {
    icon: "./assets/decentralize/Path 535.png",
    question: "Open Gems Behind",
    answer:
      "KVM, CentOS, Ubuntu, Windows 10, Sunshine, Moonlight, WebRTC, Angular, Python.",
  },
];

const accordion = document.getElementById("accordion");

faqs.forEach((faq, index) => {
  const card = document.createElement("div");
  card.classList.add("card", "mb-3", "p-3");
  card.style.backgroundColor = "#121025";

  card.innerHTML = `
      <div class="card-header">
        <h5 class="mb-0 text-primary fw-bold">
        <img src="${faq.icon}" style="height: 1.3rem;" alt="">
            ${faq.question}
        </h5>
      </div>
  
      <div class="card-body text-white">
          ${faq.answer}
      </div>
    `;

  accordion.appendChild(card);
});
