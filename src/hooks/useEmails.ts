import { useCallback, useEffect } from 'react';
import { useEmailStore } from '@/store/emailStore';
import { getEmails, getEmailsByDate, getEmailById, generateReply } from '@/services/api';
import type { GenerateReplyPayload } from '@/types/email';

/**
 * Custom hook that encapsulates all email-related data fetching and actions.
 * Connects the API service layer to the Zustand store.
 */
export function useEmails() {
  const store = useEmailStore();

  const fetchEmails = useCallback(async () => {
    store.setLoading(true);
    store.setError(null);
    try {
      const data = store.filters.date
        ? await getEmailsByDate(store.filters.date)
        : await getEmails();
      store.setEmails(data);
    } catch {
      store.setError('Failed to load emails. Please try again.');
    } finally {
      store.setLoading(false);
    }
  }, [store.filters.date]);

  const fetchEmailById = useCallback(async (id: string) => {
    store.setLoading(true);
    store.setError(null);
    try {
      const email = await getEmailById(id);
      if (email) {
        store.setSelectedEmail(email);
        store.markAsRead(id);
      } else {
        store.setError('Email not found.');
      }
    } catch {
      store.setError('Failed to load email details.');
    } finally {
      store.setLoading(false);
    }
  }, []);

  const handleGenerateReply = useCallback(async (payload: GenerateReplyPayload) => {
    store.setGeneratingReply(true);
    try {
      // TODO: This calls the AI backend to generate a reply
      const result = await generateReply(payload);
      return result;
    } catch {
      store.setError('Failed to generate reply. Please try again.');
      return null;
    } finally {
      store.setGeneratingReply(false);
    }
  }, []);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  return {
    ...store,
    fetchEmails,
    fetchEmailById,
    handleGenerateReply,
  };
}
