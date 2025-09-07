document.addEventListener("DOMContentLoaded", () => {
  // Buat container video kalau belum ada
  let container = document.getElementById("video-player-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "video-player-container";
    document.body.insertBefore(container, document.querySelector("main"));
  }

  // Tangani semua link Play
  document.querySelectorAll("a.video-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault(); // cegah buka tab baru
      const src = link.getAttribute("href"); // ambil URL video

      container.innerHTML = `
        <video controls autoplay>
          <source src="${src}" type="video/mp4">
          Browser kamu tidak mendukung video tag.
        </video>
      `;
      window.scrollTo({ top: container.offsetTop, behavior: "smooth" });
    });
  });
});