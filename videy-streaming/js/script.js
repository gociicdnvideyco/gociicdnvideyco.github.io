// ===== Scroll Gallery =====
function scrollGallery(id, direction) {
  const container = document.getElementById(id);
  const scrollAmount = 300;
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}

// ===== Popup Video Player =====
document.addEventListener("DOMContentLoaded", () => {
  const videoLinks = document.querySelectorAll(".video-link");

  // Modal structure
  const modal = document.createElement("div");
  modal.id = "video-modal";
  modal.innerHTML = `
    <div class="video-content">
      <span class="close-btn">&times;</span>
      <video id="modal-video" controls autoplay></video>
    </div>
  `;
  document.body.appendChild(modal);

  const modalVideo = document.getElementById("modal-video");
  const closeBtn = modal.querySelector(".close-btn");

  // Open video
  videoLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const videoUrl = link.getAttribute("href");
      modal.style.display = "flex";
      modalVideo.src = videoUrl;
      modalVideo.play();
    });
  });

  // Close modal
  function closeModal() {
    modal.style.display = "none";
    modalVideo.pause();
    modalVideo.src = "";
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
});