/* ============================================ */
/* CONTENT UPDATER - content-updater.js         */
/* ============================================ */

/**
 * Update all content sections with data from CONTENT object
 * Populated by content-importer.js
 */

/**
 * Updates the Hero section with content from CONTENT.hero
 */
function updateHeroSection() {
    const heroContent = window.CONTENT?.hero;
    if (!heroContent || Object.keys(heroContent).length === 0) {
        console.log('ℹ️ No hero content to update');
        return;
    }

    console.log('🎨 Updating Hero section...');

    // Update subtitle
    if (heroContent.subtitle) {
        const subtitleEl = document.querySelector('[data-hero="subtitle"]');
        if (subtitleEl) subtitleEl.textContent = heroContent.subtitle;
    }

    // Update title line 1
    if (heroContent.title_line1) {
        const titleLine1El = document.querySelector('[data-hero="title-line1"]');
        if (titleLine1El) titleLine1El.textContent = heroContent.title_line1;
    }

    // Update title line 2
    if (heroContent.title_line2) {
        const titleLine2El = document.querySelector('[data-hero="title-line2"]');
        if (titleLine2El) titleLine2El.textContent = heroContent.title_line2;
    }

    // Update description
    if (heroContent.description) {
        const descEl = document.querySelector('[data-hero="description"]');
        if (descEl) descEl.textContent = heroContent.description;
    }
}

/**
 * Updates the About section with content from CONTENT.about
 */
function updateAboutSection() {
    const aboutContent = window.CONTENT?.about;
    if (!aboutContent || Object.keys(aboutContent).length === 0) {
        console.log('ℹ️ No about content to update');
        return;
    }

    console.log('🎨 Updating About section...');

    // Update profile image
    if (aboutContent.profile_image_url) {
        const imgEl = document.querySelector('[data-about="profile-image"]');
        if (imgEl) imgEl.src = aboutContent.profile_image_url;
    }

    // Update title
    if (aboutContent.title) {
        const titleEl = document.querySelector('[data-about="title"]');
        if (titleEl) titleEl.textContent = aboutContent.title;
    }

    // Update paragraph 1
    if (aboutContent.paragraph1) {
        const para1El = document.querySelector('[data-about="paragraph1"]');
        if (para1El) para1El.textContent = aboutContent.paragraph1;
    }

    // Update paragraph 2
    if (aboutContent.paragraph2) {
        const para2El = document.querySelector('[data-about="paragraph2"]');
        if (para2El) para2El.textContent = aboutContent.paragraph2;
    }

    // Update skills
    if (aboutContent.skills) {
        const skillsContainer = document.querySelector('[data-about="skills"]');
        if (skillsContainer) {
            skillsContainer.innerHTML = '';
            const skills = aboutContent.skills.split(',').map(s => s.trim()).filter(s => s);
            skills.forEach(skill => {
                const skillEl = document.createElement('span');
                skillEl.className = 'border border-white/20 px-4 py-2 rounded-full text-sm font-medium';
                skillEl.textContent = skill;
                skillsContainer.appendChild(skillEl);
            });
        }
    }
}

/**
 * Updates the Contact section with content from CONTENT.contact
 */
function updateContactSection() {
    const contactContent = window.CONTENT?.contact;
    if (!contactContent || Object.keys(contactContent).length === 0) {
        console.log('ℹ️ No contact content to update');
        return;
    }

    console.log('🎨 Updating Contact section...');

    // Update title
    if (contactContent.title) {
        const titleEl = document.querySelector('[data-contact="title"]');
        if (titleEl) titleEl.textContent = contactContent.title;
    }

    // Update email
    if (contactContent.email) {
        const emailEl = document.querySelector('[data-contact="email"]');
        if (emailEl) {
            emailEl.textContent = contactContent.email;
            emailEl.href = `mailto:${contactContent.email}`;
        }
    }

    // Update social links
    const socialLinks = {
        instagram: contactContent.instagram_url,
        vimeo: contactContent.vimeo_url,
        linkedin: contactContent.linkedin_url
    };

    for (const [platform, url] of Object.entries(socialLinks)) {
        if (url) {
            const linkEl = document.querySelector(`[data-contact="${platform}"]`);
            if (linkEl) linkEl.href = url;
        }
    }
}

/**
 * Update all content sections from window.CONTENT
 */
async function updateAllContent() {
    updateHeroSection();
    updateAboutSection();
    updateContactSection();

    console.log('✅ All content sections updated!');
}
