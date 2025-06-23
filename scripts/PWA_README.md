# PWA (Progressive Web App) Setup

This resume site now supports PWA functionality, allowing users to install it as a native-like app on their devices.

## Features

- **Offline Support**: The app works offline using service worker caching
- **Install Prompt**: Users can install the app with a floating install button
- **Standalone Mode**: Runs in standalone mode when installed (no browser UI)
- **Responsive**: Optimized for mobile and desktop
- **Theme Color**: Uses your brand color (#0095ff) for system integration

## Build Commands

### Full PWA Build
```bash
pnpm run build:pwa
```
This command runs the complete build process including PWA setup.

### Individual Commands
```bash
# Prepare resume JSON and HTML
pnpm run prepare:resume

# Create placeholder icons (you'll need to replace with actual PNG files)
pnpm run create:icons
```

## Files Created

The PWA setup creates the following files:

- `manifest.json` - Web app manifest for PWA metadata
- `sw.js` - Service worker for offline functionality
- `icon-192.png` & `icon-512.png` - App icons (initially placeholders)

## PWA Features Included

### 1. Service Worker (`sw.js`)
- Caches essential resources for offline access
- Automatically updates cache when new versions are available
- Fallback to network when cache miss occurs

### 2. Web App Manifest (`manifest.json`)
- App name and description
- Theme colors and display mode
- Icon configurations
- Start URL and scope

### 3. Install Functionality
- Automatic install prompt detection
- Custom install button with hover effects
- Install success tracking
- Hides install button when app is already installed

### 4. PWA-Optimized Meta Tags
- Theme color for system integration
- Mobile app capabilities
- Apple-specific meta tags for iOS
- Icon links for various sizes

## Icon Setup

The build process creates placeholder icons. To use custom icons:

1. Replace `icon-192.png` and `icon-512.png` with your actual icons
2. Or use the generated HTML files (`icon-192.html`, `icon-512.html`) to create screenshots
3. Or use the SVG code from the instruction files with an online converter

## Testing PWA Functionality

### Desktop (Chrome/Edge)
1. Open DevTools → Application → Manifest
2. Check "Add to shelf" functionality
3. Test offline mode in Network tab

### Mobile
1. Visit the site in Chrome/Safari
2. Look for "Add to Home Screen" prompt
3. Test offline functionality
4. Check standalone mode after installation

## Deployment Notes

Make sure your web server:
- Serves the site over HTTPS (required for PWA)
- Serves `manifest.json` with correct MIME type (`application/manifest+json`)  
- Serves `sw.js` from the root directory
- Has proper cache headers for static assets

## Browser Support

- Chrome/Chromium (full support)
- Firefox (partial support)
- Safari (partial support with some limitations)
- Edge (full support)

The PWA will gracefully degrade in browsers that don't support all features. 