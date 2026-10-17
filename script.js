// ============ 1. MOBILE MENU ============
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close the menu when a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ============ 2. HEADER SHADOW ON SCROLL ============
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
});

// ============ 3. HIGHLIGHT ACTIVE NAV LINK ============
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

function updateActiveLink() {
  let current = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navAnchors.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}
window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

// ============ 4. SCROLL REVEAL ANIMATION ============
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  // Very old browsers: just show everything
  revealItems.forEach((item) => item.classList.add("visible"));
}

// ============ 5. CONTACT FORM (front-end check only) ============
const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  statusText.className = "form-status";

  if (!name || !email || !message) {
    statusText.textContent = "Please fill in all fields.";
    statusText.classList.add("error");
  } else if (!emailOk) {
    statusText.textContent = "Please enter a valid email address.";
    statusText.classList.add("error");
  } else {
    // This form has no server yet, so nothing is actually sent.
    statusText.textContent = "Thanks! (Demo only. Connect a form service to receive messages.)";
    statusText.classList.add("success");
    form.reset();
  }
});

// ============ 6. FOOTER YEAR ============
document.getElementById("year").textContent = new Date().getFullYear();