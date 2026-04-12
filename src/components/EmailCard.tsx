import { Paper, Text, Group, Stack, Box, Avatar } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import type { Email, Account } from '@/types/email';
import IntentBadge from '@/components/IntentBadge';
import { formatRelativeTime } from '@/utils/formatDate';

interface EmailCardProps {
  email: Email;
  account?: Account;
}

/**
 * Redesigned email card with clear sender/receiver visibility.
 * Row 1: Subject + Intent badge + timestamp
 * Row 2: From (sender) + To (account/receiver)
 * Row 3: AI Summary
 */
const EmailCard = ({ email, account }: EmailCardProps) => {
  const navigate = useNavigate();

  const senderInitial = email.sender[0]?.toUpperCase() || '?';

  return (
    <Paper
      p="md"
      radius="md"
      onClick={() => navigate(`/email/${email.id}`)}
      style={{
        cursor: 'pointer',
        background: email.isRead
          ? 'hsl(var(--inbox-card-bg-read))'
          : 'hsl(var(--inbox-card-bg))',
        border: email.isRead
          ? '1px solid hsl(var(--inbox-card-border))'
          : '1px solid hsl(var(--inbox-card-border-unread) / 0.4)',
        borderLeft: account
          ? `3px solid ${account.color}`
          : undefined,
        transition: 'all 0.2s ease',
        boxShadow: email.isRead ? 'none' : 'var(--inbox-shadow)',
      }}
      className="hover:scale-[1.005]"
    >
      <Group wrap="nowrap" gap="md" align="flex-start">
        {/* Sender Avatar */}
        <Avatar
          size={40}
          radius="xl"
          color={account?.color || 'blue'}
          style={{ flexShrink: 0, marginTop: 2 }}
        >
          {senderInitial}
        </Avatar>

        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
          {/* Row 1: Subject + Intent + Timestamp */}
          <Group justify="space-between" wrap="nowrap">
            <Group gap="xs" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
              {!email.isRead && (
                <Box
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'hsl(var(--primary))',
                    flexShrink: 0,
                  }}
                />
              )}
              <Text
                fw={email.isRead ? 400 : 600}
                size="sm"
                style={{ color: 'hsl(var(--inbox-text-primary))' }}
                truncate
              >
                {email.subject}
              </Text>
            </Group>
            <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
              <IntentBadge intent={email.intent} />
              <Text size="xs" style={{ color: 'hsl(var(--inbox-text-muted))' }}>
                {formatRelativeTime(email.timestamp)}
              </Text>
            </Group>
          </Group>

          {/* Row 2: From + To */}
          <Group gap="sm" wrap="nowrap">
            <Group gap={4} wrap="nowrap">
              <Text size="xs" fw={500} style={{ color: 'hsl(var(--inbox-text-primary))' }}>
                {email.sender}
              </Text>
              <Text size="xs" style={{ color: 'hsl(var(--inbox-text-muted))' }}>
                &lt;{email.senderEmail}&gt;
              </Text>
            </Group>
            {account && (
              <Group gap={4} wrap="nowrap">
                <Text size="xs" style={{ color: 'hsl(var(--inbox-text-muted))' }}>→</Text>
                <Text
                  size="xs"
                  style={{
                    color: account.color,
                    fontWeight: 500,
                  }}
                >
                  {account.email}
                </Text>
              </Group>
            )}
          </Group>

          {/* Row 3: Summary */}
          <Text size="xs" lineClamp={2} style={{ color: 'hsl(var(--inbox-text-secondary))', opacity: 0.85 }}>
            {email.summary}
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
};

export default EmailCard;
