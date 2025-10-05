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

    // --- 2. HIGHLIGHTS GALLERY LOGIC (FIXED AUTOPLAY & RESUME) ---
    const track = document.querySelector('.gallery-track');
    const items = document.querySelectorAll('.gallery-item');
    const dots = document.querySelectorAll('.dot-btn');
    const playPauseBtn = document.querySelector('.play-pause-btn');

    if (track && items.length > 0 && dots.length > 0 && playPauseBtn) {

        let currentIndex = 0;
        let isAutoplaying = false;
        let autoplayTimeout;
        const IMAGE_SLIDE_DURATION = 4000;

        // This function only handles the visual update of slides
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
                const prevIndex = currentIndex - 1;
                items[prevIndex].classList.add('previous');
            }

            if (currentIndex < items.length - 1) {
                const nextIndex = currentIndex + 1;
                items[nextIndex].classList.add('next');
            }


            if (isAutoplaying) {
                advanceSlide();
            }
        }

        // This function starts media on a NEW slide (always from the beginning)
        function advanceSlide() {
            clearTimeout(autoplayTimeout);

            const currentSlide = items[currentIndex];
            const mediaType = currentSlide.dataset.mediaType;
            const video = currentSlide.querySelector('video');

            if (mediaType === 'video' && video) {
                video.currentTime = 0; // Always reset for a new slide
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error("Autoplay was prevented:", error);
                        stopAutoplay();
                    });
                }
            } else {
                const image = currentSlide.querySelector('.gallery-image');
                if (image) {
                    image.classList.add('is-zooming');
                }
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

        // This function RESUMES or starts media on the CURRENT slide
        function startAutoplay() {
            isAutoplaying = true;
            playPauseBtn.classList.add('is-playing');
            playPauseBtn.classList.remove('is-replaying');
            playPauseBtn.setAttribute('aria-label', 'Pause gallery');

            const currentSlide = items[currentIndex];
            const mediaType = currentSlide.dataset.mediaType;
            const video = currentSlide.querySelector('video');

            if (mediaType === 'video' && video) {
                if (video.ended) {
                    video.currentTime = 0;
                }
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error("Playback failed:", error);
                        stopAutoplay();
                    });
                }
            } else {
                const image = currentSlide.querySelector('.gallery-image');
                if (image) {
                    image.classList.add('is-zooming');
                } autoplayTimeout = setTimeout(goToNextSlide, IMAGE_SLIDE_DURATION);
            }
        }

        function stopAutoplay(showReplay = false) {
            isAutoplaying = false;
            clearTimeout(autoplayTimeout);

            const currentVideo = items[currentIndex].querySelector('video');
            if (currentVideo) {
                currentVideo.pause();
            }

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
                video.addEventListener('ended', () => {
                    if (isAutoplaying) {
                        goToNextSlide();
                    }
                });
            }
        });

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
    if (!video || !section || !animationContainer || !glowContainer) return;
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
    videoScrubTl.to(scrub, {
        time: video.duration,
        ease: "none",
        onUpdate: () => {
            if (!isNaN(video.duration)) {
                video.currentTime = scrub.time;
            }
        }
    });
    videoScrubTl.to(glowContainer, {
        opacity: 0,
        duration: 0.5
    });
    if (descriptionContent) {
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
    }
};

const init = () => {
    if (video && video.readyState >= 2) {
        setupAnimation();
    } else if (video) {
        video.addEventListener('loadeddata', setupAnimation);
    }
};

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