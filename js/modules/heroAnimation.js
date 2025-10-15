function initHeroAnimation() {
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
}