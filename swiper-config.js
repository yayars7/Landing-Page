// ============================================================
// SWIPER CONFIG - Eco Bee Landing Page
// ============================================================

function initSwipers() {
  
  // ============================================================
  // REVIEWS SWIPER
  // ============================================================
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

  // ============================================================
  // REVIEW ZOOM SWIPER
  // ============================================================
  const reviewZoomSwiper = new Swiper('.reviewZoomSwiper', {
    loop: false,
    effect: 'slide',
    speed: 500,
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    pagination: { el: '.swiper-pagination', clickable: true },
    keyboard: { enabled: true, onlyInViewport: false },
  });

  // ============================================================
  // VIDEO TESTIMONIALS SWIPER
  // ============================================================
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

  // ============================================================
  // VIDEO ZOOM SWIPER (Modal)
  // ============================================================
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

  // ============================================================
  // SAVE SWIPERS TO GLOBAL
  // ============================================================
  window.reviewsSwiper = reviewsSwiper;
  window.reviewZoomSwiper = reviewZoomSwiper;
  window.videoSwiper = videoSwiper;
  window.videoZoomSwiper = videoZoomSwiper;
  
  console.log('✅ All Swipers initialized!');
}

// ============================================================
// INIT SWIPERS ON PAGE LOAD
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  // Check if Swiper library is loaded
  if (typeof Swiper !== 'undefined') {
    setTimeout(initSwipers, 200);
  } else {
    // Wait for Swiper to load
    var checkSwiper = setInterval(function() {
      if (typeof Swiper !== 'undefined') {
        clearInterval(checkSwiper);
        setTimeout(initSwipers, 200);
      }
    }, 100);
  }
});

// Backup: if DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  if (typeof Swiper !== 'undefined') {
    setTimeout(initSwipers, 300);
  }
}

console.log('✅ swiper-config.js loaded!');