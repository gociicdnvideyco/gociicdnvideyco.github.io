document.addEventListener("DOMContentLoaded", () => {
  // ▶️ Play Video Inline + Auto-Next
  function playVideo(figure, videoUrl) {
    figure.innerHTML = `
      <video src="${videoUrl}" controls autoplay></video>
    `;
    const video = figure.querySelector("video");

    // AUTO NEXT
    video.addEventListener("ended", () => {
      let nextFigure = figure.nextElementSibling;
      while (nextFigure && nextFigure.tagName !== "FIGURE") {
        nextFigure = nextFigure.nextElementSibling;
      }

      if (nextFigure) {
        const nextBtn = nextFigure.querySelector(".video-link");
        if (nextBtn) {
          const nextUrl = nextBtn.getAttribute("href");
          playVideo(nextFigure, nextUrl);
          // scroll otomatis ke next video
          nextFigure.scrollIntoView({ behavior: "smooth", inline: "center" });
        }
      } else {
        // Kalau tidak ada video berikutnya → arahkan ke NEXT PAGE button
        const nextPageBtn = document.querySelector(".next-page-button");
        if (nextPageBtn) {
          window.location.href = nextPageBtn.href;
        }
      }
    });
  }

  const buttons = document.querySelectorAll(".video-link");
  buttons.forEach(btn => {
    btn.addEventListener("click", e => {
      if (!btn.classList.contains("next-page-button")) {
        e.preventDefault();
        const figure = btn.closest("figure");
        const videoUrl = btn.getAttribute("href");
        playVideo(figure, videoUrl);
      }
    });
  });

  // ⏩ Gallery Scroll
  window.scrollGallery = function(id, direction) {
    const container = document.getElementById(id);
    const scrollAmount = 320; // width 280 + gap
    container.scrollBy({
      left: scrollAmount * direction,
      behavior: "smooth"
    });
  };

  // ● Dots Indicator
  const galleries = document.querySelectorAll(".gallery-container");
  galleries.forEach((gallery, idx) => {
    const dotsBox = document.getElementById(`dots${idx+1}`);
    if (!dotsBox) return;
    const items = gallery.querySelectorAll("figure");
    items.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dotsBox.appendChild(dot);
    });

    gallery.addEventListener("scroll", () => {
      const scrollLeft = gallery.scrollLeft;
      const index = Math.round(scrollLeft / 320);
      const dots = dotsBox.querySelectorAll("span");
      dots.forEach(d => d.classList.remove("active"));
      if (dots[index]) dots[index].classList.add("active");
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





