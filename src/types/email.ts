/**
 * Core email types used throughout the InboxAI application.
 */

export type EmailIntent = 'meeting' | 'task' | 'info';

export interface Account {
  id: string;
  email: string;
  provider: 'gmail' | 'outlook' | 'yahoo';
  name: string;
  color: string;
}

export interface Email {
  id: string;
  accountId: string;
  subject: string;
  sender: string;
  senderEmail: string;
  summary: string;
  intent: EmailIntent;
  timestamp: string;
  body: string;
  isRead: boolean;
}

export interface EmailFilter {
  dateRange: [Date | null, Date | null];
  intent: EmailIntent | null;
  searchQuery: string;
}

export interface GenerateReplyPayload {
  emailId: string;
  context: string;
  tone?: 'professional' | 'casual' | 'formal';
}

export interface GenerateReplyResponse {
  reply: string;
  confidence: number;
}
