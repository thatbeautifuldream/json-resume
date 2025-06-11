import fs from 'fs';
import path from 'path';

const htmlFile = path.join(process.cwd(), 'resume.html');
const scriptFile = path.join(process.cwd(), 'scripts/script.js');
const metaFile = path.join(process.cwd(), 'scripts/seo-meta.json');

// Read files
let html = fs.readFileSync(htmlFile, 'utf8');
const scriptContent = fs.readFileSync(scriptFile, 'utf8');
const metaInfo = JSON.parse(fs.readFileSync(metaFile, 'utf8'));

// Generate meta tags HTML
const metaTags = metaInfo.map((info: any) => {
  if (info.name) {
    return `<meta name="${info.name}" content="${info.content}">`;
  } else if (info.property) {
    return `<meta property="${info.property}" content="${info.content}">`;
  }
  return '';
}).join('\n  ');

// Inject meta tags after <meta charset>
html = html.replace(/(<meta charset=[^>]+>)/i, `$1\n  ${metaTags}`);

// Create the inline script tag with the content
const inlineScript = `<script>\n${scriptContent}\n</script>`;

// Find the position to insert the script (before closing html tag)
const insertPosition = html.lastIndexOf('</html>');

// Insert the script
const newHtml = html.slice(0, insertPosition) + '\n  ' + inlineScript + '\n' + html.slice(insertPosition);

// Write back to the file
fs.writeFileSync(htmlFile, newHtml);

console.log('Successfully injected script content and meta tags into resume.html'); 