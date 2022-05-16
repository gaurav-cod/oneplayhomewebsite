function getQueryJSON() {
  const query = location.search.split("?")[1];
  if (!query) return {};
  const queryJSON = JSON.parse(
    '{"' +
      decodeURI(query)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
  return queryJSON;
}

async function loadJob() {
  const id = getQueryJSON().id || "id";

  return fetch(config.BASE_API + "/career/jobs/" + id, {
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

loadJob().then((data) => {
  const title = document.getElementById("title");
  const category = document.getElementById("category");
  const experience = document.getElementById("experience");
  const location = document.getElementById("location");
  const createdAt = document.getElementById("created_at");
  const openings = document.getElementById("opennings");
  const applyUrl = document.getElementById("apply_url");
  const description = document.getElementById("job_desc");
  const eduction = document.getElementById("education");
  const skills = document.getElementById("skills");

  title.innerHTML = data.title;
  category.innerHTML = data.category;
  experience.innerHTML = data.experience + " years";
  location.innerHTML =
    data.location + " / " + (data.is_remote ? "Remote Friendly" : "In-office");
  createdAt.innerHTML = new Date(data.created_at).toDateString();
  openings.innerHTML = data.opennings;
  applyUrl.href = data.apply_url;

  data.description.split("\n").forEach((line) => {
    const para = document.createElement("p");
    para.innerHTML = line;
    description.appendChild(para);
  });

  data.education.split("\n").forEach((line) => {
    const para = document.createElement("p");
    para.innerHTML = line;
    eduction.appendChild(para);
  });

  data.skills.forEach((skill) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.innerHTML = skill.title;
    skills.appendChild(chip);
  });
});
