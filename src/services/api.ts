import axios from 'axios';
import dayjs from 'dayjs';
import type { Email, GenerateReplyPayload, GenerateReplyResponse } from '@/types/email';
import { MOCK_EMAILS } from '@/constants/mockData';

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

/**
 * Fetches all emails.
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

    // Mock AI-generated reply
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
