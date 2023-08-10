const thisForm = document.getElementById('partnerData');

thisForm.addEventListener('submit', async function (e) {
    let nameError = document.forms["partnerData"]["name"].value;
    let phoneError = document.forms["partnerData"]["phone_number"].value;
    let emailError = document.forms["partnerData"]["oneplay_email"].value;
    let socialLinkError = document.forms["partnerData"]["social_link"].value;
    let mediaError = document.forms["partnerData"]["media_account"].value;
    let suggestionError = document.forms["partnerData"]["suggestion"].value;
    const namePattern = /^[A-Za-z ]+$/;
    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let isValid = true;
    if (!nameError.match(namePattern)) 
        {
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

    // const socialLinks = socialLinkError.split(",");
    // for (const link of socialLinks) {
    //     if (!link.trim()) {
    //         document.getElementById("invalidLink").classList.remove("d-none");
    //         isValid = false;
    //         return;
    //     }
    //     else document.getElementById("invalidLink").classList.add("d-none"); 
    // }
    if(socialLinkError === "") {
        document.getElementById("invalidLink").classList.remove("d-none");
        isValid = false;
    }
    
    if (mediaError === "") {
        document.getElementById("invalidMediaAccount").classList.remove("d-none");
        isValid = false;
    }
    else document.getElementById("invalidMediaAccount").classList.add("d-none");

    if(suggestionError.length > 1000) {
        document.getElementById("invalidsuggestion").classList.remove("d-none");
        isValid = false;
    }
    else document.getElementById("invalidsuggestion").classList.add("d-none");
    
    if(isValid) {
        e.preventDefault();
        const formData = new FormData(document.querySelector('#partnerData'))
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData)),
            redirect: 'follow'
        };
    
        document.getElementById("successResponse").classList.remove("d-none");
        document.getElementById("defaultForm").classList.add("d-none");
    
        const response = await fetch('https://forms.zohopublic.com/rainboxmediapvtltd/form/CreatorsRegistrationForm/formperma/pKRX39-lhNR4xFrXupkWe9R_VgSsUK0SP0ffGGBp-yU/htmlRecords/submit', requestOptions);
        const result = await response.json(); 
    }
    
    e.preventDefault();
    return false;
});