export interface SeoMeta {
  title: string;
  metaDescription: string;
  mainKeyword: string;
  relatedKeywords: string[];
  canonicalPath: string;
  ogType?: string;
  h1?: string;
}

export const SEO_PAGE_MAP: Record<string, SeoMeta> = {
  '/': {
    title: 'Psychology of Dress: Clothes & Mood | Sartorial Mind',
    metaDescription: 'Explore the psychology of dress: how enclothed cognition and what you wear shape your mood, confidence and identity. Read our research-led articles.',
    mainKeyword: 'psychology of dress',
    relatedKeywords: ['enclothed cognition', 'how clothes affect mood'],
    canonicalPath: '/',
    ogType: 'website',
    h1: 'Psychology of Dress: Clothes & Mood',
  },
  '/clothing-as-emotional-armor': {
    title: 'Clothing as Emotional Armor: Dress for Confidence',
    metaDescription: 'Learn how clothing as emotional armor helps you handle tough social situations. Discover dressing for confidence and what to wear to feel powerful.',
    mainKeyword: 'clothing as emotional armor',
    relatedKeywords: ['dressing for confidence', 'what to wear to feel powerful'],
    canonicalPath: '/clothing-as-emotional-armor',
    ogType: 'article',
    h1: 'Clothing as Emotional Armor: Dress for Confidence',
  },
  '/dopamine-dressing': {
    title: 'Dopamine Dressing: Do Colorful Clothes Boost Mood?',
    metaDescription: 'What is dopamine dressing? Learn how colorful clothes and color psychology in fashion can lift your mood, and how to build a brighter wardrobe.',
    mainKeyword: 'dopamine dressing',
    relatedKeywords: ['colorful clothes and mood', 'color psychology in fashion'],
    canonicalPath: '/dopamine-dressing',
    ogType: 'article',
    h1: 'Dopamine Dressing: Do Colorful Clothes Boost Mood?',
  },
  '/how-shoes-affect-posture': {
    title: 'How Shoes Affect Posture, Confidence & Presence',
    metaDescription: 'Discover how shoes affect posture, gait and authority. Learn how footwear psychology links your shoes and confidence, and how to choose the right pair.',
    mainKeyword: 'how shoes affect posture',
    relatedKeywords: ['shoes and confidence', 'footwear psychology'],
    canonicalPath: '/how-shoes-affect-posture',
    ogType: 'article',
    h1: 'How Shoes Affect Posture, Confidence & Presence',
  },
  '/cognition-lab': {
    title: 'Enclothed Cognition Lab | Sartorial Mind',
    metaDescription: 'Interactive tactile laboratory simulating the cognitive, neurochemical, and somatic impacts of distinct garment structures and weaves.',
    mainKeyword: 'enclothed cognition laboratory',
    relatedKeywords: ['wardrobe cognitive impact', 'tactile neurobiology'],
    canonicalPath: '/cognition-lab',
    ogType: 'website',
    h1: 'The Enclothed Cognition Laboratory',
  },
  '/archetype-quiz': {
    title: 'Sartorial Archetype Diagnostic | Sartorial Mind',
    metaDescription: 'Discover your sartorial personality archetype: explore whether your wardrobe functions as armor, camouflage, an emotional catalyst, or cognitive anchor.',
    mainKeyword: 'sartorial personality archetype',
    relatedKeywords: ['fashion psychology quiz', 'wardrobe personality diagnostic'],
    canonicalPath: '/archetype-quiz',
    ogType: 'website',
    h1: 'Sartorial Archetype & Psychological Footprint',
  },
  '/manifesto': {
    title: 'The Sartorial Mind Manifesto: Dress as Cognitive Architecture',
    metaDescription: 'Read the foundational editorial treatise on why clothing is an active cognitive prosthesis that authors, protects, and expands human consciousness.',
    mainKeyword: 'sartorial psychology manifesto',
    relatedKeywords: ['embodied cognition fashion', 'philosophy of dress'],
    canonicalPath: '/manifesto',
    ogType: 'website',
    h1: 'The Sartorial Mind Manifesto: Dress as Cognitive Architecture',
  },
};
