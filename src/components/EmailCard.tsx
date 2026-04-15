import { Paper, Text, Group, Stack, Box, Avatar, Checkbox } from '@mantine/core';
import type { Email, Account } from '@/types/email';
import IntentBadge from '@/components/IntentBadge';
import { formatRelativeTime } from '@/utils/formatDate';

interface EmailCardProps {
  email: Email;
  account?: Account;
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onClick?: () => void;
}

const EmailCard = ({ email, account, isSelected, onToggleSelect, onClick }: EmailCardProps) => {
  const senderInitial = email.sender[0]?.toUpperCase() || '?';

  return (
    <Paper
      p="md"
      radius="md"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        background: isSelected
          ? 'hsl(221 83% 53% / 0.04)'
          : email.isRead
          ? 'hsl(210 20% 98%)'
          : 'hsl(0 0% 100%)',
        border: isSelected
          ? '1px solid hsl(221 83% 53% / 0.3)'
          : email.isRead
          ? '1px solid hsl(214 32% 91%)'
          : '1px solid hsl(221 83% 53% / 0.25)',
        borderLeft: !email.isRead
          ? '3px solid hsl(221 83% 53%)'
          : account
          ? `3px solid ${account.color}`
          : undefined,
        transition: 'all 0.2s ease',
        boxShadow: email.isRead
          ? 'none'
          : '0 1px 4px 0 rgba(0,0,0,0.06)',
      }}
      className="hover:scale-[1.003]"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = isSelected
          ? 'hsl(221 83% 53% / 0.06)'
          : 'hsl(210 40% 96%)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = isSelected
          ? 'hsl(221 83% 53% / 0.04)'
          : email.isRead
          ? 'hsl(210 20% 98%)'
          : 'hsl(0 0% 100%)';
      }}
    >
      <Group wrap="nowrap" gap="md" align="flex-start">
        {/* Checkbox */}
        <Checkbox
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onToggleSelect?.();
          }}
          onClick={(e) => e.stopPropagation()}
          size="sm"
          styles={{
            input: { cursor: 'pointer', borderRadius: 4 },
          }}
          style={{ flexShrink: 0, marginTop: 4 }}
        />

        {/* Unread dot */}
        {!email.isRead && (
          <Box
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'hsl(221 83% 53%)',
              flexShrink: 0,
              marginTop: 8,
            }}
          />
        )}

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
            <Text
              fw={email.isRead ? 400 : 700}
              size="sm"
              style={{
                color: email.isRead ? 'hsl(215 20% 50%)' : 'hsl(222 47% 11%)',
              }}
              truncate
            >
              {email.subject}
            </Text>
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
              <Text
                size="xs"
                fw={email.isRead ? 400 : 600}
                style={{
                  color: email.isRead ? 'hsl(215 20% 55%)' : 'hsl(222 47% 11%)',
                }}
              >
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
          <Text
            size="xs"
            lineClamp={2}
            c="dimmed"
            style={{ opacity: email.isRead ? 0.7 : 0.9 }}
          >
            {email.summary}
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
};

export default EmailCard;
