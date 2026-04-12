import { useState } from 'react';
import { Textarea, Button, Stack, Paper, Text, Group, Box } from '@mantine/core';
import type { GenerateReplyPayload, GenerateReplyResponse } from '@/types/email';

interface ReplyBoxProps {
  emailId: string;
  emailSubject: string;
  isGenerating: boolean;
  onGenerate: (payload: GenerateReplyPayload) => Promise<GenerateReplyResponse | null>;
}

/**
 * Reply composer with AI-powered reply generation.
 * TODO: Connect "Send" action to backend email sending API.
 */
const ReplyBox = ({ emailId, emailSubject, isGenerating, onGenerate }: ReplyBoxProps) => {
  const [replyText, setReplyText] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setError('');
    if (!replyText.trim() && !emailSubject) {
      setError('Please type some context for the AI to generate a reply.');
      return;
    }
    const result = await onGenerate({
      emailId,
      context: replyText.trim() || emailSubject,
      tone: 'professional',
    });
    if (result) setReplyText(result.reply);
  };

  const handleSend = () => {
    if (!replyText.trim()) {
      setError('Reply cannot be empty.');
      return;
    }
    // TODO: Call backend API to send email reply
    setReplyText('');
  };

  return (
    <Paper
      p="md"
      radius="md"
      style={{
        background: 'hsl(var(--inbox-card-bg))',
        border: '1px solid hsl(var(--inbox-card-border))',
      }}
    >
      <Stack gap="sm">
        <Text size="sm" fw={500} style={{ color: 'hsl(var(--inbox-text-primary))' }}>
          Reply
        </Text>

        <Textarea
          placeholder="Type your reply or let AI generate one..."
          minRows={4}
          maxRows={8}
          autosize
          value={replyText}
          onChange={(e) => { setReplyText(e.currentTarget.value); setError(''); }}
          styles={{
            input: {
              background: 'hsl(var(--inbox-input-bg))',
              border: '1px solid hsl(var(--inbox-input-border))',
              color: 'hsl(var(--inbox-text-primary))',
            },
          }}
        />

        {error && <Text size="xs" c="red">{error}</Text>}

        <Group justify="space-between">
          <Button variant="light" color="violet" size="sm" radius="md" loading={isGenerating} onClick={handleGenerate}>
            ✨ Generate Professional Reply
          </Button>
          <Button variant="filled" color="blue" size="sm" radius="md" onClick={handleSend} disabled={!replyText.trim()}>
            Send Reply
          </Button>
        </Group>

        {isGenerating && (
          <Text size="xs" style={{ color: 'hsl(var(--inbox-text-muted))' }}>
            AI is crafting your reply...
          </Text>
        )}
      </Stack>
    </Paper>
  );
};

export default ReplyBox;
