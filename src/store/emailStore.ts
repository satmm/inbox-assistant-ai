import { create } from 'zustand';
import type { Email, EmailFilter, Account } from '@/types/email';

interface EmailState {
  accounts: Account[];
  selectedAccountId: 'all' | string;
  emails: Email[];
  selectedEmail: Email | null;
  filters: EmailFilter;
  isLoading: boolean;
  isGeneratingReply: boolean;
  error: string | null;

  /** IDs of emails selected via checkboxes */
  selectedEmailIds: Set<string>;

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
  markAsUnread: (emailId: string) => void;
  bulkMarkAsRead: (ids: string[]) => void;
  bulkMarkAsUnread: (ids: string[]) => void;
  bulkDelete: (ids: string[]) => void;
  toggleSelectEmail: (id: string) => void;
  selectAllEmails: (ids: string[]) => void;
  deselectAllEmails: () => void;
}

const initialFilters: EmailFilter = {
  dateRange: [null, null],
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
  selectedEmailIds: new Set(),

  setAccounts: (accounts) => set({ accounts }),
  addAccount: (account) =>
    set((state) => ({ accounts: [...state.accounts, account] })),
  removeAccount: (accountId) =>
    set((state) => ({
      accounts: state.accounts.filter((a) => a.id !== accountId),
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
  markAsUnread: (emailId) =>
    set((state) => ({
      emails: state.emails.map((e) =>
        e.id === emailId ? { ...e, isRead: false } : e
      ),
    })),
  bulkMarkAsRead: (ids) =>
    set((state) => ({
      emails: state.emails.map((e) =>
        ids.includes(e.id) ? { ...e, isRead: true } : e
      ),
    })),
  bulkMarkAsUnread: (ids) =>
    set((state) => ({
      emails: state.emails.map((e) =>
        ids.includes(e.id) ? { ...e, isRead: false } : e
      ),
    })),
  bulkDelete: (ids) =>
    set((state) => ({
      emails: state.emails.filter((e) => !ids.includes(e.id)),
      selectedEmailIds: new Set(),
    })),
  toggleSelectEmail: (id) =>
    set((state) => {
      const next = new Set(state.selectedEmailIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { selectedEmailIds: next };
    }),
  selectAllEmails: (ids) => set({ selectedEmailIds: new Set(ids) }),
  deselectAllEmails: () => set({ selectedEmailIds: new Set() }),
}));
