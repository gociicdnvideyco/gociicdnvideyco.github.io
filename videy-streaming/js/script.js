document.addEventListener("DOMContentLoaded", () => {
  // bikin container player di atas gallery
  let playerContainer = document.createElement("div");
  playerContainer.id = "video-player-container";
  document.body.prepend(playerContainer);

  // ambil semua tombol
  document.querySelectorAll(".video-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      let videoUrl = link.getAttribute("href");

      // isi container player
      playerContainer.innerHTML = `
        <div class="player-box">
          <video controls autoplay>
            <source src="${videoUrl}" type="video/mp4">
            Browser kamu tidak support video tag.
          </video>
          <button class="close-btn">✖</button>
        </div>
      `;

      // tombol close
      playerContainer.querySelector(".close-btn").addEventListener("click", () => {
        playerContainer.innerHTML = "";
      });
    });
  });
});