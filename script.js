// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ========= 1) Active section focus (works UP + DOWN) ========= */
const sections = Array.from(document.querySelectorAll(".cube-section"));
const ratios = new Map();

// Track visibility of each section
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        ratios.set(entry.target, entry.intersectionRatio);
    });

    // Pick the section with the highest visibility
    let active = null;
    let maxRatio = 0;

    ratios.forEach((ratio, el) => {
        if (ratio > maxRatio) {
            maxRatio = ratio;
            active = el;
        }
    });

    // Apply classes: active section sharp, others blurred
    sections.forEach((sec) => {
        if (sec === active && maxRatio > 0.12) {
            sec.classList.add("cube-in");
        } else {
            sec.classList.remove("cube-in");
        }
    });
}, {
    threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.7]
});

// Observe all sections
sections.forEach((sec) => sectionObserver.observe(sec));


/* ========= 2) Reveal cards (replay up + down) ========= */
const reveals = Array.from(document.querySelectorAll(".reveal"));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            // remove so it animates again when you scroll back
            entry.target.classList.remove("show");
        }
    });
}, {
    threshold: 0.12,
    rootMargin: "0px 0px -12% 0px"
});

reveals.forEach((el) => revealObserver.observe(el));
