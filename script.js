// TYPING ANIMATION

const words = [
    "Web Developer",
    "Computer Engineering Student",
    "Programmer",
    "Tech Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();

// 2. MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function() {
    navLinks.classList.toggle("show");

    menuBtn.textContent =
        navLinks.classList.contains("show") ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function() {
        navLinks.classList.remove("show");
        menuBtn.textContent = "☰";
    });
});

// 3. SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < window.innerHeight - 100) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// 4. SKILL BAR ANIMATION

const skillBars = document.querySelectorAll(".skill-progress");

const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width =
                entry.target.getAttribute("data-width");

            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// 5. CONTACT FORM ANIMATION

const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");
const btnText = document.getElementById("btnText");
const successMessage = document.getElementById("successMessage");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    sendBtn.classList.add("loading");
    btnText.textContent = "Sending Message... ⏳";
    successMessage.classList.remove("show");

    setTimeout(function() {

        sendBtn.classList.remove("loading");
        btnText.textContent = "Message Sent ✓";

        successMessage.classList.add("show");
        contactForm.reset();

        setTimeout(function() {
            btnText.textContent = "Send Message ↗";
        }, 3000);

    }, 1200);
});

// 6. BACK TO TOP BUTTON

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function() {

    if (window.scrollY > 400) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 7. ACTIVE NAVBAR ON SCROLL

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function() {

    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
    link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
});