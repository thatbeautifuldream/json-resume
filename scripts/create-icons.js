// Simple script to create placeholder PWA icons
import fs from 'fs';
import path from 'path';

// Function to create a simple SVG icon and convert to PNG placeholder
function createPlaceholderIcon(size, outputPath) {
  // Create a simple SVG with initials "MM" for Milind Mishra
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#0095ff"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" 
          fill="white" text-anchor="middle" dominant-baseline="central" font-weight="bold">MM</text>
  </svg>`;
  
  // For now, we'll create a simple HTML file that can be converted to PNG manually
  // In a real scenario, you'd use a library like sharp or canvas to generate PNG
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; padding: 0; }
    .icon { width: ${size}px; height: ${size}px; background: #0095ff; display: flex; align-items: center; justify-content: center; color: white; font-family: Arial, sans-serif; font-size: ${size * 0.4}px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="icon">MM</div>
</body>
</html>`;
  
  fs.writeFileSync(outputPath.replace('.png', '.html'), htmlContent);
  
  // Create a simple text file with instructions
  const instructions = `To create the actual PNG file:
1. Open ${outputPath.replace('.png', '.html')} in a browser
2. Take a screenshot or use browser dev tools
3. Save as ${outputPath}
4. Or use an online SVG to PNG converter with this SVG:

${svg}`;
  
  fs.writeFileSync(outputPath.replace('.png', '_instructions.txt'), instructions);
  
  console.log(`Created placeholder files for ${size}x${size} icon`);
}

// Create placeholder icons
const rootDir = process.cwd();
createPlaceholderIcon(192, path.join(rootDir, 'icon-192.png'));
createPlaceholderIcon(512, path.join(rootDir, 'icon-512.png'));

console.log('PWA icon placeholders created. Please replace with actual PNG files.');
console.log('You can use the generated HTML files to create the actual icons, or use any image editor.'); 