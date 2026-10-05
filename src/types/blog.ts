export interface Author {
  name: string;
  role: string;
  affiliation: string;
  bio: string;
  avatarInitials: string;
}

export interface SectionFigure {
  caption: string;
  credit: string;
  type: 'illustration' | 'diagram' | 'textile' | 'specimen';
}

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
  pullQuote?: string;
  figure?: SectionFigure;
  marginNote?: string;
}

export interface Comment {
  id: string;
  author: string;
  date: string;
  content: string;
  role?: string;
  reactions: {
    resonates: number;
    insightful: number;
  };
  userReacted?: 'resonates' | 'insightful';
}

export interface VisualPlate {
  motif: 'tailoring' | 'armor' | 'spectrum' | 'theatre' | 'chameleon' | 'tactile' | 'zen' | 'footwear' | 'evolution' | 'sustainable';
  primaryHex: string;
  secondaryHex: string;
  texturePattern: string;
  symbolLabel: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  kicker: string;
  subtitle: string;
  category: 'Cognitive Science' | 'Social Armor' | 'Affective States' | 'Self & Identity' | 'Cultural Habit';
  readTime: string;
  publishedDate: string;
  issueNumber: string;
  author: Author;
  abstract: string;
  keyTakeaways: string[];
  sections: ArticleSection[];
  psychologicalExercise: {
    title: string;
    description: string;
    actionPrompt: string;
  };
  tags: string[];
  featured?: boolean;
  leadStory?: boolean;
  visualPlate: VisualPlate;
  imageUrl: string;
  secondaryImageUrl?: string;
  imageCredit?: string;
  comments: Comment[];
  likesCount: number;
  bookmarksCount: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  context: string;
  options: {
    id: string;
    text: string;
    archetype: 'armor' | 'chameleon' | 'dopamine' | 'minimalist' | 'alchemist';
    annotation: string;
  }[];
}

export interface ArchetypeResult {
  id: 'armor' | 'chameleon' | 'dopamine' | 'minimalist' | 'alchemist';
  title: string;
  tagline: string;
  psychologicalProfile: string;
  coreMotivation: string;
  potentialShadow: string;
  cognitiveRecommendation: string;
  suggestedArticles: string[];
  powerGarment: string;
}

export interface WardrobeCognitionItem {
  id: string;
  name: string;
  category: string;
  iconName: string;
  psychologicalState: string;
  cognitiveShift: string;
  empiricalEvidence: string;
  hapticFeedback: string;
  recommendedSituation: string;
  primaryColor: string;
}
