'use strict';

// =======================================================
//  RUN CODE AFTER THE PAGE IS FULLY LOADED
// =======================================================
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. HERO SECTION ANIMATION ---
    gsap.from('.hero-text-container > *, .hero-cta-container > *', {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 1,
        ease: 'power2.out'
    });

    const heroVideo = document.getElementById('hero-video');
    const heroEndframe = document.getElementById('hero-endframe');
    if (heroVideo) {
        heroVideo.addEventListener('ended', () => {
            gsap.to(heroVideo, { opacity: 0, duration: 0.75 });
            gsap.to(heroEndframe, { opacity: 1, duration: 0.75 });
        });
    }

    // --- 2. HIGHLIGHTS GALLERY LOGIC (WITH SCROLL-BASED ANIMATION) ---
    const highlightsSection = document.querySelector('.highlights-section');
    const track = document.querySelector('.gallery-track');
    const items = document.querySelectorAll('.gallery-item');
    const dots = document.querySelectorAll('.dot-btn');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const morphDot = document.querySelector('.morph-dot');
    const dotNavList = document.querySelector('.dot-nav ul');

    if (track && items.length > 0 && dots.length > 0 && playPauseBtn) {

        let currentIndex = 0;
        let isAutoplaying = false;
        let autoplayTimeout;
        const IMAGE_SLIDE_DURATION = 4000;

        function updateGallery(newIndex) {
            clearTimeout(autoplayTimeout);

            const currentVideo = items[currentIndex].querySelector('video');
            if (currentVideo) {
                currentVideo.pause();
            }

            const currentImage = items[currentIndex].querySelector('.gallery-image');
            if (currentImage) {
                currentImage.classList.remove('is-zooming');
            }

            items.forEach(item => {
                item.classList.remove('active', 'previous', 'next');
            });
            dots[currentIndex].classList.remove('active');

            currentIndex = newIndex;

            items[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');

            if (currentIndex > 0) {
                items[currentIndex - 1].classList.add('previous');
            }
            if (currentIndex < items.length - 1) {
                items[currentIndex + 1].classList.add('next');
            }

            if (isAutoplaying) {
                advanceSlide();
            }
        }

        function advanceSlide() {
            clearTimeout(autoplayTimeout);

            const currentSlide = items[currentIndex];
            const mediaType = currentSlide.dataset.mediaType;
            const video = currentSlide.querySelector('video');
            const image = currentSlide.querySelector('.gallery-image');

            if (mediaType === 'video' && video) {
                video.currentTime = 0;
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => { console.error("Autoplay prevented:", error); stopAutoplay(); });
                }
            } else if (mediaType === 'image' && image) {
                image.classList.add('is-zooming');
                autoplayTimeout = setTimeout(goToNextSlide, IMAGE_SLIDE_DURATION);
            }
        }

        function goToNextSlide() {
            const nextIndex = (currentIndex + 1) % items.length;
            if (nextIndex === 0) {
                stopAutoplay(true);
                updateGallery(nextIndex);
            } else {
                updateGallery(nextIndex);
            }
        }

        function startAutoplay() {
            if (isAutoplaying) return;
            isAutoplaying = true;
            playPauseBtn.classList.add('is-playing');
            playPauseBtn.classList.remove('is-replaying');
            playPauseBtn.setAttribute('aria-label', 'Pause gallery');

            const currentSlide = items[currentIndex];
            const mediaType = currentSlide.dataset.mediaType;
            const video = currentSlide.querySelector('video');
            const image = currentSlide.querySelector('.gallery-image');

            if (mediaType === 'video' && video) {
                if (video.ended) video.currentTime = 0;
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => { console.error("Playback failed:", error); stopAutoplay(); });
                }
            } else if (mediaType === 'image' && image) {
                image.classList.add('is-zooming');
                autoplayTimeout = setTimeout(goToNextSlide, IMAGE_SLIDE_DURATION);
            }
        }

        function stopAutoplay(showReplay = false) {
            if (!isAutoplaying && !showReplay) return;
            isAutoplaying = false;
            clearTimeout(autoplayTimeout);

            const currentVideo = items[currentIndex].querySelector('video');
            if (currentVideo) currentVideo.pause();

            playPauseBtn.classList.remove('is-playing');
            playPauseBtn.setAttribute('aria-label', 'Play gallery');

            if (showReplay) {
                playPauseBtn.classList.add('is-replaying');
                playPauseBtn.setAttribute('aria-label', 'Replay gallery');
            }
        }

        playPauseBtn.addEventListener('click', () => {
            if (playPauseBtn.classList.contains('is-replaying')) {
                updateGallery(0);
                startAutoplay();
                return;
            }
            if (isAutoplaying) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const newIndex = parseInt(dot.dataset.index);
                if (newIndex !== currentIndex) {
                    stopAutoplay();
                    playPauseBtn.classList.remove('is-replaying');
                    updateGallery(newIndex);
                }
            });
        });

        items.forEach(item => {
            const video = item.querySelector('video');
            if (video) {
                video.addEventListener('ended', () => { if (isAutoplaying) goToNextSlide(); });
            }
        });

        // --- FIXED: SCROLL-BASED TRIGGERS FOR GALLERY ---

        // Trigger 1: Handles the morphing animation of the nav bar
        gsap.timeline({
            scrollTrigger: {
                trigger: highlightsSection,
                start: "top 60%", // Starts a bit earlier for a smoother effect
                toggleActions: "play none none reverse" // Plays on entering, reverses on leaving
            }
        })
            .to(morphDot, { scale: 0, opacity: 0, duration: 0.3 })
            .to(dotNavList, { scale: 1, opacity: 1, duration: 0.5 }, "<");

        // Trigger 2: Handles the starting and stopping of the gallery autoplay
        ScrollTrigger.create({
            trigger: highlightsSection,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => startAutoplay(),
            onLeave: () => stopAutoplay(),
            onEnterBack: () => startAutoplay(),
            onLeaveBack: () => stopAutoplay()
        });

        // Initialize the gallery visuals
        updateGallery(0);

    } else {
        console.error('Highlights gallery elements not found.');
    }
});


// =======================================================
// M4 CHIP SCROLLING ANIMATION (Second Section)
// =======================================================
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector('.m4-chip-section');
const video = document.querySelector('#anim-video');
const descriptionContent = document.querySelector('.description-content');
const animationContainer = document.querySelector('.animation-container');
const glowContainer = document.querySelector('.glow-border-container');

let videoScrubTl;

const setupAnimation = () => {
    // Ensure the required elements exist before running the code.
    if (!video || !section) return;

    // Set the initial state: video is paused at the beginning.
    video.pause();
    video.currentTime = 0;


    // Create a ScrollTrigger to play the video.
    ScrollTrigger.create({
        trigger: video, // The animation triggers based on the video element itself.
        start: 'top 75%', // Starts when the top of the video is 75% down the screen.
        end: 'bottom 25%', // A placeholder end point.

        // This is the magic: when the trigger starts, just play the video!
        onEnter: () => video.play(),

        // Optional: If you scroll back up, rewind the video.
        onLeaveBack: () => video.currentTime = 0,
    });
};
// This listens for the 'ended' event on the video element.
// This listens for the 'ended' event on the video element.
video.addEventListener('ended', () => {
    console.log('Video has ended. Fading to end frame.');

    // Animate the video to be fully transparent
    gsap.to(video, {
        opacity: 0,
        duration: 0.4,
        // After the fade, move the video to the back
        onComplete: () => {
            gsap.set(video, { zIndex: 0 });
        }
    });

    // Animate the end-frame image to be fully visible
    gsap.to('#end-frame', {
        opacity: 1,
        duration: 0.4
    });
});

const init = () => {
    if (video && video.readyState >= 2) {
        setupAnimation();
    } else if (video) {
        video.addEventListener('loadeddata', setupAnimation);
    }
};
gsap.fromTo(descriptionContent, {
    opacity: 0,
    y: 50
}, {
    opacity: 1,
    y: 0,
    ease: "power1.inOut",
    scrollTrigger: {
        trigger: descriptionContent,
        start: "top 85%",
        toggleActions: "play none none none"
    }
});

gsap.from(".comparison-item", {
    opacity: 0,
    y: 40,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".performance-comparison",
        start: "top 85%",
        toggleActions: "play none none none",
    }
});


// =======================================================
//  HEADER VISIBILITY SCROLLTRIGGER
// =======================================================
const initialHeaders = document.querySelector('#initial-headers');
const localNav = document.querySelector('.local-nav');
const heroSection = document.querySelector('.hero-section');

if (initialHeaders && localNav && heroSection) {
    ScrollTrigger.create({
        trigger: heroSection,
        start: "bottom 52px",
        onEnter: () => {
            initialHeaders.classList.add('is-hidden');
            localNav.classList.add('is-visible');
        },
        onLeaveBack: () => {
            initialHeaders.classList.remove('is-hidden');
            localNav.classList.remove('is-visible');
        }
    });
}

// =======================================================
//  INITIALIZE ANIMATIONS
// =======================================================
init();