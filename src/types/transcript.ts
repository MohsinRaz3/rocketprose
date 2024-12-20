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
  | 'X Post';

export interface TranscriptStyleOption {
  id:number;
  value: string;
  label: TranscriptStyle;
  description: string;
  example: string;
  prompt: string
}