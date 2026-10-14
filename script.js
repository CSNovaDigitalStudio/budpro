'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    });
  });
}

// Service links preselect the matching enquiry form option.
document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    const serviceSelect = document.querySelector('#service');
    if (serviceSelect) serviceSelect.value = link.dataset.service;
  });
});

// The form creates a prefilled WhatsApp message; no details are sent to a server.
const enquiryForm = document.querySelector('#enquiryForm');
const formFeedback = document.querySelector('#formFeedback');

if (enquiryForm) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!enquiryForm.reportValidity()) return;

    const formData = new FormData(enquiryForm);
    const name = String(formData.get('name') || '').trim();
    const business = String(formData.get('business') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const details = String(formData.get('details') || '').trim();

    const message = [
      'Hi BudPro Branding & Signs, I would like to enquire about a project.',
      `Name: ${name}`,
      business ? `Business: ${business}` : '',
      `Service: ${service}`,
      `Project details: ${details}`
    ].filter(Boolean).join('\n');

    if (formFeedback) formFeedback.textContent = 'Opening WhatsApp with your enquiry. Please review and send the message there.';
    const whatsappUrl = `https://wa.me/27847407920?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());


// Gallery images open in an on-page lightbox instead of navigating to a flyer.
const galleryLightbox = document.querySelector('#galleryLightbox');
const galleryLightboxImage = galleryLightbox?.querySelector('.gallery-lightbox-image');
const galleryLightboxClose = galleryLightbox?.querySelector('.gallery-lightbox-close');
let galleryPreviousFocus = null;

function closeGalleryLightbox() {
  if (!galleryLightbox || galleryLightbox.hidden) return;
  galleryLightbox.hidden = true;
  galleryLightboxImage.src = '';
  document.body.classList.remove('gallery-lightbox-open');
  galleryPreviousFocus?.focus();
}

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    if (!galleryLightbox || !galleryLightboxImage) return;
    const thumbnail = item.querySelector('img');
    if (!thumbnail) return;
    galleryPreviousFocus = item;
    galleryLightboxImage.src = thumbnail.currentSrc || thumbnail.src;
    galleryLightboxImage.alt = thumbnail.alt || 'Enlarged gallery image';
    galleryLightbox.hidden = false;
    document.body.classList.add('gallery-lightbox-open');
    galleryLightboxClose?.focus();
  });
});

galleryLightboxClose?.addEventListener('click', closeGalleryLightbox);
galleryLightbox?.addEventListener('click', (event) => {
  if (event.target === galleryLightbox) closeGalleryLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeGalleryLightbox();
});
