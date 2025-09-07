const figures = document.querySelectorAll("figure");
const modal = document.getElementById("videoModal");
const videoPlayer = document.getElementById("videoPlayer");
const closeBtn = document.getElementById("closeBtn");
const nextPreview = document.getElementById("nextPreview");
const nextThumb = document.getElementById("nextThumb");
const nextTitle = document.getElementById("nextTitle");
const countdown = document.getElementById("countdown");

let nextVideoUrl = "";
let countdownTimer;

figures.forEach(fig => {
  fig.addEventListener("click", () => {
    modal.classList.add("active");
    videoPlayer.src = fig.dataset.video;
    videoPlayer.play();

    nextVideoUrl = fig.dataset.next;
    nextThumb.src = fig.dataset.nextThumb;
    nextTitle.textContent = fig.dataset.nextTitle;
    countdown.textContent = "";
  });
});

videoPlayer.addEventListener("ended", () => {
  let timeLeft = 5;
  countdown.textContent = `Next in ${timeLeft}s`;

  countdownTimer = setInterval(() => {
    timeLeft--;
    countdown.textContent = `Next in ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      videoPlayer.src = nextVideoUrl;
      videoPlayer.play();
      countdown.textContent = "";
    }
  }, 1000);
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  videoPlayer.pause();
  videoPlayer.src = "";
  clearInterval(countdownTimer);
});
