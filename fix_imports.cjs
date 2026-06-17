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

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let phosphorMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]@phosphor-icons\/react['"]/);
  
  if (phosphorMatch) {
    let importedIcons = phosphorMatch[1].split(',').map(i => i.trim());
    
    let tagMatches = content.match(/<([A-Z][a-zA-Z0-9]*)/g);
    if (tagMatches) {
      let uniqueTags = [...new Set(tagMatches.map(t => t.substring(1)))];
      
      let changed = false;
      let newImportStr = phosphorMatch[0];
      
      uniqueTags.forEach(tag => {
        let knownPhosphor = ['List','X','Student','MapPin','Phone','Envelope','CaretRight','CaretLeft','PlayCircle','MapTrifold','CornersOut','MagnifyingGlass','Sparkle','WarningCircle','Faders','CheckCircle','Question','Compass','Info','Maximize2','MoveHorizontal'];
        if (knownPhosphor.includes(tag) && !importedIcons.includes(tag)) {
          console.log(file + ' is missing import for: ' + tag);
          newImportStr = newImportStr.replace('}', ', ' + tag + ' }');
          importedIcons.push(tag);
          changed = true;
        }
      });
      
      if (changed) {
        content = content.replace(phosphorMatch[0], newImportStr);
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed ' + file);
      }
    }
  }
});
