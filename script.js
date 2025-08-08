document.addEventListener('DOMContentLoaded', () => {
    // Page elements
    const pages = document.querySelectorAll('.page');
    const toPage2Btn = document.getElementById('toPage2Btn');
    const toPage3Btn = document.getElementById('toPage3Btn');
    const showWishesBtn = document.getElementById('showWishesBtn');

    // Modal elements
    const imageModal = document.getElementById('imageModal');
    const wishesModal = document.getElementById('wishesModal');
    const galleryImages = document.querySelectorAll('.gallery-image');
    const closeModalBtns = document.querySelectorAll('.close-modal-btn');

    // --- Particle Animation for Page 1 ---
    function createParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;
        
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 5 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100 + 100}vh`; // Start below the screen
            particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            container.appendChild(particle);
        }
    }
    
    // Create particles on page load
    createParticles();

    // --- GSAP Animations ---
    // Initial state setup
    gsap.set(pages, { autoAlpha: 0 });
    gsap.set(document.querySelectorAll('.page:not(#page1)'), { display: 'none' });
    gsap.set('#page1', { autoAlpha: 1 });
    
    gsap.fromTo("#page1 .anim-element",
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
    );

    // Function to switch pages with GSAP
    function switchPage(fromPage, toPage) {
        const fromElements = fromPage.querySelectorAll('.anim-element');
        const toElements = toPage.querySelectorAll('.anim-element');

        const tl = gsap.timeline();
        tl.to(fromElements, { y: -30, autoAlpha: 0, duration: 0.5, stagger: 0.1, ease: 'power2.in' })
            .to(fromPage, { x: '-100%', autoAlpha: 0, duration: 0.8, ease: 'power3.inOut' }, "-=0.2")
            .set(fromPage, { display: 'none' })
            .set(toPage, { display: 'flex', x: '100%', autoAlpha: 0 })
            .to(toPage, { x: '0%', autoAlpha: 1, duration: 0.8, ease: 'power3.inOut' })
            .fromTo(toElements,
                { y: 30, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
                "-=0.5"
            );
    }

    // Event Listeners for page navigation
    toPage2Btn.addEventListener('click', () => switchPage(document.getElementById('page1'), document.getElementById('page2')));
    toPage3Btn.addEventListener('click', () => switchPage(document.getElementById('page2'), document.getElementById('page3')));

    // --- Modal Logic ---
    function openModal(modal) {
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.remove('visible');
        document.body.style.overflow = 'auto';
    }

    // Setup Image Modal
    document.querySelectorAll('#page3 .anim-element > div').forEach(element => {
        element.addEventListener('click', () => {
            openModal(imageModal);
        });
    });

    // Setup Wishes Modal
    showWishesBtn.addEventListener('click', () => {
        openModal(wishesModal);
    });

    // Setup all close buttons
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(imageModal);
            closeModal(wishesModal);
        });
    });

    // Close modals when clicking outside content
    [imageModal, wishesModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
});
