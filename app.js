document.addEventListener('DOMContentLoaded', function() {
    const successMessage = document.getElementById('success-message');
    const contactForm = document.getElementById('contact-form');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    function showSuccessMessage() {
        if (!successMessage || !contactForm) {
            return;
        }

        successMessage.classList.add('show');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => {
            contactForm.reset();
        }, 1000);
    }

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetSelector = this.getAttribute('href');
            const target = document.querySelector(targetSelector);

            if (!target) {
                return;
            }

            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (!question) {
            return;
        }

        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(
        '.service-card, .project-card, .highlight-box, .contact-detail, .contact-form-container, .img'
    ).forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showSuccessMessage();
        });
    }
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const indicator = document.querySelector(".nav-indicator");

function moveIndicator(link) {
    indicator.style.left =
        link.offsetLeft + link.offsetWidth / 2 - 4 + "px";
}

moveIndicator(navLinks[0]);

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + current
        ) {
            link.classList.add("active");
            moveIndicator(link);
        }
    });
});

const starsContainer = document.querySelector('.stars');

const STAR_COUNT = 35;

for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // random size (VERY important for realism)
    const size = Math.random() * 5 + 1; // 1px - 3px

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // random position
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;

    // random animation delay
    star.style.animationDelay = `${Math.random() * 4}s`;

    // subtle variation in brightness
    star.style.opacity = Math.random() * 0.3 + 0.1;

    starsContainer.appendChild(star);
}

/*--------------------- Contact form email sending functionality -------------------------*/

const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {

        document.getElementById("success-message").style.display = "block";

        form.reset();

    } else {

        alert("Failed to send message.");

    }

});