/* ============================================ */
/* CONTENT IMPORTER - content-importer.js       */
/* ============================================ */

/**
 * SETUP INSTRUCTIONS:
 * 
 * In your Google Sheet, create sheets with this structure:
 * 
 * 1. "Projects" sheet with columns:
 *    - id, title, category, thumbnail, description, tools, mediaHTML
 * 
 * 2. "Hero" sheet with columns:
 *    - subtitle, title_line1, title_line2, description
 * 
 * 3. "About" sheet with columns:
 *    - profile_image_url, title, paragraph1, paragraph2, skills
 * 
 * 4. "Contact" sheet with columns:
 *    - title, email, instagram_url, vimeo_url, linkedin_url
 */

// =============================================
// CONTENT CONFIGURATION
// =============================================
const CONTENT_CONFIG = {
    // Your Google Sheet ID (same for all sheets)
    sheetId: '1P4nWsARGYGQ3JD_2ANegUYHq9F9kR1D_D9V0T-IkWn0',
    
    // Sheet GIDs for each section
    sheets: {
        projects: '0',           // Projects sheet GID
        hero: '1415991203',      // Change this to your Hero sheet GID
        about: '1536148453',     // Change this to your About sheet GID
        contact: '1848670549'    // Change this to your Contact sheet GID
    },
    
    // Set to true to use Google Sheets as primary source
    useGoogleSheets: true
};

/**
 * Fetch a sheet as CSV
 */
async function fetchSheetData(sheetGid) {
    const { sheetId } = CONTENT_CONFIG;
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${sheetGid}`;
    
    try {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const csvText = await response.text();
        return csvText;
    } catch (error) {
        console.error(`❌ Error fetching sheet ${sheetGid}:`, error);
        return null;
    }
}

/**
 * Parse CSV text into objects
 */
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    
    if (lines.length < 2) {
        console.warn('CSV is empty or only contains headers');
        return [];
    }

    const headers = parseCSVLine(lines[0]);
    const results = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const values = parseCSVLine(line);
        const row = {};
        
        headers.forEach((header, index) => {
            row[header.toLowerCase().trim()] = values[index] ? values[index].trim() : '';
        });

        results.push(row);
    }

    return results;
}

/**
 * Parse a single CSV line, handling quoted fields
 */
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (insideQuotes && nextChar === '"') {
                current += '"';
                i++;
            } else {
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current);
    return result;
}

/**
 * Fetch and parse projects from Google Sheets
 */
async function fetchProjects() {
    try {
        const csvText = await fetchSheetData(CONTENT_CONFIG.sheets.projects);
        if (!csvText) return null;

        const rows = parseCSV(csvText);
        const projects = rows.map(row => ({
            id: row.id || '',
            title: row.title || '',
            category: row.category || '',
            thumbnail: row.thumbnail || '',
            description: row.description || '',
            tools: (row.tools || '').split(',').map(t => t.trim()).filter(t => t),
            mediaHTML: row.mediahtml || ''
        })).filter(p => p.id && p.title);

        console.log(`✅ Successfully loaded ${projects.length} projects from Google Sheets`);
        return projects;
    } catch (error) {
        console.error('❌ Error fetching projects:', error);
        return null;
    }
}

/**
 * Fetch Hero section data (first row only)
 */
async function fetchHero() {
    try {
        const csvText = await fetchSheetData(CONTENT_CONFIG.sheets.hero);
        if (!csvText) return null;

        const rows = parseCSV(csvText);
        if (rows.length === 0) return null;

        console.log('✅ Hero section loaded');
        return rows[0];
    } catch (error) {
        console.error('❌ Error fetching hero:', error);
        return null;
    }
}

/**
 * Fetch About section data (first row only)
 */
async function fetchAbout() {
    try {
        const csvText = await fetchSheetData(CONTENT_CONFIG.sheets.about);
        if (!csvText) return null;

        const rows = parseCSV(csvText);
        if (rows.length === 0) return null;

        console.log('✅ About section loaded');
        return rows[0];
    } catch (error) {
        console.error('❌ Error fetching about:', error);
        return null;
    }
}

/**
 * Fetch Contact section data (first row only)
 */
async function fetchContact() {
    try {
        const csvText = await fetchSheetData(CONTENT_CONFIG.sheets.contact);
        if (!csvText) return null;

        const rows = parseCSV(csvText);
        if (rows.length === 0) return null;

        console.log('✅ Contact section loaded');
        return rows[0];
    } catch (error) {
        console.error('❌ Error fetching contact:', error);
        return null;
    }
}

/**
 * Initialize all content from Google Sheets
 */
async function initializeAllContent() {
    if (!CONTENT_CONFIG.useGoogleSheets) {
        console.log('📦 Google Sheets disabled. Using local data.');
        return {
            projects: null,
            hero: null,
            about: null,
            contact: null
        };
    }

    console.log('📥 Fetching all content from Google Sheets...');

    const [projectsData, heroData, aboutData, contactData] = await Promise.all([
        fetchProjects(),
        fetchHero(),
        fetchAbout(),
        fetchContact()
    ]);

    window.CONTENT = {
        projects: projectsData,
        hero: heroData || {},
        about: aboutData || {},
        contact: contactData || {}
    };

    return window.CONTENT;
}
