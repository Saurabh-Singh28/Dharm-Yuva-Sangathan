const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in').forEach(section => {
  observer.observe(section);
});

// Secret page functionality
let typed = "";
const secretCode = "jaana";
const maxLength = secretCode.length;

document.addEventListener("keydown", function (e) {
  typed += e.key.toLowerCase();
  typed = typed.slice(-maxLength); // keep only recent keys
  if (typed === secretCode) {
    alert("Hey Jaana 💖 Ready for your secret coding vibes?");
    window.open("jaana_coding_vibes.html", "_blank");
  }
});

// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // ✅ Normally form validation or email logic here
      alert("Thanks! Your message has been sent.");
    });
  }
});

// Single Scroll Button Functionality
const scrollBtn = document.getElementById('scrollBtn');
const scrollIcon = document.getElementById('scrollIcon');

// Function to update button state based on scroll position
function updateScrollButton() {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  // Show button when scrolled down more than 300px
  if (scrollY > 300) {
    scrollBtn.classList.remove('hidden');
    
    // Determine if we should scroll to top or bottom
    const isNearBottom = scrollY + windowHeight >= documentHeight - 100;
    
    if (isNearBottom) {
      // Near bottom - show scroll to top
      scrollBtn.classList.remove('scroll-to-bottom');
      scrollBtn.classList.add('scroll-to-top');
      scrollBtn.title = "Scroll to Top";
    } else {
      // In middle - show scroll to bottom
      scrollBtn.classList.remove('scroll-to-top');
      scrollBtn.classList.add('scroll-to-bottom');
      scrollBtn.title = "Scroll to Bottom";
    }
  } else {
    // Near top - hide button
    scrollBtn.classList.add('hidden');
  }
}

// Scroll button click handler
scrollBtn.addEventListener('click', () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  // Determine scroll direction based on current position
  const isNearBottom = scrollY + windowHeight >= documentHeight - 100;
  
  if (isNearBottom) {
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } else {
    // Scroll to bottom
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }
});

// Update button on scroll
window.addEventListener('scroll', updateScrollButton);

// Initialize button state on page load
document.addEventListener('DOMContentLoaded', updateScrollButton);

// Theme Toggle Functionality
const html = document.documentElement;

// Function to get current theme from localStorage or default to 'dark'
function getCurrentTheme() {
  return localStorage.getItem('theme') || 'dark';
}

// Function to set theme
function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Function to toggle theme
function toggleTheme() {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

// Initialize theme functionality on page load
document.addEventListener('DOMContentLoaded', function() {
  // Set the theme
  const savedTheme = getCurrentTheme();
  setTheme(savedTheme);
  
  // Add click event listener to theme toggle button if it exists
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});