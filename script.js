const hero = document.querySelector('.hero');
const scrollArea = document.querySelector('.hero-scroll-area');

window.addEventListener("scroll", () => {
    // Only calculate if the hero area is actually visible/active to save performance
    if (window.scrollY < scrollArea.offsetHeight) {
        const scrollRange = scrollArea.offsetHeight - window.innerHeight;
        const percent = Math.min(window.scrollY / scrollRange, 1);
        
        // Calculate movement
        const move = percent * (hero.scrollWidth - window.innerWidth);
        hero.style.transform = `translateX(${-move}px)`;
    }
});

/* Version Carousel Controller */
const slider = document.querySelector('.version-slider');
let index = 0;

document.querySelector('.next').onclick = () => {
    index = (index + 1) % 2;
    slider.style.transform = `translateX(-${index*100}vw)`;
};

document.querySelector('.prev').onclick = () => {
    index = (index - 1 + 2) % 2;
    slider.style.transform = `translateX(-${index*100}vw)`;
};

/* Version Card Toggle Handler */
const cards = document.querySelectorAll('.version-card');

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Optional: Ignore clicks on the 'Download' button so it doesn't close the card immediately
        if (e.target.closest('.download-tactic')) return;

        // 1. Capture the state BEFORE we make changes
        const isAlreadyActive = card.classList.contains('active');

        // 2. Reset ALL cards in this container (Close everything)
        const container = card.closest('.tactic-container');
        const siblings = container.querySelectorAll('.version-card');
        siblings.forEach(sibling => sibling.classList.remove('active'));

        // 3. If it was NOT active before, open it now.
        // (If it WAS active, we skip this step, so it stays closed)
        if (!isAlreadyActive) {
            card.classList.add('active');
        }
    });
});