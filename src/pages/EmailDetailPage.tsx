import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Group,
  Button,
  Box,
  Divider,
  Avatar,
} from '@mantine/core';
import { useEmails } from '@/hooks/useEmails';
import IntentBadge from '@/components/IntentBadge';
import ReplyBox from '@/components/ReplyBox';
import EmailSkeleton from '@/components/EmailSkeleton';
import ErrorState from '@/components/ErrorState';
import { formatFullDate } from '@/utils/formatDate';

/**
 * Email detail page — full email content, AI summary, and reply composer.
 */
const EmailDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedEmail, accounts, isLoading, isGeneratingReply, error, fetchEmailById, handleGenerateReply } =
    useEmails();

  useEffect(() => {
    if (id) fetchEmailById(id);
  }, [id]);

  const account = useMemo(
    () => accounts.find((a) => a.id === selectedEmail?.accountId),
    [accounts, selectedEmail?.accountId]
  );

  const wrapperStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, hsl(var(--inbox-bg-gradient-from)) 0%, hsl(var(--inbox-bg-gradient-to)) 100%)',
    transition: 'background 0.3s ease',
  };

  if (isLoading) {
    return (
      <Box style={wrapperStyle}>
        <Container size="md" py="xl"><EmailSkeleton /></Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box style={wrapperStyle}>
        <Container size="md" py="xl">
          <ErrorState message={error} onRetry={() => id && fetchEmailById(id)} />
        </Container>
      </Box>
    );
  }

  if (!selectedEmail) return null;

  return (
    <Box style={wrapperStyle}>
      {/* Header */}
      <Box
        py="md"
        px="lg"
        style={{
          borderBottom: '1px solid hsl(var(--inbox-header-border))',
          background: 'hsl(var(--inbox-header-bg) / 0.85)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Container size="md">
          <Group>
            <Button
              variant="subtle"
              color="gray"
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              ← Back
            </Button>
          </Group>
        </Container>
      </Box>

      <Container size="md" py="lg">
        <Stack gap="lg">
          {/* Email Header */}
          <Stack gap="xs">
            <Group justify="space-between" wrap="nowrap">
              <Title order={3} style={{ color: 'hsl(var(--inbox-text-primary))', letterSpacing: '-0.01em' }}>
                {selectedEmail.subject}
              </Title>
              <IntentBadge intent={selectedEmail.intent} />
            </Group>

            <Group gap="sm">
              <Avatar size={32} radius="xl" color={account?.color || 'blue'}>
                {selectedEmail.sender[0]?.toUpperCase()}
              </Avatar>
              <Stack gap={0}>
                <Group gap={4}>
                  <Text size="sm" fw={500} style={{ color: 'hsl(var(--inbox-text-primary))' }}>
                    {selectedEmail.sender}
                  </Text>
                  <Text size="xs" style={{ color: 'hsl(var(--inbox-text-muted))' }}>
                    &lt;{selectedEmail.senderEmail}&gt;
                  </Text>
                </Group>
                {account && (
                  <Text size="xs" style={{ color: 'hsl(var(--inbox-text-secondary))' }}>
                    To: {account.email}
                  </Text>
                )}
              </Stack>
            </Group>

            <Text size="xs" style={{ color: 'hsl(var(--inbox-text-muted))' }}>
              {formatFullDate(selectedEmail.timestamp)}
            </Text>
          </Stack>

          {/* AI Summary */}
          <Paper
            p="md"
            radius="md"
            style={{
              background: 'linear-gradient(135deg, hsl(221 83% 53% / 0.08), hsl(259 60% 55% / 0.08))',
              border: '1px solid hsl(221 83% 53% / 0.2)',
            }}
          >
            <Stack gap="xs">
              <Text size="xs" fw={600} style={{ color: 'hsl(221 83% 60%)' }}>
                ✨ AI Summary
              </Text>
              <Text size="sm" style={{ color: 'hsl(var(--inbox-text-secondary))' }}>
                {selectedEmail.summary}
              </Text>
            </Stack>
          </Paper>

          <Divider color="hsl(var(--inbox-card-border))" />

          {/* Email Body */}
          <Paper
            p="md"
            radius="md"
            style={{
              background: 'hsl(var(--inbox-card-bg))',
              border: '1px solid hsl(var(--inbox-card-border))',
            }}
          >
            <Text
              size="sm"
              style={{ color: 'hsl(var(--inbox-text-secondary))', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}
            >
              {selectedEmail.body}
            </Text>
          </Paper>

          <Divider color="hsl(var(--inbox-card-border))" />

          {/* Reply */}
          <ReplyBox
            emailId={selectedEmail.id}
            emailSubject={selectedEmail.subject}
            isGenerating={isGeneratingReply}
            onGenerate={handleGenerateReply}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default EmailDetailPage;
