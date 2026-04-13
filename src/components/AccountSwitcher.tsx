import { Select } from '@mantine/core';
import type { Account } from '@/types/email';

interface AccountSwitcherProps {
  accounts: Account[];
  selectedAccountId: 'all' | string;
  onSelect: (id: 'all' | string) => void;
}

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
          background: 'hsl(210 40% 96%)',
          border: '1px solid hsl(214 32% 91%)',
          color: 'hsl(222 47% 11%)',
          minWidth: 200,
        },
      }}
    />
  );
};

export default AccountSwitcher;
