import axios from 'axios';
import dayjs from 'dayjs';
import type { Email, Account, GenerateReplyPayload, GenerateReplyResponse } from '@/types/email';
import { MOCK_EMAILS, MOCK_ACCOUNTS } from '@/constants/mockData';

/**
 * Axios instance configured for the InboxAI backend.
 * TODO: Replace baseURL with real backend API endpoint.
 * TODO: Add request/response interceptors for auth token injection.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO: Add auth interceptor once authentication is implemented
// apiClient.interceptors.request.use((config) => {
//   const token = getAuthToken(); // from secure httpOnly cookie
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

/**
 * Simulates network latency for mock data in development.
 */
const simulateDelay = (ms = 800): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ──────────────────────────────────────
// Account API
// ──────────────────────────────────────

/**
 * Fetches all connected email accounts.
 * TODO: Replace with real backend API endpoint: GET /api/accounts
 */
export async function getAccounts(): Promise<Account[]> {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await apiClient.get<Account[]>('/accounts');
    // return response.data;

    await simulateDelay(500);
    return MOCK_ACCOUNTS;
  } catch (error) {
    console.error('[API] Failed to fetch accounts:', error);
    throw error;
  }
}

/**
 * Initiates OAuth flow to connect a new email account.
 * TODO: Integrate with backend OAuth flow — POST /api/accounts/connect
 * TODO: Backend should handle OAuth redirect, token exchange, and secure storage.
 * SECURITY: OAuth tokens must NEVER be stored in the frontend.
 */
export async function connectAccount(provider: Account['provider']): Promise<Account> {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await apiClient.post<Account>('/accounts/connect', { provider });
    // return response.data;

    await simulateDelay(1000);

    // Mock: return a new fake account
    const mockNewAccount: Account = {
      id: `acc-${Date.now()}`,
      email: `newuser@${provider}.com`,
      provider,
      name: `New ${provider.charAt(0).toUpperCase() + provider.slice(1)} Account`,
      color: '#f59e0b',
    };
    return mockNewAccount;
  } catch (error) {
    console.error('[API] Failed to connect account:', error);
    throw error;
  }
}

/**
 * Disconnects an email account.
 * TODO: Replace with real backend API endpoint: DELETE /api/accounts/:id
 * TODO: Backend should revoke OAuth tokens on disconnect.
 */
export async function disconnectAccount(accountId: string): Promise<void> {
  try {
    // TODO: Uncomment when backend is ready
    // await apiClient.delete(`/accounts/${accountId}`);

    await simulateDelay(500);
  } catch (error) {
    console.error('[API] Failed to disconnect account:', error);
    throw error;
  }
}

// ──────────────────────────────────────
// Email API
// ──────────────────────────────────────

/**
 * Fetches all emails across all accounts.
 * TODO: Replace with real backend API endpoint: GET /api/emails
 */
export async function getEmails(): Promise<Email[]> {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await apiClient.get<Email[]>('/emails');
    // return response.data;

    await simulateDelay();
    return MOCK_EMAILS;
  } catch (error) {
    console.error('[API] Failed to fetch emails:', error);
    throw error;
  }
}

/**
 * Fetches emails for a specific account.
 * TODO: Replace with real backend API endpoint: GET /api/emails?accountId=xxx
 */
export async function getEmailsByAccount(accountId: string): Promise<Email[]> {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await apiClient.get<Email[]>(`/emails?accountId=${accountId}`);
    // return response.data;

    await simulateDelay();
    return MOCK_EMAILS.filter((email) => email.accountId === accountId);
  } catch (error) {
    console.error('[API] Failed to fetch emails by account:', error);
    throw error;
  }
}

/**
 * Fetches emails filtered by date.
 * TODO: Replace with real backend API endpoint: GET /api/emails?date=YYYY-MM-DD
 */
export async function getEmailsByDate(date: Date): Promise<Email[]> {
  try {
    // TODO: Uncomment when backend is ready
    // const formatted = dayjs(date).format('YYYY-MM-DD');
    // const response = await apiClient.get<Email[]>(`/emails?date=${formatted}`);
    // return response.data;

    await simulateDelay();
    const target = dayjs(date).format('YYYY-MM-DD');
    return MOCK_EMAILS.filter(
      (email) => dayjs(email.timestamp).format('YYYY-MM-DD') === target
    );
  } catch (error) {
    console.error('[API] Failed to fetch emails by date:', error);
    throw error;
  }
}

/**
 * Fetches a single email by ID.
 * TODO: Replace with real backend API endpoint: GET /api/emails/:id
 */
export async function getEmailById(id: string): Promise<Email | undefined> {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await apiClient.get<Email>(`/emails/${id}`);
    // return response.data;

    await simulateDelay(500);
    return MOCK_EMAILS.find((email) => email.id === id);
  } catch (error) {
    console.error(`[API] Failed to fetch email ${id}:`, error);
    throw error;
  }
}

/**
 * Generates an AI-powered professional reply for an email.
 * TODO: Replace with real backend API endpoint: POST /api/emails/reply
 * TODO: This will call the AI service on the backend (e.g., OpenAI, Gemini)
 */
export async function generateReply(
  data: GenerateReplyPayload
): Promise<GenerateReplyResponse> {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await apiClient.post<GenerateReplyResponse>('/emails/reply', data);
    // return response.data;

    await simulateDelay(1500);

    return {
      reply: `Thank you for your email regarding "${data.context}". I appreciate you reaching out.\n\nI've reviewed the details and would like to confirm my availability. I'll follow up with any questions shortly.\n\nBest regards`,
      confidence: 0.92,
    };
  } catch (error) {
    console.error('[API] Failed to generate reply:', error);
    throw error;
  }
}

export { apiClient };
