// ============================================================
// SWIPER CONFIG - Eco Bee Landing Page
// ============================================================

function initSwipers() {
  // HERO SWIPER
  const heroSwiper = new Swiper('.heroSwiper', {
    loop: false,
    autoplay: { delay: 4000, disableOnInteraction: false },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 800,
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    pagination: { el: '.swiper-pagination', clickable: true },
  });

  // LIGHTBOX SWIPER
  const lightboxSwiper = new Swiper('.lightboxSwiper', {
    loop: false,
    effect: 'slide',
    speed: 500,
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    pagination: { el: '.swiper-pagination', clickable: true },
    keyboard: { enabled: true, onlyInViewport: false },
    on: {
      slideChange: function() {
        const captions = [
          '🌿 Eco Bee — Tropical Forest Raw Honey',
          '🍯 Pure Honeycomb — Fresh from the forest',
          '🌳 Sustainable Harvest — Ethical & eco-friendly',
          '🍯 Raw Honey — Unfiltered & unheated',
          '🌿 Forest Honey — From Malaysia\'s rainforest',
          '🍯 Raw Honey — Golden Tropical Blend',
          '🍯 Raw Honey — Pure Forest Harvest',
          '🍯 Raw Honey — Premium Quality Honey'
        ];
        const captionEl = document.getElementById('lightboxCaption');
        if (captionEl) {
          captionEl.textContent = captions[this.realIndex] || captions[0];
        }
      }
    }
  });

  // BENEFITS SWIPER
  const benefitsSwiper = new Swiper('.benefitsSwiper', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    centeredSlides: false,
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: true },
    navigation: false,
    pagination: false,
    keyboard: { enabled: true, onlyInViewport: false },
    breakpoints: {
      320: { slidesPerView: 1.5, spaceBetween: 0 },
      480: { slidesPerView: 2.2, spaceBetween: 0 },
      768: { slidesPerView: 3.2, spaceBetween: 0 },
      1024: { slidesPerView: 4, spaceBetween: 0 },
    }
  });

  // REVIEWS SWIPER
  const reviewsSwiper = new Swiper('.reviewsSwiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: false,
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    pagination: { el: '.swiper-pagination', clickable: true },
    keyboard: { enabled: true, onlyInViewport: false },
    breakpoints: {
      320: { slidesPerView: 2.2, spaceBetween: 8 },
      480: { slidesPerView: 2.8, spaceBetween: 10 },
      768: { slidesPerView: 3.5, spaceBetween: 16 },
      1024: { slidesPerView: 4.5, spaceBetween: 20 },
    }
  });

  // REVIEW ZOOM SWIPER
  const reviewZoomSwiper = new Swiper('.reviewZoomSwiper', {
    loop: false,
    effect: 'slide',
    speed: 500,
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    pagination: { el: '.swiper-pagination', clickable: true },
    keyboard: { enabled: true, onlyInViewport: false },
  });

  // VIDEO TESTIMONIALS SWIPER
  const videoSwiper = new Swiper('.videoSwiper', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    centeredSlides: false,
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: true },
    navigation: { 
      nextEl: '.swiper-button-next', 
      prevEl: '.swiper-button-prev' 
    },
    pagination: { el: '.swiper-pagination', clickable: true },
    keyboard: { enabled: true, onlyInViewport: false },
    breakpoints: {
      320: { spaceBetween: 6 },
      480: { spaceBetween: 8 },
      768: { spaceBetween: 10 },
      1024: { spaceBetween: 12 },
    }
  });

  // VIDEO ZOOM SWIPER (Modal)
  const videoZoomSwiper = new Swiper('.videoZoomSwiper', {
    loop: false,
    effect: 'slide',
    speed: 500,
    navigation: { 
      nextEl: '.swiper-button-next', 
      prevEl: '.swiper-button-prev' 
    },
    pagination: { el: '.swiper-pagination', clickable: true },
    keyboard: { enabled: true, onlyInViewport: false },
  });

  // Simpan swipers ke global
  window.heroSwiper = heroSwiper;
  window.lightboxSwiper = lightboxSwiper;
  window.benefitsSwiper = benefitsSwiper;
  window.reviewsSwiper = reviewsSwiper;
  window.reviewZoomSwiper = reviewZoomSwiper;
  window.videoSwiper = videoSwiper;
  window.videoZoomSwiper = videoZoomSwiper;
  
  console.log('✅ Swipers initialized!');
}

// Tunggu sections loaded sebelum init swipers
document.addEventListener('sectionsLoaded', function() {
  setTimeout(initSwipers, 100);
});

// Backup: kalau event tak trigger, try again
setTimeout(function() {
  if (document.querySelector('.heroSwiper') && !window.heroSwiper) {
    initSwipers();
  }
}, 2000);