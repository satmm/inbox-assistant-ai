import { create } from 'zustand';
import type { Email, EmailFilter } from '@/types/email';

/**
 * Global email state managed by Zustand.
 * Holds emails, selection, filters, and loading/error states.
 */
interface EmailState {
  emails: Email[];
  selectedEmail: Email | null;
  filters: EmailFilter;
  isLoading: boolean;
  isGeneratingReply: boolean;
  error: string | null;

  // Actions
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
  emails: [],
  selectedEmail: null,
  filters: initialFilters,
  isLoading: false,
  isGeneratingReply: false,
  error: null,

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
