import fs from 'fs';
import path from 'path';

const htmlFile = path.join(process.cwd(), 'resume.html');
const printScript = '<script src="scripts/script.js"></script>';

// Read the HTML file
const html = fs.readFileSync(htmlFile, 'utf8');

// Find the position to insert the script (before closing html tag)
const insertPosition = html.lastIndexOf('</html>');

// Insert the script
const newHtml = html.slice(0, insertPosition) + '\n  ' + printScript + '\n' + html.slice(insertPosition);

// Write back to the file
fs.writeFileSync(htmlFile, newHtml);

console.log('Successfully injected script.js into resume.html'); 