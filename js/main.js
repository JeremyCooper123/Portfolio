/* ============================================ */
/* MAIN JAVASCRIPT - main.js                  */
/* ============================================ */

// ---------------------------------------------------------
// 1. RENDER PROJECTS TO GRID
// ---------------------------------------------------------
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    
    PROJECTS.forEach((proj, index) => {
        const offsetClass = index % 2 !== 0 ? 'md:mt-16' : '';
        
        const cardHTML = `
            <div class="project-card cursor-pointer group hover-target reveal ${offsetClass}" onclick="openModal('${proj.id}')">
                <div class="project-img-wrapper rounded-sm mb-6 aspect-[4/3] bg-white/5">
                    <img src="${proj.thumbnail}" alt="${proj.title}" class="project-img w-full h-full object-cover">
                </div>
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-display font-bold text-2xl group-hover:text-accent transition-colors">${proj.title}</h3>
                        <p class="text-textMuted text-sm mt-2">${proj.category}</p>
                    </div>
                    <div class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });

    // Observe new elements for scroll reveal
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// ---------------------------------------------------------
// 2. MODAL LOGIC
// ---------------------------------------------------------
const modal = document.getElementById('project-modal');
const mTitle = document.getElementById('modal-title');
const mCat = document.getElementById('modal-category');
const mDesc = document.getElementById('modal-desc');
const mTools = document.getElementById('modal-tools');
const mMedia = document.getElementById('modal-media-container');

function openModal(projectId) {
    const proj = PROJECTS.find(p => p.id === projectId);
    if (!proj) return;

    mTitle.innerText = proj.title;
    mCat.innerText = proj.category;
    mDesc.innerText = proj.description;
    mMedia.innerHTML = proj.mediaHTML;
    
    mTools.innerHTML = '';
    proj.tools.forEach(tool => {
        mTools.innerHTML += `<span class="bg-white/10 px-3 py-1 rounded text-xs text-white">${tool}</span>`;
    });

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    
    setTimeout(() => {
        mMedia.innerHTML = ''; 
    }, 500);
}

// ---------------------------------------------------------
// 3. CUSTOM CURSOR LOGIC
// ---------------------------------------------------------
function initializeCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateCursor() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// ---------------------------------------------------------
// 4. SCROLL REVEAL ANIMATIONS
// ---------------------------------------------------------
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function initializeScrollReveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// ---------------------------------------------------------
// 5. INITIALIZE LOTTIE ANIMATIONS
// ---------------------------------------------------------
function initializeLottie() {
    const lottieContainers = document.querySelectorAll('[data-lottie-url]');
    lottieContainers.forEach(container => {
        const url = container.getAttribute('data-lottie-url');
        lottie.loadAnimation({
            container: container, 
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: url 
        });
    });
}

// ---------------------------------------------------------
// 6. INITIALIZATION ON DOM READY
// ---------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    initializeCursor();
    initializeScrollReveal();
    initializeLottie();
});
