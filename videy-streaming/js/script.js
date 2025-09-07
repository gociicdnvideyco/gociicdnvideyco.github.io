// === Scroll Gallery Function ===
function scrollGallery(galleryId, direction) {
  const container = document.getElementById(galleryId);
  const scrollAmount = 320; // lebar 1 card video + margin
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });

  updateDots(galleryId);
}

// === Dots Generator ===
function generateDots(galleryId) {
  const container = document.getElementById(galleryId);
  const dotsContainer = document.getElementById("dots1");
  const items = container.querySelectorAll("figure");

  dotsContainer.innerHTML = ""; // clear dulu
  items.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      container.scrollTo({
        left: index * 320,
        behavior: "smooth"
      });
      setActiveDot(dotsContainer, index);
    });
    dotsContainer.appendChild(dot);
  });

  // set default active
  setActiveDot(dotsContainer, 0);
}

// === Update Dots on Scroll ===
function updateDots(galleryId) {
  const container = document.getElementById(galleryId);
  const dotsContainer = document.getElementById("dots1");
  const index = Math.round(container.scrollLeft / 320);
  setActiveDot(dotsContainer, index);
}

// === Set Active Dot ===
function setActiveDot(dotsContainer, index) {
  const dots = dotsContainer.querySelectorAll("span");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

// === Init on Page Load ===
document.addEventListener("DOMContentLoaded", () => {
  generateDots("gallery1");
});

// Ambil elemen modal dan video player
const modal = document.getElementById("videoModal");
const videoPlayer = document.getElementById("videoPlayer");
const closeBtn = document.getElementById("closeBtn");

// Preview next video
const nextPreview = document.getElementById("nextPreview");
const nextThumb = document.getElementById("nextThumb");
const nextTitle = document.getElementById("nextTitle");
const countdownEl = document.getElementById("countdown");

let countdownTimer; // interval countdown
let countdownValue = 5; // detik default
let nextVideoUrl = "";

// Semua figure dengan atribut data-video
const figures = document.querySelectorAll("figure");

// Event: klik figure / link video
figures.forEach(fig => {
  const link = fig.querySelector(".video-link");
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const videoUrl = fig.dataset.video || this.getAttribute("href");
    nextVideoUrl = fig.dataset.next || "";
    const nextThumbUrl = fig.dataset.nextThumb || "";
    const nextTitleText = fig.dataset.nextTitle || "";

    // Set video player
    videoPlayer.src = videoUrl;
    modal.style.display = "block";
    videoPlayer.play();

    // Set preview next video
    if (nextVideoUrl) {
      nextThumb.src = nextThumbUrl;
      nextTitle.textContent = nextTitleText;
      nextPreview.style.display = "flex";
    } else {
      nextPreview.style.display = "none";
    }
  });
});

// Event: close modal
closeBtn.addEventListener("click", () => {
  closeModal();
});

// Klik di luar modal = close
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Fungsi tutup modal
function closeModal() {
  modal.style.display = "none";
  videoPlayer.pause();
  videoPlayer.src = "";
  clearInterval(countdownTimer);
  countdownEl.textContent = "";
}

// Event: video selesai → mulai countdown
videoPlayer.addEventListener("ended", () => {
  if (nextVideoUrl) {
    countdownValue = 5;
    countdownEl.textContent = `Next in ${countdownValue}s`;
    countdownTimer = setInterval(() => {
      countdownValue--;
      countdownEl.textContent = `Next in ${countdownValue}s`;

      if (countdownValue <= 0) {
        clearInterval(countdownTimer);
        playNextVideo();
      }
    }, 1000);
  }
});

// Fungsi play next video
function playNextVideo() {
  if (nextVideoUrl) {
    videoPlayer.src = nextVideoUrl;
    videoPlayer.play();

    // Reset preview biar ga numpuk
    nextPreview.style.display = "none";
    countdownEl.textContent = "";
  }
}


