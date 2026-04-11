import { Badge, Group, Text } from '@mantine/core';
import type { Account } from '@/types/email';

interface AccountBadgeProps {
  account: Account | undefined;
}

/**
 * Renders a color-coded badge showing which account an email belongs to.
 * Displays the account email with matching accent color.
 */
const AccountBadge = ({ account }: AccountBadgeProps) => {
  if (!account) return null;

  return (
    <Badge
      size="xs"
      variant="dot"
      radius="sm"
      styles={{
        root: {
          borderColor: account.color,
          color: account.color,
          textTransform: 'none',
          fontWeight: 400,
        },
      }}
    >
      {account.email}
    </Badge>
  );
};

export default AccountBadge;
