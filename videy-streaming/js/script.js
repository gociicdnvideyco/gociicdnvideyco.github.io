// =======================
// Gallery Navigation
// =======================
function scrollGallery(id, direction) {
  const container = document.getElementById(id);
  const scrollAmount = 320; // ukuran per item
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
  updateDots(id);
}

function updateDots(id) {
  const container = document.getElementById(id);
  const dots = document.getElementById("dots1");
  const scrollLeft = container.scrollLeft;
  const maxScroll = container.scrollWidth - container.clientWidth;
  const index = Math.round((scrollLeft / maxScroll) * (dots.children.length - 1));

  [...dots.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

// =======================
// Video Player Controls
// =======================
const videoPlayer = document.createElement("video");
videoPlayer.controls = true;
videoPlayer.className = "main-video fade-in";
document.body.appendChild(videoPlayer);

let videoLinks = [];
let currentIndex = 0;
let countdownTimer = null;

// ambil semua video link
document.querySelectorAll(".video-link").forEach((link, index) => {
  videoLinks.push(link.href);

  link.addEventListener("click", (e) => {
    e.preventDefault();
    currentIndex = index;
    playVideo(videoLinks[currentIndex]);
  });
});

// mainkan video
function playVideo(src) {
  videoPlayer.src = src;
  videoPlayer.play();
  videoPlayer.scrollIntoView({ behavior: "smooth" });

  // bersihkan countdown lama
  if (countdownTimer) {
    clearTimeout(countdownTimer);
    countdownTimer = null;
  }
}

// =======================
// Auto-play Next Video
// =======================
videoPlayer.addEventListener("ended", () => {
  if (currentIndex < videoLinks.length - 1) {
    let nextIndex = currentIndex + 1;
    let countdown = 5; // detik

    const countdownBox = document.createElement("div");
    countdownBox.className = "countdown-overlay fade-in";
    countdownBox.innerText = `Next video in ${countdown}...`;
    document.body.appendChild(countdownBox);

    const interval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        countdownBox.innerText = `Next video in ${countdown}...`;
      } else {
        clearInterval(interval);
        document.body.removeChild(countdownBox);
        currentIndex = nextIndex;
        playVideo(videoLinks[currentIndex]);
      }
    }, 1000);
  }
});

// =======================
// Dots Initialization
// =======================
function initDots(id, dotsId) {
  const container = document.getElementById(id);
  const dots = document.getElementById(dotsId);
  const pages = Math.ceil(container.scrollWidth / container.clientWidth);

  for (let i = 0; i < pages; i++) {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dots.appendChild(dot);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initDots("gallery1", "dots1");
});
