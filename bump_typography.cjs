const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Weight bumps for better readability with Quicksand
  content = content.replace(/\bfont-light\b/g, 'font-medium');
  content = content.replace(/\bfont-normal\b/g, 'font-medium');
  // Typography scale bumps
  content = content.replace(/\btext-\[10px\]\b/g, 'text-sm');
  content = content.replace(/\btext-\[11px\]\b/g, 'text-sm');
  content = content.replace(/\btext-xs\b/g, 'text-base');
  content = content.replace(/\btext-sm\b/g, 'text-lg');
  content = content.replace(/\btext-base\b/g, 'text-xl');

  // Padding & Gap
  content = content.replace(/\bpy-16\b/g, 'py-24');
  content = content.replace(/\bpy-20\b/g, 'py-32');
  content = content.replace(/\bpy-24\b/g, 'py-32');
  content = content.replace(/\bp-4\b/g, 'p-6');
  content = content.replace(/\bp-5\b/g, 'p-8');
  content = content.replace(/\bp-6\b/g, 'p-10');

  // Tracking
  content = content.replace(/tracking-\[0\.3em\]/g, 'tracking-wider');
  content = content.replace(/tracking-\[0\.25em\]/g, 'tracking-wider');
  content = content.replace(/tracking-widest/g, 'tracking-wider');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

// Update global body font-weight
let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('font-weight: 500;')) {
  css = css.replace('font-family: var(--font-sans);', 'font-family: var(--font-sans);\n    font-weight: 500;');
  fs.writeFileSync('src/index.css', css, 'utf8');
  console.log('Updated index.css');
}

console.log('Done');
