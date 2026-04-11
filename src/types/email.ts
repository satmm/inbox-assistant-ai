/**
 * Core email types used throughout the InboxAI application.
 * These types define the shape of email data returned by the API.
 */

export type EmailIntent = 'meeting' | 'task' | 'info';

/**
 * Represents a connected email account.
 * TODO: Extend with OAuth metadata once backend auth is integrated.
 */
export interface Account {
  id: string;
  email: string;
  provider: 'gmail' | 'outlook' | 'yahoo';
  /** Display name for the account owner */
  name: string;
  /** Color used to visually distinguish this account in the UI */
  color: string;
}

export interface Email {
  id: string;
  /** References Account.id — links email to a specific account */
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
