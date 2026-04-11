import { useCallback, useEffect } from 'react';
import { useEmailStore } from '@/store/emailStore';
import {
  getEmails,
  getEmailsByDate,
  getEmailsByAccount,
  getEmailById,
  getAccounts,
  connectAccount as apiConnectAccount,
  disconnectAccount as apiDisconnectAccount,
  generateReply,
} from '@/services/api';
import type { GenerateReplyPayload, Account } from '@/types/email';

/**
 * Custom hook that encapsulates all email and account data fetching and actions.
 * Connects the API service layer to the Zustand store.
 */
export function useEmails() {
  const store = useEmailStore();

  /** Fetch all connected accounts */
  const fetchAccounts = useCallback(async () => {
    try {
      const accounts = await getAccounts();
      store.setAccounts(accounts);
    } catch {
      console.error('[useEmails] Failed to fetch accounts');
    }
  }, []);

  /** Fetch emails — respects account and date filters */
  const fetchEmails = useCallback(async () => {
    store.setLoading(true);
    store.setError(null);
    try {
      let data;
      if (store.filters.date) {
        data = await getEmailsByDate(store.filters.date);
      } else if (store.selectedAccountId !== 'all') {
        data = await getEmailsByAccount(store.selectedAccountId);
      } else {
        data = await getEmails();
      }

      // If we fetched by date but also have an account filter, apply it client-side
      if (store.filters.date && store.selectedAccountId !== 'all') {
        data = data.filter((e) => e.accountId === store.selectedAccountId);
      }

      store.setEmails(data);
    } catch {
      store.setError('Failed to load emails. Please try again.');
    } finally {
      store.setLoading(false);
    }
  }, [store.filters.date, store.selectedAccountId]);

  /** Fetch a single email by ID */
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

  /**
   * Connect a new email account via OAuth.
   * TODO: Integrate with backend OAuth flow
   */
  const connectNewAccount = useCallback(async (provider: Account['provider']) => {
    try {
      const account = await apiConnectAccount(provider);
      store.addAccount(account);
      return account;
    } catch {
      store.setError('Failed to connect account. Please try again.');
      return null;
    }
  }, []);

  /**
   * Disconnect an email account.
   * TODO: Backend should revoke OAuth tokens
   */
  const removeAccount = useCallback(async (accountId: string) => {
    try {
      await apiDisconnectAccount(accountId);
      store.removeAccount(accountId);
    } catch {
      store.setError('Failed to disconnect account.');
    }
  }, []);

  /** Generate an AI reply */
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

  // Fetch accounts + emails on mount
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  return {
    ...store,
    fetchAccounts,
    fetchEmails,
    fetchEmailById,
    connectNewAccount,
    removeAccount,
    handleGenerateReply,
  };
}
