const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('frontend/src');
const publicImages = new Set(fs.readdirSync('frontend/public/images'));

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (/\.(tsx|ts|jsx|js|css)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(srcDir);
console.log('Scanning', files.length, 'files...');

const allHits = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match any extension .webp, .png, .jpg, .svg, .gif
  const regex = /["'`]([^"'`\(\)]+\.(?:webp|png|jpg|jpeg|svg|gif))["'`]/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const raw = match[1];
    if (raw.includes('node_modules')) continue;
    allHits.push({
      file: path.relative(srcDir, f),
      ref: raw
    });
  }
  
  // Also check url(...) in CSS/inline styles
  const urlRegex = /url\(['"]?([^'"\)]+)['"]?\)/gi;
  while ((match = urlRegex.exec(content)) !== null) {
    const raw = match[1];
    allHits.push({
      file: path.relative(srcDir, f),
      ref: 'CSS url: ' + raw
    });
  }
});

console.log('Total references found:', allHits.length);
const problemHits = [];

allHits.forEach(h => {
  let str = h.ref.replace('CSS url: ', '').trim();
  if (str.startsWith('data:') || str.startsWith('http://') || str.startsWith('https://')) return;
  // Ignore next.svg, file.svg, globe.svg, vercel.svg, window.svg
  if (/^(?:\/)?(?:next|file|globe|vercel|window)\.svg$/.test(str)) return;
  
  // Extract basename
  let b = path.basename(str.split('?')[0]);
  if (!publicImages.has(b)) {
    problemHits.push({ ...h, basename: b });
  }
});

console.log('\n--- ALL POTENTIAL MISSING ASSETS IN SRC ---');
if (problemHits.length === 0) {
  console.log('No missing assets detected!');
} else {
  problemHits.forEach(p => {
    console.log(`${p.file} -> ${p.ref} (basename: "${p.basename}")`);
  });
}
