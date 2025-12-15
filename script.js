/* --- HERO SCROLL EFFECT (GSAP Mobile Implementation) --- */
gsap.registerPlugin(ScrollTrigger);


// Initialize ScrollTrigger logic
ScrollTrigger.matchMedia({
    
    // MOBILE ONLY (max-width: 800px)
    "(max-width: 800px)": function() {
        const hero = document.querySelector('.hero');
        const scrollArea = document.querySelector('.hero-scroll-area');

        // This creates the pinning and horizontal movement
        gsap.to(hero, {
            x: () => -(hero.scrollWidth - window.innerWidth), // Move left by the excess width
            ease: "none",
            scrollTrigger: {
                trigger: scrollArea,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                pin: true,    
                invalidateOnRefresh: true 
            }
        });
    },
});

/* --- DESKTOP MANUAL FALLBACK (Your original code, wrapped to only run > 800px) --- */
if (window.matchMedia("(min-width: 801px)").matches) {
    const hero = document.querySelector('.hero');
    const scrollArea = document.querySelector('.hero-scroll-area');
    let isTicking = false;

    window.addEventListener("scroll", () => {
        // Only run this logic on desktop
        if (window.innerWidth > 800) { 
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY < scrollArea.offsetHeight) {
                        const scrollRange = scrollArea.offsetHeight - window.innerHeight;
                        const percent = Math.max(0, Math.min(window.scrollY / scrollRange, 1));
                        const move = percent * (hero.scrollWidth - window.innerWidth);
                        hero.style.transform = `translate3d(${-move}px, 0, 0)`;
                    }
                    isTicking = false;
                });
                isTicking = true;
            }
        }
    });
}



/* --- VERSION SLIDER LOGIC --- */
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

// Data Array: Index 0 = FM24, Index 1 = FM26
const tacticsData = [
    [ // FM24 Tactics (Index 0)
        { 
            title: 'The Pep Manual', 
            desc: 'From Barcelona to Bayern to Manchester City, Pep Guardiola has reinvented the game at every stop.', 
            img: 'https://pbs.twimg.com/media/G0j2jbMXEAAJSF8?format=jpg&name=medium', 
            download: 'https://drive.google.com/drive/folders/1HrA4Z0e4OO3Plrv0z-6kGJp71l3D8ryG?usp=sharing', 
            threadId: '1966092431847281118'
        },
        { 
            title: 'Unai Emery UEL', 
            desc: 'A tactical thread analyzing how Unai Emery won all four of his UEFA Europa League titles.', 
            img: 'https://pbs.twimg.com/media/GxlgE5XXQAAme_m?format=jpg&name=medium', 
            download: 'https://drive.google.com/drive/folders/1a3BgCExO9XOD14DDAHD2YFiTJg3-MTjM?usp=drive_link', 
            threadId: '1952697947809853633'
        },
        { 
            title: 'The Special One', 
            desc: 'A tactical thread breaking down José Mourinho’s systems across his career from Porto to Fenerbahçe.', 
            img: 'https://pbs.twimg.com/media/Gw8XPq2WIAAt8Gt?format=jpg&name=medium', 
            download: 'https://drive.google.com/drive/folders/1NFHq_fgzdTXaJ6xW_d1fRrQOp0z9vcGk?usp=drive_link', 
            threadId: '1949802748318228617'
        },
        { 
            title: 'Antonio Conte', 
            desc: 'A deep dive into Antonio Conte\'s title-winning systems, focusing on wing-back dominance.', 
            img: 'https://pbs.twimg.com/media/GwTYSFqW4AAo6Vr?format=jpg&name=medium', 
            download: 'https://drive.google.com/drive/folders/1RN4MYs4otbJwL8N0xuZUKDt_XQwMq62n?usp=drive_link', 
            threadId: '1946918932557816163'
        },
        {   title: "Simeone's 24/25", 
            desc: "A tactical deep dive into Diego Simeone's 2024-25 Atletico Madrid setup", 
            img: 'https://pbs.twimg.com/media/GuXgMkyXYAAepsG?format=jpg&name=medium', 
            download: 'https://drive.google.com/drive/folders/1pBkAFpjFREI9ocYy01BgviZGsg0cEAl7?usp=drive_link', 
            threadId: '1938201780695011836'
        }, 
        {   title: "Alonso's Madrid", 
            desc: "A tactical thread analyzing the possible systems Xabi Alonso could deploy at Real Madrid.", 
            img: 'https://pbs.twimg.com/media/GsmI13LXIAA0yCy?format=jpg&name=medium', 
            download: 'https://drive.google.com/drive/folders/1KHFyzwyBWE6pzv79U8t4aWfYnSETKIQJ?usp=drive_link', 
            threadId: '1930224448084328488'
        },
        {   title: "Uruguay 1950WC", 
            desc: "A historical thread analyzing Uruguay’s shocking 1950 World Cup triumph over Brazil.", 
            img: 'https://pbs.twimg.com/media/Gtj7g4LXsAANixz?format=jpg&name=medium',
            download: 'https://drive.google.com/drive/folders/1zTxsLXBfji4wPqhv4x9swIn967-YEehL?usp=drive_link', 
            threadId: '1934572652225511464'
        }
    ],
    [ // FM26 Tactics (Index 1)
        { 
            title: "Arteta's Arsenal", 
            desc: "How Mikel Arteta has transformed Arsenal into one of the most fluid, intelligent, and structurally dominant teams in Europe.", 
            img: 'https://pbs.twimg.com/media/G6wdRufaQAAHPws?format=jpg&name=medium', 
            download: 'https://drive.google.com/drive/folders/1KxcZi9KmNTlb-zEEcel8FgM9CVKYkzBJ?usp=sharing', 
            threadId: '1994000969001304158'
        },
        { 
            title: "Kompany's FCB", 
            desc: "This analysis explores his innovative 4-2-3-1 that morphs into fluid structures.", 
            img: 'https://pbs.twimg.com/media/G5ZL3nDbIAAkjrx?format=jpg&name=medium', 
            download: 'https://drive.google.com/drive/folders/1i1YQraofQ5J8n2VUmDn1MnpZHWRweYcw?usp=sharing', 
            threadId: '1987859799141396769'
        },
        { 
            title: "Romeu's Barca", 
            desc: "A detailed tactical breakdown of FC Barcelona Femení under Pere Romeu, how he preserved Juego de Posición", 
            img: 'https://i.postimg.cc/mZyVMDL7/FM-Tactics.png', 
            download: 'https://drive.google.com/drive/folders/12kdpSKzYmIurJjw3skPiAKDWrnpyNHH6?usp=drive_link', 
            threadId: '1982018806009479343'
        }
    ]
];

/* --- REPLACE THE renderCards FUNCTION IN script.js --- */

function renderCards(containerIndex, dataArray) {
    const containers = document.querySelectorAll('.tactic-container');
    const targetContainer = containers[containerIndex];
    if (!targetContainer) return;

    // CONFIGURATION
    const xStep = 25;      
    const yStep = -18;     
    
    const totalCount = dataArray.length;
    const totalStackWidth = (totalCount - 1) * xStep;
    const totalStackHeight = (totalCount - 1) * yStep;
    
    // 1. Calculate Start Positions (Top of stack)
    const startX = -(totalStackWidth / 2);
    const startY = -(totalStackHeight / 2);

    // 2. Calculate End Positions (Bottom of stack)
    // This places the back cover exactly aligned with the last card in the sequence
    const endX = startX + ((totalCount - 1) * xStep);
    const endY = startY + ((totalCount - 1) * yStep);

    let htmlContent = '';

    htmlContent += `
        <div class="version-card cardEnd" 
             style="--x-move: ${endX}px; --y-move: ${endY + 15}px; --z-pos: -60px; z-index: 0; pointer-events: none;">
            <img src="Assets/Images/folder.png" class="bg-card"> 
        </div>
    `;

    dataArray.forEach((tactic, i) => {
        const xPos = startX + (i * xStep);
        const yPos = startY + (i * yStep);
        const zIndex = 10 + (totalCount - i); 

        htmlContent += `
            <div class="version-card dynamic-card" 
                 style="--x-move: ${xPos}px; --y-move: ${yPos}px; --z-pos: ${i * 5}px; z-index: ${zIndex};">
                <img src="Assets/Images/cover.png" class="plastic-cover">
                <img src="Assets/Images/longer_card.png" class="bg-card">
                
                <div class="cardThumbnail">
                     <img src="${tactic.img}" style="width:100%; height:auto;">
                </div>
                
                <h1>${tactic.title}</h1>
                <p>${tactic.desc}</p>
                
                <a href="https://x.com/theSlashMethod/status/${tactic.threadId}" target="_blank" class="thread"> See Full Thread</a>
                <a href="${tactic.download}" target="_blank" class="download-tactic">Download Tactic</a>
            </div>
        `;
    });

    htmlContent += `
         <div class="version-card card0" 
              style="--x-move: ${startX}px; --y-move: ${startY + 30}px; --z-pos: 50px;">
             <img src="Assets/Images/folder.png" class="bg-card">
             ${containerIndex === 0 ? '<img src="Assets/Images/Gemini_Generated_Image_f6yypef6yypef6yy.png" class="sticky-note">' : ''}
         </div>
    // `;

    targetContainer.innerHTML = htmlContent;
}

// Initial Render
renderCards(0, tacticsData[1]);
renderCards(1, tacticsData[0]);

// Event Listeners for Interaction
document.querySelectorAll('.tactic-container').forEach(container => {
    container.addEventListener('click', (e) => {
        const card = e.target.closest('.version-card');
        
        // Ignore clicks on buttons or background folder
        if (!card || card.classList.contains('card0') || e.target.closest('a')) return;

        const isActive = card.classList.contains('active');

        // Reset all cards in this container
        container.querySelectorAll('.version-card').forEach(c => c.classList.remove('active'));

        // Activate the clicked one (if it wasn't already active)
        if (!isActive) {
            card.classList.add('active');
        }
    });
});

/* --- SWIPE SUPPORT --- */
const touchZone = document.querySelector('.version');
let touchStartX = 0;
let touchEndX = 0;

touchZone.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

touchZone.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, {passive: true});

function handleSwipe() {
    const threshold = 50; 
    
    if (touchEndX < touchStartX - threshold) {
        // Swiped Left -> Go Next
        document.querySelector('.next').click();
    }
    
    if (touchEndX > touchStartX + threshold) {
        // Swiped Right -> Go Prev
        document.querySelector('.prev').click();
    }
}