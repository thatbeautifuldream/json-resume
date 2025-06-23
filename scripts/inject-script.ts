import fs from 'fs';
import path from 'path';

const htmlFile = path.join(process.cwd(), 'resume.html');
const scriptFile = path.join(process.cwd(), 'scripts/script.js');
const metaFile = path.join(process.cwd(), 'scripts/seo-meta.json');
const manifestFile = path.join(process.cwd(), 'scripts/manifest.json');
const serviceWorkerFile = path.join(process.cwd(), 'scripts/sw.js');
const pwaSetupFile = path.join(process.cwd(), 'scripts/pwa-setup.js');

// Read files
let html = fs.readFileSync(htmlFile, 'utf8');
const scriptContent = fs.readFileSync(scriptFile, 'utf8');
const pwaSetupContent = fs.readFileSync(pwaSetupFile, 'utf8');
const metaInfo = JSON.parse(fs.readFileSync(metaFile, 'utf8'));

// Copy PWA files to root directory
fs.copyFileSync(manifestFile, path.join(process.cwd(), 'manifest.json'));
fs.copyFileSync(serviceWorkerFile, path.join(process.cwd(), 'sw.js'));

console.log('Copied PWA files to root directory');

// Generate meta tags HTML
const metaTags = metaInfo.map((info: any) => {
  if (info.name) {
    return `<meta name="${info.name}" content="${info.content}">`;
  } else if (info.property) {
    return `<meta property="${info.property}" content="${info.content}">`;
  }
  return '';
}).join('\n  ');

// PWA-specific meta tags and links
const pwaTags = `
  <meta name="theme-color" content="#0095ff">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="Resume">
  <link rel="manifest" href="/manifest.json">
  <link rel="apple-touch-icon" href="/icon-192.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
  <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png">`;

// Inject meta tags and PWA tags after <meta charset>
html = html.replace(/(<meta charset=[^>]+>)/i, `$1\n  ${metaTags}${pwaTags}`);

// Create the inline script tag with both contents
const combinedScriptContent = `${scriptContent}\n\n${pwaSetupContent}`;
const inlineScript = `<script>\n${combinedScriptContent}\n</script>`;

// Find the position to insert the script (before closing html tag)
const insertPosition = html.lastIndexOf('</html>');

// Insert the script
const newHtml = html.slice(0, insertPosition) + '\n  ' + inlineScript + '\n' + html.slice(insertPosition);

// Write back to the file
fs.writeFileSync(htmlFile, newHtml);

console.log('Successfully injected script content, PWA setup, and meta tags into resume.html'); 