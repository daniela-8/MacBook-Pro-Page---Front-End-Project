function initGallery() {
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
}