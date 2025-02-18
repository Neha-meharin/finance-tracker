document.addEventListener("DOMContentLoaded", function () {
    const xpValue = document.getElementById("xp-value");
    const xpFill = document.getElementById("xp-fill");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    function updateXP(newXP) {
        let maxXP = 500; 
        let percentage = (newXP / maxXP) * 100;
        xpValue.textContent = newXP;
        xpFill.style.width = percentage + "%";
    }

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});
