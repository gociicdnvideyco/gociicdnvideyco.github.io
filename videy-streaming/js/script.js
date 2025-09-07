// Smooth page transition ketika klik Play
document.querySelectorAll('.video-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const url = e.currentTarget.getAttribute('href');

    // Buat overlay transition
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = '#000';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.8s ease';
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);

    // Redirect setelah animasi
    setTimeout(() => {
      window.location.href = url;
    }, 900);
  });
});

// Animasi scroll reveal
const figures = document.querySelectorAll('figure');
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.9;
  figures.forEach(fig => {
    const rect = fig.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      fig.style.opacity = '1';
      fig.style.transform = 'translateY(0)';
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Efek tambahan: goyang iklan saat hover
document.addEventListener("DOMContentLoaded", () => {
  const ads = document.querySelectorAll(".ads-box iframe");

  ads.forEach(ad => {
    ad.addEventListener("mouseenter", () => {
      ad.style.transition = "transform 0.2s ease";
      ad.style.transform = "rotate(-1.5deg) scale(1.05)";
    });

    ad.addEventListener("mouseleave", () => {
      ad.style.transform = "rotate(0) scale(1)";
    });
  });
});