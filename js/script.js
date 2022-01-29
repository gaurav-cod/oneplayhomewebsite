function check() {
    var Password = document.getElementById('enterPassword')
    var Confirmpassword = document.getElementById('repeatPassword')
    if (Password.value == Confirmpassword.value) {
        document.getElementById('CheckPasswordMatch').style.color = 'green';
        document.getElementById('CheckPasswordMatch').innerHTML = 'Password Match';
    } else {
        document.getElementById('CheckPasswordMatch').style.color = 'red';
        document.getElementById('CheckPasswordMatch').innerHTML = 'Password does not Match';
    }
}

// -------------------------images-Slider---------------

var swiper = new Swiper(".image-firstrow", {
    slidesPerView: 5.5,
    spaceBetween: 1,
    speed:1000,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
});



var swiper = new Swiper(".image-secondrow", {
    slidesPerView: 5.5,
    spaceBetween: 1,
    speed:1500,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

// var swiper = new Swiper(".image-thirdrow", {
//     slidesPerView: 4,
//     spaceBetween: 5,
//     centeredSlides: true,
//     loop: true,
//     autoplay: {
//         delay: 2000,
//         disableOnInteraction: false,
//     },
// });