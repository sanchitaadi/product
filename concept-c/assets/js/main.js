/**
 * CONCEPT C — LUXURY CUTE JAVASCRIPT
 */

// Global Mobile Drawer Functions
function openMobileDrawer() {
    const mobileDrawer = document.getElementById('luxMobileDrawer');
    const mobileOverlay = document.getElementById('luxMobileOverlay');
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMobileDrawer() {
    const mobileDrawer = document.getElementById('luxMobileDrawer');
    const mobileOverlay = document.getElementById('luxMobileOverlay');
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

window.openMobileDrawer = openMobileDrawer;
window.closeMobileDrawer = closeMobileDrawer;

document.addEventListener('DOMContentLoaded', function () {
    // Sticky header scroll behavior
    const header = document.querySelector('.lux-header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Escape key closes mobile drawer
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMobileDrawer();
        }
    });

    // Auto close drawer when clicking any link inside
    const drawerLinks = document.querySelectorAll('.lux-mobile-drawer a');
    drawerLinks.forEach(link => {
        link.addEventListener('click', closeMobileDrawer);
    });

    // Menu Category Filter
    const filterButtons = document.querySelectorAll('.lux-filter-btn');
    const menuCards = document.querySelectorAll('.lux-menu-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            menuCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Gallery Lightbox
    const lightbox = document.getElementById('luxLightbox');
    const lightboxImg = document.getElementById('luxLightboxImg');
    const lightboxCaption = document.getElementById('luxLightboxCaption');
    const lightboxClose = document.getElementById('luxLightboxClose');
    const triggers = document.querySelectorAll('.lux-gallery-trigger');

    triggers.forEach(trig => {
        trig.addEventListener('click', function (e) {
            e.preventDefault();
            const src = this.getAttribute('data-img') || this.querySelector('img')?.src;
            const caption = this.getAttribute('data-caption') || this.querySelector('.lux-dish-title')?.textContent || 'Peachy Plate Collection';

            if (lightbox && lightboxImg && src) {
                lightboxImg.src = src;
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
