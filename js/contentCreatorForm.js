const thisForm = document.getElementById("partnerData");

thisForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let name = document.forms["partnerData"]["name"].value;
  let phone = document.forms["partnerData"]["phone_number"].value;
  let discord = document.forms["partnerData"]["discord_server"].value;
  let email = document.forms["partnerData"]["oneplay_email"].value;
  let socialLink = document.forms["partnerData"]["social_link"].value;
  let media = document.forms["partnerData"]["media_account"].value;
  let suggestion = document.forms["partnerData"]["suggestion"].value;

  const namePattern = /^[a-zA-Z\s]*$/;
  const phonePattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const linkPattern =
    /\b(?:https?|ftp):\/\/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/;

  let isValid = true;

  if (!name.match(namePattern)) {
    document.getElementById("invalidName").classList.remove("d-none");
    isValid = false;
  } else document.getElementById("invalidName").classList.add("d-none");

  if (!phone.match(phonePattern)) {
    document.getElementById("invalidPhone").classList.remove("d-none");
    isValid = false;
  } else {
    document.getElementById("invalidPhone").classList.add("d-none");
  }

  if (!discord.match(linkPattern)) {
    document.getElementById("invalidDiscord").classList.remove("d-none");
    isValid = false;
  } else {
    document.getElementById("invalidPhone").classList.add("d-none");
  }

  if (!email.match(emailPattern)) {
    document.getElementById("invalidEmail").classList.remove("d-none");
    isValid = false;
  } else {
    document.getElementById("invalidEmail").classList.add("d-none");
  }

  if (!socialLink.match(linkPattern)) {
    document.getElementById("invalidLink").classList.remove("d-none");
    isValid = false;
  } else {
    document.getElementById("invalidLink").classList.add("d-none");
  }

  if (!media.match(emailPattern)) {
    document.getElementById("invalidMediaAccount").classList.remove("d-none");
    isValid = false;
  } else {
    document.getElementById("invalidMediaAccount").classList.add("d-none");
  }

  if (suggestion.length > 1000) {
    document.getElementById("invalidsuggestion").classList.remove("d-none");
    isValid = false;
  } else {
    document.getElementById("invalidsuggestion").classList.add("d-none");
  }

  if (isValid) {
    e.preventDefault();
    const formData = new FormData();

    const [fisrtName, ...lastName] = name.trim().split(" ");

    formData.append("Name_First", fisrtName);
    formData.append("Name_Last", lastName?.join(" ") || "");
    formData.append("Website", socialLink);
    formData.append("Website1", discord);
    formData.append("Email", email);
    formData.append("Email1", media);
    formData.append("PhoneNumber_countrycode", phone);
    if (suggestion.length) {
      formData.append("MultiLine", suggestion);
    }

    var requestOptions = {
      method: "POST",
      body: formData,
    };

    document.getElementById("successResponse").classList.remove("d-none");
    document.getElementById("defaultForm").classList.add("d-none");

    try {
      await fetch(window.config.CONTENT_CREATOR_FORM, requestOptions);
    } catch (e) {
      console.log(e);
    }
  }

  return false;
});
