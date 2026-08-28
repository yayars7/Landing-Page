// ============================================================
// MAIN FUNCTIONS - Eco Bee Landing Page
// ============================================================

console.log('✅ Eco Bee - script.js loading...');

// ============================================================
// GLOBAL VARIABLES
// ============================================================

var isReady = false;
var isVideoModalOpen = false;
var isAudioPlaying = false;
var audio = document.getElementById('bgAudio');
var audioBtn = document.getElementById('audioToggle');

// ============================================================
// AUDIO FUNCTIONS
// ============================================================

function toggleAudio() {
  if (!audio) return;
  
  if (isAudioPlaying) {
    audio.pause();
    if (audioBtn) {
      audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i><span class="audio-label">Music Off</span>';
    }
    isAudioPlaying = false;
  } else {
    audio.muted = false;
    audio.play().then(function() {
      if (audioBtn) {
        audioBtn.innerHTML = '<i class="fas fa-volume-up"></i><span class="audio-label">Music On</span>';
      }
      isAudioPlaying = true;
    }).catch(function(e) {
      console.log('Audio play error:', e);
      if (audioBtn) {
        audioBtn.innerHTML = '<i class="fas fa-volume-up"></i><span class="audio-label">Click to Play</span>';
      }
    });
  }
}

// Auto-play audio on first user interaction
document.addEventListener('click', function() {
  if (!audio || isAudioPlaying) return;
  
  audio.muted = false;
  audio.play().then(function() {
    isAudioPlaying = true;
    if (audioBtn) {
      audioBtn.innerHTML = '<i class="fas fa-volume-up"></i><span class="audio-label">Music On</span>';
    }
  }).catch(function(e) {});
}, { once: true });

// Try to play when page loads
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    if (audio) {
      audio.muted = true;
      audio.play().catch(function(e) {});
    }
  }, 500);
});

// ============================================================
// DIGESTIVE CHECK FUNCTIONS
// ============================================================

var answers = { 1: null, 2: null, 3: null, 4: null };

function selectAnswer(btn, question, value) {
  var parent = btn.closest('.check-question');
  if (!parent) return;
  
  var buttons = parent.querySelectorAll('.option-btn');
  
  buttons.forEach(function(b) {
    b.classList.remove('selected-yes', 'selected-no');
  });
  
  btn.classList.add(value ? 'selected-yes' : 'selected-no');
  answers[question] = value;
  
  var nextQuestion = parent.nextElementSibling;
  if (nextQuestion && nextQuestion.classList.contains('check-question')) {
    setTimeout(function() {
      nextQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }
}

function showResult() {
  var answered = 0;
  for (var key in answers) {
    if (answers[key] !== null) answered++;
  }
  
  if (answered < 4) {
    alert('Please answer all 4 questions first.');
    return;
  }
  
  var yesCount = 0;
  for (var key in answers) {
    if (answers[key] === true) yesCount++;
  }
  
  var resultPopup = document.getElementById('resultPopup');
  var resultIcon = document.getElementById('resultIcon');
  var resultTitle = document.getElementById('resultTitle');
  var resultMessage = document.getElementById('resultMessage');
  var resultScore = document.getElementById('resultScore');
  
  if (!resultPopup) {
    alert('Error: Result popup not found. Please refresh.');
    return;
  }
  
  resultScore.textContent = yesCount + '/4 Yes';
  
  if (yesCount <= 1) {
    resultIcon.textContent = '😊';
    resultTitle.textContent = 'Your Digestion is Good!';
    resultMessage = 'You have healthy digestive habits. Keep it up with Eco Bee to maintain your wellness.';
  } else if (yesCount <= 3) {
    resultIcon.textContent = '🤔';
    resultTitle.textContent = 'Some Digestive Concerns';
    resultMessage = 'You may be experiencing some digestive issues. Eco Bee can help support your digestive wellness naturally.';
  } else {
    resultIcon.textContent = '😰';
    resultTitle.textContent = 'Your Stomach Needs Attention';
    resultMessage = 'You are experiencing multiple digestive concerns. Eco Bee Tropical Forest Raw Honey is specially formulated to help with bloating, acid reflux, and constipation.';
  }
  
  resultPopup.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  console.log('✅ Result shown:', yesCount + '/4 Yes');
}

function closeResult() {
  var resultPopup = document.getElementById('resultPopup');
  if (resultPopup) {
    resultPopup.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close result popup on outside click
document.addEventListener('click', function(e) {
  var resultPopup = document.getElementById('resultPopup');
  if (resultPopup && resultPopup.classList.contains('active')) {
    if (e.target === resultPopup) {
      closeResult();
    }
  }
});

// ============================================================
// REVIEW ZOOM FUNCTIONS
// ============================================================

var reviewZoomModal = document.getElementById('reviewZoomModal');

function openReviewZoom(index) {
  if (window.reviewZoomSwiper) {
    window.reviewZoomSwiper.slideTo(index, 0);
  }
  if (reviewZoomModal) {
    reviewZoomModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.reviewsSwiper) window.reviewsSwiper.autoplay.stop();
    if (window.reviewZoomSwiper) window.reviewZoomSwiper.keyboard.enable();
  }
}

function closeReviewZoom() {
  if (reviewZoomModal) {
    reviewZoomModal.classList.remove('active');
    document.body.style.overflow = '';
    if (window.reviewsSwiper) window.reviewsSwiper.autoplay.start();
    if (window.reviewZoomSwiper) window.reviewZoomSwiper.keyboard.disable();
  }
}

// ============================================================
// AWARD ZOOM FUNCTIONS
// ============================================================

var awardZoomModal = document.getElementById('awardZoomModal');
var awardZoomImage = document.getElementById('awardZoomImage');
var awardZoomCaption = document.getElementById('awardZoomCaption');

function openAwardZoom(imageSrc, caption) {
  if (awardZoomImage) awardZoomImage.src = imageSrc;
  if (awardZoomCaption) awardZoomCaption.textContent = caption || 'Award';
  if (awardZoomModal) {
    awardZoomModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAwardZoom(event) {
  if (event && event.target !== event.currentTarget && !event.target.closest('.modal-close')) return;
  if (awardZoomModal) {
    awardZoomModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ============================================================
// CERT ZOOM FUNCTIONS
// ============================================================

var certZoomModal = document.getElementById('certZoomModal');
var certZoomImage = document.getElementById('certZoomImage');
var certZoomCaption = document.getElementById('certZoomCaption');

function openCertZoom(imageSrc, caption) {
  if (certZoomImage) certZoomImage.src = imageSrc;
  if (certZoomCaption) certZoomCaption.textContent = caption || 'Certificate';
  if (certZoomModal) {
    certZoomModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCertZoom(event) {
  if (event && event.target !== event.currentTarget && !event.target.closest('.modal-close')) return;
  if (certZoomModal) {
    certZoomModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ============================================================
// VIDEO ZOOM FUNCTIONS - Auto Full Screen
// ============================================================

var videoZoomModal = document.getElementById('videoZoomModal');
var currentVideoIndex = 0;

function openVideoZoom(element, index) {
  // Pause all videos in the carousel
  document.querySelectorAll('.video-wrapper-portrait video').forEach(function(v) {
    v.pause();
    var wrapper = v.closest('.video-wrapper-portrait');
    if (wrapper) wrapper.classList.remove('playing');
  });
  
  currentVideoIndex = index;
  if (window.videoZoomSwiper) {
    window.videoZoomSwiper.slideTo(index, 0);
  }
  
  if (videoZoomModal) {
    videoZoomModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.videoZoomSwiper) window.videoZoomSwiper.keyboard.enable();
    isVideoModalOpen = true;
  }
  
  // Auto play and go full screen
  setTimeout(function() {
    var activeSlide = document.querySelector('.videoZoomSwiper .swiper-slide-active video');
    if (activeSlide) {
      activeSlide.muted = false;
      activeSlide.play().catch(function(e) { console.log('Play error:', e); });
      
      // Auto full screen
      try {
        if (activeSlide.requestFullscreen) {
          activeSlide.requestFullscreen().catch(function(e) {
            console.log('Fullscreen request blocked:', e);
          });
        } else if (activeSlide.webkitRequestFullscreen) {
          activeSlide.webkitRequestFullscreen();
        } else if (activeSlide.msRequestFullscreen) {
          activeSlide.msRequestFullscreen();
        }
      } catch (e) {
        console.log('Fullscreen not supported:', e);
      }
    }
  }, 400);
}

function closeVideoZoom(event) {
  if (event && event.target !== event.currentTarget && !event.target.closest('.modal-close')) return;
  
  // Exit fullscreen if active
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(function(e) {});
  } else if (document.webkitFullscreenElement) {
    document.webkitExitFullscreen();
  } else if (document.msFullscreenElement) {
    document.msExitFullscreen();
  }
  
  document.querySelectorAll('.videoZoomSwiper video').forEach(function(v) {
    v.pause();
  });
  
  if (videoZoomModal) {
    videoZoomModal.classList.remove('active');
    document.body.style.overflow = '';
    if (window.videoZoomSwiper) window.videoZoomSwiper.keyboard.disable();
    isVideoModalOpen = false;
  }
  
  document.querySelectorAll('.video-wrapper-portrait video').forEach(function(v) {
    v.muted = true;
    v.play().catch(function(e) { console.log('Autoplay error:', e); });
    var wrapper = v.closest('.video-wrapper-portrait');
    if (wrapper) wrapper.classList.add('playing');
  });
}

// Video zoom slide change - auto play next video & auto full screen
if (window.videoZoomSwiper) {
  window.videoZoomSwiper.on('slideChange', function() {
    document.querySelectorAll('.videoZoomSwiper video').forEach(function(v) { 
      v.pause(); 
    });
    
    setTimeout(function() {
      var activeSlide = document.querySelector('.videoZoomSwiper .swiper-slide-active video');
      if (activeSlide && isVideoModalOpen) {
        activeSlide.muted = false;
        activeSlide.play().catch(function(e) { console.log('Play error:', e); });
        
        try {
          if (activeSlide.requestFullscreen && !document.fullscreenElement) {
            activeSlide.requestFullscreen().catch(function(e) {});
          } else if (activeSlide.webkitRequestFullscreen && !document.webkitFullscreenElement) {
            activeSlide.webkitRequestFullscreen();
          } else if (activeSlide.msRequestFullscreen && !document.msFullscreenElement) {
            activeSlide.msRequestFullscreen();
          }
        } catch (e) {
          console.log('Fullscreen not supported:', e);
        }
      }
    }, 300);
  });
}

// ============================================================
// OFFER ZOOM FUNCTIONS
// ============================================================

function openOfferZoom(imageSrc, caption) {
  var modal = document.getElementById('offerZoomModal');
  var img = document.getElementById('offerZoomImage');
  var cap = document.getElementById('offerZoomCaption');
  if (img) img.src = imageSrc;
  if (cap) cap.textContent = caption || 'Product';
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeOfferZoom(event) {
  if (event && event.target !== event.currentTarget && !event.target.closest('.modal-close')) return;
  var modal = document.getElementById('offerZoomModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ============================================================
// FAQ TOGGLE
// ============================================================

function toggleFaq(element) {
  var faqItem = element.closest('.faq-item');
  if (!faqItem) return;
  
  faqItem.classList.toggle('active');
  var allFaqs = document.querySelectorAll('.faq-item');
  allFaqs.forEach(function(item) {
    if (item !== faqItem) item.classList.remove('active');
  });
}

// ============================================================
// LIGHTBOX FUNCTIONS
// ============================================================

var lightbox = document.getElementById('lightbox');

function openLightbox() {
  var heroIndex = window.heroSwiper ? window.heroSwiper.realIndex : 0;
  if (window.lightboxSwiper) {
    window.lightboxSwiper.slideTo(heroIndex, 0);
  }
  var captions = [
    '🌿 Eco Bee — Tropical Forest Raw Honey',
    '🍯 Pure Honeycomb — Fresh from the forest',
    '🌳 Sustainable Harvest — Ethical & eco-friendly',
    '🍯 Raw Honey — Unfiltered & unheated',
    '🌿 Forest Honey — From Malaysia\'s rainforest',
    '🍯 Raw Honey — Golden Tropical Blend',
    '🍯 Raw Honey — Pure Forest Harvest',
    '🍯 Raw Honey — Premium Quality Honey'
  ];
  var captionEl = document.getElementById('lightboxCaption');
  if (captionEl) {
    captionEl.textContent = captions[heroIndex] || captions[0];
  }
  if (lightbox) {
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.lightboxSwiper) window.lightboxSwiper.keyboard.enable();
  }
}

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    if (window.lightboxSwiper) window.lightboxSwiper.keyboard.disable();
  }
}

// Zoom hint click
document.querySelector('.zoom-hint')?.addEventListener('click', function(e) {
  e.stopPropagation();
  openLightbox();
});

// ============================================================
// SCROLL FUNCTIONS
// ============================================================

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    var targetId = this.getAttribute('href');
    var targetElement = document.querySelector(targetId);
    if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

function scrollToContact() {
  var contactSection = document.getElementById('contact');
  if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================
// VIDEO AUTOPLAY ON PAGE LOAD
// ============================================================

document.querySelectorAll('.video-wrapper-portrait video').forEach(function(video) {
  video.muted = true;
  video.play().catch(function(error) {
    console.log('Autoplay blocked:', error);
  });
  
  video.addEventListener('playing', function() {
    var wrapper = this.closest('.video-wrapper-portrait');
    if (wrapper) {
      wrapper.classList.add('playing');
    }
  });
  
  video.addEventListener('pause', function() {
    var wrapper = this.closest('.video-wrapper-portrait');
    if (wrapper) {
      wrapper.classList.remove('playing');
    }
  });
});

// ============================================================
// COUNTDOWN TIMER
// ============================================================

function startCountdown() {
  var hoursEl = document.getElementById('hours');
  var minutesEl = document.getElementById('minutes');
  var secondsEl = document.getElementById('seconds');
  
  if (!hoursEl || !minutesEl || !secondsEl) return;
  
  var totalSeconds = 2 * 60 * 60; // 2 hours
  
  setInterval(function() {
    totalSeconds--;
    if (totalSeconds < 0) totalSeconds = 0;
    
    var h = Math.floor(totalSeconds / 3600);
    var m = Math.floor((totalSeconds % 3600) / 60);
    var s = totalSeconds % 60;
    
    hoursEl.textContent = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// Start countdown when page loads
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(startCountdown, 500);
});

// ============================================================
// AUTOPLAY START FOR SWIPERS
// ============================================================

setTimeout(function() {
  if (window.reviewsSwiper && window.reviewsSwiper.autoplay) {
    window.reviewsSwiper.autoplay.start();
  }
  if (window.videoSwiper && window.videoSwiper.autoplay) {
    window.videoSwiper.autoplay.start();
  }
}, 1500);

// Restart autoplay when tab becomes visible
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    if (window.reviewsSwiper && window.reviewsSwiper.autoplay) {
      window.reviewsSwiper.autoplay.start();
    }
    if (window.videoSwiper && window.videoSwiper.autoplay) {
      window.videoSwiper.autoplay.start();
    }
  }
});

// ============================================================
// PREVENT VIDEO ZOOM MODAL CLOSE ON VIDEO CLICK
// ============================================================

var videoZoomContent = document.querySelector('.video-zoom-content');
if (videoZoomContent) {
  videoZoomContent.addEventListener('click', function(e) {
    e.stopPropagation();
  });
}

// ============================================================
// ESCAPE KEY - CLOSE ALL MODALS
// ============================================================

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    // Close result popup
    var resultPopup = document.getElementById('resultPopup');
    if (resultPopup && resultPopup.classList.contains('active')) {
      closeResult();
    }
    
    // Close review zoom
    if (document.getElementById('reviewZoomModal')?.classList.contains('active')) {
      closeReviewZoom();
    }
    
    // Close lightbox
    if (document.getElementById('lightbox')?.classList.contains('active')) {
      closeLightbox();
    }
    
    // Close award zoom
    if (document.getElementById('awardZoomModal')?.classList.contains('active')) {
      closeAwardZoom(e);
    }
    
    // Close cert zoom
    if (document.getElementById('certZoomModal')?.classList.contains('active')) {
      closeCertZoom(e);
    }
    
    // Close video zoom
    if (document.getElementById('videoZoomModal')?.classList.contains('active')) {
      closeVideoZoom(e);
    }
    
    // Close offer zoom
    var offerModal = document.getElementById('offerZoomModal');
    if (offerModal?.classList.contains('active')) {
      closeOfferZoom(e);
    }
  }
});

// ============================================================
// INIT FUNCTIONS
// ============================================================

function initMainFunctions() {
  if (isReady) return;
  isReady = true;
  console.log('✅ Eco Bee - All functions initialized!');
}

// Tunggu DOM loaded
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initMainFunctions, 200);
});

// Backup: kalau event tak trigger
setTimeout(function() {
  if (!isReady && document.querySelector('.heroSwiper')) {
    initMainFunctions();
  }
}, 2500);

console.log('✅ Eco Bee - script.js loaded successfully!');