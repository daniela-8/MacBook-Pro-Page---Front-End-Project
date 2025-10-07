'use strict';

document.addEventListener('DOMContentLoaded', () => {

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
            gsap.to(heroVideo, {
                opacity: 0,
                duration: 0.75
            });
            gsap.to(heroEndframe, {
                opacity: 1,
                duration: 0.75
            });
        });
    }

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
                    playPromise.catch(error => {
                        console.error("Autoplay prevented:", error);
                        stopAutoplay();
                    });
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
                    playPromise.catch(error => {
                        console.error("Playback failed:", error);
                        stopAutoplay();
                    });
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
                video.addEventListener('ended', () => {
                    if (isAutoplaying) goToNextSlide();
                });
            }
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: highlightsSection,
                start: "top 60%",
                toggleActions: "play none none reverse"
            }
        })
            .to(morphDot, {
                scale: 0,
                opacity: 0,
                duration: 0.3
            })
            .to(dotNavList, {
                scale: 1,
                opacity: 1,
                duration: 0.5
            }, "<");

        ScrollTrigger.create({
            trigger: highlightsSection,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => startAutoplay(),
            onLeave: () => stopAutoplay(),
            onEnterBack: () => startAutoplay(),
            onLeaveBack: () => stopAutoplay()
        });

        updateGallery(0);

    } else {
        console.error('Highlights gallery elements not found.');
    }

    const gpuBurstContainer = document.querySelector('.gpu-burst-container');
    if (gpuBurstContainer) {


        gsap.set('.screen-1', {
            xPercent: -120,
            yPercent: -10
        });
        gsap.set('.screen-2', {
            xPercent: -10,
            yPercent: -10
        });
        gsap.set('.screen-3', {
            xPercent: -130,
            yPercent: -70
        });
        gsap.set('.screen-4', {
            xPercent: -115,
            yPercent: -130
        });
        gsap.set('.screen-5', {
            xPercent: 0,
            yPercent: -70
        });
        gsap.set('.screen-6', {
            xPercent: -15,
            yPercent: -130
        });


        const gpuTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.gpu-burst-section',
                start: 'top 60%',
                end: '+=1500',
                scrub: 1.5,
                pin: 'gpu-burst-section',
            }
        });

        const animationProps = {
            scale: 1.2,
            ease: 'power2.out'
        };

        gpuTl.to('.screen-1', {
            ...animationProps,
            xPercent: -230,
            yPercent: -30
        }, 0);
        gpuTl.to('.screen-2', {
            ...animationProps,
            xPercent: 140,
            yPercent: 40
        }, 0);
        gpuTl.to('.screen-3', {
            ...animationProps,
            xPercent: -210,
            yPercent: -100
        }, 0);
        gpuTl.to('.screen-4', {
            ...animationProps,
            xPercent: -185,
            yPercent: -250
        }, 0);
        gpuTl.to('.screen-5', {
            ...animationProps,
            xPercent: 130,
            yPercent: -160
        }, 0);
        gpuTl.to('.screen-6', {
            ...animationProps,
            xPercent: 40,
            yPercent: -180
        }, 0);
    }



    gsap.registerPlugin(ScrollTrigger);

    const video = document.querySelector('#anim-video');
    const descriptionContent = document.querySelector('.description-content');
    const animationContainer = document.querySelector('.animation-container');

    const setupAnimation = () => {
        if (!video || !animationContainer) return;

        video.pause();
        video.currentTime = 0;

        const videoScrubTl = gsap.timeline({
            scrollTrigger: {
                trigger: animationContainer,
                start: 'center center',
                end: '+=3000',
                scrub: true,
                pin: true,
                anticipatePin: 1
            }
        });

        const crossFadeDuration = 0.09;

        videoScrubTl.to(video, {
            currentTime: video.duration || 3.3,
            ease: 'none'
        });

        videoScrubTl.to(video, {
            opacity: 0,
            duration: crossFadeDuration,
            ease: 'power1.inOut'
        }, `-=${crossFadeDuration}`);

        videoScrubTl.to('#end-frame', {
            opacity: 1,
            duration: crossFadeDuration,
            ease: 'power1.inOut'
        }, "<");

    };

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



    const initialHeaders = document.querySelector('#initial-headers');
    const localNav = document.querySelector('.local-nav');
    const heroSection = document.querySelector('.hero-section');
    const buyButton = document.querySelector('.buy-button');

    if (initialHeaders && localNav && heroSection) {
        ScrollTrigger.create({
            trigger: heroSection,
            start: "top top -=1",
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

    if (buyButton && localNav) {

        ScrollTrigger.create({
            trigger: buyButton,
            start: "center center",
            onEnter: () => {
                localNav.classList.add('is-visible');
            },
            onLeaveBack: () => {
                localNav.classList.remove('is-visible');
            }
        });
    }

    init();

});

window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});