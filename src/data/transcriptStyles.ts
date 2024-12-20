import { TranscriptStyleOption } from '../types/transcript';

export const transcriptStyles: TranscriptStyleOption[] = [
  {
    "id": 1,
    "value": "transcript",
    "label": "Standard Transcript",
    "description": "Clean, accurate transcription with minimal editing",
    "example": "Direct transcription with speaker identification and timestamps",
    "prompt": "Create a clean and accurate transcript. Include speaker identification and timestamps while minimizing edits."
  },
  {
    "id": 2,
    "value": "notetaker",
    "label": "Notetaker",
    "description": "Concise bullet points and key takeaways",
    "example": "• Main point 1\n• Key insight 2\n• Action item 3",
    "prompt": "Summarize the content into concise bullet points, highlighting key takeaways and action items."
  },
  {
    "id": 3,
    "value": "journal",
    "label": "Journal Entry",
    "description": "Personal, reflective writing style",
    "example": "Today I reflected on an insightful discussion about...",
    "prompt": "Write a personal and reflective journal entry based on the given context."
  },
  {
    "id": 4,
    "value": "fiction",
    "label": "Fiction Writer",
    "description": "Creative narrative with descriptive elements",
    "example": "The conversation unfolded like a carefully orchestrated symphony...",
    "prompt": "Craft a creative and descriptive narrative inspired by the provided details."
  },
  {
    "id": 5,
    "value": "nonfiction",
    "label": "Non-Fiction Writer",
    "description": "Factual, well-structured content",
    "example": "In this comprehensive analysis, we explore the key aspects...",
    "prompt": "Develop a factual and well-structured piece of content, emphasizing clarity and depth."
  },
  {
    "id": 6,
    "value": "marketing",
    "label": "Marketing Copywriter",
    "description": "Persuasive, engaging content",
    "example": "Discover how this groundbreaking approach transforms...",
    "prompt": "Write persuasive and engaging marketing content that captivates the audience."
  },
  {
    "id": 7,
    "value": "academic",
    "label": "Academic Author",
    "description": "Scholarly, research-oriented format",
    "example": "The findings indicate a significant correlation between...",
    "prompt": "Compose scholarly content in a research-oriented format, including evidence-based insights."
  },
  {
    "id": 8,
    "value": "conference",
    "label": "Conference Moderator",
    "description": "Professional summary of discussions",
    "example": "During the panel discussion, experts addressed...",
    "prompt": "Provide a professional summary of the discussion, emphasizing key points and expert insights."
  },
  {
    "id": 9,
    "value": "journalist",
    "label": "Journalist",
    "description": "News-style reporting format",
    "example": "In a recent development, industry leaders gathered to discuss...",
    "prompt": "Draft a news-style report, focusing on recent developments and key details."
  },
  {
    "id": 10,
    "value": "linkedin",
    "label": "LinkedIn Poster",
    "description": "Professional, engaging social media content for LinkedIn",
    "example": "Excited to share insights from today's discussion on [Topic]...",
    "prompt": "Write a professional and engaging LinkedIn post summarizing key insights."
  },
  {
    "id": 11,
    "value": "thread",
    "label": "Thread Maker",
    "description": "Engaging, multi-part social media threads",
    "example": "1/ Just finished an amazing discussion\n\n2/ Key insights...",
    "prompt": "Create an engaging multi-part social media thread that captures key insights and details."
  },
  {
    "id": 12,
    "value": "xpost",
    "label": "X Post",
    "description": "Concise, impactful posts optimized for X (Twitter)",
    "example": "Key takeaway from today's talk: [Main Point]",
    "prompt": "Write a concise and impactful post optimized for X (Twitter), focusing on the main takeaway."
  }
]
