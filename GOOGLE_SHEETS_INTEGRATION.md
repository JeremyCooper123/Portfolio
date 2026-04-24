# Google Sheets Integration Setup Guide

Your portfolio is fully integrated with Google Sheets! Manage all content—projects, hero section, about section, and contact info—from a single Google Sheet without touching any code.

## Overview

All data comes from **one Google Sheet** with multiple tabs:
- **Projects** - Your portfolio projects
- **Hero** - Top banner section
- **About** - About me section
- **Contact** - Contact information and social links

## Quick Start (5 minutes)

### 1. Create/Use Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new sheet or use an existing one
3. Name it something like "Portfolio Content"

### 2. Create Four Sheets (Tabs)

Add four tabs to your sheet named: `Projects`, `Hero`, `About`, `Contact`

**Right-click a sheet tab → "Insert 1 below" to add new sheets**

### 3. Add Column Headers

Copy-paste these headers into each sheet's first row:

#### Projects Sheet
```
id | title | category | thumbnail | description | tools | mediaHTML
```

#### Hero Sheet
```
subtitle | title_line1 | title_line2 | description
```

#### About Sheet
```
profile_image_url | title | paragraph1 | paragraph2 | skills
```

#### Contact Sheet
```
title | email | instagram_url | vimeo_url | linkedin_url
```

### 4. Share Your Sheet Publicly

1. Click **Share** (top right)
2. Change to **"Anyone with the link"** → **Viewer** access
3. Copy the share link

### 5. Get Your Sheet ID

The URL looks like:
```
https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
```

Copy the SHEET_ID (the long string between `/d/` and `/edit`)

### 6. Get Sheet GIDs

For each sheet tab, right-click and select **"Get sheet ID"** - this is the GID.

Or find GIDs in the URL after `#gid=`:
```
https://docs.google.com/spreadsheets/d/SHEET_ID/edit#gid=0
```

The GID for the first sheet is `0`

### 7. Configure Your Portfolio

Open `js/content-importer.js` and update:

```javascript
const CONTENT_CONFIG = {
    sheetId: 'YOUR_SHEET_ID_HERE',
    sheets: {
        projects: '0',        // GID of Projects sheet
        hero: '123456789',    // GID of Hero sheet
        about: '987654321',   // GID of About sheet
        contact: '555555555'  // GID of Contact sheet
    },
    useGoogleSheets: true     // Enable Google Sheets
};
```

### 8. Test It!

1. Refresh your portfolio website
2. Open browser console (F12)
3. Look for: ✅ Successfully loaded X projects, ✅ Hero section loaded, etc.

Done! Your portfolio is now powered by Google Sheets! 🎉

---

## Detailed Sheet Structure

### Projects Sheet

Add one project per row:

| id | title | category | thumbnail | description | tools | mediaHTML |
|----|-------|----------|-----------|-------------|-------|-----------|
| p1 | Neon Echoes | Brand Campaign / 3D | https://... | A conceptual 3D animation... | Cinema 4D, Octane Render, Premiere Pro | `<img src="https://..." class="w-full h-full object-cover">` |
| p2 | Kinetic Type | Typography / 2D | https://... | An experimental series... | After Effects, Illustrator | `<video autoplay loop muted...>` |

**Media HTML Examples:**

For **images**:
```html
<img src="YOUR_IMAGE_URL" class="w-full h-full object-cover">
```

For **Vimeo videos**:
```html
<iframe src="https://player.vimeo.com/video/VIDEO_ID" class="w-full h-full"></iframe>
```

For **YouTube videos**:
```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID" class="w-full h-full"></iframe>
```

For **Self-hosted videos**:
```html
<video autoplay loop muted playsinline class="w-full"><source src="YOUR_VIDEO_URL.mp4" type="video/mp4"></video>
```

### Hero Sheet

One row with your hero content:

| subtitle | title_line1 | title_line2 | description |
|----------|-------------|-------------|------------|
| Portfolio 2026 | MOTION | DESIGNER | I breathe life into static pixels... |

- **subtitle**: Small text above main title
- **title_line1**: First line of main title
- **title_line2**: Second line (has text-stroke styling)
- **description**: Paragraph below title

### About Sheet

One row with your about content:

| profile_image_url | title | paragraph1 | paragraph2 | skills |
|---|---|---|---|---|
| https://images.unsplash.com/... | About Me. | I'm a freelance motion designer... | My toolkit includes... | Cinema 4D, After Effects, Houdini, Figma |

- **profile_image_url**: Full URL to your profile image
- **title**: Section title
- **paragraph1**: First bio paragraph
- **paragraph2**: Second bio paragraph
- **skills**: Comma-separated list (auto-formatted as pills)

### Contact Sheet

One row with your contact info:

| title | email | instagram_url | vimeo_url | linkedin_url |
|---|---|---|---|---|
| LET'S TALK | hello@yourdomain.com | https://instagram.com/yourprofile | https://vimeo.com/yourprofile | https://linkedin.com/in/yourprofile |

- **title**: Section heading
- **email**: Your email address
- **instagram_url**: Full Instagram profile URL
- **vimeo_url**: Full Vimeo profile URL
- **linkedin_url**: Full LinkedIn profile URL

---

## Troubleshooting

### "No projects/content loaded" in console

✓ Check `useGoogleSheets: true` in content-importer.js
✓ Verify Sheet ID and GIDs are correct
✓ Make sure sheet is shared publicly
✓ Ensure sheets have headers in row 1 AND data in row 2+

### Content doesn't update when I edit the sheet

✓ Hard refresh browser: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
✓ Content fetches fresh on each page load

### Only some content appears

✓ Check that all required columns are present
✓ Column names must match exactly (case-insensitive)
✓ Make sure each section has at least one data row

### Sheet is shared but still getting errors

✓ Check the exact Sheet ID from URL
✓ Make sure it's "Viewer" access for "Anyone with the link"
✓ Try opening the share link in an incognito window

### How do I turn off Google Sheets?

Set in `js/content-importer.js`:
```javascript
useGoogleSheets: false
```

The website will use default values from `js/projects.js` and `index.html`

---

## Advanced Tips

### Adding More Projects

Just add a new row to your Projects sheet! The website auto-updates on next page load.

### Using Vimeo/YouTube

Get the video ID from the URL:
- Vimeo: `https://vimeo.com/[VIDEO_ID]`
- YouTube: `https://www.youtube.com/watch?v=[VIDEO_ID]`

### Multiple Portfolio Sheets

If you have multiple sheets to manage, create a separate Google Sheet for each portfolio and point to different Sheet IDs in `content-importer.js`

### Conditional Content

You can't do conditionals in Google Sheets, but you can:
- Leave cells empty to hide content
- Update content dynamically by editing the sheet
- Switch between `useGoogleSheets: true/false`

---

## File Structure

```
js/
├── content-importer.js    ← Configure Sheet ID and GIDs here
├── content-updater.js     ← Updates HTML with fetched data
├── main.js                ← Orchestrates everything
└── projects.js            ← Fallback local projects
```

## Key Files

- **`js/content-importer.js`** - Fetches all data from Google Sheets
  - Update `CONTENT_CONFIG` with your Sheet ID and GIDs
  - Set `useGoogleSheets: true` to enable

- **`js/content-updater.js`** - Renders data to HTML
  - HTML has `data-*` attributes marking what gets updated

- **`js/main.js`** - Coordinates everything
  - Calls importer, updater, and renderer on page load

---

## FAQ

**Q: Can I have different sheets for different sections?**
A: Yes! Update the GIDs in `sheets` object to point to different sheets.

**Q: What if I have 100+ projects?**
A: Should work fine, but might take a second to load. Consider splitting into multiple portfolios if it gets slow.

**Q: Can I edit the sheet from multiple people?**
A: Yes! Make it "Editor" access for collaborators. Website always fetches the latest version.

**Q: Do I need an API key?**
A: No! Uses public CSV export, which works for publicly shared sheets.

**Q: What if I want to keep some content local?**
A: Set `useGoogleSheets: false` to use defaults from `index.html` and `projects.js`

---

Need help? Check the browser console (F12) for detailed error messages!
