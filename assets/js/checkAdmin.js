let AdminPanel = document.querySelector(".AdminPanel")

if (JSON.parse(localStorage.getItem("isAdmin"))) {
        AdminPanel.style.display = "block"
    } else {
        AdminPanel.style.display = "none"
    }

    
window.addEventListener("storage", function(e) {  
    window.location.href = "login.html"
});