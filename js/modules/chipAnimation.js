function initChipAnimation() {
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

    init();
}