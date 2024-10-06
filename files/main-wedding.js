// AOS

//AOS ANIMATION
AOS.init();
// SCROLLREVEA
var swiper1 = new Swiper(".album-slide", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    autoplay: {
        delay: 3000,
    },
});


// FANCY BOX
Fancybox.bind("[data-fancybox]", {

});

//AUDIO
$(".toggleAudio").on("click",function(){
    $(this).find("img").attr("src", function(index, attr){
        return attr === './files/volume.png' ? './files/volume-off.png' : './files/volume.png';
    });
    audio = $("#audio")
    audio[0].paused ? audio[0].play() : audio[0].pause();
})

// Countdown Timer
function countdown() {
    const targetDate = new Date("2024-11-15T04:00:00Z").getTime(); // Set your target date and time in UTC
    const countdownElement = document.getElementById("countdown");

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "Event has started!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }

    const interval = setInterval(updateCountdown, 1000);
}

countdown();


// Ensure audio plays automatically after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("audio");
    audio.play().catch(function(error) {
        console.log("Autoplay was prevented:", error);
    });
});
