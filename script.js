// Mobile menu toggle functionality and section interactions
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navButton = document.querySelector('.nav-button');
    const navbar = document.querySelector('.navbar');

    // ------------------
    // Mobile navbar
    // ------------------
    if (hamburger && navMenu && navButton && navbar) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            navButton.classList.toggle('active');
            navbar.classList.toggle('menu-open');
        });

        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navButton.classList.remove('active');
                navbar.classList.remove('menu-open');
            });
        });

        // Close menu when clicking on overlay
        navbar.addEventListener('click', function (e) {
            if (e.target === navbar || e.target.classList.contains('navbar')) {
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    navButton.classList.remove('active');
                    navbar.classList.remove('menu-open');
                }
            }
        });
    }

    // ------------------
    // Back to Top Button
    // ------------------
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        const toggleBackToTop = () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('back-to-top--visible');
            } else {
                backToTopBtn.classList.remove('back-to-top--visible');
            }
        };

        // initial state
        toggleBackToTop();

        window.addEventListener('scroll', toggleBackToTop);

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ------------------
    // Sales On Point: 5 cards total
    // Start: 3 cards, Next: last 2, Prev: back to 3
    // ------------------
    // ------------------
    // Sales On Point Carousel
    // ------------------
    // ------------------
    // Sales On Point Carousel (Seamless Infinite Loop)
    // ------------------
    const salesSection = document.querySelector('.sales-onpoint-section');

    if (salesSection) {
        const track = salesSection.querySelector('.sales-onpoint-grid');
        const prevBtn = salesSection.querySelector('[aria-label="Previous testimonials"]');
        const nextBtn = salesSection.querySelector('[aria-label="Next testimonials"]');

        if (!track || !prevBtn || !nextBtn) return;

        let cards = Array.from(track.children);
        let index;
        let autoSlideTimer;
        const AUTO_DELAY = 1000;
        const GAP = 25; // must match CSS gap

        function cardsPerView() {
            if (window.innerWidth <= 640) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        }

        function setupClones() {
            const count = cardsPerView();

            // remove old clones
            track.querySelectorAll('.clone').forEach(c => c.remove());

            cards = Array.from(track.children);

            const firstClones = cards.slice(0, count).map(card => {
                const clone = card.cloneNode(true);
                clone.classList.add('clone');
                return clone;
            });

            const lastClones = cards.slice(-count).map(card => {
                const clone = card.cloneNode(true);
                clone.classList.add('clone');
                return clone;
            });

            lastClones.forEach(clone => track.prepend(clone));
            firstClones.forEach(clone => track.append(clone));

            cards = Array.from(track.children);
            index = count;

            jump(false);
        }

        function cardWidth() {
            return cards[0].offsetWidth + GAP;
        }

        function move(withAnim = true) {
            track.style.transition = withAnim ? 'transform 0.45s ease' : 'none';
            track.style.transform = `translateX(-${index * cardWidth()}px)`;
        }

        function jump(withAnim = true) {
            requestAnimationFrame(() => move(withAnim));
        }

        function next() {
            index++;
            move(true);

            if (index >= cards.length - cardsPerView()) {
                setTimeout(() => {
                    index = cardsPerView();
                    move(false);
                }, 460);
            }
        }

        function prev() {
            index--;
            move(true);

            if (index <= 0) {
                setTimeout(() => {
                    index = cards.length - (cardsPerView() * 2);
                    move(false);
                }, 460);
            }
        }

        function startAuto() {
            stopAuto();
            autoSlideTimer = setInterval(next, AUTO_DELAY);
        }

        function stopAuto() {
            if (autoSlideTimer) clearInterval(autoSlideTimer);
        }

        nextBtn.addEventListener('click', () => {
            stopAuto();
            next();
            startAuto();
        });

        prevBtn.addEventListener('click', () => {
            stopAuto();
            prev();
            startAuto();
        });

        window.addEventListener('resize', () => {
            setupClones();
            startAuto();
        });

        setupClones();
        startAuto();
    }

    // ------------------
    // Brand trust & sales steps: Q/A toggle per item
    // ------------------
    const brandItems = document.querySelectorAll('.brand-expert-item');
    if (brandItems.length) {
        brandItems.forEach((item) => {
            const toggleBtn = item.querySelector('.brand-expert-cta');
            if (!toggleBtn) return;

            toggleBtn.addEventListener('click', () => {
                const isOpen = item.classList.toggle('is-open');
                const span = toggleBtn.querySelector('span');
                if (span) span.textContent = isOpen ? '−' : '+';
            });
        });
    }






});
