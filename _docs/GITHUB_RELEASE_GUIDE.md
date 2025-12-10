# GitHub Release Guide for MarkVue

Complete guide to create and publish a GitHub release with Windows builds.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Building Windows Installers](#building-windows-installers)
3. [Preparing for Release](#preparing-for-release)
4. [Creating a Git Tag](#creating-a-git-tag)
5. [Creating GitHub Release](#creating-github-release)
6. [Release Notes Template](#release-notes-template)
7. [Automating Releases (Optional)](#automating-releases-optional)

---

## 1. Prerequisites

### 1.1 Ensure Git is Set Up

```bash
# Check if git is initialized
git status

# If not initialized, initialize it
git init

# Add remote (if not already added)
git remote add origin https://github.com/jeromeheuze/MarkVue.git

# Verify remote
git remote -v
```

### 1.2 Ensure All Changes are Committed

```bash
# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Prepare for release v1.0.0"

# Push to GitHub
git push origin main
```

---

## 2. Building Windows Installers

### 2.1 Clean Previous Builds (Optional)

```bash
# Remove old build files
rm -rf dist/
# Or on Windows PowerShell:
Remove-Item -Recurse -Force dist\
```

### 2.2 Build Windows Installers

Your `package.json` already has the build configuration. Run:

```bash
# Build Windows installer and portable version
npm run build:win
```

This will create:
- **Installer**: `dist/MarkVue Setup 1.0.0.exe` (NSIS installer)
- **Portable**: `dist/MarkVue 1.0.0.exe` (Portable executable)

### 2.3 Verify Builds

1. **Check dist folder**:
   ```
   dist/
   ├── MarkVue Setup 1.0.0.exe    (Installer - ~100-150 MB)
   ├── MarkVue 1.0.0.exe           (Portable - ~100-150 MB)
   └── latest.yml                  (Auto-update manifest)
   ```

2. **Test the installer** (optional but recommended):
   - Run `MarkVue Setup 1.0.0.exe` on a test machine
   - Verify installation works
   - Test file association
   - Test all features

---

## 3. Preparing for Release

### 3.1 Update Version Number

Before building, ensure your version is correct in `package.json`:

```json
{
  "version": "1.0.0"
}
```

### 3.2 Update CHANGELOG (Optional but Recommended)

Create or update `CHANGELOG.md`:

```markdown
# Changelog

All notable changes to MarkVue will be documented in this file.

## [1.0.0] - 2024-12-10

### Added
- Initial release
- Beautiful markdown rendering
- Dark and light themes
- Syntax highlighting for code blocks
- Built-in search functionality
- Zoom controls (Ctrl+Wheel)
- File association for .md files
- About the Author modal

### Features
- Clean, distraction-free reading experience
- Fast startup and rendering
- Native Windows integration
- Completely free and open source
```

---

## 4. Creating a Git Tag

### 4.1 Create Annotated Tag

```bash
# Create an annotated tag (recommended)
git tag -a v1.0.0 -m "Release v1.0.0: Initial release"

# Verify tag was created
git tag -l
```

### 4.2 Push Tag to GitHub

```bash
# Push single tag
git push origin v1.0.0

# Or push all tags
git push origin --tags
```

**Note**: Tags are used to mark specific releases. Use semantic versioning (v1.0.0, v1.0.1, etc.)

---

## 5. Creating GitHub Release

### 5.1 Via GitHub Web Interface (Recommended)

1. **Navigate to Releases**
   - Go to your repository: https://github.com/jeromeheuze/MarkVue
   - Click **"Releases"** in the right sidebar
   - Or go directly to: https://github.com/jeromeheuze/MarkVue/releases

2. **Create New Release**
   - Click **"Draft a new release"** button
   - Or click **"Create a new release"** if no releases exist

3. **Fill Release Form**

   **Choose a tag:**
   - Select `v1.0.0` from dropdown
   - Or create new tag: `v1.0.0` (will be created automatically)

   **Release title:**
   ```
   MarkVue v1.0.0 🎉
   ```

   **Description:**
   (See Release Notes Template below)

   **Attach binaries:**
   - Click **"Attach binaries"** or drag and drop
   - Upload: `MarkVue Setup 1.0.0.exe` (Installer)
   - Upload: `MarkVue 1.0.0.exe` (Portable)

4. **Publish Release**
   - Check **"Set as the latest release"** (for first release)
   - Click **"Publish release"**

### 5.2 Via GitHub CLI (Alternative)

If you have GitHub CLI installed:

```bash
# Install GitHub CLI (if not installed)
# Download from: https://cli.github.com/

# Authenticate
gh auth login

# Create release
gh release create v1.0.0 \
  --title "MarkVue v1.0.0 🎉" \
  --notes-file RELEASE_NOTES.md \
  "dist/MarkVue Setup 1.0.0.exe" \
  "dist/MarkVue 1.0.0.exe"
```

---

## 6. Release Notes Template

### Template for v1.0.0 (Initial Release)

```markdown
# MarkVue v1.0.0 🎉

First public release of MarkVue - a clean, fast markdown viewer for Windows.

## 🎉 What's New

This is the initial release of MarkVue, featuring:

✨ **Beautiful Markdown Rendering**
- Clean, readable typography
- Proper formatting for headings, lists, tables, and more
- Support for images, blockquotes, and code blocks

🎨 **Dark & Light Themes**
- Switch between themes with one click
- Theme preference persists across sessions
- Easy on the eyes for long reading sessions

💻 **Syntax Highlighting**
- Code blocks highlighted with industry-standard themes
- Supports multiple programming languages
- Perfect for technical documentation

🔍 **Built-in Search**
- Find text instantly with Ctrl+F
- Highlights all matches
- Navigate between results with Enter/Shift+Enter

⌨️ **Keyboard Shortcuts**
- Ctrl+O: Open file
- Ctrl+F: Search
- Ctrl+Wheel: Zoom in/out
- Ctrl+Plus/Minus: Zoom controls
- F12: Toggle DevTools

🔗 **Native Windows Integration**
- Double-click any .md file to open in MarkVue
- Proper file association
- Feels like a real Windows app

## 📦 Downloads

### Windows Installer (Recommended)
- **MarkVue Setup 1.0.0.exe** - Full installer with file association
- Recommended for most users
- Includes Start Menu shortcut and file association

### Portable Version
- **MarkVue 1.0.0.exe** - Portable executable
- No installation required
- Perfect for USB sticks or portable use

## 🚀 Installation

1. Download the installer (or portable version)
2. Run `MarkVue Setup 1.0.0.exe`
3. Follow the installation wizard
4. Double-click any `.md` file to open in MarkVue!

## 📝 System Requirements

- Windows 10 or later
- ~100 MB disk space
- No internet required after installation

## 🐛 Known Issues

None currently! If you find any bugs, please report them in [Issues](https://github.com/jeromeheuze/MarkVue/issues).

## 🔮 What's Next

Future versions may include:
- Export to PDF
- Recent files sidebar
- Custom themes
- Live reload for editing
- Print support

## 🙏 Thank You

Thank you for trying MarkVue! If you find it useful:
- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest features
- 📢 Share with others

## 📚 Links

- 📖 [Documentation](https://github.com/jeromeheuze/MarkVue#readme)
- 🐛 [Report Issues](https://github.com/jeromeheuze/MarkVue/issues)
- 💬 [Discussions](https://github.com/jeromeheuze/MarkVue/discussions)

---

**Built with ❤️ by [Jerome Heuze](https://github.com/jeromeheuze)**
```

### Template for Future Releases (v1.0.1, etc.)

```markdown
# MarkVue v1.0.1

## 🎉 What's New

### ✨ New Features
- Feature 1
- Feature 2

### 🐛 Bug Fixes
- Fixed issue with zoom functionality
- Improved font rendering
- Fixed search highlighting

### 🔧 Improvements
- Enhanced performance
- Better error handling
- UI improvements

## 📦 Downloads

- **MarkVue Setup 1.0.1.exe** - Windows Installer
- **MarkVue 1.0.1.exe** - Portable Version

## 📝 Full Changelog

See [CHANGELOG.md](https://github.com/jeromeheuze/MarkVue/blob/main/CHANGELOG.md) for complete list of changes.

## 🚀 Upgrade

If you have MarkVue installed, simply download and run the new installer. Your settings will be preserved.

## 🙏 Thank You

Thanks to everyone who reported issues and suggested improvements!
```

---

## 7. Automating Releases (Optional)

### 7.1 GitHub Actions Workflow

Create `.github/workflows/release.yml`:

```yaml
name: Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: windows-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build Windows
      run: npm run build:win
    
    - name: Create Release
      uses: softprops/action-gh-release@v1
      with:
        files: |
          dist/MarkVue Setup *.exe
          dist/MarkVue *.exe
        draft: false
        prerelease: false
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

This will automatically build and create a release when you push a tag.

---

## 8. Quick Release Checklist

Before creating a release:

- [ ] All code changes committed and pushed
- [ ] Version number updated in `package.json`
- [ ] Windows builds created (`npm run build:win`)
- [ ] Builds tested (optional but recommended)
- [ ] Git tag created (`git tag -a v1.0.0 -m "Release message"`)
- [ ] Tag pushed to GitHub (`git push origin v1.0.0`)
- [ ] Release notes prepared
- [ ] Screenshots/assets ready (if needed)
- [ ] CHANGELOG.md updated (if using one)

---

## 9. Step-by-Step Quick Guide

### For First Release (v1.0.0):

```bash
# 1. Ensure everything is committed
git add .
git commit -m "Prepare for v1.0.0 release"
git push origin main

# 2. Build Windows installers
npm run build:win

# 3. Create and push tag
git tag -a v1.0.0 -m "Release v1.0.0: Initial release"
git push origin v1.0.0

# 4. Go to GitHub and create release
# - Navigate to: https://github.com/jeromeheuze/MarkVue/releases
# - Click "Draft a new release"
# - Select tag: v1.0.0
# - Add title and description
# - Upload: dist/MarkVue Setup 1.0.0.exe
# - Upload: dist/MarkVue 1.0.0.exe
# - Click "Publish release"
```

### For Future Releases (v1.0.1, etc.):

```bash
# 1. Update version in package.json
# Change "version": "1.0.0" to "version": "1.0.1"

# 2. Commit version change
git add package.json
git commit -m "Bump version to 1.0.1"
git push origin main

# 3. Build
npm run build:win

# 4. Create and push tag
git tag -a v1.0.1 -m "Release v1.0.1"
git push origin v1.0.1

# 5. Create release on GitHub (same as above)
```

---

## 10. Best Practices

### 10.1 Version Numbering

Use [Semantic Versioning](https://semver.org/):
- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backward compatible
- **PATCH** (0.0.1): Bug fixes, backward compatible

### 10.2 Release Frequency

- **Major releases**: When adding significant features
- **Minor releases**: Monthly or as needed
- **Patch releases**: As bugs are fixed

### 10.3 Release Notes

- Be clear and concise
- Highlight new features prominently
- List bug fixes
- Include upgrade instructions
- Thank contributors

### 10.4 File Naming

Keep consistent naming:
- `MarkVue Setup X.Y.Z.exe` (Installer)
- `MarkVue X.Y.Z.exe` (Portable)

---

## 11. Troubleshooting

### Issue: Build fails

**Solution:**
```bash
# Clean and rebuild
rm -rf dist/ node_modules/
npm install
npm run build:win
```

### Issue: Tag already exists

**Solution:**
```bash
# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0

# Create new tag
git tag -a v1.0.0 -m "Release message"
git push origin v1.0.0
```

### Issue: Can't upload large files

**Solution:**
- GitHub has a 2GB file size limit
- If your build is too large, consider:
  - Using GitHub LFS for large files
  - Optimizing dependencies
  - Using portable version only

### Issue: Release not showing

**Solution:**
- Ensure tag is pushed: `git push origin v1.0.0`
- Refresh GitHub page
- Check if release is in "Draft" status

---

## 12. Resources

- **GitHub Releases Docs**: https://docs.github.com/repositories/releasing-projects-on-github
- **Semantic Versioning**: https://semver.org/
- **Electron Builder**: https://www.electron.build/
- **Git Tags**: https://git-scm.com/book/en/v2/Git-Basics-Tagging

---

**Last Updated**: December 2024

Good luck with your release! 🚀

