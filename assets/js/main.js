// Dark Mode based on system preference
const html = document.querySelector("html");

// Function to update theme based on system preference
const updateTheme = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
};

// Initialize theme on page load
updateTheme();

// Listen for system theme changes
if (window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Modern browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', updateTheme);
  } 
  // Older browsers
  else if (mediaQuery.addListener) {
    mediaQuery.addListener(updateTheme);
  }
}

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navCenter = document.querySelector(".nav-center");
const navRight = document.querySelector(".nav-right");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = mobileMenuToggle.classList.contains("active");
    
    if (isOpen) {
      mobileMenuToggle.classList.remove("active");
      navCenter?.classList.remove("mobile-open");
      navRight?.classList.remove("mobile-open");
      document.body.style.overflow = "";
    } else {
      mobileMenuToggle.classList.add("active");
      navCenter?.classList.add("mobile-open");
      navRight?.classList.add("mobile-open");
      document.body.style.overflow = "hidden";
    }
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active");
      navCenter?.classList.remove("mobile-open");
      navRight?.classList.remove("mobile-open");
      document.body.style.overflow = "";
    });
  });
}

// Nav scroll effect with enhanced blur
let lastScroll = 0;
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  
  // Add scrolled class when user scrolls down
  if (currentScroll > 50) {
    nav?.classList.add("scrolled");
  } else {
    nav?.classList.remove("scrolled");
  }
  
  lastScroll = currentScroll;
});
