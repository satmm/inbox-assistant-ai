import { Select } from '@mantine/core';
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
    ...accounts.map((acc) => ({ value: acc.id, label: acc.email })),
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
          background: 'hsl(var(--inbox-input-bg))',
          border: '1px solid hsl(var(--inbox-input-border))',
          color: 'hsl(var(--inbox-text-primary))',
          minWidth: 200,
        },
      }}
    />
  );
};

export default AccountSwitcher;
