import { Modal, Stack, Button, Text, Group, ThemeIcon } from '@mantine/core';
import type { Account } from '@/types/email';

interface AddAccountModalProps {
  opened: boolean;
  onClose: () => void;
  onConnect: (provider: Account['provider']) => void;
  isLoading?: boolean;
}

const providers: { id: Account['provider']; label: string; icon: string; color: string }[] = [
  { id: 'gmail', label: 'Gmail', icon: '📧', color: '#ea4335' },
  { id: 'outlook', label: 'Outlook', icon: '📨', color: '#0078d4' },
  { id: 'yahoo', label: 'Yahoo Mail', icon: '✉️', color: '#6001d2' },
];

/**
 * Modal dialog for connecting a new email account.
 * TODO: Each button should trigger the backend OAuth flow for the selected provider.
 */
const AddAccountModal = ({ opened, onClose, onConnect, isLoading }: AddAccountModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Connect Email Account"
      centered
      styles={{
        header: { background: '#1e293b', borderBottom: '1px solid rgba(148,163,184,0.1)' },
        title: { color: '#f8fafc', fontWeight: 600 },
        body: { background: '#1e293b' },
        close: { color: '#94a3b8' },
      }}
    >
      <Stack gap="sm">
        <Text size="sm" c="dimmed">
          Select a provider to connect your email account.
        </Text>
        {/* TODO: Integrate with backend OAuth flow for each provider */}
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
                borderColor: 'rgba(148,163,184,0.2)',
                color: '#e2e8f0',
                '&:hover': { background: 'rgba(59,130,246,0.1)' },
              },
            }}
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
};

export default AddAccountModal;
