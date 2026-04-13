import { useState } from 'react';
import { Textarea, Button, Stack, Paper, Text, Group } from '@mantine/core';
import type { GenerateReplyPayload, GenerateReplyResponse } from '@/types/email';

interface ReplyBoxProps {
  emailId: string;
  emailSubject: string;
  isGenerating: boolean;
  onGenerate: (payload: GenerateReplyPayload) => Promise<GenerateReplyResponse | null>;
}

const ReplyBox = ({ emailId, emailSubject, isGenerating, onGenerate }: ReplyBoxProps) => {
  const [replyText, setReplyText] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setError('');
    if (!replyText.trim() && !emailSubject) {
      setError('Please type some context for the AI to generate a reply.');
      return;
    }
    const result = await onGenerate({ emailId, context: replyText.trim() || emailSubject, tone: 'professional' });
    if (result) setReplyText(result.reply);
  };

  const handleSend = () => {
    if (!replyText.trim()) { setError('Reply cannot be empty.'); return; }
    setReplyText('');
  };

  return (
    <Paper p="md" radius="md" withBorder>
      <Stack gap="sm">
        <Text size="sm" fw={500}>Reply</Text>
        <Textarea
          placeholder="Type your reply or let AI generate one..."
          minRows={4} maxRows={8} autosize
          value={replyText}
          onChange={(e) => { setReplyText(e.currentTarget.value); setError(''); }}
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
        {isGenerating && <Text size="xs" c="dimmed">AI is crafting your reply...</Text>}
      </Stack>
    </Paper>
  );
};

export default ReplyBox;
