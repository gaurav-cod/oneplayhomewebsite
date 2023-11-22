const thisForm = document.getElementById("businessData");
document.getElementById("submitBtn").classList.add("disabled");

const nameField = document.forms["businessData"]["name"];
const emailField = document.forms["businessData"]["email"];
const countryCode = document.forms["businessData"]["country_code"];
const phoneField = document.forms["businessData"]["phone"];
const websiteField = document.forms["businessData"]["website"];
const companyDetailField = document.forms["businessData"]["company_detail"];
const partnershipField = document.forms["businessData"]["partnership"];

const namePattern = /^([a-zA-Z]+\s?[a-zA-Z]+)+$/i;
const phonePattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const linkPattern =
  /\b(?:https?|ftp):\/\/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/;
const numericPattern = /^\d+$/;

const isNameValid = () => {
  if (!nameField.value.match(namePattern)) {
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
  if (!validator.isMobilePhone(countryCode.value + phoneField.value)) {
    document.getElementById("invalidPhone").classList.remove("d-none");
    return false;
  }

  //this should be last validation always
  document.getElementById("phone").value = phoneField.value.trim();
  if (!phoneField.value.trim().match(numericPattern)) {
    document.getElementById("invalidPhone").classList.remove("d-none");
    return false;
  }

  document.getElementById("invalidPhone").classList.add("d-none");
  return true;
}

const isWebsiteFieldValid = () => {
  if (!websiteField.value.match(linkPattern)) {
    document.getElementById("invalidWebsite").classList.remove("d-none");
    return false;
  } else {
    document.getElementById("invalidWebsite").classList.add("d-none");
    return true;
  }
}

const isCompanyDetailFieldValid = () => {
  if (companyDetailField.value === "") {
    document.getElementById("invalidCompanyDetail").classList.remove("d-none");
    return false;
  } else {
    document.getElementById("invalidCompanyDetail").classList.add("d-none");
    return true;
  }
}

const isPartnershipFieldValid = () => {
  if (partnershipField.value === "") {
    document.getElementById("invalidPartnership").classList.remove("d-none");
    return false;
  } else {
    document.getElementById("invalidPartnership").classList.add("d-none");
    return true;
  }
}

const validateFields = () => {
  let isValid = true;
  
  isValid = isValid && isNameValid();
  isValid = isValid && isEmailValid();
  isValid = isValid && isPhoneValid();
  isValid = isValid && isWebsiteFieldValid();
  isValid = isValid && isCompanyDetailFieldValid();
  isValid = isValid && isPartnershipFieldValid();

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
})
phoneField.addEventListener("input", (e) => {
  validateFields();
})
websiteField.addEventListener("input", (e) => {
  validateFields();
})
emailField.addEventListener("input", (e) => {
  validateFields();
})
companyDetailField.addEventListener("input", (e) => {
  validateFields();
})
partnershipField.addEventListener("input", (e) => {
  validateFields();
})

thisForm.addEventListener("submit", function (e) {
  if (validateFields()) {
    e.preventDefault();
    const formData = new FormData();
    const [fisrtName, ...lastName] = nameField.value.split(" ");
    formData.append("Name_First", fisrtName);
    formData.append("Name_Last", lastName?.join(" ") || "");
    formData.append("Email", emailField.value);
    formData.append("PhoneNumber_countrycode", countryCode.value + phoneField.value);
    formData.append("Website", websiteField.value);
    formData.append("SingleLine", companyDetailField.value);
    formData.append("MultiLine", partnershipField.value);

    let requestOptions = {
      method: "POST",
      body: formData,
    };

    document.getElementById("successResponse").classList.remove("d-none");
    document.getElementById("defaultForm").classList.add("d-none");

    fetch(window.config.BUSINESS_FORM, requestOptions).catch(console.log)
  }

  return false;
});

$.get( config.BASE_API + '/location', function( data ) {
  let currencyCountryCode = [];
  currencyCountryCode['INR'] = '+91';
  currencyCountryCode['MYR'] = '+60';
  currencyCountryCode['SGD'] = '+65';
  currencyCountryCode['KRW'] = '+82';
  currencyCountryCode['AED'] = '+971';
  currencyCountryCode['QAR'] = '+974';
  if(data.currency != '')
  {
    $("#country_code").val(currencyCountryCode[data.currency]);
  }
});
