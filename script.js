const hero = document.querySelector('.hero');

window.addEventListener("scroll", () => {
    const scrollRange = document.querySelector('.hero-scroll-area').offsetHeight - window.innerHeight;
    const percent = Math.min(window.scrollY / scrollRange, 1); // stops exactly at end

    const move = percent * (hero.scrollWidth - window.innerWidth); // full image travel
    hero.style.transform = `translateX(${-move}px)`;
});
