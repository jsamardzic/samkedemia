function generateStars(rating) {
    let starsHTML = '';
    const starSVG = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += `<div class="text-secondary">${starSVG}</div>`;
        } else if (i - 0.5 === rating) {
            starsHTML += `<div class="relative"><div class="text-gray-300">${starSVG}</div><div class="absolute top-0 left-0 w-1/2 overflow-hidden text-secondary">${starSVG}</div></div>`;
        } else {
            starsHTML += `<div class="text-gray-300">${starSVG}</div>`;
        }
    }
    return starsHTML;
}

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    document.getElementById('mobile-menu-button').addEventListener('click', function () {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Testimonial Carousel
    const testimonialContainer = document.getElementById('testimonial-container');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialPrevBtn = document.getElementById('testimonial-prev-btn');
    const testimonialNextBtn = document.getElementById('testimonial-next-btn');
    let testimonialCurrentIndex = 0;
    const totalTestimonialSlides = testimonialSlides.length;

    function getSlidesToShow() {
        if (window.innerWidth >= 1280) return 4;
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function updateCarousel() {
        if (!testimonialContainer) return;
        const slideWidth = testimonialContainer.parentElement.offsetWidth / getSlidesToShow();
        const newTransformValue = -testimonialCurrentIndex * slideWidth;
        testimonialContainer.style.transform = `translateX(${newTransformValue}px)`;
    }

    if (testimonialNextBtn && testimonialPrevBtn) {
        testimonialNextBtn.addEventListener('click', () => {
            const slidesToShow = getSlidesToShow();
            if (testimonialCurrentIndex < totalTestimonialSlides - slidesToShow) {
                testimonialCurrentIndex++;
            } else {
                testimonialCurrentIndex = 0;
            }
            updateCarousel();
        });

        testimonialPrevBtn.addEventListener('click', () => {
            const slidesToShow = getSlidesToShow();
            if (testimonialCurrentIndex > 0) {
                testimonialCurrentIndex--;
            } else {
                testimonialCurrentIndex = totalTestimonialSlides - slidesToShow;
            }
            updateCarousel();
        });
    }

    window.addEventListener('resize', () => {
        testimonialCurrentIndex = 0;
        updateCarousel();
    });

    // Populate stars for testimonials
    document.querySelectorAll('.testimonial-slide').forEach(slide => {
        const rating = parseFloat(slide.dataset.rating);
        const starContainer = slide.querySelector('.star-rating');
        if (rating && starContainer) {
            starContainer.innerHTML = generateStars(rating);
        }
    });

    // Course Tabs
    const courseTabs = document.querySelectorAll('.course-tab');
    const courseSlider = document.getElementById('course-tab-slider');
    const courseContentSlider = document.getElementById('course-content-slider');

    function updateCourseSlider(activeTab) {
        if (!activeTab || !courseSlider) return;
        courseSlider.style.width = `${activeTab.offsetWidth}px`;
        courseSlider.style.left = `${activeTab.offsetLeft}px`;
    }

    courseTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            courseTabs.forEach(t => {
                t.classList.remove('text-white');
                t.classList.add('text-gray-600');
            });
            tab.classList.remove('text-gray-600');
            tab.classList.add('text-white');
            updateCourseSlider(tab);

            // Slide the content
            courseContentSlider.style.transform = `translateX(-${index * 100}%)`;
        });
    });

    // Initialize the course selector
    const initialCourseTab = document.querySelector('.course-tab');
    if (initialCourseTab) {
        initialCourseTab.classList.remove('text-gray-600');
        initialCourseTab.classList.add('text-white');
        updateCourseSlider(initialCourseTab);
    }

    // Pricing Toggle Logic
    const groupBtn = document.getElementById('group-btn');
    const individualBtn = document.getElementById('individual-btn');
    const pricingSlider = document.getElementById('pricing-tab-slider');
    const individualPanel = document.getElementById('individual-pricing-panel');
    const groupPanel = document.getElementById('group-pricing-panel');

    function updatePricingSlider(activeButton) {
        if (!activeButton || !pricingSlider) return;
        pricingSlider.style.width = `${activeButton.offsetWidth}px`;
        pricingSlider.style.left = `${activeButton.offsetLeft}px`;
    }

    function showPricing(isIndividual) {
        if (isIndividual) {
            individualPanel.classList.remove('hidden');
            groupPanel.classList.add('hidden');
            individualBtn.classList.add('text-white');
            individualBtn.classList.remove('text-gray-600');
            groupBtn.classList.remove('text-white');
            groupBtn.classList.add('text-gray-600');
            updatePricingSlider(individualBtn);
        } else {
            groupPanel.classList.remove('hidden');
            individualPanel.classList.add('hidden');
            groupBtn.classList.add('text-white');
            groupBtn.classList.remove('text-gray-600');
            individualBtn.classList.remove('text-white');
            individualBtn.classList.add('text-gray-600');
            updatePricingSlider(groupBtn);
        }
    }

    individualBtn.addEventListener('click', () => showPricing(true));
    groupBtn.addEventListener('click', () => showPricing(false));

    // Initial Load for Pricing
    showPricing(false); // Default to group

    // Fade-in animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // Initial Load
    showPricing(false); // Default to group
    updateCarousel();
});

// FAQ Section Logic
const faqTabs = document.querySelectorAll('.faq-tab');
const faqSlider = document.getElementById('faq-tab-slider');
const faqPanels = document.querySelectorAll('.faq-panel');

function updateFaqSlider(activeTab) {
    if (!activeTab || !faqSlider) return;
    faqSlider.style.width = `${activeTab.offsetWidth}px`;
    faqSlider.style.left = `${activeTab.offsetLeft}px`;
}

faqTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        faqTabs.forEach(t => {
            t.classList.remove('text-white');
            t.classList.add('text-gray-600');
        });
        tab.classList.remove('text-gray-600');
        tab.classList.add('text-white');
        updateFaqSlider(tab);

        faqPanels.forEach(p => p.classList.add('hidden'));
        faqPanels[index].classList.remove('hidden');
    });
});

const initialFaqTab = document.querySelector('.faq-tab');
if (initialFaqTab) {
    initialFaqTab.classList.remove('text-gray-600');
    initialFaqTab.classList.add('text-white');
    updateFaqSlider(initialFaqTab);
}

// Accordion Logic
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const icon = button.querySelector('svg');

        answer.classList.toggle('open');
        
        if (answer.classList.contains('open')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    fadeInSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Immediately display statistics goal numbers
    document.querySelectorAll('.stat-number').forEach(counter => {
        counter.innerText = counter.getAttribute('data-goal');
    });
});