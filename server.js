import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// SEO dictionary for server-side HTML responses
const SEO_MAP = {
  '/': {
    title: 'Psychology of Fashion: Clothes & Mood | Sartorial Mind',
    description: 'Explore the psychology of fashion: how what you wear shapes your mood, confidence and identity. Read our research-led psychology of dress articles.',
  },
  '/dressing-for-confidence': {
    title: 'Dressing for Confidence: Clothing as Emotional Armor',
    description: 'Learn dressing for confidence with clothing as emotional armor. Discover what to wear to feel confident and handle tough social situations.',
  },
  '/clothing-as-emotional-armor': {
    title: 'Dressing for Confidence: Clothing as Emotional Armor',
    description: 'Learn dressing for confidence with clothing as emotional armor. Discover what to wear to feel confident and handle tough social situations.',
  },
  '/dopamine-dressing': {
    title: 'Dopamine Dressing: Do Colorful Clothes Boost Mood?',
    description: 'What is dopamine dressing? Learn how colorful clothes and color psychology in fashion can lift your mood, and how to build a brighter wardrobe.',
  },
  '/how-shoes-affect-posture': {
    title: 'How Shoes Affect Posture, Confidence & Presence',
    description: 'Discover how shoes affect posture, gait and authority. Learn how footwear psychology links your shoes and confidence, and how to choose the right pair.',
  },
};

// Serve static assets from the Vite build directory
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: true,
  }));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Single Page Application (SPA) catch-all route with on-the-fly SEO head injection
app.get('*', (req, res) => {
  const reqPath = req.path.replace(/\/$/, '') || '/';
  const customPagePath = path.join(distPath, reqPath.replace(/^\//, ''), 'index.html');

  // If a pre-rendered static HTML file exists for this route, serve it directly
  if (reqPath !== '/' && fs.existsSync(customPagePath)) {
    return res.sendFile(customPagePath);
  }

  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf-8');
    const seo = SEO_MAP[reqPath];

    if (seo) {
      html = html.replace(/<title>.*?<\/title>/i, `<title>${seo.title}</title>`);
      html = html.replace(
        /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
        `<meta name="description" content="${seo.description}" />`
      );
      html = html.replace(
        /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
        `<meta property="og:title" content="${seo.title}" />`
      );
      html = html.replace(
        /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
        `<meta property="og:description" content="${seo.description}" />`
      );
    }

    return res.status(200).type('text/html').send(html);
  } else {
    res.status(503).send('Application is building. Please refresh in a moment.');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Production server running on http://0.0.0.0:${PORT}`);
});
