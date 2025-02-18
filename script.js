document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("start-btn");
    const usernameInput = document.getElementById("username");

    // Check if username already exists in localStorage
    if (localStorage.getItem("username")) {
        usernameInput.value = localStorage.getItem("username");
    }

    startBtn.addEventListener("click", function () {
        const username = usernameInput.value.trim();
        if (username) {
            localStorage.setItem("username", username);
          
             window.location.href = "index1.html";
        } else {
            alert("Please enter a name!");
        }
    });
});