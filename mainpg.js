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


  // secret page
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

  form.addEventListener("submit", (e) => {
  e.preventDefault();
  // ✅ Normally form validation or email logic here
  alert("Thanks! Your message has been sent.");
});


// Hide page loader when content is ready
window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  loader.classList.add("hide");
});
