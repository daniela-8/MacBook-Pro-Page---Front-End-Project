'use strict';

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
            // MODIFIED: Reduced this value to shorten the scroll duration
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
// --- Add this to the end of your main.js file ---

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

init();