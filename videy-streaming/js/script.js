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

 <!-- Histats.com (div with counter) -->
  <div id="histats_counter"></div>
  <!-- Histats.com START (async)-->
  <script type="text/javascript">
    var _Hasync= _Hasync|| [];
    _Hasync.push(['Histats.start', '1,4573229,4,0,0,0,00010000']);
    _Hasync.push(['Histats.fasi', '1']);
    _Hasync.push(['Histats.track_hits', '']);
    _Hasync.push(['Histats.framed_page', '']);
    (function() {
      var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
      hs.src = ('//s10.histats.com/js15_as.js');
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
    })();
  
  <noscript><a href="/" target="_blank"><img src="//sstatic1.histats.com/0.gif?4573229&101" alt="" border="0"></a></noscript>
  <!-- Histats.com END -->

  <!-- Proteksi anti view-source, F12, klik kanan -->
  <script>
  (function () {
    // Blok klik kanan (kecuali iklan pakai class allow-context)
    document.addEventListener('contextmenu', function (e) {
      if (!e.target.closest('.allow-context, iframe')) {
        e.preventDefault();
      }
    });

    // Blok kombinasi tombol umum
    document.addEventListener('keydown', function (e) {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }
      // Ctrl+Shift+I / J / C
      if (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key.toUpperCase())) {
        e.preventDefault();
      }
      // Ctrl+U, Ctrl+S
      if (e.ctrlKey && ["U","S"].includes(e.key.toUpperCase())) {
        e.preventDefault();
      }
    });

    // Blok copy/cut/select
    document.addEventListener('copy', e => e.preventDefault());
    document.addEventListener('cut', e => e.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());

    // Deteksi devtools sederhana
    setInterval(function () {
      if ((window.outerWidth - window.innerWidth) > 200 ||
          (window.outerHeight - window.innerHeight) > 200) {
        document.body.innerHTML = "<h2 style='color:red;text-align:center;margin-top:20%'>⚠ Proteksi aktif. Tutup DevTools untuk melanjutkan.</h2>";
      }
    }, 1000);
  })();
