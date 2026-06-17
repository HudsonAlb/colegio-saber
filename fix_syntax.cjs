const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    if (fs.statSync(file).isDirectory()) results = results.concat(walk(file));
    else if (file.endsWith('.tsx')) results.push(file);
  });
  return results;
}

const files = walk('src');
let changed = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Fix syntax error: <X size={24} / weight="duotone"> -> <X size={24} weight="duotone" />
  content = content.replace(/\/\s*weight="duotone">/g, 'weight="duotone" />');

  // Also verify normal tags: <Menu size={24}> might have become <Menu size={24} weight="duotone"> which is fine.
  // Let's check for any missing /> closures.
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changed++;
  }
});
console.log('Fixed syntax error in ' + changed + ' files');
