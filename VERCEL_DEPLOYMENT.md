# Vercel PWA Deployment Guide

This guide explains how to deploy your PWA-enabled resume to Vercel with full PWA functionality.

## 🚀 Quick Deployment

### 1. Build for Vercel
```bash
pnpm run build:vercel
```

### 2. Create Icon Files
After running the build command, you'll have template files for icons:
- Open `icon-192-template.html` in your browser
- Open `icon-512-template.html` in your browser  
- Take screenshots or use the provided SVG data URLs to create PNG files
- Save them as `icon-192.png` and `icon-512.png` in your project root

### 3. Deploy to Vercel
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repository to Vercel dashboard for automatic deployments.

## 📋 Vercel Configuration

The `vercel.json` file is configured with:

### PWA-Specific Headers
- **`manifest.json`**: Proper MIME type (`application/manifest+json`)
- **`sw.js`**: Service worker with appropriate caching headers
- **Icons**: Long-term caching for performance
- **HTML**: Moderate caching for content updates

### Security & Performance
- Service Worker scope permissions
- Optimized cache control headers
- Proper content types for all PWA assets

## 📱 PWA Features on Vercel

### ✅ What Works
- **Install prompts** on Chrome, Edge, Safari
- **Offline functionality** via service worker
- **Add to home screen** on mobile devices
- **Standalone mode** when installed
- **Theme integration** with system UI
- **Push notifications** (if you add them later)

### 🔧 Vercel-Specific Optimizations
- **Edge caching** for static assets
- **Automatic HTTPS** (required for PWA)
- **Global CDN** for fast loading
- **Serverless functions** support (if needed)

## 🏗️ File Structure for Deployment

```
project-root/
├── resume.html          # Main app (generated)
├── manifest.json        # PWA manifest (generated)
├── sw.js               # Service worker (generated)
├── icon-192.png        # 192x192 icon (you create)
├── icon-512.png        # 512x512 icon (you create)
├── vercel.json         # Vercel configuration
├── .vercelignore       # Files to exclude from deployment
└── ...
```

## 🔍 Testing Your PWA on Vercel

### Desktop Testing
1. Visit your Vercel URL in Chrome/Edge
2. Open DevTools → Application → Manifest
3. Check "Install app" button appears
4. Test offline mode in Network tab
5. Verify service worker registration

### Mobile Testing
1. Visit your Vercel URL on mobile Chrome/Safari
2. Look for "Add to Home Screen" prompt
3. Install the app
4. Test offline functionality
5. Verify standalone mode (no browser UI)

## 🎯 Domain Configuration

### Custom Domain (Optional)
1. In Vercel dashboard, go to your project
2. Navigate to Settings → Domains
3. Add your custom domain
4. Update `manifest.json` `start_url` if needed

### Environment Variables
If you need environment-specific configurations:
```json
{
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  }
}
```

## 🔧 Troubleshooting

### Common Issues

**PWA not installing:**
- Ensure you're using HTTPS (Vercel provides this)
- Check that `manifest.json` is accessible
- Verify icon files exist and are valid PNG

**Service worker not registering:**
- Check `sw.js` is at the root level
- Verify no console errors in DevTools
- Ensure proper MIME type is served

**Icons not showing:**
- Replace template files with actual PNG icons
- Verify icon dimensions (192x192, 512x512)
- Check file sizes aren't too large

### Debug Commands
```bash
# Verify files are generated
ls -la *.html *.json *.js *.png

# Check if files will be deployed
vercel --dry-run
```

## 📈 Performance Optimization

### Automatic Optimizations
- Vercel automatically optimizes images
- Gzip compression enabled
- CDN distribution worldwide
- Edge caching for static assets

### Manual Optimizations
- Icons are cached for 1 year
- Service worker cache is always fresh
- HTML cached for 1 hour for updates

## 🔄 Continuous Deployment

### GitHub Integration
1. Connect your GitHub repository to Vercel
2. Every push to main branch triggers deployment
3. Pull requests get preview deployments
4. Automatic PWA functionality on all deployments

### Build Command Setup
In Vercel dashboard or `vercel.json`:
```json
{
  "buildCommand": "pnpm run build:vercel"
}
```

## 🌟 Success Metrics

After deployment, your PWA should achieve:
- **Lighthouse PWA score**: 90+ 
- **Performance score**: 90+
- **Accessibility score**: 90+
- **SEO score**: 90+

Test at: https://web.dev/measure/

## 🎉 Final Checklist

- [ ] Run `pnpm run build:vercel`
- [ ] Create `icon-192.png` and `icon-512.png`
- [ ] Deploy to Vercel
- [ ] Test PWA installation on desktop
- [ ] Test PWA installation on mobile
- [ ] Verify offline functionality
- [ ] Check Lighthouse scores
- [ ] Test on different browsers

Your resume is now a fully functional PWA on Vercel! 🚀 