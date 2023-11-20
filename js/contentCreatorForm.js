const thisForm = document.getElementById("partnerData");
document.getElementById("submitBtn").classList.add("disabled");

const nameField = document.forms["partnerData"]["name"];
const countryCode = document.forms["partnerData"]["country_code"];
const phoneField = document.forms["partnerData"]["phone_number"];
const discordField = document.forms["partnerData"]["discord_server"];
const emailField = document.forms["partnerData"]["oneplay_email"];
const socialLinkField = document.forms["partnerData"]["social_link"];
const mediaField = document.forms["partnerData"]["media_account"];
const suggestionField = document.forms["partnerData"]["suggestion"];

const namePattern = /^([a-zA-Z]+\s?[a-zA-Z]+)+$/i;
const phonePattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const linkPattern = /\b(?:https?|ftp):\/\/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/;

const isNameValid = () => {
  if (!nameField.value.trim().match(namePattern)) {
    document.getElementById("invalidName").classList.remove("d-none");
    return false;
  } else {
    document.getElementById("invalidName").classList.add("d-none");
    return true;
  }
}

const isEmailValid = () => {
  if (!emailField.value.match(emailPattern)) {
    document.getElementById("invalidEmail").classList.remove("d-none");
    return false;
  } else {
    document.getElementById("invalidEmail").classList.add("d-none");
    return true;
  }
}

const isPhoneValid = () => {
  if (!validator.isMobilePhone(phoneField.value)) {
    document.getElementById("invalidPhone").classList.remove("d-none");
    return false;
  }

  document.getElementById("invalidPhone").classList.add("d-none");
  return true;
}

// const isDiscordValid = () => {
//   var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
//   if (!discordField.value.match(regex)) {
//     document.getElementById("invalidDiscord").classList.remove("d-none");
//     return false;
//   } else {
//     document.getElementById("invalidDiscord").classList.add("d-none");
//     return true;
//   }
// }

const isSocialValid = () => {
  if (!socialLinkField.value.match(linkPattern)) {
    document.getElementById("invalidLink").classList.remove("d-none");
    return false;
  } else {
    document.getElementById("invalidLink").classList.add("d-none");
    return true;
  }
}

const isMediaEmailValid = () => {
  if (!mediaField.value.match(emailPattern)) {
    document.getElementById("invalidMediaAccount").classList.remove("d-none");
    return false;
  } else {
    document.getElementById("invalidMediaAccount").classList.add("d-none");
    return true;
  }
}

const isSuggestionValid = () => {
  if (suggestionField.value.length > 1000) {
    document.getElementById("invalidsuggestion").classList.remove("d-none");
    return false;
  } else {
    document.getElementById("invalidsuggestion").classList.add("d-none");
    return true;
  }
}

const validateFields = () => {
  let isValid = true;
  
  isValid = isValid && isNameValid();
  isValid = isValid && isEmailValid();
  isValid = isValid && isPhoneValid();
  // isValid = isValid && isDiscordValid();
  isValid = isValid && isSocialValid();
  isValid = isValid && isMediaEmailValid();
  isValid = isValid && isSuggestionValid();

  console.warn(isValid, 'sbt btn')
  if (!isValid) {
    document.getElementById("submitBtn").classList.add("disabled");
  } else {
    document.getElementById("submitBtn").classList.remove("disabled");
  }

  return isValid;
}

nameField.addEventListener("input", (e) => {
  validateFields();
  console.warn(e.target.value)
})
phoneField.addEventListener("input", (e) => {
  validateFields();
  console.warn(e.target.value)
})
  // discordField.addEventListener("input", (e) => {
  //   validateFields();
  //   console.warn(e.target.value)
  // })
emailField.addEventListener("input", (e) => {
  validateFields();
  console.warn(e.target.value)
})
socialLinkField.addEventListener("input", (e) => {
  validateFields();
  console.warn(e.target.value)
})
mediaField.addEventListener("input", (e) => {
  validateFields();
  console.warn(e.target.value)
})
suggestionField.addEventListener("input", (e) => {
  validateFields();
  console.warn(e.target.value)
})

thisForm.addEventListener("submit", function (e) {
  if (validateFields()) {
    e.preventDefault();
    const formData = new FormData();
    const [fisrtName, ...lastName] = nameField.value.split(" ");
    formData.append("Name_First", fisrtName);
    formData.append("Name_Last", lastName?.join(" ") || "");
    formData.append("Website", discordField.value);
    formData.append("Website1", socialLinkField.value);
    formData.append("Email", emailField.value);
    formData.append("Email1", mediaField.value);
    formData.append("PhoneNumber_countrycode", countryCode.value + phoneField.value);
    if (suggestionField.value.length) {
      formData.append("MultiLine", suggestionField.value);
    }

    let requestOptions = {
      method: "POST",
      body: formData,
    };

    document.getElementById("successResponse").classList.remove("d-none");
    document.getElementById("defaultForm").classList.add("d-none");

    fetch(window.config.CONTENT_CREATOR_FORM, requestOptions).catch(console.log)
  }

  return false;
});