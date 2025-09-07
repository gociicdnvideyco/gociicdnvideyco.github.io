function setupProgressDots(galleryId, dotsId, interval = 5000) {
      const gallery = document.getElementById(galleryId);
      const figures = gallery.querySelectorAll("figure");
      const dotsContainer = document.getElementById(dotsId);

      let currentIndex = 0;
      let timer;

      // buat dot sesuai jumlah slide
      figures.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        const progress = document.createElement("div");
        progress.classList.add("progress");
        dot.appendChild(progress);

        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
      });

      const dots = dotsContainer.querySelectorAll(".dot .progress");

      function goToSlide(index) {
        currentIndex = index;
        gallery.scrollTo({ left: figures[index].offsetLeft, behavior: "smooth" });
        resetProgress();
        restartTimer();
      }

      function resetProgress() {
        dots.forEach(p => {
          p.style.transition = "none";
          p.style.width = "0%";
        });
        void dots[currentIndex].offsetWidth; // force reflow
        dots[currentIndex].style.transition = `width ${interval}ms linear`;
        dots[currentIndex].style.width = "100%";
      }

      function nextSlide() {
        currentIndex = (currentIndex + 1) % figures.length;
        gallery.scrollTo({ left: figures[currentIndex].offsetLeft, behavior: "smooth" });
        resetProgress();
      }

      function restartTimer() {
        clearInterval(timer);
        timer = setInterval(nextSlide, interval);
      }

      function startAutoPlay() {
        resetProgress();
        timer = setInterval(nextSlide, interval);
      }

      startAutoPlay();
    }

    // tombol panah manual scroll
    function scrollGallery(galleryId, direction) {
      const gallery = document.getElementById(galleryId);
      const scrollAmount = 250;
      gallery.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }

    setupProgressDots("gallery1", "dots1");

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

// 🚫 Proteksi klik kanan & shortcut inspect
    document.addEventListener("contextmenu", e => e.preventDefault());
    document.addEventListener("keydown", e => {
      if (e.key === "F12") e.preventDefault();
      if (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key.toUpperCase())) e.preventDefault();
      if (e.ctrlKey && ["U","S"].includes(e.key.toUpperCase())) e.preventDefault();
    });    


