import { Select, Group, Text, Avatar, Box } from '@mantine/core';
import type { Account } from '@/types/email';

interface AccountSwitcherProps {
  accounts: Account[];
  selectedAccountId: 'all' | string;
  onSelect: (id: 'all' | string) => void;
}

/**
 * Dropdown to switch between connected email accounts or view all.
 */
const AccountSwitcher = ({ accounts, selectedAccountId, onSelect }: AccountSwitcherProps) => {
  const data = [
    { value: 'all', label: 'All Accounts' },
    ...accounts.map((acc) => ({
      value: acc.id,
      label: acc.email,
    })),
  ];

  return (
    <Select
      value={selectedAccountId}
      onChange={(val) => onSelect(val || 'all')}
      data={data}
      size="sm"
      radius="md"
      placeholder="Select account"
      styles={{
        input: {
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid rgba(148, 163, 184, 0.15)',
          color: '#e2e8f0',
          minWidth: 200,
        },
      }}
    />
  );
};

export default AccountSwitcher;
