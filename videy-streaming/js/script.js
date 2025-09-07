// Buka modal video
const modal = document.getElementById("videoModal");
const videoPlayer = document.getElementById("videoPlayer");
const closeBtn = document.getElementById("closeBtn");

const videoLinks = document.querySelectorAll(".video-link");
let currentIndex = 0;

videoLinks.forEach((link, index) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    openVideo(index);
  });
});

function openVideo(index) {
  currentIndex = index;
  const url = videoLinks[index].getAttribute("href");
  modal.style.display = "flex";
  videoPlayer.src = url;
  videoPlayer.play();

  showNextPreview();
}

closeBtn.onclick = () => {
  modal.style.display = "none";
  videoPlayer.pause();
  videoPlayer.src = "";
};

// Klik luar modal tutup
window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
    videoPlayer.pause();
    videoPlayer.src = "";
  }
};

// NEXT VIDEO PREVIEW + COUNTDOWN
const nextPreview = document.getElementById("nextPreview");
const nextThumb = document.getElementById("nextThumb");
const nextTitle = document.getElementById("nextTitle");
const countdownEl = document.getElementById("countdown");

let countdownTimer;

function showNextPreview() {
  let nextIndex = (currentIndex + 1) % videoLinks.length;
  let nextFigure = videoLinks[nextIndex].closest("figure");
  let thumb = nextFigure.querySelector("img").src;
  let title = nextFigure.querySelector("figcaption").innerText;

  nextThumb.src = thumb;
  nextTitle.innerText = "Up Next: " + title;

  let timeLeft = 10;
  countdownEl.innerText = `Playing in ${timeLeft}s`;

  clearInterval(countdownTimer);
  countdownTimer = setInterval(() => {
    timeLeft--;
    countdownEl.innerText = `Playing in ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      openVideo(nextIndex);
    }
  }, 1000);
}
