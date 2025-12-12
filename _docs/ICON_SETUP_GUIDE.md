# Icon Setup Guide for MarkVue

## Current Icon Files

You have the following icon files in `src/assets/`:
- `MarkVue_16.ico` - 16x16 pixels
- `MarkVue_32.ico` - 32x32 pixels
- `MarkVue_48.ico` - 48x48 pixels
- `MarkVue_256.ico` - 256x256 pixels
- PNG versions of each size

## Configuration

The app is now configured to use:
- **Build icon**: `src/assets/MarkVue_256.ico` (for Windows installer)
- **App window icon**: `src/assets/MarkVue_256.png` (for the app window)

## Option 1: Use Single 256.ico (Current Setup) ✅

**Pros**: Simple, works immediately
**Cons**: electron-builder will resize it, may not be perfect at small sizes

This is what's currently configured. electron-builder will automatically resize the 256.ico for different Windows contexts.

## Option 2: Create Multi-Size ICO File (Recommended) ⭐

For the best Windows experience, create a single ICO file containing all sizes (16, 32, 48, 256).

### Using Online Tools:

1. **ICO Convert** (https://icoconvert.com/)
   - Upload your 256.png
   - Select sizes: 16x16, 32x32, 48x48, 256x256
   - Download the combined ICO file
   - Save as `src/assets/icon.ico`

2. **ConvertICO** (https://converticon.com/)
   - Upload your largest icon (256.png)
   - It will create a multi-size ICO
   - Download and save as `src/assets/icon.ico`

### Using ImageMagick (Command Line):

```bash
# Install ImageMagick first: https://imagemagick.org/

# Create multi-size ICO from PNG files
magick convert MarkVue_16.png MarkVue_32.png MarkVue_48.png MarkVue_256.png icon.ico
```

### Using GIMP:

1. Open GIMP
2. File → Export As → Choose `.ico`
3. In export dialog, select all sizes (16, 32, 48, 256)
4. Export as `icon.ico`

### After Creating Combined ICO:

Update `package.json`:
```json
"win": {
  "icon": "src/assets/icon.ico"
}
```

## Testing Icons

### Test in Development:

1. Run `npm start`
2. Check the app window icon (top-left corner)
3. Check the taskbar icon

### Test in Build:

1. Build: `npm run build:win`
2. Install the generated installer
3. Check:
   - Desktop shortcut icon
   - Start Menu icon
   - Taskbar icon
   - File association icon (.md files)

## Icon Requirements for Windows

- **Format**: ICO file
- **Sizes**: 16x16, 32x32, 48x48, 256x256 (all in one file)
- **Location**: `src/assets/icon.ico` (or specified path in package.json)
- **Quality**: High resolution for 256x256, clear at small sizes

## Current Configuration

✅ **package.json**: Uses `src/assets/MarkVue_256.ico`
✅ **src/main.js**: Uses `src/assets/MarkVue_256.png` for window icon

## Quick Fix: Create Combined ICO

If you want to use all your icon sizes, the easiest way:

1. Go to https://icoconvert.com/
2. Upload `MarkVue_256.png`
3. Select sizes: 16, 32, 48, 256
4. Download `icon.ico`
5. Save to `src/assets/icon.ico`
6. Update package.json:
   ```json
   "icon": "src/assets/icon.ico"
   ```

## Verification

After building, verify icons appear correctly:
- ✅ App window title bar
- ✅ Taskbar
- ✅ Desktop shortcut
- ✅ Start Menu
- ✅ File association (.md files)

---

**Note**: The current setup using `MarkVue_256.ico` will work, but creating a multi-size ICO file provides better quality at all sizes.

