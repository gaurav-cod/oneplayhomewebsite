const faqs = [
  {
    question: "What is Cloud Gaming?",
    answer: `Cloud Gaming is a type of online gaming where there is no need to download or install any games on a mobile phone, PC, or console. They are stored and installed on remote servers while the audio/video is streamed to the user’s device.`,
  },
  {
    question: "What is OnePlay?",
    answer: `OnePlay is a cloud gaming platform which lets its users run any game they want to play, without having a gaming PC or the hardware to support the game. Just a fair internet connection (15Mbps) and your passion is good enough.`,
  },
  {
    question: "What are the advantages of cloud gaming? Are there any?",
    answer: `
        Here is what you get while using OnePlay:
        <ul>
            <li>You can play PC games like GTA 5, Witcher 3, Counter-Strike and Fortnite on Android!</li>
            <li>You can play your favorite games using OnePlay anywhere you want. On the way by bus, at school or work and during a business trip. You have your gaming PC in your pocket everywhere.</li>
            <li>You don’t have to download, install or update any game. OnePlay is all you need!</li>
        </ul>
        Moreover:
        <ul>
            <li>Disc space is no longer your concern! Some games could take over 50GB of disc capacity, and now OnePlay takes care of storage of those monsters!</li>
            <li>You get access to your games via many devices and platforms including Android, MacOS, Windows and Xbox.</li>
        </ul>
        OnePlay works on almost every device, even those substantially old.
    `,
  },
  {
    question: "How much does the OnePlay subscription cost?",
    answer: `
        OnePlay is a subscription service. We offer you three amazing subscription plans that will fit all your needs. We have a Starter Edition for Rs. 199, Founder Edition for Rs. 499 and Elite Edition for Rs. 799. The higher the plan you choose, the more games you have access to. You will also gain more features such as HD quality and 4K streaming.<br><br>
        You can pay via Debit Card, Credit Card or UPI.<br>
        Once subscribed you can cancel your subscription at any point.
      `,
  },
  {
    question: "Where are your servers located?",
    answer: `Our Servers are located in Mumbai. They are powered by 25 GBPS+ internet connectivity for uninterrupted gaming.`,
  },
  {
    question: "What are the minimum requirements for OnePlay?",
    answer: `
            <ul>
                <li>
                    Internet connection requirements<br><br>
                    OnePlay requires at least 15Mbps for 720p at 60 FPS and 25Mbps for 1080p at 60 FPS.<br>
                    Make sure your bandwidth is not overloaded by other tabs or applications. For the best performance, close additional tabs in your browser and programs that may affect your Internet connection (like YouTube, twitter etc.)
                </li>
                <li>
                    System requirements<br><br>
                    For all devices with Android: (needs to be added)<br>
                    For Windows: (needs to be added)<br>
                    For macOS: Your macOS must be 10.11 or higher.<br>
                </li>
            </ul>
        `,
  },
  {
    question: "What games are available at OnePlay?",
    answer: `
        Depending on your subscription plan you have chosen, you have access to different content. The higher the plan, the more games are at your disposal.<br><br>
        On our platform you will find games such as Fortnite, Destiny 2, Mount and Blade II: Bannerlord, Resident Evil 3, Albion Online, Neverwinter, Witcher 3, CS:GO, GTA V, Dead by Daylight, League of Legends,Team Fortress 2, Fallout 4, Path of Exile, Shadow of Tomb Raider, Cuisine Royale, Monster Hunter: World, World of Tanks, Dota 2, Paladins and MORE!
    `,
  },
  //   {
  //     question: "How can I cancel my subscription?",
  //     answere: `
  //         You can cancel your OnePlay subscription in 3 easy steps:<br>
  //         Go to My account > My subscription > Plan details.
  //       `,
  //   },
  {
    question: "How can I save my in-game progress?",
    answer: `
        If a video game supports cloud saves, your progress will be stored in the cloud of a digital distribution platform (e.g. Steam, Epic, Origin).<br><br>
        For video games where cloud storage mechanism is not supported, OnePlay saves the user’s game data and sends it back at the beginning of a new game session on OnePlay. In this case, if a video game creates files during the game process, the correct quitting from the game is not required.
      `,
  },
  {
    question: "How often does OnePlay add games?",
    answer: `OnePlay has a vast catalog of video games for all choices. Our team is regularly monitoring new game releases, selecting the most appealing and popular titles for your entertainment.`,
  },
  {
    question: "Do I need to download the games?",
    answer: `
        Nope! With OnePlay, our games are streamed straight to you. Indeed, that’s what makes a OnePlay subscription so worthwhile! You can access our games via our app, and no matter what device you want to play on, you can launch our games without having to wait for them to download and install.<br><br>
        Just click and play!<br><br>
        Once you have installed the OnePlay app, you don’t need any more available disk space. Your saved games also stay on the cloud, and you can find them from any device simply by logging in to the app.
      `,
  },
  {
    question: "Does OnePlay give Store Credentials?",
    answer: `OnePlay does not provide store credentials like Steam/Epic/Ubisoft/Origin/battle.net. It is suggested that you have an existing account with these administrations, with whichever game you want to play before you login to our platform.`,
  },
  {
    question: "Does OnePlay have access to my credentials?",
    answer: `OnePlay does not store your credentials on their servers. Each session is purged after your use. Only your Login ID is temporarily stored as a cache.`,
  },
  {
    question: "How do I claim my refund?",
    answer: `Click on the <a href='tnc.html#refund'>link</a> given here to read our refund and cancellation policy. No refunds are provided for any hourly or weekly plans.`,
  },
  {
    question: "Are there any prerequisites for the mobile app?",
    answer: `For the time being, our mobile application runs on Android 5 and above. We likewise suggest at least 2 GB of RAM.`,
  },
];

const accordion = document.getElementById("accordion");

faqs.forEach((faq, index) => {
  const card = document.createElement("div");
  card.classList.add("card", "mb-3");
  card.style.backgroundColor = "#1d1a2f";

  card.innerHTML = `
    <div class="card-header" id="heading${index}">
      <h5 class="mb-0">
        <button
          class="text-white btn collapsed"
          data-toggle="collapse"
          data-target="#collapse${index}"
          aria-expanded="true"
          aria-controls="collapse${index}"
        >
          ${faq.question}
        </button>
      </h5>
    </div>

    <div
      id="collapse${index}"
      class="collapse ${index === 0 ? "show" : ""}"
      aria-labelledby="heading${index}"
      data-parent="#accordion"
    >
      <div class="card-body text-white-50">
        <div class="px-3">
          ${faq.answer}
        </div>
      </div>
    </div>
  `;

  accordion.appendChild(card);
});

const buttons = document.querySelectorAll(".collapsed");

buttons.forEach((b) =>
  b.addEventListener("click", (e) => {
    document
      .querySelectorAll(".collapse")
      .forEach((c) => c.classList.remove("show"));
    const targetName = e.target.getAttribute("data-target");
    const target = document.querySelector(targetName);
    target.classList.toggle("show");
  })
);
