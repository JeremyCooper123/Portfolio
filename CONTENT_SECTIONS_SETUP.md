# ⚠️ DEPRECATED - See GOOGLE_SHEETS_INTEGRATION.md

**This documentation is outdated. Use [GOOGLE_SHEETS_INTEGRATION.md](GOOGLE_SHEETS_INTEGRATION.md) instead.**

This file describes the old setup for content sections. Everything is now consolidated in the main integration guide.

---

# Content Sections Setup (Old - Deprecated)

Your portfolio can now pull content for the Hero, About, and Contact sections directly from Google Sheets! This allows you to update text, links, and images without touching any code.

## Overview

You'll create **three separate sheets/tabs** in your Google Sheet:

1. **Hero Sheet** - Top banner section with title and description
2. **About Sheet** - About me section with biography and skills
3. **Contact Sheet** - Contact section with email and social links

## Setup Steps

### 1. Create Three New Sheets in Your Google Sheet

In your existing Google Sheet (where your projects are), add three new tabs:

1. Right-click on a sheet tab → "Insert 1 below"
2. Name them: `Hero`, `About`, `Contact`

### 2. Set Up Hero Sheet

Create a sheet named **"Hero"** with one row of data containing:

| subtitle | title_line1 | title_line2 | description |
|----------|-------------|-------------|------------|
| Portfolio 2026 | MOTION | DESIGNER | I breathe life into static pixels. Specializing in 3D animation, kinetic typography, and visual storytelling. |

**Column Details:**
- **subtitle**: Small text above the main title (e.g., "Portfolio 2026")
- **title_line1**: First line of large title (e.g., "MOTION")
- **title_line2**: Second line of title (will have text-stroke effect) (e.g., "DESIGNER")
- **description**: Description paragraph below the title

### 3. Set Up About Sheet

Create a sheet named **"About"** with one row containing:

| profile_image_url | title | paragraph1 | paragraph2 | skills |
|-------------------|-------|-----------|-----------|--------|
| https://images.unsplash.com/... | About Me. | I'm a freelance motion designer... | My toolkit includes Cinema 4D... | Cinema 4D, After Effects, Houdini, Figma |

**Column Details:**
- **profile_image_url**: Full URL to your profile/about image
- **title**: Section title (e.g., "About Me.")
- **paragraph1**: First paragraph of your bio
- **paragraph2**: Second paragraph of your bio
- **skills**: Comma-separated list of skills/tools (will auto-format as buttons)

### 4. Set Up Contact Sheet

Create a sheet named **"Contact"** with one row containing:

| title | email | instagram_url | vimeo_url | linkedin_url |
|-------|-------|---------------|-----------|--------------|
| LET'S TALK | hello@yourdomain.com | https://instagram.com/yourprofile | https://vimeo.com/yourprofile | https://linkedin.com/in/yourprofile |

**Column Details:**
- **title**: Section heading (usually "LET'S TALK" or similar)
- **email**: Your email address (will create mailto: link)
- **instagram_url**: Full URL to your Instagram profile
- **vimeo_url**: Full URL to your Vimeo profile
- **linkedin_url**: Full URL to your LinkedIn profile

## Enable Google Sheets Content Loading

### 1. Get Your Sheet GIDs

For each new sheet, you need its GID (sheet ID):

1. Right-click on the sheet tab
2. Select "Get sheet ID"
3. Copy the number shown

**Or** find GIDs in the URL after `#gid=`:
- `https://docs.google.com/spreadsheets/d/SHEET_ID/edit#gid=1234567890`
- The GID is `1234567890`

### 2. Update content-importer.js

Open `js/content-importer.js` and update the configuration:

```javascript
const CONTENT_CONFIG = {
    // Same Google Sheet ID where your projects are
    sheetId: '1P4nWsARGYGQ3JD_2ANegUYHq9F9kR1D_D9V0T-IkWn0',
    
    // Sheet GIDs for each section
    sheets: {
        hero: '1234567890',      // Your Hero sheet GID
        about: '1234567891',     // Your About sheet GID
        contact: '1234567892'    // Your Contact sheet GID
    },
    
    // Set to true to use Google Sheets for content
    useGoogleSheets: true  // Change to true!
};
```

**Example with real IDs:**
```javascript
const CONTENT_CONFIG = {
    sheetId: '1P4nWsARGYGQ3JD_2ANegUYHq9F9kR1D_D9V0T-IkWn0',
    sheets: {
        hero: '0',           // First sheet is usually 0
        about: '123456789',  // Hero sheet GID
        contact: '987654321' // About sheet GID
    },
    useGoogleSheets: true
};
```

## Testing

1. Save your changes to `js/content-importer.js`
2. Refresh your portfolio website
3. Open the browser console (F12 → Console)
4. Look for messages like:
   - ✅ Hero section loaded
   - ✅ About section loaded
   - ✅ Contact section loaded

If it says "No content to update", check:
- Are the sheet GIDs correct?
- Do the sheets have headers in the first row?
- Do the sheets have at least one data row?
- Is the sheet shared publicly?

## Column Names (Important!)

Make sure your column headers **exactly match** these names (case-insensitive):

### Hero Sheet
- `subtitle`
- `title_line1`
- `title_line2`
- `description`

### About Sheet
- `profile_image_url`
- `title`
- `paragraph1`
- `paragraph2`
- `skills`

### Contact Sheet
- `title`
- `email`
- `instagram_url`
- `vimeo_url`
- `linkedin_url`

## Fallback Behavior

If Google Sheets isn't enabled or fails to load:
- The website uses **default values** from index.html
- No errors are shown to users
- Everything works normally!

## Switching Between Google Sheets and Default

**To use Google Sheets content:**
```javascript
useGoogleSheets: true
```

**To use default values (from HTML):**
```javascript
useGoogleSheets: false
```

## Troubleshooting

### "No content to update" in console
- Check that `useGoogleSheets: true`
- Verify sheet GIDs are correct
- Make sure sheets have headers AND at least one data row
- Check that sheets are shared publicly

### Content doesn't change when I edit the sheet
- Refresh your browser (Ctrl+F5 or Cmd+Shift+R for hard refresh)
- Content is fetched fresh on each page load

### Some content updates but not all
- Check that all required column headers are present
- Make sure column names exactly match (case-insensitive)
- Some sections might use default values if their columns are missing

## Advanced: Adding More Content Sections

To add more dynamic sections (like Services, Testimonials, etc.):

1. Create a new sheet with your content
2. Get its GID
3. Add it to `CONTENT_CONFIG.sheets` in content-importer.js
4. Call `fetchSheetData()` in `initializeContent()`
5. Create update function in content-updater.js
6. Add `data-*` attributes to HTML elements
7. Call the update function from `updateAllContent()`

## Questions?

Check the console for detailed error messages - they'll tell you exactly what's wrong!
