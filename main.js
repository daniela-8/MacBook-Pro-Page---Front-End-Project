'use strict';

gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector('.m4-chip-section');
const video = document.querySelector('#anim-video');
const descriptionContent = document.querySelector('.description-content');
const animationContainer = document.querySelector('.animation-container');

let scrub = {
    time: 0
};

const setupAnimation = () => {
    // Make the timeline slightly longer for more granular control
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=5000", // A longer scroll distance feels more premium
            scrub: 1.8,
            pin: animationContainer,
        }
    });

    // Animate the video's currentTime using our scrub object
    tl.to(scrub, {
        time: video.duration,
        ease: "none",
        onUpdate: () => {
            if (!isNaN(video.duration)) {
                video.currentTime = scrub.time;
            }
        }
    });

    // Fade the video out to reveal the static image underneath.
    // Start this fade slightly before the scroll ends for a smoother transition.
    tl.to(video, {
        opacity: 0,
        duration: 1
    }, "-=0.5"); // Start 0.5 "seconds" before the end of the video scrub

    // Animate the description content in.
    // This animation is also scrubbed, appearing as you scroll past the pinned video.
    gsap.fromTo(descriptionContent, {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: descriptionContent,
            start: "top 80%", // Start when the top of the element is 80% from the viewport top
            end: "top 50%",
            scrub: true,
        }
    });
};

// Robust loading check to ensure video metadata is ready before setting up the animation
if (video.readyState >= 1) {
    setupAnimation();
} else {
    video.addEventListener('loadedmetadata', setupAnimation);
}