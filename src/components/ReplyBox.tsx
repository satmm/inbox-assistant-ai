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

    // TODO: Call backend API to generate AI reply
    const result = await onGenerate({
      emailId,
      context: replyText.trim() || emailSubject,
      tone: 'professional',
    });

    if (result) {
      setReplyText(result.reply);
    }
  };

  const handleSend = () => {
    if (!replyText.trim()) {
      setError('Reply cannot be empty.');
      return;
    }
    // TODO: Call backend API to send email reply
    // Example: await sendReply({ emailId, body: replyText });
    setReplyText('');
  };

  return (
    <Paper
      p="md"
      radius="md"
      style={{
        background: 'rgba(30, 41, 59, 0.6)',
        border: '1px solid rgba(148, 163, 184, 0.1)',
      }}
    >
      <Stack gap="sm">
        <Text size="sm" fw={500} style={{ color: '#f8fafc' }}>
          Reply
        </Text>

        <Textarea
          placeholder="Type your reply or let AI generate one..."
          minRows={4}
          maxRows={8}
          autosize
          value={replyText}
          onChange={(e) => {
            setReplyText(e.currentTarget.value);
            setError('');
          }}
          styles={{
            input: {
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(148, 163, 184, 0.15)',
              color: '#e2e8f0',
            },
          }}
        />

        {error && (
          <Text size="xs" c="red">
            {error}
          </Text>
        )}

        <Group justify="space-between">
          <Button
            variant="light"
            color="violet"
            size="sm"
            radius="md"
            loading={isGenerating}
            onClick={handleGenerate}
          >
            ✨ Generate Professional Reply
          </Button>

          <Button
            variant="filled"
            color="blue"
            size="sm"
            radius="md"
            onClick={handleSend}
            disabled={!replyText.trim()}
          >
            Send Reply
          </Button>
        </Group>

        {isGenerating && (
          <Box>
            <Text size="xs" c="dimmed">
              AI is crafting your reply...
            </Text>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default ReplyBox;
