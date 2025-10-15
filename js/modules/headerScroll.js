function initHeaderScroll() {
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
}