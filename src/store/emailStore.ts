import { create } from 'zustand';
import type { Email, EmailFilter, Account } from '@/types/email';

/**
 * Global email state managed by Zustand.
 * Holds accounts, emails, selection, filters, and loading/error states.
 */
interface EmailState {
  /** Connected email accounts */
  accounts: Account[];
  /** Currently selected account filter — 'all' shows emails from every account */
  selectedAccountId: 'all' | string;
  emails: Email[];
  selectedEmail: Email | null;
  filters: EmailFilter;
  isLoading: boolean;
  isGeneratingReply: boolean;
  error: string | null;

  // Account actions
  setAccounts: (accounts: Account[]) => void;
  addAccount: (account: Account) => void;
  removeAccount: (accountId: string) => void;
  setSelectedAccountId: (id: 'all' | string) => void;

  // Email actions
  setEmails: (emails: Email[]) => void;
  setSelectedEmail: (email: Email | null) => void;
  setFilter: (filter: Partial<EmailFilter>) => void;
  resetFilters: () => void;
  setLoading: (loading: boolean) => void;
  setGeneratingReply: (generating: boolean) => void;
  setError: (error: string | null) => void;
  markAsRead: (emailId: string) => void;
}

const initialFilters: EmailFilter = {
  date: null,
  intent: null,
  searchQuery: '',
};

export const useEmailStore = create<EmailState>((set) => ({
  accounts: [],
  selectedAccountId: 'all',
  emails: [],
  selectedEmail: null,
  filters: initialFilters,
  isLoading: false,
  isGeneratingReply: false,
  error: null,

  setAccounts: (accounts) => set({ accounts }),
  addAccount: (account) =>
    set((state) => ({ accounts: [...state.accounts, account] })),
  removeAccount: (accountId) =>
    set((state) => ({
      accounts: state.accounts.filter((a) => a.id !== accountId),
      // Reset to 'all' if the removed account was selected
      selectedAccountId:
        state.selectedAccountId === accountId ? 'all' : state.selectedAccountId,
    })),
  setSelectedAccountId: (selectedAccountId) => set({ selectedAccountId }),

  setEmails: (emails) => set({ emails }),
  setSelectedEmail: (email) => set({ selectedEmail: email }),
  setFilter: (filter) =>
    set((state) => ({ filters: { ...state.filters, ...filter } })),
  resetFilters: () => set({ filters: initialFilters }),
  setLoading: (isLoading) => set({ isLoading }),
  setGeneratingReply: (isGeneratingReply) => set({ isGeneratingReply }),
  setError: (error) => set({ error }),
  markAsRead: (emailId) =>
    set((state) => ({
      emails: state.emails.map((e) =>
        e.id === emailId ? { ...e, isRead: true } : e
      ),
    })),
}));
