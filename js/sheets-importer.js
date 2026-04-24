/* ============================================ */
/* GOOGLE SHEETS IMPORTER - sheets-importer.js */
/* ============================================ */

/**
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet with these column headers:
 *    id, title, category, thumbnail, description, tools, mediaHTML
 * 2. Add your projects as rows in the sheet
 * 3. Share the sheet publicly (View access for anyone with link)
 * 4. Replace YOUR_SHEET_ID below with your actual Sheet ID (from the URL)
 * 5. Replace YOUR_SHEET_NAME with your sheet tab name (usually "Sheet1")
 * 
 * Your Sheet URL format: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
 * 
 * CSV Export URL will be:
 * https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_SHEET_GID
 * (gid is usually 0 for the first sheet)
 */

// =============================================
// CONFIGURATION - UPDATE THESE VALUES
// =============================================
const SHEET_CONFIG = {
    // Get this from the URL: https://docs.google.com/spreadsheets/d/[THIS_ID]/edit
    sheetId: '1P4nWsARGYGQ3JD_2ANegUYHq9F9kR1D_D9V0T-IkWn0',
    
    // Find this by right-clicking the sheet tab -> "Get sheet ID" or it's in the URL after #gid=
    sheetGid: '0',
    
    // Set to true to use Google Sheets as primary source
    // Set to false to use local projects array
    useGoogleSheets: false
};

/**
 * Fetches projects from Google Sheets
 * Returns a Promise that resolves to an array of project objects
 */
async function fetchProjectsFromSheets() {
    const { sheetId, sheetGid } = SHEET_CONFIG;
    
    // Validate configuration
    if (sheetId === 'YOUR_SHEET_ID') {
        console.warn('⚠️ Google Sheets not configured. Using local projects.');
        return null;
    }

    try {
        // Use CSV export URL for public access (no API key needed)
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${sheetGid}`;
        
        console.log('📥 Fetching projects from Google Sheets...');
        const response = await fetch(csvUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvText = await response.text();
        const projects = parseCSV(csvText);
        
        console.log(`✅ Successfully loaded ${projects.length} projects from Google Sheets`);
        return projects;

    } catch (error) {
        console.error('❌ Error fetching from Google Sheets:', error);
        console.warn('🔄 Falling back to local projects...');
        return null;
    }
}

/**
 * Parses CSV text into project objects
 * Expects headers: id, title, category, thumbnail, description, tools, mediaHTML
 */
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    
    if (lines.length < 2) {
        console.error('CSV is empty or only contains headers');
        return [];
    }

    // Parse headers
    const headers = parseCSVLine(lines[0]);
    
    // Map expected column names (case-insensitive)
    const headerMap = {};
    headers.forEach((header, index) => {
        headerMap[header.toLowerCase().trim()] = index;
    });

    // Validate required columns
    const requiredColumns = ['id', 'title', 'category', 'thumbnail', 'description', 'tools', 'mediahtml'];
    for (const col of requiredColumns) {
        if (!(col in headerMap)) {
            console.error(`❌ Missing required column: ${col}`);
            return [];
        }
    }

    // Parse data rows
    const projects = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue; // Skip empty lines

        const values = parseCSVLine(line);
        
        // Parse tools array from comma-separated string
        const toolsStr = values[headerMap['tools']] || '';
        const tools = toolsStr.split(',').map(t => t.trim()).filter(t => t);

        const project = {
            id: values[headerMap['id']].trim(),
            title: values[headerMap['title']].trim(),
            category: values[headerMap['category']].trim(),
            thumbnail: values[headerMap['thumbnail']].trim(),
            description: values[headerMap['description']].trim(),
            tools: tools,
            mediaHTML: values[headerMap['mediahtml']].trim()
        };

        if (project.id && project.title) { // Only add if has id and title
            projects.push(project);
        }
    }

    return projects;
}

/**
 * Simple CSV parser that handles quoted fields
 * Properly handles commas inside quotes
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
                // Escaped quote
                current += '"';
                i++; // Skip next quote
            } else {
                // Toggle quote state
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            // Field separator
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }

    // Add last field
    result.push(current);
    return result;
}

/**
 * Initialize projects - fetch from Sheets or use local fallback
 * This runs automatically on page load
 */
async function initializeProjects() {
    let projectsData = null;

    console.log('📋 initializeProjects called');

    // Try to fetch from Google Sheets if enabled
    if (SHEET_CONFIG.useGoogleSheets) {
        console.log('🌐 Google Sheets enabled, attempting to fetch...');
        projectsData = await fetchProjectsFromSheets();
    } else {
        console.log('⚙️ Google Sheets disabled in config');
    }

    // If Google Sheets failed or is disabled, use local projects
    if (!projectsData || projectsData.length === 0) {
        if (typeof PROJECTS !== 'undefined' && PROJECTS.length > 0) {
            console.log(`📦 Using ${PROJECTS.length} local projects`);
            projectsData = PROJECTS;
        } else {
            console.error('❌ No projects found! Configure Google Sheets or add local projects.');
            projectsData = [];
        }
    }

    // Replace global PROJECTS array with the loaded data
    window.PROJECTS = projectsData;
    console.log(`✅ PROJECTS array updated with ${projectsData.length} projects`);

    return projectsData;
}

// Don't auto-initialize here - let main.js handle it
// This just exports the initializeProjects function
