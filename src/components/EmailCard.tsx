import { Paper, Text, Group, Stack, Box, Avatar } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import type { Email, Account } from '@/types/email';
import IntentBadge from '@/components/IntentBadge';
import { formatRelativeTime } from '@/utils/formatDate';

interface EmailCardProps {
  email: Email;
  account?: Account;
}

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
        background: email.isRead ? 'hsl(210 20% 98%)' : 'hsl(0 0% 100%)',
        border: email.isRead
          ? '1px solid hsl(214 32% 91%)'
          : '1px solid hsl(221 83% 53% / 0.4)',
        borderLeft: account ? `3px solid ${account.color}` : undefined,
        transition: 'all 0.2s ease',
        boxShadow: email.isRead
          ? 'none'
          : '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)',
      }}
      className="hover:scale-[1.005]"
    >
      <Group wrap="nowrap" gap="md" align="flex-start">
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
                    background: 'hsl(221 83% 53%)',
                    flexShrink: 0,
                  }}
                />
              )}
              <Text
                fw={email.isRead ? 400 : 600}
                size="sm"
                style={{ color: 'hsl(222 47% 11%)' }}
                truncate
              >
                {email.subject}
              </Text>
            </Group>
            <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
              <IntentBadge intent={email.intent} />
              <Text size="xs" c="dimmed">
                {formatRelativeTime(email.timestamp)}
              </Text>
            </Group>
          </Group>

          {/* Row 2: From + To */}
          <Group gap="sm" wrap="nowrap">
            <Group gap={4} wrap="nowrap">
              <Text size="xs" fw={500} style={{ color: 'hsl(222 47% 11%)' }}>
                {email.sender}
              </Text>
              <Text size="xs" c="dimmed">
                &lt;{email.senderEmail}&gt;
              </Text>
            </Group>
            {account && (
              <Group gap={4} wrap="nowrap">
                <Text size="xs" c="dimmed">→</Text>
                <Text size="xs" fw={500} style={{ color: account.color }}>
                  {account.email}
                </Text>
              </Group>
            )}
          </Group>

          {/* Row 3: Summary */}
          <Text size="xs" lineClamp={2} c="dimmed" style={{ opacity: 0.85 }}>
            {email.summary}
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
};

export default EmailCard;
