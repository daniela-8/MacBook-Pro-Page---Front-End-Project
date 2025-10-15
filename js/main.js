'use strict';


document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins once
    gsap.registerPlugin(ScrollTrigger);

    // Initialize all modules
    initHeroAnimation();
    initGallery();
    initGpuAnimation();
    initChipAnimation();
    initHeaderScroll();
});

window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});