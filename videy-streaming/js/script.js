// === Gallery Scroll ===
function scrollGallery(id, direction) {
  const container = document.getElementById(id);
  const scrollAmount = 220; // item width + gap
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// === Dots Indicator ===
function initDots(galleryId, dotsId) {
  const container = document.getElementById(galleryId);
  const dots = document.getElementById(dotsId);
  if (!container || !dots) return;

  const total = Math.ceil(container.scrollWidth / container.clientWidth);
  dots.innerHTML = "";

  for (let i = 0; i < total; i++) {
    const span = document.createElement("span");
    if (i === 0) span.classList.add("active");
    dots.appendChild(span);
  }

  container.addEventListener("scroll", () => {
    const index = Math.round(container.scrollLeft / container.clientWidth);
    dots.querySelectorAll("span").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  });
}

// Inisialisasi dots untuk semua gallery
window.addEventListener("DOMContentLoaded", () => {
  initDots("gallery1", "dots1");
  initDots("gallery2", "dots2");
});

// === Auto Play Next Video ===
const countdownOverlay = document.createElement("div");
countdownOverlay.className = "countdown-overlay";
document.body.appendChild(countdownOverlay);

document.querySelectorAll("a.video-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const videoUrl = link.getAttribute("href");

    // Buka video player sederhana
    const player = document.createElement("video");
    player.src = videoUrl;
    player.controls = true;
    player.autoplay = true;
    player.style.position = "fixed";
    player.style.top = "50%";
    player.style.left = "50%";
    player.style.transform = "translate(-50%, -50%)";
    player.style.width = "80%";
    player.style.height = "auto";
    player.style.zIndex = "10000";
    player.style.border = "2px solid #e50914";
    player.style.borderRadius = "10px";
    player.style.background = "#000";
    document.body.appendChild(player);

    // Close dengan ESC
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        player.remove();
        countdownOverlay.style.display = "none";
      }
    });

    // Saat selesai -> countdown Next Video
    player.addEventListener("ended", () => {
      let count = 5;
      countdownOverlay.innerHTML = `Next video in ${count}...`;
      countdownOverlay.style.display = "block";

      const interval = setInterval(() => {
        count--;
        if (count > 0) {
          countdownOverlay.innerHTML = `Next video in ${count}...`;
        } else {
          clearInterval(interval);
          countdownOverlay.style.display = "none";

          // Cari video berikutnya
          const allLinks = Array.from(document.querySelectorAll("a.video-link"));
          const currentIndex = allLinks.indexOf(link);
          const nextLink = allLinks[currentIndex + 1];
          if (nextLink) {
            nextLink.click();
          } else {
            player.remove();
          }
        }
      }, 1000);
    });
  });
});


// 🚫 Proteksi klik kanan & shortcut inspect
    document.addEventListener("contextmenu", e => e.preventDefault());
    document.addEventListener("keydown", e => {
      if (e.key === "F12") e.preventDefault();
      if (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key.toUpperCase())) e.preventDefault();
      if (e.ctrlKey && ["U","S"].includes(e.key.toUpperCase())) e.preventDefault();
    });    







