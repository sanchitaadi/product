/**
 * CONCEPT A — COQUETTE PINTEREST JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Preloader
    const preloader = document.getElementById('coquettePreloader');
    if (preloader) {
        window.addEventListener('load', function () {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 300);
        });
        // Fallback dismissal
        setTimeout(() => {
            if (!preloader.classList.contains('fade-out')) {
                preloader.classList.add('fade-out');
            }
        }, 1200);
    }

    // 2. Mobile Nav Toggle
    const mobileToggle = document.getElementById('coqMobileToggle');
    const mobileDrawer = document.getElementById('coqMobileDrawer');
    const mobileOverlay = document.getElementById('coqMobileOverlay');
    const drawerClose = document.getElementById('coqDrawerClose');

    function openMobileDrawer() {
        if (mobileDrawer) mobileDrawer.classList.add('open');
        if (mobileOverlay) mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileDrawer() {
        if (mobileDrawer) mobileDrawer.classList.remove('open');
        if (mobileOverlay) mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    window.openMobileDrawer = openMobileDrawer;
    window.closeMobileDrawer = closeMobileDrawer;

    if (mobileToggle) mobileToggle.addEventListener('click', openMobileDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeMobileDrawer);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileDrawer);

    // Auto-close drawer on link click
    if (mobileDrawer) {
        mobileDrawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileDrawer);
        });
    }

    // Escape key closes mobile drawer
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMobileDrawer();
    });

    // 2b. Sticky Header Scroll Effect
    const coqHeader = document.getElementById('coqHeader') || document.querySelector('.coq-header');
    if (coqHeader) {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                coqHeader.classList.add('scrolled');
            } else {
                coqHeader.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // 3. Category Filter (Menu Page)
    const filterButtons = document.querySelectorAll('.coq-filter-btn');
    const menuCards = document.querySelectorAll('.menu-item-filterable');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const selectedCat = this.getAttribute('data-filter');
            menuCards.forEach(card => {
                if (selectedCat === 'all' || card.getAttribute('data-category') === selectedCat) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. Lightbox Modal (Gallery)
    const lightbox = document.getElementById('coqLightbox');
    const lightboxImg = document.getElementById('coqLightboxImg');
    const lightboxCaption = document.getElementById('coqLightboxCaption');
    const lightboxClose = document.getElementById('coqLightboxClose');
    const galleryItems = document.querySelectorAll('.coq-gallery-trigger');

    galleryItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const fullImg = this.getAttribute('data-img') || this.querySelector('img')?.src;
            const caption = this.getAttribute('data-caption') || this.querySelector('.coq-pin-label')?.textContent || 'Peachy Plate Moments';

            if (lightbox && lightboxImg && fullImg) {
                lightboxImg.src = fullImg;
                if (lightboxCaption) lightboxCaption.textContent = caption;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', function () {
            if (lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
