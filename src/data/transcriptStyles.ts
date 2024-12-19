import { TranscriptStyleOption } from '../types/transcript';

export const transcriptStyles: TranscriptStyleOption[] = [
  {
    id:1,
    value: 'transcript',
    label: 'Standard Transcript',
    description: 'Clean, accurate transcription with minimal editing',
    example: 'Direct transcription with speaker identification and timestamps'
  },
  {
    id:2,
    value: 'notetaker',
    label: 'Notetaker',
    description: 'Concise bullet points and key takeaways',
    example: '• Main point 1\n• Key insight 2\n• Action item 3'
  },
  {
    id:3,
    value: 'journal',
    label: 'Journal Entry',
    description: 'Personal, reflective writing style',
    example: 'Today I reflected on an insightful discussion about...'
  },
  {
    id:4,
    value: 'fiction',
    label: 'Fiction Writer',
    description: 'Creative narrative with descriptive elements',
    example: 'The conversation unfolded like a carefully orchestrated symphony...'
  },
  {
    id:5,
    value: 'nonfiction',
    label: 'Non-Fiction Writer',
    description: 'Factual, well-structured content',
    example: 'In this comprehensive analysis, we explore the key aspects...'
  },
  { 
    id:6,
    value: 'marketing',
    label: 'Marketing Copywriter',
    description: 'Persuasive, engaging content',
    example: 'Discover how this groundbreaking approach transforms...'
  },
  {
    id:7,
    value: 'academic',
    label: 'Academic Author',
    description: 'Scholarly, research-oriented format',
    example: 'The findings indicate a significant correlation between...'
  },
  {
    id:8,
    value: 'conference',
    label: 'Conference Moderator',
    description: 'Professional summary of discussions',
    example: 'During the panel discussion, experts addressed...'
  },
  {
    id:9,
    value: 'journalist',
    label: 'Journalist',
    description: 'News-style reporting format',
    example: 'In a recent development, industry leaders gathered to discuss...'
  },
  {
    id:10,
    value: 'linkedin',
    label: 'LinkedIn Poster',
    description: 'Professional, engaging social media content for LinkedIn',
    example: 'Excited to share insights from today\'s discussion on [Topic]...'
  },
  {
    id:11,
    value: 'thread',
    label: 'Thread Maker',
    description: 'Engaging, multi-part social media threads',
    example: '1/ Just finished an amazing discussion\n\n2/ Key insights...'
  },
  {
    id:12,
    value: 'xpost',
    label: 'X Post',
    description: 'Concise, impactful posts optimized for X (Twitter)',
    example: 'Key takeaway from today\'s talk: [Main Point]'
  }
];