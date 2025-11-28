const hero = document.querySelector('.hero');

window.addEventListener("scroll", () => {
    const scrollRange = document.querySelector('.hero-scroll-area').offsetHeight - window.innerHeight;
    const percent = Math.min(window.scrollY / scrollRange, 1); // stops exactly at end

    const move = percent * (hero.scrollWidth - window.innerWidth); // full image travel
    hero.style.transform = `translateX(${-move}px)`;
});


/* 🔥 Version Carousel Controller */
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