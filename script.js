window.addEventListener("scroll", () => {
    let scrollMax = document.body.scrollHeight - window.innerHeight;
    let scrollPercent = window.scrollY / scrollMax;  

    let move = scrollPercent * (window.innerWidth); // how far to slide

    document.querySelector(".hero").style.transform = `translateX(${-move}px)`;
});
