# Motion Design Portfolio

A modern, fully customizable portfolio website for motion designers and 3D artists.

## ✨ Features

- 🎨 **Beautiful, modern design** with custom cursor and smooth animations
- 📊 **Google Sheets integration** - manage all content without touching code
- 🎬 **Project showcase** with modal viewing
- 📱 **Fully responsive** - works on desktop, tablet, and mobile
- ⚡ **Fast & lightweight** - uses Tailwind CSS via CDN
- 🚀 **GitHub Pages ready** - deploy instantly

## 🚀 Quick Start

1. **Clone this repository**
2. **Edit your content** in Google Sheets (see setup guide below)
3. **Deploy** to GitHub Pages

## 📚 Documentation

### Main Setup Guide
👉 **[GOOGLE_SHEETS_INTEGRATION.md](GOOGLE_SHEETS_INTEGRATION.md)** - Complete setup for all Google Sheets features (Projects, Hero, About, Contact)

This is the only documentation you need! It covers:
- Creating your Google Sheet
- Setting up all four data tabs
- Configuring your portfolio
- Troubleshooting

### For Development
- `js/content-importer.js` - Fetches data from Google Sheets
- `js/content-updater.js` - Updates HTML with fetched data
- `js/main.js` - Main application logic
- `js/projects.js` - Local fallback projects

## 🎯 What You Can Customize

All from Google Sheets:
- ✅ Hero section (title, subtitle, description)
- ✅ About section (bio, image, skills)
- ✅ Contact section (email, social links)
- ✅ Projects (add unlimited projects with images/videos)

## 🔧 File Structure

```
Portfolio/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styling & animations
├── js/
│   ├── content-importer.js    # Fetches data from Google Sheets
│   ├── content-updater.js     # Updates HTML with data
│   ├── main.js                # Main app logic
│   └── projects.js            # Fallback local projects
├── README.md              # This file
└── GOOGLE_SHEETS_INTEGRATION.md  # Setup guide
```

## 📖 How It Works

1. **content-importer.js** fetches data from your Google Sheet
2. **content-updater.js** updates the HTML with that data
3. **main.js** renders everything and handles interactions
4. **index.html** displays the final portfolio

If Google Sheets isn't configured or fails, it falls back to local data.

## 🎨 Customization

### Colors & Fonts
Edit `index.html` in the `<style>` section or create a new CSS file.

### Animations
All animations are in `css/styles.css`.

### Content
Everything is managed in Google Sheets - see setup guide!

## 📝 Content Management

Add/edit content directly in Google Sheets:
- **Projects sheet** - Portfolio projects
- **Hero sheet** - Top banner
- **About sheet** - About me section
- **Contact sheet** - Contact info

Changes appear instantly after refreshing!

## 🚀 Deployment

This portfolio is ready for GitHub Pages:

1. Push to GitHub
2. Enable GitHub Pages in repo settings
3. Done! Your portfolio is live at `yourusername.github.io/Portfolio`

## 🛠️ Troubleshooting

### Content not loading?
- Check browser console (F12)
- Verify Google Sheet is publicly shared
- Make sure `useGoogleSheets: true` in `js/content-importer.js`

### Styling looks off?
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Check `css/styles.css`

For detailed troubleshooting, see **[GOOGLE_SHEETS_INTEGRATION.md](GOOGLE_SHEETS_INTEGRATION.md)**

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📄 License

Free to use and modify!

---

**👉 Next Step:** Read [GOOGLE_SHEETS_INTEGRATION.md](GOOGLE_SHEETS_INTEGRATION.md) to set up your Google Sheet and configure the portfolio.
