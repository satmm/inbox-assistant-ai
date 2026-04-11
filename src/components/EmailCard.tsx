import { Paper, Text, Group, Stack, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import type { Email } from '@/types/email';
import IntentBadge from '@/components/IntentBadge';
import { formatRelativeTime } from '@/utils/formatDate';

interface EmailCardProps {
  email: Email;
}

/**
 * Displays a summary card for an email in the dashboard list.
 */
const EmailCard = ({ email }: EmailCardProps) => {
  const navigate = useNavigate();

  return (
    <Paper
      p="md"
      radius="md"
      onClick={() => navigate(`/email/${email.id}`)}
      style={{
        cursor: 'pointer',
        background: email.isRead
          ? 'rgba(30, 41, 59, 0.4)'
          : 'rgba(30, 41, 59, 0.8)',
        border: email.isRead
          ? '1px solid rgba(148, 163, 184, 0.05)'
          : '1px solid rgba(59, 130, 246, 0.2)',
        transition: 'all 0.2s ease',
      }}
      className="hover:scale-[1.01]"
    >
      <Stack gap="xs">
        <Group justify="space-between" wrap="nowrap">
          <Group gap="xs" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
            {!email.isRead && (
              <Box
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#3b82f6',
                  flexShrink: 0,
                }}
              />
            )}
            <Text
              fw={email.isRead ? 400 : 600}
              size="sm"
              style={{ color: '#f8fafc' }}
              truncate
            >
              {email.subject}
            </Text>
          </Group>
          <IntentBadge intent={email.intent} />
        </Group>

        <Group justify="space-between" wrap="nowrap">
          <Text size="xs" c="dimmed" truncate>
            {email.sender}
          </Text>
          <Text size="xs" c="dimmed" style={{ flexShrink: 0 }}>
            {formatRelativeTime(email.timestamp)}
          </Text>
        </Group>

        <Text size="xs" c="dimmed" lineClamp={2} style={{ opacity: 0.7 }}>
          {email.summary}
        </Text>
      </Stack>
    </Paper>
  );
};

export default EmailCard;
