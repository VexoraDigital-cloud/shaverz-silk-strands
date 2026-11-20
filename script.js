const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("active");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Reveal content as it enters the screen.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Keep the footer year current.
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// GitHub Pages is static hosting, so this form opens a pre-filled email.
// The visitor still presses Send in their email app to submit the enquiry.
const bookingForm = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) return;

    const data = new FormData(bookingForm);
    const subject = encodeURIComponent("Appointment enquiry — Shaverz Silk & Strands");
    const body = encodeURIComponent(
      `Hello Shaverz Silk & Strands,\n\nI'd like to enquire about an appointment.\n\n` +
      `Name: ${data.get("name")}\n` +
      `Email: ${data.get("email")}\n` +
      `Phone: ${data.get("phone")}\n` +
      `Desired service: ${data.get("service")}\n` +
      `Preferred date: ${data.get("date") || "Not specified"}\n\n` +
      `Message: ${data.get("message") || "None"}\n\nThank you.`
    );

    if (formStatus) {
      formStatus.textContent = "Your email app should open with the enquiry ready. Please press Send to submit it.";
    }
    window.location.href = `mailto:shaverzph@gmail.com?subject=${subject}&body=${body}`;
  });
}
