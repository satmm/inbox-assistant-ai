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

/**
 * Modal dialog for connecting a new email account.
 * TODO: Each button should trigger the backend OAuth flow for the selected provider.
 */
const AddAccountModal = ({ opened, onClose, onConnect, isLoading }: AddAccountModalProps) => (
  <Modal
    opened={opened}
    onClose={onClose}
    title="Connect Email Account"
    centered
    styles={{
      header: {
        background: 'hsl(var(--inbox-card-bg))',
        borderBottom: '1px solid hsl(var(--inbox-card-border))',
      },
      title: { color: 'hsl(var(--inbox-text-primary))', fontWeight: 600 },
      body: { background: 'hsl(var(--inbox-card-bg))' },
      close: { color: 'hsl(var(--inbox-text-secondary))' },
    }}
  >
    <Stack gap="sm">
      <Text size="sm" style={{ color: 'hsl(var(--inbox-text-secondary))' }}>
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
          styles={{
            root: {
              borderColor: 'hsl(var(--inbox-card-border))',
              color: 'hsl(var(--inbox-text-primary))',
            },
          }}
        >
          <Group gap="sm">
            <Text>{p.icon}</Text>
            <Text>Continue with {p.label}</Text>
          </Group>
        </Button>
      ))}
      <Text size="xs" style={{ color: 'hsl(var(--inbox-text-muted))' }} ta="center" mt="xs">
        OAuth tokens are securely handled by the backend. No credentials are stored in the browser.
      </Text>
    </Stack>
  </Modal>
);

export default AddAccountModal;
