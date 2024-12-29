import { TranscriptStyle } from './transcript';

export interface AudioState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  audioUrl: string | null;
  initialUserTranscription:string;
  userInputText:string;
  prose:string;
  isError : string
  isLoading : boolean
  transcriptStyle:string
}

export interface TranscriptionState {
  status: 'idle' | 'processing' | 'completed' | 'error';
  text: string;
  error?: string;
}

export interface TranscriptionOptions {
  style: TranscriptStyle;
  webhookUrl: string;
}
export type ActiveTab = "Record Audio" | "Text" | "Upload Audio" | "none";
