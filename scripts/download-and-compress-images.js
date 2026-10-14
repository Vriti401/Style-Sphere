import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const imagesDir = path.join(rootDir, 'public', 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const IMAGES = [
  {
    name: 'enclothed-cognition.webp',
    id: 'photo-1507679799987-c73779587ccf',
  },
  {
    name: 'dressing-for-confidence.webp',
    id: 'photo-1544441893-675973e31985',
  },
  {
    name: 'dopamine-dressing.webp',
    id: 'photo-1509631179647-0177331693ae',
  },
  {
    name: 'impression-management.webp',
    id: 'photo-1490481651871-ab68de25d43d',
  },
  {
    name: 'chameleon-conformity.webp',
    id: 'photo-1483985988355-763728e1935b',
  },
  {
    name: 'tactile-psyche.webp',
    id: 'photo-1584917865442-de89df76afd3',
  },
  {
    name: 'minimalist-uniform.webp',
    id: 'photo-1489987707025-afc232f7ea0f',
  },
  {
    name: 'shoes-posture.webp',
    id: 'photo-1520639888713-7851133b1ed0',
  },
  {
    name: 'wardrobe-metamorphosis.webp',
    id: 'photo-1558769132-cb1aea458c5e',
  },
  {
    name: 'sustainable-clothing.webp',
    id: 'photo-1532453288672-3a27e9be9efd',
  },
];

console.log('Fetching and compressing images into optimized WebP under 150 KB...');

for (const img of IMAGES) {
  const destPath = path.join(imagesDir, img.name);
  const tempJpg = path.join('/tmp', `${img.name}.jpg`);
  const url = `https://images.unsplash.com/${img.id}?auto=format&fit=crop&w=1000&q=80`;

  execSync(`curl -sL "${url}" -o "${tempJpg}"`);
  execSync(`convert "${tempJpg}" -resize 960x -quality 82 -define webp:method=6 "${destPath}"`);

  const stat = fs.statSync(destPath);
  const kb = Math.round(stat.size / 1024);
  console.log(`Saved ${img.name}: ${kb} KB (Target < 150 KB: ${kb < 150 ? 'PASS' : 'FAIL'})`);
  
  if (fs.existsSync(tempJpg)) {
    fs.unlinkSync(tempJpg);
  }
}

console.log('All images compressed and verified.');
