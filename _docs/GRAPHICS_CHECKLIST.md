# MarkVue - Graphics & Assets Checklist

Complete list of all graphics and assets needed for app submission to Microsoft Store and GitHub.

---

## 🎨 App Icons

### Required Sizes:
- [ ] **icon.ico** - Windows icon file (multi-size ICO)
  - Contains: 16x16, 32x32, 48x48, 256x256
  - Location: `src/assets/icon.ico`
  - Tool: Use https://converticon.com/ or online ICO converter

- [ ] **icon.png** - PNG version for Linux/Mac
  - Size: 256x256 pixels
  - Location: `src/assets/icon.png`
  - Format: PNG with transparency

### Design Guidelines:
- Simple "M" letter with document lines
- Modern, flat design
- Blue/purple gradient (matches markdown aesthetic)
- Should be recognizable at small sizes (16x16)
- No text (icon should be self-explanatory)

---

## 📸 Microsoft Store Screenshots

### Requirements:
- **Format**: PNG
- **Minimum**: 3 screenshots
- **Maximum**: 10 screenshots
- **Resolution**: 1366x768 or larger (1920x1080 recommended)
- **Aspect Ratio**: 16:9 or 4:3

### Screenshot List:

1. [ ] **Hero/Welcome Screen**
   - Clean welcome screen
   - Shows "Welcome to MarkVue" message
   - Highlights clean UI design
   - File: `screenshots/01-welcome.png`

2. [ ] **Dark Theme - Code Example**
   - Technical markdown document
   - Code blocks with syntax highlighting
   - Dark theme active
   - Shows search functionality
   - File: `screenshots/02-dark-code.png`

3. [ ] **Light Theme - Rich Document**
   - Document with images, tables, lists
   - Light theme active
   - Shows theme toggle button
   - File: `screenshots/03-light-rich.png`

4. [ ] **Complex Document View**
   - Multiple sections, headings
   - Nested lists, blockquotes
   - Tables with data
   - File: `screenshots/04-complex-doc.png`

5. [ ] **Search Feature Demo**
   - Search bar visible
   - Highlighted search results
   - Match counter showing
   - File: `screenshots/05-search-feature.png`

6. [ ] **About Modal**
   - About the Author modal open
   - Shows author info and links
   - File: `screenshots/06-about-modal.png`

### Screenshot Tips:
- Use actual markdown content (not Lorem Ipsum)
- Show real use cases (README files, documentation)
- Ensure text is readable at store thumbnail size
- Use consistent window size (1200x800 recommended)
- Remove any personal/sensitive information

---

## 🖼️ GitHub Assets

### Repository Assets:

1. [ ] **Hero Screenshot**
   - Size: 1920x1080 or 1200x600
   - File: `screenshots/hero.png`
   - Used in README.md
   - Best representation of the app

2. [ ] **Feature Showcase Images** (Optional)
   - Dark theme preview
   - Light theme preview
   - Search feature demo
   - File: `screenshots/features/`

3. [ ] **App Icon for GitHub**
   - 512x512 PNG
   - File: `assets/icon-512.png`
   - For GitHub social preview

---

## 📦 Store Listing Assets

### Microsoft Store Specific:

1. [ ] **Store Logo**
   - Size: 300x300 pixels
   - Format: PNG
   - Square format
   - Transparent background

2. [ ] **Store Tile**
   - Size: 1500x1500 pixels (optional)
   - Format: PNG
   - For Windows Start menu tile

3. [ ] **Promotional Images** (Optional)
   - 1920x1080
   - For featured placement
   - Highlight key features

---

## 🎬 Video Assets (Optional but Recommended)

1. [ ] **Demo Video**
   - Length: 30-60 seconds
   - Format: MP4
   - Resolution: 1920x1080
   - Shows: Opening file, theme toggle, search, zoom
   - File: `assets/demo-video.mp4`

2. [ ] **Animated GIF** (For GitHub)
   - Size: 800x600 or smaller
   - Shows key features
   - File: `assets/demo.gif`

---

## 📝 Social Media Assets

### LinkedIn Post Images:

1. [ ] **LinkedIn Post Banner**
   - Size: 1200x627 pixels
   - Format: PNG or JPG
   - Text overlay with app name
   - File: `assets/linkedin-banner.png`

2. [ ] **LinkedIn Article Header**
   - Size: 1920x1080
   - Format: PNG
   - Professional design
   - File: `assets/article-header.png`

### Twitter/X Assets:

1. [ ] **Twitter Card Image**
   - Size: 1200x675 pixels
   - Format: PNG
   - File: `assets/twitter-card.png`

---

## 🛠️ Tools & Resources

### Icon Creation:
- **Figma** - Design tool (free)
- **Canva** - Quick designs (free tier)
- **Blender** - 3D icon (if you want 3D)
- **GIMP** - Free image editor
- **Photoshop** - Professional editing

### Icon Conversion:
- https://converticon.com/ - ICO converter
- https://cloudconvert.com/ - Multi-format converter
- https://www.icoconverter.com/ - ICO creator

### Screenshot Tools:
- **Windows Snipping Tool** - Built-in
- **ShareX** - Free, powerful screenshot tool
- **Greenshot** - Open source screenshot tool
- **OBS Studio** - For screen recording

### Color Palette (Suggested):
- Primary: #007acc (Blue)
- Secondary: #1e1e1e (Dark background)
- Accent: #858585 (Gray)
- Text: #d4d4d4 (Light text)

---

## ✅ Submission Checklist

### Before Submitting:

- [ ] All icons created and placed in `src/assets/`
- [ ] All screenshots captured (minimum 3)
- [ ] Screenshots saved in `screenshots/` folder
- [ ] All images optimized (compressed but still high quality)
- [ ] No personal/sensitive data in screenshots
- [ ] Text in screenshots is readable
- [ ] Icons work at all sizes (test 16x16, 32x32, 48x48, 256x256)
- [ ] Store listing images meet Microsoft requirements
- [ ] GitHub assets ready for repository

### File Structure:
```
MarkVue/
├── src/
│   └── assets/
│       ├── icon.ico          ✅ Required
│       └── icon.png          ✅ Required
├── screenshots/
│   ├── 01-welcome.png        ✅ Required
│   ├── 02-dark-code.png      ✅ Required
│   ├── 03-light-rich.png     ✅ Required
│   ├── 04-complex-doc.png    ⚪ Optional
│   ├── 05-search-feature.png ⚪ Optional
│   └── hero.png              ✅ For GitHub
└── assets/ (for marketing)
    ├── linkedin-banner.png   ⚪ Optional
    └── demo.gif              ⚪ Optional
```

---

## 📋 Priority Order

### High Priority (Must Have):
1. ✅ App icons (icon.ico, icon.png)
2. ✅ 3-5 Store screenshots
3. ✅ Hero screenshot for GitHub

### Medium Priority (Should Have):
4. ⚪ Additional screenshots (5-10 total)
5. ⚪ Social media banners
6. ⚪ GitHub feature images

### Low Priority (Nice to Have):
7. ⚪ Demo video
8. ⚪ Animated GIF
9. ⚪ Promotional images

---

## 💡 Design Tips

1. **Consistency**: Use same window size for all screenshots
2. **Content**: Use real, meaningful markdown content
3. **Quality**: Ensure high resolution, no pixelation
4. **Branding**: Keep color scheme consistent
5. **Readability**: Text should be clear even at thumbnail size
6. **Professional**: Clean, modern aesthetic
7. **Showcase Features**: Highlight key features in screenshots

---

**Last Updated**: December 2025
**Status**: Ready for asset creation

