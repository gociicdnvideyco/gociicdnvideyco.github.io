// Scroll gallery left/right
function scrollGallery(id, direction) {
  const container = document.getElementById(id);
  const scrollAmount = 300; 
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}

// Tangani klik tombol Play
document.querySelectorAll(".video-link").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const videoUrl = this.getAttribute("href");

    // Hapus video lama jika ada
    const oldPlayer = document.querySelector("video.active-player");
    if (oldPlayer) oldPlayer.remove();

    // Buat video player baru
    const player = document.createElement("video");
    player.src = videoUrl;
    player.controls = true;
    player.autoplay = true;
    player.classList.add("active-player");

    // Sisipkan ke figure
    this.closest("figure").appendChild(player);

    // Event auto-play next video
    player.addEventListener("ended", () => {
      const nextFigure = this.closest("figure").nextElementSibling;
      if (nextFigure) {
        const nextLink = nextFigure.querySelector(".video-link");
        if (nextLink) {
          setTimeout(() => {
            nextLink.click();
          }, 3000); // delay 3 detik sebelum auto-play
        }
      }
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






