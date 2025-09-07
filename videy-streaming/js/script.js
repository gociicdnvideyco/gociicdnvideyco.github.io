// Geser gallery (next/prev button)
function scrollGallery(id, direction) {
  const container = document.getElementById(id);
  const scrollAmount = 300; // px
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// Tangkap klik Play
document.addEventListener("DOMContentLoaded", () => {
  const videoLinks = document.querySelectorAll(".video-link");
  const playerContainer = document.getElementById("video-player-container");

  videoLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();

      const videoUrl = this.getAttribute("href");

      // Inject player
      playerContainer.innerHTML = `
        <video controls autoplay id="main-video">
          <source src="${videoUrl}" type="video/mp4">
          Browser Anda tidak mendukung video tag.
        </video>
      `;

      // Tampilkan container
      playerContainer.style.display = "block";

      // Auto-play next video setelah selesai
      const videoElement = document.getElementById("main-video");
      videoElement.addEventListener("ended", () => {
        let next = this.closest("figure").nextElementSibling;
        if (next && next.querySelector(".video-link")) {
          next.querySelector(".video-link").click();
        }
      });
    });
  });
});
