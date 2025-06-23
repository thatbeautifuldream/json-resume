// Create simple placeholder icons for Vercel deployment
import fs from 'fs';
import path from 'path';

// Function to create a minimal SVG as base64 PNG placeholder
function createBase64Icon(size) {
  // Create a simple SVG with "MM" initials
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#0095ff"/>
    <text x="50%" y="50%" font-family="Arial,sans-serif" font-size="${Math.floor(size * 0.4)}" 
          fill="white" text-anchor="middle" dominant-baseline="central" font-weight="bold">MM</text>
  </svg>`;
  
  // Convert SVG to base64 data URL
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

// Create minimal HTML files that display the icons (for manual conversion to PNG)
function createIconHtml(size, outputPath) {
  const dataUrl = createBase64Icon(size);
  
  const html = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      margin: 0; 
      padding: 20px; 
      font-family: Arial, sans-serif; 
      background: #f0f0f0;
    }
    .container {
      text-align: center;
    }
    .icon-display {
      display: inline-block;
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin: 20px;
    }
    .icon {
      width: ${size}px;
      height: ${size}px;
      background: #0095ff;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: ${Math.floor(size * 0.4)}px;
      font-weight: bold;
      border-radius: 8px;
    }
    .instructions {
      margin-top: 20px;
      padding: 20px;
      background: #e8f4fd;
      border-radius: 8px;
      border-left: 4px solid #0095ff;
    }
    .data-url {
      word-break: break-all;
      background: #f8f9fa;
      padding: 10px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>PWA Icon ${size}x${size}</h1>
    <div class="icon-display">
      <div class="icon">MM</div>
    </div>
    
    <div class="instructions">
      <h3>To create the PNG file:</h3>
      <ol>
        <li><strong>Method 1:</strong> Take a screenshot of the icon above and crop to ${size}x${size}</li>
        <li><strong>Method 2:</strong> Use an online SVG to PNG converter with the data URL below</li>
        <li><strong>Method 3:</strong> Use design software like Figma, Canva, or GIMP</li>
      </ol>
      
      <h4>SVG Data URL:</h4>
      <div class="data-url">${dataUrl}</div>
      
      <p><strong>Save the final PNG as:</strong> <code>icon-${size}.png</code> in your project root</p>
    </div>
  </div>
</body>
</html>`;
  
  fs.writeFileSync(outputPath, html);
  console.log(`Created icon template: ${outputPath}`);
}

// Generate simple placeholder PNGs using a base64 approach
// This creates a very basic fallback - users should replace with proper icons
function createFallbackIconFile(size, outputPath) {
  // Create a minimal 1x1 PNG base64 and scale instructions
  const instructions = `# ${size}x${size} Icon Placeholder

This is a placeholder. Please replace with an actual ${size}x${size} PNG file.

To create your icon:
1. Use the ${outputPath.replace('.png', '.html')} file as reference
2. Create a ${size}x${size} PNG image
3. Replace this file with your actual icon

The icon should represent your resume/personal brand.
Colors used in the design: #0095ff (primary blue), white text.
`;
  
  fs.writeFileSync(outputPath.replace('.png', '_README.txt'), instructions);
}

// Create icons for different sizes
const rootDir = process.cwd();

// Create HTML templates for manual conversion
createIconHtml(192, path.join(rootDir, 'icon-192-template.html'));
createIconHtml(512, path.join(rootDir, 'icon-512-template.html'));

// Create instruction files
createFallbackIconFile(192, path.join(rootDir, 'icon-192.png'));
createFallbackIconFile(512, path.join(rootDir, 'icon-512.png'));

console.log('\n✅ PWA icon templates created for Vercel deployment!');
console.log('\n📋 Next steps:');
console.log('1. Open icon-192-template.html and icon-512-template.html in your browser');
console.log('2. Create PNG files from the displayed icons (screenshot or SVG converter)');
console.log('3. Save them as icon-192.png and icon-512.png in your project root');
console.log('4. Deploy to Vercel - your PWA will be ready!');
console.log('\n🚀 The Vercel config is already set up to serve your PWA correctly.'); 