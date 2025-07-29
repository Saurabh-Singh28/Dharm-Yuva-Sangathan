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

  