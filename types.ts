export type QuestionType = 'single' | 'multiple' | 'intro' | 'result' | 'info';

export interface Option {
  id: string;
  label: string;
  emoji?: string;
}

export interface QuestionStep {
  id: number;
  type: QuestionType;
  title: string;
  subtitle?: string;
  description?: string; // For intro text
  options?: Option[];
  layout?: 'list' | 'grid' | 'cards-side';
}

export interface AnswerState {
  [key: number]: string | string[];
}

export interface LeadData {
  answers: AnswerState;
  timestamp: string;
  source: string;
  email?: string;
}