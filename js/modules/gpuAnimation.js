function initGpuAnimation() {
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
}