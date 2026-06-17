const fs = require('fs');
const path = require('path');

const map = {
  'Menu': 'List', 'X': 'X', 'GraduationCap': 'Student', 'MapPin': 'MapPin', 'Phone': 'Phone', 'Mail': 'Envelope', 'ChevronRight': 'CaretRight', 'ChevronLeft': 'CaretLeft', 'Play': 'PlayCircle', 'Map': 'MapTrifold', 'Camera': 'Camera', 'Maximize': 'CornersOut', 'Search': 'MagnifyingGlass', 'Calendar': 'Calendar', 'User': 'User', 'Tag': 'Tag', 'ArrowRight': 'ArrowRight', 'BookOpen': 'BookOpen', 'Image': 'Image', 'Sparkles': 'Sparkle', 'Clock': 'Clock', 'Info': 'Info', 'Check': 'Check', 'AlertCircle': 'WarningCircle', 'Filter': 'Faders', 'Star': 'Star', 'Users': 'Users', 'Brain': 'Brain', 'Heart': 'Heart', 'Shield': 'Shield', 'Compass': 'Compass', 'Trophy': 'Trophy', 'CheckCircle': 'CheckCircle', 'FileText': 'FileText', 'HelpCircle': 'Question', 'Target': 'Target', 'Tick': 'CheckCircle', 'Typing Comment': 'ChatCircleText', 'Notification': 'Clock', 'Shopping': 'Tote', 'Right Arrow': 'CaretRight', 'Quote': 'Quotes'
};

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

  // 1. Convert lucide-react imports
  const lucideMatch = content.match(/import\s+{([^}]+)}\s+from\s+['"]lucide-react['"]/);
  if (lucideMatch) {
    let imports = lucideMatch[1].split(',').map(s => s.trim());
    let newImports = imports.map(i => {
      let parts = i.split(' as ');
      let base = parts[0];
      let mapped = map[base] || base;
      return parts.length > 1 ? `${mapped} as ${parts[1]}` : mapped;
    });
    content = content.replace(lucideMatch[0], `import { ${newImports.join(', ')} } from '@phosphor-icons/react'`);

    // Add weight="duotone" to these icons
    newImports.forEach(i => {
      let iconName = i.split(' as ')[1] || i.split(' as ')[0];
      let regex = new RegExp(`<${iconName}(\\s[^>]*)?>`, 'g');
      content = content.replace(regex, (match) => {
        if (match.includes('weight=')) return match;
        return match.replace(/>$/, ' weight="duotone">');
      });
    });
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changed++;
  }
});
console.log('Fixed ' + changed + ' files');
