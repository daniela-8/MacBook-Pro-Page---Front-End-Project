'use strict';

// =======================================================
// START: Code for the NEW Hero Section (First Section)
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Animate the hero text and CTA content in on page load
    gsap.from('.hero-text-container > *, .hero-cta-container > *', {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 1,
        ease: 'power2.out'
    });

    // 2. Handle the video-to-image transition
    const heroVideo = document.getElementById('hero-video');
    const heroEndframe = document.getElementById('hero-endframe');

    // Check if the video element exists
    if (heroVideo) {
        // Add an event listener for when the video finishes playing
        heroVideo.addEventListener('ended', () => {
            // Use GSAP for a smooth fade transition
            gsap.to(heroVideo, { opacity: 0, duration: 0.75 });
            gsap.to(heroEndframe, { opacity: 1, duration: 0.75 });
        });
    }
});
// =======================================================
// END: Code for the NEW Hero Section
// =======================================================


// =======================================================
// START: Your ORIGINAL code for the M4 Chip (Second Section)
// =======================================================
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector('.m4-chip-section');
const video = document.querySelector('#anim-video');
const descriptionContent = document.querySelector('.description-content');
const animationContainer = document.querySelector('.animation-container');
const glowContainer = document.querySelector('.glow-border-container');

// A variable to hold the scroll animation timeline
let videoScrubTl;

const setupAnimation = () => {
    // Ensure the video is paused and reset to the beginning
    video.pause();
    video.currentTime = 0;

    let scrub = { time: 0 };

    if (videoScrubTl) {
        videoScrubTl.kill();
    }

    videoScrubTl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=3000",
            scrub: 1.8,
            pin: animationContainer,
        }
    });

    // Animate the video's currentTime
    videoScrubTl.to(scrub, {
        time: video.duration,
        ease: "none",
        onUpdate: () => {
            if (!isNaN(video.duration)) {
                video.currentTime = scrub.time;
            }
        }
    });

    // Fade the entire glow container out
    videoScrubTl.to(glowContainer, {
        opacity: 0,
        duration: 0.5
    });

    // Animate the description content in, but faster.
    gsap.fromTo(descriptionContent, {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: descriptionContent,
            start: "top 80%",
            end: "top 70%",
            scrub: true,
        }
    });
};

// Robust loading check to ensure video metadata is ready
const init = () => {
    if (video.readyState >= 2) {
        setupAnimation();
    } else {
        video.addEventListener('loadeddata', setupAnimation);
    }
};

// Animate the performance comparison items on scroll
gsap.from(".comparison-item", {
    opacity: 0,
    y: 40,
    ease: "power2.out",
    stagger: 0.2, // Adds a slight delay between each item animating in
    scrollTrigger: {
        trigger: ".performance-comparison",
        start: "top 85%", // Starts animation when the section is 85% from the top
        toggleActions: "play none none none",
    }
});

// =======================================================
// START: MODIFIED SCROLLTRIGGER FOR HEADER VISIBILITY
// =======================================================
const initialHeaders = document.querySelector('#initial-headers');
const localNav = document.querySelector('.local-nav');
const heroSection = document.querySelector('.hero-section');

// The new, updated ScrollTrigger
ScrollTrigger.create({
    trigger: heroSection,
    // The switch happens when the bottom of the hero section is 52px
    // from the top of the viewport (the height of the local nav)
    start: "bottom 52px",

    // When scrolling DOWN past the trigger point
    onEnter: () => {
        initialHeaders.classList.add('is-hidden');
        localNav.classList.add('is-visible');
    },

    // When scrolling UP past the trigger point
    onLeaveBack: () => {
        initialHeaders.classList.remove('is-hidden');
        localNav.classList.remove('is-visible');
    }
});


init();