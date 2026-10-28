export interface StoryParagraph {
  id: number;
  text: string;
  image: string;
  caption: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface OrderItem {
  id: number;
  stepNumber: number;
  title: string;
  description: string;
  image: string;
}

export interface RiddleQuestion {
  id: number;
  clue: string;
  questionType: string;
  options: string[];
  correctIndex: number;
  fact: string;
}

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  gradeLevel: string;
  theme: string;
  moralValue: string;
  paragraphs: StoryParagraph[];
  quizQuestions: QuizQuestion[];
  orderingItems: OrderItem[];
  riddleQuestions: RiddleQuestion[];
}

export type ActiveScreen = 'home' | 'library' | 'story' | 'game-quiz' | 'game-order' | 'game-riddles' | 'celebration';
