# Google Sheets Integration Setup Guide

## Overview
Your portfolio can now pull project data directly from a Google Sheet! This means you can add new projects without touching any code—just add a row to your spreadsheet.

## Step-by-Step Setup

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Portfolio Projects"
4. Create these column headers in the first row:
   ```
   id | title | category | thumbnail | description | tools | mediaHTML
   ```

**Example columns in detail:**
- **id**: Unique identifier (e.g., `p1`, `p2`, `project-neon`)
- **title**: Project name (e.g., `Neon Echoes`)
- **category**: Type/category (e.g., `Brand Campaign / 3D`)
- **thumbnail**: Image URL for the grid (use public image URLs)
- **description**: Full project description
- **tools**: Comma-separated list of tools (e.g., `Cinema 4D, Octane Render, Premiere Pro`)
- **mediaHTML**: HTML for the modal display (see examples below)

### 2. Add Your Projects

Add one project per row. For example:

| id | title | category | thumbnail | description | tools | mediaHTML |
|----|-------|----------|-----------|-------------|-------|-----------|
| p1 | Neon Echoes | Brand Campaign / 3D | `https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1600&auto=format&fit=crop` | A conceptual 3D animation... | Cinema 4D, Octane Render, Premiere Pro | `<img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop" class="w-full h-full object-cover">` |

**Tips for mediaHTML column:**

For **images**:
```html
<img src="YOUR_IMAGE_URL" class="w-full h-full object-cover">
```

For **Vimeo videos** (replace VIDEO_ID):
```html
<iframe src="https://player.vimeo.com/video/VIDEO_ID" class="w-full h-full" allow="autoplay; fullscreen"></iframe>
```

For **YouTube videos** (replace VIDEO_ID):
```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID" class="w-full h-full"></iframe>
```

For **Self-hosted videos**:
```html
<video autoplay loop muted playsinline class="w-full"><source src="YOUR_VIDEO_URL.mp4" type="video/mp4"></video>
```

### 3. Share the Sheet Publicly

1. Click the **Share** button (top right)
2. Click **Change to anyone with the link** and select **Viewer**
3. Copy the share link (you'll need the sheet ID from the URL)

### 4. Get Your Sheet ID and GID

Your Google Sheet URL looks like:
```
https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit#gid=[SHEET_GID]
```

- **SHEET_ID**: The long string of characters between `/d/` and `/edit`
- **SHEET_GID**: Usually `0` for the first sheet tab, but you can find it after `#gid=` in the URL

### 5. Configure Your Portfolio

Open `js/sheets-importer.js` and update the configuration:

```javascript
const SHEET_CONFIG = {
    sheetId: 'YOUR_SHEET_ID',  // Replace with your actual Sheet ID
    sheetGid: '0',              // Usually 0 for first sheet
    useGoogleSheets: true       // Set to true to use Google Sheets
};
```

**Example:**
```javascript
const SHEET_CONFIG = {
    sheetId: '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s',
    sheetGid: '0',
    useGoogleSheets: true
};
```

### 6. Test It!

1. Save your changes to `js/sheets-importer.js`
2. Refresh your portfolio website
3. Open the browser console (F12 → Console tab)
4. You should see:
   - ✅ `📥 Fetching projects from Google Sheets...`
   - ✅ `✅ Successfully loaded X projects from Google Sheets`

If something goes wrong, check the error messages in the console.

## Troubleshooting

### "❌ Error fetching from Google Sheets"

**Possible causes:**
- Sheet ID or GID is incorrect
- Sheet is not shared publicly (View access)
- Sheet URL is not accessible

**Solution:**
1. Double-check your Sheet ID and GID
2. Make sure the sheet is shared with "Viewer" access to anyone with the link
3. Test by opening the share link in an incognito window

### Projects aren't loading

**Possible causes:**
- `useGoogleSheets` is set to `false` (it won't try to fetch)
- Sheet is empty or has no projects with `id` and `title`
- CSV format issue

**Solution:**
1. Make sure `useGoogleSheets: true` is set
2. Check that all projects have at least an `id` and `title`
3. Check the browser console for detailed error messages

### Sheet works but falls back to local projects

This is normal if:
- `useGoogleSheets: false` (set it to `true`)
- The Google Sheet fetch fails (check console for errors)

The system automatically falls back to local projects in `js/projects.js` if Google Sheets isn't available.

## Switching Between Google Sheets and Local Projects

To use **Google Sheets**:
```javascript
useGoogleSheets: true
```

To use **local projects** (from `js/projects.js`):
```javascript
useGoogleSheets: false
```

The local projects serve as a backup and are great for:
- Offline testing
- Quick prototyping
- Fallback if Google Sheets is unavailable

## CSV Format Tips

The script parses CSV format, which means:
- Commas in cell values must be inside quotes: `"Cinema 4D, After Effects"`
- Quote marks inside quoted fields must be escaped: `"He said ""hello"""`
- Empty cells are fine, but `id` and `title` are required

**Google Sheets automatically handles this** when you export to CSV, so you don't need to worry!

## Adding Columns

If you want to add custom columns:
1. Add them to your Google Sheet
2. They won't break anything—the script only looks for the required columns
3. If you need to use them in the code, modify `sheets-importer.js` to parse them

## Performance Notes

- Projects are fetched once when the page loads
- There's no caching, so each page refresh fetches fresh data
- For large sheets (100+ projects), it might take a second to load

## Questions?

If something doesn't work:
1. Check the browser console (F12)
2. Look for error messages
3. Review this guide's Troubleshooting section
4. Make sure all configuration values are correct
