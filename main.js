'use strict';

gsap.registerPlugin(ScrollTrigger);

const video = document.querySelector('#anim-video');
const endFrame = document.querySelector('#end-frame');

// Wait until the video's metadata is loaded to get its duration
video.addEventListener('loadedmetadata', () => {
    // Main timeline for the whole section
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".m4-chip-section", // Pin the main section
            start: "top top",
            end: "+=400%", // The animation will play out over a scroll distance of 400% of the viewport height
            scrub: 1.5, // Smooth scrubbing
            pin: true,
            // markers: true // Uncomment for debugging
        }
    });

    // 1. Video Scrubbing
    // We use a proxy object to animate the video's currentTime
    let videoTime = { frame: 0 };
    tl.to(videoTime, {
        frame: video.duration,
        ease: "none",
        onUpdate: () => {
            video.currentTime = videoTime.frame;
        }
    }, 0); // Start at the beginning of the timeline

    // 2. Crossfade from Video to End Frame
    // Fade the video out and the end frame in simultaneously for a smooth transition.
    // We start this animation slightly before the video scrub is complete.
    tl.to([video, ".animation-glow-wrapper::before", ".animation-glow-wrapper::after"], {
        opacity: 0,
        duration: 0.3
    }, "-=0.4") // Start 0.4s (in timeline time) before the previous animation ends
        .to(endFrame, {
            opacity: 1,
            duration: 0.3
        }, "<"); // "<" means start at the same time as the previous animation

    // 3. Animate Text In
    // As the video fades, the hero text fades out and the description content fades in.
    tl.to(".hero-content", {
        opacity: 0,
        y: -50,
        duration: 0.5
    }, "<") // Also start this at the same time
        .fromTo(".description-content", {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5
        }, ">-0.2"); // ">-0.2" means start 0.2s before the previous animation completes
});

// Fallback in case the video is already loaded from cache
if (video.readyState >= 2) {
    video.dispatchEvent(new Event('loadedmetadata'));
}