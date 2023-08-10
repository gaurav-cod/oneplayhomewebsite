const thisForm = document.getElementById('businessData');

thisForm.addEventListener('submit', async function (e) {
    let nameError = document.forms["businessData"]["name"].value;
    let emailError = document.forms["businessData"]["email"].value;
    let phoneError = document.forms["businessData"]["phone"].value;
    let websiteError = document.forms["businessData"]["website"].value;
    let companyDetailError = document.forms["businessData"]["company_detail"].value;
    let partnershipError = document.forms["businessData"]["partnership"].value;
    
    const namePattern = /^[A-Za-z ]+$/;
    const phonePattern = /^\d+$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let isValid = true;
    if (!nameError.match(namePattern)) {
        document.getElementById("invalidName").classList.remove("d-none");
        isValid = false;
    }
    else document.getElementById("invalidName").classList.add("d-none"); 
    
    if (!phoneError.match(phonePattern)) {
        document.getElementById("invalidPhone").classList.remove("d-none"); 
        isValid = false;
    }
    else  document.getElementById("invalidPhone").classList.add("d-none"); 

    if (!emailError.match(emailPattern)) {
        document.getElementById("invalidEmail").classList.remove("d-none"); 
        isValid = false;
    }
    else document.getElementById("invalidEmail").classList.add("d-none"); 

    if (websiteError === "") {
        document.getElementById("invalidWebsite").classList.remove("d-none");
        isValid = false;
    }
    else document.getElementById("invalidWebsite").classList.add("d-none"); 

    if (companyDetailError === "") {
        document.getElementById("invalidCompanyDetail").classList.remove("d-none");
        isValid = false;
    }
    else document.getElementById("invalidCompanyDetail").classList.add("d-none");

    if(partnershipError === "") {
        document.getElementById("invalidPartnership").classList.remove("d-none");
        isValid = false;
    }
    else document.getElementById("invalidPartnership").classList.add("d-none");

    if(isValid) {
        e.preventDefault();
        const formData = new FormData(document.querySelector('#businessData'))
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData)),
            redirect: 'follow'
        };

        document.getElementById("successResponse").classList.remove("d-none");
        document.getElementById("defaultForm").classList.add("d-none");

        const response = await fetch('https://forms.zohopublic.com/rainboxmediapvtltd/form/BusinessRequest/formperma/XAjWB2vhtG-f-Z4WnhtFKt2ruQCys9Zj-hWq4bCBVr8/htmlRecords/submit', requestOptions);
        const result = await response.json();
    }
    
    e.preventDefault();
    return false;
});