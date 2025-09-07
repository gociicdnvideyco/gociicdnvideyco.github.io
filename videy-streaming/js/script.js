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
