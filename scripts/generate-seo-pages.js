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
    path: '/dressing-for-confidence',
    title: 'Dressing for Confidence: Clothing as Emotional Armor',
    description: 'Learn dressing for confidence with clothing as emotional armor. Discover what to wear to feel confident and handle tough social situations.',
    h1: 'Dressing for Confidence: Clothing as Emotional Armor',
    bodyContent: `
      <div class="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col font-sans">
        <header class="border-b border-[#E7E2D8] py-4 px-6 max-w-4xl mx-auto w-full flex items-center justify-between">
          <a href="/" class="font-serif text-2xl font-medium tracking-tight text-[#1C1917]">Sartorial Mind</a>
          <nav class="flex items-center gap-6 text-sm text-stone-600">
            <a href="/" class="hover:text-stone-900">All Essays</a>
            <a href="/dopamine-dressing" class="hover:text-stone-900">Read: Dopamine Dressing</a>
            <a href="/how-shoes-affect-posture" class="hover:text-stone-900">Read: How Shoes Affect Posture</a>
          </nav>
        </header>

        <main class="max-w-4xl mx-auto px-6 pt-10 pb-20 w-full">
          <p class="text-xs uppercase tracking-widest text-stone-500 mb-2 font-mono">VOL. VIII · ESSAY 02 · SOCIAL ARMOR</p>
          <h1 class="font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-6">
            Dressing for Confidence: Clothing as Emotional Armor
          </h1>
          <p class="text-lg text-stone-700 leading-relaxed mb-6 font-sans">
            Mastering <strong>dressing for confidence</strong> transforms everyday attire into an intentional psychological barrier. Explore how clothing as emotional armor empowers the psyche and reveals what to wear to feel confident in demanding social landscapes.
          </p>

          <div class="mb-10 aspect-[16/9] w-full rounded overflow-hidden border border-stone-800/10">
            <img src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=70&fm=webp" alt="Textured charcoal wool coat with protective high collar illustrating dressing for confidence and clothing as emotional armor" class="w-full h-full object-cover" loading="lazy" />
          </div>

          <article class="space-y-8">
            <section>
              <h2 class="font-serif text-2xl sm:text-3xl font-medium mb-3">01. Why do humans use clothing as emotional armor?</h2>
              <p class="text-base sm:text-lg text-stone-800 leading-relaxed mb-4">
                Humans use clothing as emotional armor to construct an instinctive physical and psychological shield against social vulnerability, judgment, and sensory overwhelm. Much like ancient talismans protected against wilderness threats, modern heavy garments provide an artificial epidermal barrier that helps maintain emotional sovereignty.
              </p>
              <p class="text-base text-stone-700 leading-relaxed">
                In moments of acute social anxiety or professional scrutiny, humans instinctively turn to protective textiles to establish somatic equilibrium. Consider the immediate bodily response to intense emotional heartbreak or professional humiliation: a profound feeling of being flayed, peeled open, and raw. In these moments, individuals frequently report an urgent urge to wear voluminous sweaters, turtlenecks, or oversized trench coats as a protective cocoon.
              </p>
            </section>

            <section>
              <h2 class="font-serif text-2xl sm:text-3xl font-medium mb-3">02. How does dressing for confidence alter our nervous system?</h2>
              <p class="text-base sm:text-lg text-stone-800 leading-relaxed mb-4">
                Dressing for confidence alters the nervous system by activating deep pressure stimulation through dense textiles, which triggers the vagus nerve and down-regulates stress hormones like cortisol. When weighty wools or structured outerwear press against the dermis, the body shifts out of sympathetic fight-or-flight into composed equilibrium.
              </p>
              <p class="text-base text-stone-700 leading-relaxed">
                Recent clinical trials examining sensory processing disorders demonstrate that structured garments deliver a continuous grounding feedback loop. When exploring the somatic science of dressing for confidence, heavy textiles pressing against the skin—such as a 24-ounce Melton wool peacoat or heavy leather jacket—activate parasympathetic nerve branches.
              </p>
            </section>

            <section>
              <h2 class="font-serif text-2xl sm:text-3xl font-medium mb-3">03. What to wear to feel confident in high-stakes social situations?</h2>
              <p class="text-base sm:text-lg text-stone-800 leading-relaxed mb-4">
                To feel confident in high-stakes social situations, choose structured silhouettes with protective collars and grounding footwear that physically prevent submissive slumping. Strategic neck coverage shields vulnerable carotid points, allowing the trapezius muscles to release chronic defensive tension.
              </p>
              <p class="text-base text-stone-700 leading-relaxed">
                When learning what to wear to feel confident before an intimidating confrontation, strategic collar height and solid shoulder tailoring short-circuit involuntary physical twitching, giving you an unfiltered somatic advantage.
              </p>
            </section>
          </article>
        </main>
      </div>
    `,
  },
  {
    path: '/clothing-as-emotional-armor',
    title: 'Dressing for Confidence: Clothing as Emotional Armor',
    description: 'Learn dressing for confidence with clothing as emotional armor. Discover what to wear to feel confident and handle tough social situations.',
    h1: 'Dressing for Confidence: Clothing as Emotional Armor',
    bodyContent: `
      <div class="min-h-screen bg-[#FBF9F5] text-[#1C1917] p-8 max-w-4xl mx-auto font-sans">
        <h1 class="font-serif text-3xl font-medium mb-4">Dressing for Confidence: Clothing as Emotional Armor</h1>
        <p class="mb-4">Redirecting to <a href="/dressing-for-confidence" class="font-semibold underline">Dressing for Confidence</a>.</p>
      </div>
    `,
  },
  {
    path: '/dopamine-dressing',
    title: 'Dopamine Dressing: Do Colorful Clothes Boost Mood?',
    description: 'What is dopamine dressing? Learn how colorful clothes and color psychology in fashion can lift your mood, and how to build a brighter wardrobe.',
    h1: 'Dopamine Dressing: Do Colorful Clothes Boost Mood?',
    bodyContent: `
      <div class="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col font-sans">
        <header class="border-b border-[#E7E2D8] py-4 px-6 max-w-4xl mx-auto w-full flex items-center justify-between">
          <a href="/" class="font-serif text-2xl font-medium tracking-tight text-[#1C1917]">Sartorial Mind</a>
          <nav class="flex items-center gap-6 text-sm text-stone-600">
            <a href="/" class="hover:text-stone-900">All Essays</a>
            <a href="/dressing-for-confidence" class="hover:text-stone-900">Read: Dressing for Confidence</a>
            <a href="/how-shoes-affect-posture" class="hover:text-stone-900">Read: How Shoes Affect Posture</a>
          </nav>
        </header>

        <main class="max-w-4xl mx-auto px-6 pt-10 pb-20 w-full">
          <p class="text-xs uppercase tracking-widest text-stone-500 mb-2 font-mono">VOL. VIII · ESSAY 03 · AFFECTIVE STATES</p>
          <h1 class="font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-6">
            Dopamine Dressing: Do Colorful Clothes Boost Mood?
          </h1>
          <p class="text-lg text-stone-700 leading-relaxed mb-6 font-sans">
            What is <strong>dopamine dressing</strong>? Moving beyond pop clichés, neuroaesthetics reveals how <strong>colorful clothes and mood</strong> and <strong>color psychology in fashion</strong> stimulate catecholamine synthesis, lifting affective states and breaking psychological inertia.
          </p>

          <div class="mb-10 aspect-[16/9] w-full rounded overflow-hidden border border-stone-800/10">
            <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=750&q=68&fm=webp" alt="Vibrant yellow and cobalt fashion silk dress in motion demonstrating dopamine dressing, colorful clothes and mood elevation" class="w-full h-full object-cover" loading="lazy" />
          </div>

          <article class="space-y-8">
            <section>
              <h2 class="font-serif text-2xl sm:text-3xl font-medium mb-3">01. What is dopamine dressing and how does it stimulate the brain?</h2>
              <p class="text-base sm:text-lg text-stone-800 leading-relaxed mb-4">
                Dopamine dressing is the intentional practice of wearing colorful clothes to stimulate neurotransmitter release and elevate psychological mood. Visual exposure to saturated wavelengths directly excites retinal ganglion cells that signal the brain’s endocrine reward pathways.
              </p>
              <p class="text-base text-stone-700 leading-relaxed">
                The clinical phenomenon of dopamine dressing demonstrates that sensory inputs from what we wear actively trigger neurotransmitter pathways in the brain. Human beings are intensely visual primates whose retinas contain photosensitive cells that connect directly to the hypothalamus and suprachiasmatic nucleus.
              </p>
            </section>

            <section>
              <h2 class="font-serif text-2xl sm:text-3xl font-medium mb-3">02. Can colorful clothes boost mood during periods of low energy?</h2>
              <p class="text-base sm:text-lg text-stone-800 leading-relaxed mb-4">
                Yes, wearing colorful clothes boosts mood by disrupting depressive monochromatism and prompting active behavioral activation. Introducing vibrant pigments interrupts psychological camouflage, signaling vitality and cognitive hope back to the wearer with every mirror reflection.
              </p>
              <p class="text-base text-stone-700 leading-relaxed">
                In major depressive episodes, patients almost universally gravitate toward desaturated, indistinct attire: ash grey, faded black, washed-out navy. By deliberately introducing a single chromatic element, the individual executes an act of somatic defiance.
              </p>
            </section>

            <section>
              <h2 class="font-serif text-2xl sm:text-3xl font-medium mb-3">03. How does color psychology in fashion influence personal perception?</h2>
              <p class="text-base sm:text-lg text-stone-800 leading-relaxed mb-4">
                Color psychology in fashion influences personal perception by connecting specific chromatic wavelengths with autobiographical memory and cultural meaning. Rather than generic color wheels, the neurological reward comes from wearing shades tied to restorative memories and joyful life milestones.
              </p>
              <p class="text-base text-stone-700 leading-relaxed">
                The neurological reward of dopamine dressing occurs not from following arbitrary commercial charts, but from choosing tones with deep autobiographical resonance: pigments linked to restorative travels, joyful milestones, or warm interpersonal memories.
              </p>
            </section>
          </article>
        </main>
      </div>
    `,
  },
  {
    path: '/how-shoes-affect-posture',
    title: 'How Shoes Affect Posture, Confidence & Presence',
    description: 'Discover how shoes affect posture, gait and authority. Learn how footwear psychology links your shoes and confidence, and how to choose the right pair.',
    h1: 'How Shoes Affect Posture, Confidence & Presence',
    bodyContent: `
      <div class="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col font-sans">
        <header class="border-b border-[#E7E2D8] py-4 px-6 max-w-4xl mx-auto w-full flex items-center justify-between">
          <a href="/" class="font-serif text-2xl font-medium tracking-tight text-[#1C1917]">Sartorial Mind</a>
          <nav class="flex items-center gap-6 text-sm text-stone-600">
            <a href="/" class="hover:text-stone-900">All Essays</a>
            <a href="/dressing-for-confidence" class="hover:text-stone-900">Read: Dressing for Confidence</a>
            <a href="/dopamine-dressing" class="hover:text-stone-900">Read: Dopamine Dressing</a>
          </nav>
        </header>

        <main class="max-w-4xl mx-auto px-6 pt-10 pb-20 w-full">
          <p class="text-xs uppercase tracking-widest text-stone-500 mb-2 font-mono">VOL. VIII · ESSAY 08 · SOMATIC PSYCHOLOGY</p>
          <h1 class="font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-6">
            How Shoes Affect Posture, Confidence & Presence
          </h1>
          <p class="text-lg text-stone-700 leading-relaxed mb-6 font-sans">
            Discover <strong>how shoes affect posture</strong>, gait, and authority. In truth, human posture begins at the soles of our feet, where <strong>footwear psychology</strong> links your <strong>shoes and confidence</strong> to spinal stability and physical poise.
          </p>

          <div class="mb-10 aspect-[16/9] w-full rounded overflow-hidden border border-stone-800/10">
            <img src="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=700&q=68&fm=webp" alt="Classic welted leather dress brogues and boots resting on stone paving demonstrating how shoes affect posture, shoes and confidence, and footwear psychology" class="w-full h-full object-cover" loading="lazy" />
          </div>

          <article class="space-y-8">
            <section>
              <h2 class="font-serif text-2xl sm:text-3xl font-medium mb-3">01. How do shoes affect posture and spinal alignment?</h2>
              <p class="text-base sm:text-lg text-stone-800 leading-relaxed mb-4">
                Shoes affect posture by acting as the kinetic foundation of the human skeleton, determining calcaneal balance, pelvic tilt, and spinal curvature. Solid soles and firm heel support center the pelvis and open the thoracic spine, promoting effortless upright alignment and deep diaphragmatic breathing.
              </p>
              <p class="text-base text-stone-700 leading-relaxed">
                Biomechanical and neurological research reveals how shoes affect posture from the ground up, dictating the alignment of the entire skeletal column. A shoe with zero arch stability or an excessively soft foam sole causes internal rotation of the femur, an anterior pelvic tilt, and a compensatory slouch in the upper thoracic spine.
              </p>
            </section>

            <section>
              <h2 class="font-serif text-2xl sm:text-3xl font-medium mb-3">02. Why do shoes and confidence link together through footwear psychology?</h2>
              <p class="text-base sm:text-lg text-stone-800 leading-relaxed mb-4">
                Shoes and confidence are linked through footwear psychology because firm ground contact activates proprioceptive stability, while acoustic cadence communicates commanding presence. The solid stride of leather-soled shoes naturally decelerates rushed walking, reinforcing composure and self-assurance before entering any room.
              </p>
              <p class="text-base text-stone-700 leading-relaxed">
                Within footwear psychology, acoustic feedback also plays a decisive role. The soft, squeaking sound of foam trainers signals urgency or stealth. By contrast, the clean, crisp cadence of a stacked leather heel striking a hardwood floor announces presence before speech is even initiated.
              </p>
            </section>
          </article>
        </main>
      </div>
    `,
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

  // If specific semantic body content is provided, inject it inside <div id="root">
  if (page.bodyContent) {
    pageHtml = pageHtml.replace(
      /<div id="root">[\s\S]*?<\/div>/i,
      `<div id="root">${page.bodyContent}</div>`
    );
  }

  const targetDir = path.join(distDir, page.path.replace(/^\//, ''));
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf-8');
  console.log(`Generated static SEO page: ${page.path}/index.html`);
}

console.log('SEO static pages generation complete.');
