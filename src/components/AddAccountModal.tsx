import { Modal, Stack, Button, Text, Group } from '@mantine/core';
import type { Account } from '@/types/email';

interface AddAccountModalProps {
  opened: boolean;
  onClose: () => void;
  onConnect: (provider: Account['provider']) => void;
  isLoading?: boolean;
}

const providers: { id: Account['provider']; label: string; icon: string }[] = [
  { id: 'gmail', label: 'Gmail', icon: '📧' },
  { id: 'outlook', label: 'Outlook', icon: '📨' },
  { id: 'yahoo', label: 'Yahoo Mail', icon: '✉️' },
];

const AddAccountModal = ({ opened, onClose, onConnect, isLoading }: AddAccountModalProps) => (
  <Modal opened={opened} onClose={onClose} title="Connect Email Account" centered>
    <Stack gap="sm">
      <Text size="sm" c="dimmed">
        Select a provider to connect your email account.
      </Text>
      {providers.map((p) => (
        <Button
          key={p.id}
          variant="outline"
          fullWidth
          size="md"
          loading={isLoading}
          onClick={() => onConnect(p.id)}
        >
          <Group gap="sm">
            <Text>{p.icon}</Text>
            <Text>Continue with {p.label}</Text>
          </Group>
        </Button>
      ))}
      <Text size="xs" c="dimmed" ta="center" mt="xs">
        OAuth tokens are securely handled by the backend. No credentials are stored in the browser.
      </Text>
    </Stack>
  </Modal>
);

export default AddAccountModal;
