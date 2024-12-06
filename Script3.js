// JavaScript to handle FAQ question toggling
function toggleAnswer(answerId) {
    const answer = document.getElementById(answerId);
    answer.style.display = (answer.style.display === "none" || answer.style.display === "") ? "block" : "none";
}

// JavaScript to handle form submission with validation for contact form
document.getElementById("contactForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    let valid = true;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name.trim() === "") {
        alert("Name is required.");
        valid = false;
    }
    if (email.trim() === "" || !validateEmail(email)) {
        alert("A valid email is required.");
        valid = false;
    }
    if (message.trim() === "") {
        alert("Message is required.");
        valid = false;
    }

    if (valid) {
        alert("Form submitted successfully!");
        document.getElementById("contactForm").reset();
    }
});

// JavaScript to handle form submission with validation for feedback form
document.getElementById("feedbackForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    let valid = true;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name.trim() === "") {
        alert("Name is required.");
        valid = false;
    }
    if (email.trim() === "" || !validateEmail(email)) {
        alert("A valid email is required.");
        valid = false;
    }
    if (message.trim() === "") {
        alert("Message is required.");
        valid = false;
    }

    if (valid) {
        alert("Feedback submitted successfully!");
        document.getElementById("feedbackForm").reset();
    }
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// JavaScript for dynamic greeting based on the time of day
function dynamicGreeting() {
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) {
        const now = new Date();
        const hour = now.getHours();
        const greeting = hour < 12 ? "Good morning!" : hour < 18 ? "Good afternoon!" : "Good evening!";
        greetingElement.innerText = greeting;
    }
}
    // Call dynamicGreeting if on the index page
    if (window.location.pathname.includes('index.html')) {
        dynamicGreeting();
    }
// JavaScript for live search in projects
function liveSearch() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toLowerCase();
    const nodes = document.getElementsByClassName("project");
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].style.display = nodes[i].innerText.toLowerCase().includes(filter) ? "block" : "none";
    }
}

// JavaScript to open and close modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Call dynamicGreeting on page load
window.onload = function() {
    const toggleButtons = document.querySelectorAll(".toggle-button");
    toggleButtons.forEach(button => button.addEventListener("click", function() {
        toggleBlogPost(this.getAttribute("data-target"));
    }));
};
// JavaScript to filter projects by type
function filterProjects(type) {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        if (type === 'all' || project.getAttribute('data-type') === type) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// JavaScript for theme switching
document.addEventListener("DOMContentLoaded", function() {
    const themeSwitcher = document.getElementById("themeSwitcher");
    if (themeSwitcher && localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
        themeSwitcher.innerText = "Switch to Light Theme";
    }
    themeSwitcher?.addEventListener("click", function() {
        document.body.classList.toggle("dark-theme");
        const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
        if (themeSwitcher) {
            themeSwitcher.innerText = theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme";
            localStorage.setItem("theme", theme);
        }
    });

    // Call dynamicGreeting if on the index page
    if (window.location.pathname.includes('index.html')) {
        dynamicGreeting();
    }
});



