const fs = require('fs');

const content = fs.readFileSync('src/pages/SegmentosPage.tsx', 'utf8');
const phosphorMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]@phosphor-icons\/react['"]/);
if (phosphorMatch) {
  let icons = phosphorMatch[1].split(',').map(i => i.trim()).filter(Boolean);
  
  const phosphor = require('@phosphor-icons/react');
  icons.forEach(icon => {
    if (!phosphor[icon]) {
      console.log('MISSING IN PHOSPHOR: ' + icon);
    }
  });
}
