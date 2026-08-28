// ============================================================
// LOAD SECTIONS - Updated Flow (Ikut Reference Boss)
// ============================================================

const sections = [
  '01-floating-cta',
  '02-audio-player',
  '03-video-hero',
  '04-digestive-check',
  '05-request-test',
  '06-solution',
  '07-before-after',
  '08-testimonials',
  '09-trust-badges',
  '10-awards',
  '11-partners',
  '12-offer-pricing',
  '13-faq',
  '14-contact'
];

async function loadAllSections() {
  const container = document.getElementById('sections-container');
  
  for (const section of sections) {
    try {
      const response = await fetch(`sections/${section}.html`);
      if (!response.ok) {
        console.warn(`⚠️ Section ${section} not found, skipping...`);
        continue;
      }
      const html = await response.text();
      container.insertAdjacentHTML('beforeend', html);
    } catch (error) {
      console.warn(`⚠️ Error loading section ${section}:`, error);
    }
  }
  
  document.dispatchEvent(new Event('sectionsLoaded'));
}

document.addEventListener('DOMContentLoaded', function() {
  loadAllSections();
});