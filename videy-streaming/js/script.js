document.addEventListener("DOMContentLoaded", () => {
  const videoLinks = document.querySelectorAll(".video-link");
  const modal = document.getElementById("videoModal");
  const videoPlayer = document.getElementById("videoPlayer");
  const closeBtn = document.getElementById("closeBtn");
  const nextPreview = document.getElementById("nextPreview");
  const nextThumb = document.getElementById("nextThumb");
  const nextTitle = document.getElementById("nextTitle");
  const countdownEl = document.getElementById("countdown");

  let figures = Array.from(document.querySelectorAll("figure"));
  let currentIndex = 0;
  let countdownTimer;

  // 🔹 Saat tombol Play ditekan
  videoLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex = index;
      openModal(link.getAttribute("href"), figures[index]);
    });
  });

  // 🔹 Fungsi buka modal
  function openModal(videoUrl, figure) {
    modal.style.display = "flex";
    videoPlayer.src = videoUrl;
    videoPlayer.play();

    // Reset preview next video
    setupNextPreview();
  }

  // 🔹 Setup next video preview + countdown
  function setupNextPreview() {
    clearInterval(countdownTimer);

    let nextIndex = (currentIndex + 1) % figures.length;
    let nextFigure = figures[nextIndex];
    let thumb = nextFigure.querySelector("img").src;
    let title = nextFigure.querySelector("figcaption").innerText;

    nextThumb.src = thumb;
    nextTitle.innerText = title;

    let countdown = 10;
    countdownEl.innerText = `Next in ${countdown}s`;

    countdownTimer = setInterval(() => {
      countdown--;
      countdownEl.innerText = `Next in ${countdown}s`;

      if (countdown <= 0) {
        clearInterval(countdownTimer);
        currentIndex = nextIndex;
        let nextVideo = nextFigure.querySelector(".video-link").href;
        openModal(nextVideo, nextFigure);
      }
    }, 1000);
  }

  // 🔹 Tutup modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    videoPlayer.pause();
    videoPlayer.src = "";
    clearInterval(countdownTimer);
  });

  // 🔹 Klik di luar modal juga menutup
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      videoPlayer.pause();
      videoPlayer.src = "";
      clearInterval(countdownTimer);
    }
  });
});
