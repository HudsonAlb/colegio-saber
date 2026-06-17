const fs = require('fs');

function processFile(file) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let lines = content.split('\n');
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('< {')) {
      changed = true;
      let line = lines[i];
      if (line.includes('errors.')) {
        line = line.replace(/<\s*\{/, '<WarningCircle size={');
      } else if (line.includes('Conheça Nossa História') || line.includes('Explore Nossos') || line.includes('Conheça Nossos')) {
        line = line.replace(/<\s*\{/, '<CaretRight size={');
      } else if (file.includes('SegmentosPage.tsx') && line.includes('Sparkles')) {
        line = line.replace(/<\s*\{/, '<Sparkle size={');
      } else if (file.includes('SegmentosPage.tsx') && line.includes('default:')) {
        line = line.replace(/<\s*\{/, '<Question size={');
      } else if (file.includes('SegmentosPage.tsx') && line.includes('group-hover')) {
        line = line.replace(/<\s*\{/, '<CaretRight size={');
      } else if (file.includes('CalendarioPage.tsx') && line.includes('< {16} />')) {
        if ((lines[i-1] && lines[i-1].includes('Anterior')) || (lines[i-2] && lines[i-2].includes('Anterior')) || line.includes('Anterior')) {
          line = line.replace(/<\s*\{/, '<CaretLeft size={');
        } else {
          line = line.replace(/<\s*\{/, '<CaretRight size={');
        }
      } else if (file.includes('CalendarioPage.tsx') && line.includes('text-brand-charcoal/30')) {
        line = line.replace(/<\s*\{/, '<List size={'); 
      } else if (file.includes('BlogPage.tsx') && line.includes('animate-pulse')) {
        line = line.replace(/<\s*\{/, '<PlayCircle size={');
      } else if (file.includes('BlogPage.tsx') && line.includes('absolute left-4')) {
        line = line.replace(/<\s*\{/, '<MagnifyingGlass size={');
      } else if (file.includes('AdmissaoPage.tsx') && line.includes('< {10} />')) {
        line = line.replace(/<\s*\{/, '<WarningCircle size={');
      } else if (file.includes('AdmissaoPage.tsx') && line.includes('< {18}')) {
        line = line.replace(/<\s*\{/, '<CheckCircle size={');
      } else if (file.includes('TourVirtual.tsx') && line.includes('< {8} />')) {
        line = line.replace(/<\s*\{/, '<PlayCircle size={');
      } else {
         line = line.replace(/<\s*\{/, '<CaretRight size={');
      }

      if (!line.includes('weight=')) {
         line = line.replace('/>', ' weight="duotone" />');
      }
      lines[i] = line;
    }
  }

  if (changed) {
    fs.writeFileSync(file, lines.join('\n'), 'utf8');
    console.log('Fixed ' + file);
  }
}

processFile('src/pages/SegmentosPage.tsx');
processFile('src/pages/CalendarioPage.tsx');
processFile('src/pages/BlogPage.tsx');
processFile('src/pages/AdmissaoPage.tsx');
processFile('src/components/TourVirtual.tsx');
processFile('src/components/PillarsSection.tsx');
