export type TranscriptStyle = 
  | 'Standard Transcript'
  | 'Notetaker'
  | 'Journal Entry'
  | 'Fiction Writer'
  | 'Non-Fiction Writer'
  | 'Marketing Copywriter'
  | 'Academic Author'
  | 'Conference Moderator'
  | 'Journalist'
  | 'LinkedIn Poster'
  | 'Thread Maker'
  | 'X Post'
  | 'Blogger'
  | 'Newsletter Writer'
  | 'YouTube Describer'
  | 'Press Release Writer'
  | 'Pinterest Pinner'
  | 'Image Prompter'
  | 'Financial Analyst'
  | 'Email Writer'
  | 'Essay Writer';

export interface TranscriptStyleOption {
  id:number;
  value: string;
  label: string;
  description: string;
  example: string;
  prompt: string
}