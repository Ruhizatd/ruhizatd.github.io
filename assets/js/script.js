/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimation();
    initThemeToggle();
    initSmoothScroll();
    initDropdown();
    initMobileMenu();
    initScrollSpy();

    lucide.createIcons();
});


/* =========================
   SMOOTH SCROLL
========================= */
function smoothScrollTo(targetY, duration = 800) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        const progress = Math.min(timeElapsed / duration, 1);

        const ease = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, startY + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

function initSmoothScroll() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {

            const href = this.getAttribute('href');

            //hanya handle internal link
            if (!href.startsWith("#")) return;

            e.preventDefault();

            const target = document.querySelector(href);

            if (target) {
                const offset = 80;
                const top = target.offsetTop - offset;
                smoothScrollTo(top, 900);
            }
        });
    });

    // brand scroll top
    const brand = document.getElementById("brand-link");
    if (brand) {
        brand.addEventListener("click", function(e) {
            e.preventDefault();
            smoothScrollTo(0, 900);
        });
    }
}


/* =========================
   DROPDOWN
========================= */
function initDropdown() {
    const dropdown = document.querySelector(".resume-dropdown");

    if (!dropdown) return;

    dropdown.addEventListener("click", function (e) {
        e.stopPropagation();
        dropdown.classList.toggle("active");
    });

    // click luar close
    document.addEventListener("click", function () {
        dropdown.classList.remove("active");
    });
}


/* =========================
   SCROLL ANIMATION
========================= */
function initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle("show", entry.isIntersecting);
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px"
    });

    const elements = document.querySelectorAll(
        ".fade-in, .project-card, .experience, .experience-card, .hero-text, .hero-image"
    );

    elements.forEach(el => observer.observe(el));

    // hero animation on load
    const heroElements = document.querySelectorAll(".hero-text, .hero-image");

    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add("show");
        }, 150 + (index * 150));
    });

    // re-init icons (fix rare bug)
    setTimeout(() => {
        lucide.createIcons();
    }, 200);
}


/* =========================
   DARK MODE
========================= */
function initThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle");

    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        toggleBtn.textContent =
            document.body.classList.contains("dark") ? "☀️" : "🌙";
    });
}



/* =========================
   NAV ACTIVE (INTERSECTION OBSERVER)
========================= */
function initScrollSpy() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a[href^='#']:not([href='#'])");

    if (!sections.length || !navLinks.length) return;

   const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;

            navLinks.forEach(link => {
                link.classList.remove("active");

                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}, {
    threshold: 0.25,
    rootMargin: "-80px 0px -20% 0px"
});

    sections.forEach(section => observer.observe(section));
}

/* =========================
    MOBILE MENU
========================= */

function initMobileMenu() {
    const btn = document.getElementById("menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (!btn || !nav) return;

    btn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}