const thisForm = document.getElementById("businessData");

thisForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let name = document.forms["businessData"]["name"].value;
  let email = document.forms["businessData"]["email"].value;
  let phone = document.forms["businessData"]["phone"].value;
  let website = document.forms["businessData"]["website"].value;
  let companyDetail = document.forms["businessData"]["company_detail"].value;
  let partnership = document.forms["businessData"]["partnership"].value;

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
  } else document.getElementById("invalidPhone").classList.add("d-none");

  if (!email.match(emailPattern)) {
    document.getElementById("invalidEmail").classList.remove("d-none");
    isValid = false;
  } else document.getElementById("invalidEmail").classList.add("d-none");

  if (!website.match(linkPattern)) {
    document.getElementById("invalidWebsite").classList.remove("d-none");
    isValid = false;
  } else document.getElementById("invalidWebsite").classList.add("d-none");

  if (companyDetail === "") {
    document.getElementById("invalidCompanyDetail").classList.remove("d-none");
    isValid = false;
  } else document.getElementById("invalidCompanyDetail").classList.add("d-none");

  if (partnership === "") {
    document.getElementById("invalidPartnership").classList.remove("d-none");
    isValid = false;
  } else document.getElementById("invalidPartnership").classList.add("d-none");

  if (isValid) {
    const formData = new FormData();

    const [fisrtName, ...lastName] = name.trim().split(" ");

    formData.append("Name_First", fisrtName);
    formData.append("Name_Last", lastName?.join(" ") || "");
    formData.append("Email", email);
    formData.append("PhoneNumber_countrycode", phone);
    formData.append("Website", website);
    formData.append("SingleLine", companyDetail);
    formData.append("MultiLine", partnership);

    var requestOptions = {
      method: "POST",
      body: formData,
    };

    document.getElementById("successResponse").classList.remove("d-none");
    document.getElementById("defaultForm").classList.add("d-none");

    try {
      await fetch(window.config.BUSINESS_FORM, requestOptions);
    } catch (e) {
      console.log(e);
    }
  }

  return false;
});
