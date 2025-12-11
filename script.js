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

function renderCards(containerIndex, dataArray) {
    const containers = document.querySelectorAll('.tactic-container');
    const targetContainer = containers[containerIndex];
    
    // Total count of actual tactic cards
    const totalCount = dataArray.length;

    if (!targetContainer) return;

    // 1. Static Opening Folder
    let htmlContent = `
        <div class="version-card card0">
            <img src="Assets/Images/folder.png" class="bg-card">
            ${containerIndex === 0 ? '<img src="Assets/Images/Gemini_Generated_Image_f6yypef6yypef6yy.png" class="sticky-note">' : ''}
        </div>
    `;

    let xMove=0;
    let yMove=0;

    // 2. Dynamic Tactic Cards
    dataArray.forEach((tactic, i) => {
        xMove = i * 5; 
        yMove = i * -8;
        // z-layer decreases as we go out (3, 2, 1...)
        const zLayer = totalCount - i; 

        htmlContent += `
            <div class="version-card dynamic-card" 
                 style="--x-move: ${xMove}%; --y-move: ${yMove}%; --z-layer: ${zLayer};">
                 
                <img src="Assets/Images/longer_card.png" class="bg-card">
                <a href="#" class="cardThumbnail"><img src="${tactic.img}"></a>
                <h1 style="left: 11%;">${tactic.title}</h1>
                <p>${tactic.desc}</p>
                <a href="https://x.com/theSlashMethod/status/${tactic.threadId}" target="_blank" class="thread">See Full Thread</a>
                <a href="${tactic.download}" target="_blank" class="download-tactic">Download Tactic</a>
            </div>
        `;
    });

    // 3. Dynamic Closing Folder (The "Next" Index)
    // We calculate position as if this is the next item in the list
    const endX = xMove + 3; 
    const endY = yMove + 2;
    
    htmlContent += `
        <div class="version-card cardEnd dynamic-card" 
             style="--x-move: ${endX}%; --y-move: ${endY}%; --z-layer: 0;">
            <img src="Assets/Images/folder.png" class="bg-card">
        </div>
    `;

    targetContainer.innerHTML = htmlContent;
}

renderCards(0, tacticsData[1]);
renderCards(1, tacticsData[0]);

document.querySelectorAll('.tactic-container').forEach(container => {
    container.addEventListener('click', (e) => {
        // Find the clicked card
        const card = e.target.closest('.version-card');
        
        // Safety checks:
        // 1. Did we click a card?
        // 2. Did we click the download/thread button? (If so, don't toggle)
        if (!card || e.target.closest('.download-tactic') || e.target.closest('.thread')) return;

        // Capture current state
        const isAlreadyActive = card.classList.contains('active');

        // Close all siblings in this container
        container.querySelectorAll('.version-card').forEach(sibling => {
            sibling.classList.remove('active');
        });

        // Toggle the clicked one
        if (!isAlreadyActive) {
            card.classList.add('active');
        }
    });
});