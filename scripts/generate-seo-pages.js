import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.log('dist/index.html does not exist yet. Run vite build first.');
  process.exit(0);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

const SEO_PAGES = [
  {
    path: '/clothing-as-emotional-armor',
    title: 'Clothing as Emotional Armor: Dress for Confidence',
    description: 'Learn how clothing as emotional armor helps you handle tough social situations. Discover dressing for confidence and what to wear to feel powerful.',
  },
  {
    path: '/dopamine-dressing',
    title: 'Dopamine Dressing: Do Colorful Clothes Boost Mood?',
    description: 'What is dopamine dressing? Learn how colorful clothes and color psychology in fashion can lift your mood, and how to build a brighter wardrobe.',
  },
  {
    path: '/how-shoes-affect-posture',
    title: 'How Shoes Affect Posture, Confidence & Presence',
    description: 'Discover how shoes affect posture, gait and authority. Learn how footwear psychology links your shoes and confidence, and how to choose the right pair.',
  },
  {
    path: '/architecture-of-enclothed-cognition',
    title: 'The Architecture of Enclothed Cognition | Sartorial Mind',
    description: 'How garments reprogram neural focus and abstract conceptualization based on Northwestern University research.',
  },
  {
    path: '/cognition-lab',
    title: 'Enclothed Cognition Lab | Sartorial Mind',
    description: 'Interactive tactile laboratory simulating the cognitive, neurochemical, and somatic impacts of distinct garment structures and weaves.',
  },
  {
    path: '/archetype-quiz',
    title: 'Sartorial Archetype Diagnostic | Sartorial Mind',
    description: 'Discover your sartorial personality archetype: explore whether your wardrobe functions as armor, camouflage, an emotional catalyst, or cognitive anchor.',
  },
  {
    path: '/manifesto',
    title: 'The Sartorial Mind Manifesto: Dress as Cognitive Architecture',
    description: 'Read the foundational editorial treatise on why clothing is an active cognitive prosthesis that authors, protects, and expands human consciousness.',
  },
];

for (const page of SEO_PAGES) {
  let pageHtml = baseHtml;

  // Replace Title
  pageHtml = pageHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${page.title}</title>`
  );

  // Replace Meta Description
  pageHtml = pageHtml.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${page.description}" />`
  );

  // Replace OpenGraph Title & Description
  pageHtml = pageHtml.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${page.title}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${page.description}" />`
  );

  const targetDir = path.join(distDir, page.path.replace(/^\//, ''));
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf-8');
  console.log(`Generated static SEO page: ${page.path}/index.html`);
}

console.log('SEO static pages generation complete.');
