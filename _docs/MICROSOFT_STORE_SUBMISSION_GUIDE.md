# Microsoft Store Submission Guide for MarkVue

Complete step-by-step guide to submit MarkVue to the Microsoft Store.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Preparing Your App](#preparing-your-app)
3. [Creating MSIX Package](#creating-msix-package)
4. [Code Signing](#code-signing)
5. [Microsoft Partner Center Setup](#microsoft-partner-center-setup)
6. [Store Listing](#store-listing)
7. [Screenshots & Assets](#screenshots--assets)
8. [Privacy Policy](#privacy-policy)
9. [Age Rating](#age-rating)
10. [Submission & Certification](#submission--certification)
11. [Troubleshooting](#troubleshooting)

---

## 1. Prerequisites

### 1.1 Microsoft Partner Center Account

1. **Sign Up**
   - Go to: https://partner.microsoft.com/dashboard
   - Click "Sign up" or "Get started"
   - Sign in with your Microsoft account (or create one)

2. **Account Type**
   - **Individual**: $19 one-time fee
   - **Company**: $99 one-time fee
   - Choose based on your situation

3. **Verification Process**
   - Complete account verification (1-2 business days)
   - Provide payment information (for the fee)
   - Verify your identity/company

4. **Developer Account Setup**
   - Complete your developer profile
   - Add contact information
   - Set up tax information (if applicable)

### 1.2 Required Assets Checklist

Before starting, ensure you have:

- [ ] App icons (icon.ico, icon.png - 256x256)
- [ ] 3-10 screenshots (1366x768 or larger, PNG format)
- [ ] Privacy policy URL (hosted online)
- [ ] App description (short and full)
- [ ] Keywords (7 maximum)
- [ ] Publisher name (from Partner Center)

---

## 2. Preparing Your App

### 2.1 Update package.json for Store

Add MSIX build configuration to your `package.json`:

```json
{
  "build": {
    "appId": "com.jerome.markvue",
    "productName": "MarkVue",
    "fileAssociations": [
      {
        "ext": "md",
        "name": "Markdown",
        "description": "Markdown File",
        "role": "Viewer"
      }
    ],
    "win": {
      "target": ["appx"],
      "icon": "src/assets/icon.ico",
      "publisherName": "CN=YourPublisherName"
    },
    "appx": {
      "displayName": "MarkVue",
      "publisher": "CN=YourPublisherName",
      "identityName": "JeromeHeuze.MarkVue",
      "backgroundColor": "#1e1e1e",
      "publisherDisplayName": "Jerome Heuze"
    }
  }
}
```

**Important Notes:**
- Replace `YourPublisherName` with your actual publisher name from Partner Center
- `identityName` must be unique (format: `PublisherName.AppName`)
- `publisherDisplayName` is what users see in the Store

### 2.2 Get Your Publisher Name

1. Go to Partner Center Dashboard
2. Navigate to **Account settings** → **Developer account**
3. Find your **Publisher display name** (e.g., "Jerome Heuze")
4. Find your **Publisher ID** (e.g., "CN=JeromeHeuze")
5. Use these values in your `package.json`

---

## 3. Creating MSIX Package

### 3.1 Install Required Tools

```bash
# Ensure electron-builder is installed
npm install --save-dev electron-builder

# Install Windows SDK (if not already installed)
# Download from: https://developer.microsoft.com/windows/downloads/windows-sdk/
```

### 3.2 Build MSIX Package

```bash
# Build MSIX package for Microsoft Store
npm run build:store
```

Add this script to `package.json`:

```json
{
  "scripts": {
    "build:store": "electron-builder --win --x64 --config.win.target=appx"
  }
}
```

Or build directly:

```bash
electron-builder --win --x64 --config.win.target=appx
```

### 3.3 Output Location

The MSIX package will be in:
```
dist/MarkVue_1.0.0_x64.appx
```

### 3.4 Verify Package

1. **Check Package Size**
   - Should be reasonable (typically 50-200 MB for Electron apps)
   - If too large, consider optimizing dependencies

2. **Test Installation Locally**
   ```powershell
   # In PowerShell (as Administrator)
   Add-AppxPackage -Path "dist\MarkVue_1.0.0_x64.appx"
   ```

3. **Test the App**
   - Verify all features work
   - Check file association
   - Test theme switching
   - Verify search functionality

---

## 4. Code Signing

### 4.1 Automatic Signing (Recommended)

Microsoft Store will automatically sign your app during submission. You don't need to sign it yourself if submitting through the Store.

### 4.2 Manual Signing (Optional)

If you want to sign manually (for testing or direct distribution):

1. **Get a Code Signing Certificate**
   - Purchase from a Certificate Authority (CA)
   - Or use a self-signed certificate for testing

2. **Sign the Package**
   ```powershell
   signtool sign /f certificate.pfx /p password /t http://timestamp.digicert.com "dist\MarkVue_1.0.0_x64.appx"
   ```

**Note**: For Store submission, automatic signing is sufficient.

---

## 5. Microsoft Partner Center Setup

### 5.1 Create New App

1. **Navigate to Partner Center**
   - Go to: https://partner.microsoft.com/dashboard
   - Sign in with your developer account

2. **Create App**
   - Click **"Create new app"** or **"+ New submission"**
   - Enter app name: **"MarkVue"**
   - Reserve the name (check availability)

3. **App Type**
   - Select **"Desktop app"** or **"Packaged desktop app"**
   - Choose **"MSIX"** as package type

### 5.2 App Identity

Fill in the app identity information:

- **App name**: MarkVue
- **Publisher display name**: (Your publisher name from account)
- **Package identity name**: `JeromeHeuze.MarkVue` (must match package.json)
- **Version**: 1.0.0

---

## 6. Store Listing

### 6.1 App Description

**Short Description** (100 characters max):
```
Beautiful markdown viewer for Windows. Built for AI users drowning in .md files.
```

**Full Description** (10,000 characters max):

```
The markdown viewer Windows deserves.

WHY MARKVUE?

AI tools like ChatGPT and Claude love markdown. They create .md files for everything - documentation, reports, code snippets, meeting notes. But Windows has no native way to view them beautifully.

MarkVue solves this. It's a simple, fast, gorgeous markdown viewer designed specifically for modern Windows users working with AI tools.

FEATURES

✨ Clean Reading Experience
No clutter, no IDE bloat. Just your markdown rendered beautifully with proper typography and spacing.

💻 Syntax Highlighting
Code blocks are highlighted with industry-standard themes. Perfect for technical documentation.

🎨 Dark & Light Themes
Switch instantly with a single click. Your preference persists across sessions.

🔍 Built-in Search
Find text instantly with Ctrl+F. Highlights all matches with easy navigation.

⚡ Lightning Fast
Opens instantly. No loading screens, no lag. Built for speed.

🔗 File Association
Double-click any .md file in Windows Explorer and it opens in MarkVue automatically.

🆓 Completely Free
No ads, no premium version, no data collection. Just a tool that works.

PERFECT FOR

• Developers working with AI coding assistants
• Technical writers managing documentation
• Anyone using ChatGPT, Claude, or similar tools
• Note-takers who prefer markdown format
• GitHub users previewing README files locally

BUILT WITH CARE

Created by an experienced developer frustrated with the lack of good markdown viewers on Windows. Open source and actively maintained.

PRIVACY

MarkVue runs completely offline. Your files never leave your computer. No tracking, no analytics, no data collection.

SYSTEM REQUIREMENTS

• Windows 10 or later
• 100 MB disk space
• No internet required after installation

GET STARTED

Install MarkVue and double-click any .md file. It's that simple.

Questions or feedback? Visit our GitHub repository: https://github.com/jeromeheuze/markvue
```

### 6.2 Keywords

Select up to 7 keywords:
- markdown
- viewer
- md
- documentation
- AI
- developer
- text

### 6.3 Category

- **Primary Category**: Developer Tools
- **Secondary Category**: Code Editors (optional)

### 6.4 Pricing

- **Price**: Free
- **Trial**: Not applicable (app is free)
- **In-app purchases**: None

### 6.5 Support & Contact

- **Support URL**: https://github.com/jeromeheuze/markvue/issues
- **Privacy Policy URL**: (See Privacy Policy section below)
- **Website**: https://github.com/jeromeheuze/markvue

---

## 7. Screenshots & Assets

### 7.1 Screenshot Requirements

- **Format**: PNG
- **Minimum**: 3 screenshots
- **Maximum**: 10 screenshots
- **Resolution**: 1366x768 or larger (1920x1080 recommended)
- **Aspect Ratio**: 16:9 or 4:3

### 7.2 Required Screenshots

1. **Welcome Screen** (Required)
   - Clean welcome screen
   - Shows "Welcome to MarkVue" message
   - File: `screenshots/01-welcome.png`

2. **Dark Theme with Code** (Required)
   - Technical markdown document
   - Code blocks with syntax highlighting
   - Dark theme active
   - File: `screenshots/02-dark-code.png`

3. **Light Theme** (Required)
   - Document with images, tables, lists
   - Light theme active
   - Shows theme toggle
   - File: `screenshots/03-light-rich.png`

### 7.3 Optional Screenshots

4. Search feature demo
5. Complex document view
6. About modal
7. Zoom functionality

### 7.4 App Icons

**Store Logo**:
- Size: 300x300 pixels
- Format: PNG
- Square format
- Transparent background
- File: `assets/store-logo-300.png`

**App Icon** (for package):
- Already in `src/assets/icon.ico` and `icon.png`
- Ensure 256x256 PNG version exists

### 7.5 Upload Screenshots

1. Go to **Store listing** → **Screenshots**
2. Click **"Add screenshot"**
3. Upload each screenshot
4. Add captions (optional but recommended)
5. Set display order

---

## 8. Privacy Policy

### 8.1 Create Privacy Policy

Create a simple privacy policy page. You can host it on:
- GitHub Pages
- Your personal website
- Any free hosting service

### 8.2 Privacy Policy Template

```markdown
# MarkVue Privacy Policy

Last Updated: December 2024

## Overview
MarkVue is committed to protecting your privacy. This app does not collect, store, or transmit any personal data.

## Data Collection
MarkVue does NOT:
- Collect personal information
- Track usage analytics
- Store files on external servers
- Require account creation
- Use cookies or tracking pixels
- Send data over the internet

## Local Storage
MarkVue stores only:
- Your theme preference (dark/light) in browser localStorage
- Your zoom level preference
- This data never leaves your computer

## File Access
MarkVue only accesses files you explicitly open. Files are:
- Read locally on your computer
- Never uploaded or transmitted
- Never stored by the application

## Third-Party Services
MarkVue uses:
- marked.js (markdown parsing)
- highlight.js (syntax highlighting)
- Alpine.js (UI framework)

These libraries run entirely offline after installation.

## Updates
This privacy policy may be updated. Changes will be posted with a new "Last Updated" date.

## Contact
Questions? Visit our GitHub repository: https://github.com/jeromeheuze/markvue
Or contact: [Your email or contact method]
```

### 8.3 Host Privacy Policy

**Option 1: GitHub Pages**
1. Create `docs/privacy-policy.md` in your repo
2. Enable GitHub Pages in repo settings
3. Access at: `https://jeromeheuze.github.io/markvue/privacy-policy`

**Option 2: Your Website**
- Host on your personal website
- Example: `https://jeromeheuze.com/markvue-privacy-policy`

### 8.4 Add Privacy Policy URL

In Partner Center:
1. Go to **Store listing** → **Properties**
2. Enter Privacy Policy URL
3. Save

---

## 9. Age Rating

### 9.1 Complete Age Rating Questionnaire

1. Go to **Age ratings** in Partner Center
2. Click **"Start questionnaire"**
3. Answer questions about your app:

**Typical Answers for MarkVue:**
- **Content**: No inappropriate content
- **User interaction**: No user-to-user interaction
- **Data collection**: No data collection
- **Location**: No location services
- **Purchases**: No in-app purchases

4. **Result**: Should be **"Everyone"** or **"3+"**

### 9.2 Submit Age Rating

- Review your answers
- Submit for certification
- Usually approved immediately for simple apps

---

## 10. Submission & Certification

### 10.1 Upload Package

1. Go to **Packages** in Partner Center
2. Click **"New package"**
3. Upload your `.appx` file
4. Wait for automated testing (1-2 hours)

### 10.2 Automated Testing

Microsoft will automatically test:
- Package integrity
- App functionality
- Security checks
- Store policy compliance

**Common Issues:**
- Package too large → Optimize dependencies
- Missing icons → Ensure all icon sizes present
- Code signing issues → Usually auto-resolved

### 10.3 Complete Submission

1. **Review All Sections:**
   - [ ] App identity
   - [ ] Store listing (description, screenshots)
   - [ ] Pricing
   - [ ] Age rating
   - [ ] Privacy policy
   - [ ] Packages uploaded and tested

2. **Submit for Certification**
   - Click **"Submit to Store"**
   - Review final checklist
   - Confirm submission

### 10.4 Certification Process

**Timeline:**
- **Automated testing**: 1-2 hours
- **Manual review**: 1-3 business days
- **Simple apps**: Often approved same day

**Status Updates:**
- Check Partner Center dashboard
- You'll receive email notifications
- Status: In certification → Certified → Published

### 10.5 Go Live

Once certified:

1. **Publish Options**
   - **Immediate**: App goes live right away
   - **Scheduled**: Set a future date
   - **Manual**: You control when it goes live

2. **App Goes Live**
   - App appears in Store within hours
   - Searchable by name
   - Available for download

---

## 11. Troubleshooting

### 11.1 Common Issues

**Issue: Package upload fails**
- **Solution**: Check file size (max 10GB, but aim for <500MB)
- **Solution**: Verify package format is .appx
- **Solution**: Ensure package.json configuration is correct

**Issue: Publisher name mismatch**
- **Solution**: Verify publisher name in Partner Center
- **Solution**: Update package.json with exact publisher name
- **Solution**: Rebuild package

**Issue: Automated testing fails**
- **Solution**: Check test results in Partner Center
- **Solution**: Fix reported issues
- **Solution**: Re-upload corrected package

**Issue: App name already taken**
- **Solution**: Try variations: "MarkVue - Markdown Viewer"
- **Solution**: Contact Microsoft support if needed

**Issue: Screenshots rejected**
- **Solution**: Ensure correct resolution (1366x768+)
- **Solution**: Use PNG format
- **Solution**: Remove any personal/sensitive data

### 11.2 Getting Help

**Microsoft Partner Center Support:**
- Help center: https://docs.microsoft.com/windows/uwp/publish/
- Support: Available in Partner Center dashboard
- Community forums: https://techcommunity.microsoft.com/

**Electron Builder Issues:**
- Documentation: https://www.electron.build/
- GitHub Issues: https://github.com/electron-userland/electron-builder/issues

---

## 12. Post-Submission

### 12.1 Monitor Your App

- Check download statistics
- Monitor user reviews
- Respond to feedback
- Track crash reports (if enabled)

### 12.2 Update Your App

When releasing updates:

1. **Increment Version**
   - Update `package.json` version
   - Example: `1.0.0` → `1.0.1`

2. **Build New Package**
   ```bash
   npm run build:store
   ```

3. **Submit Update**
   - Go to Partner Center
   - Create new submission
   - Upload new package
   - Update release notes
   - Submit for certification

### 12.3 Release Notes Template

```markdown
Version 1.0.1

What's New:
- Fixed zoom functionality
- Improved font rendering
- Enhanced search performance
- Bug fixes and stability improvements
```

---

## 13. Quick Checklist

Before submitting, ensure:

- [ ] Microsoft Partner Center account created and verified
- [ ] Publisher name obtained from Partner Center
- [ ] package.json updated with correct publisher information
- [ ] MSIX package built successfully
- [ ] Package tested locally
- [ ] App icons created (icon.ico, icon.png)
- [ ] 3+ screenshots prepared (1366x768+)
- [ ] Privacy policy created and hosted online
- [ ] Store listing description written
- [ ] Keywords selected (7 max)
- [ ] Age rating questionnaire completed
- [ ] All sections in Partner Center completed
- [ ] Package uploaded and automated testing passed
- [ ] Ready to submit for certification

---

## 14. Estimated Timeline

- **Account Setup**: 1-2 days (verification)
- **App Preparation**: 1-2 days (icons, screenshots, descriptions)
- **Package Creation**: 1 day
- **Store Listing**: 1 day
- **Certification**: 1-3 business days
- **Total**: ~1 week from start to live

---

## 15. Resources

**Official Documentation:**
- Microsoft Store Policies: https://docs.microsoft.com/windows/uwp/publish/store-policies
- App Submission Guide: https://docs.microsoft.com/windows/uwp/publish/app-submissions
- Electron Builder: https://www.electron.build/

**Tools:**
- Partner Center: https://partner.microsoft.com/dashboard
- Windows SDK: https://developer.microsoft.com/windows/downloads/windows-sdk/
- App Installer: For testing MSIX packages

---

**Last Updated**: December 2024  
**Status**: Ready for submission

Good luck with your submission! 🚀

