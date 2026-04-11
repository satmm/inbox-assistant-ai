/**
 * Core email types used throughout the InboxAI application.
 * These types define the shape of email data returned by the API.
 */

export type EmailIntent = 'meeting' | 'task' | 'info';

export interface Email {
  id: string;
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
  date: Date | null;
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
