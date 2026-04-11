import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Group,
  Stack,
  Box,
  ActionIcon,
  SegmentedControl,
  TextInput,
  Button,
  Popover,
  Tooltip,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEmails } from '@/hooks/useEmails';
import EmailCard from '@/components/EmailCard';
import EmailSkeleton from '@/components/EmailSkeleton';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import AccountSwitcher from '@/components/AccountSwitcher';
import AddAccountModal from '@/components/AddAccountModal';
import type { EmailIntent } from '@/types/email';
import { notifications } from '@mantine/notifications';

/**
 * Dashboard page — main email list view with multi-account support and filters.
 * TODO: Add real-time email polling/websocket connection for live updates.
 */
const DashboardPage = () => {
  const navigate = useNavigate();
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const {
    emails,
    accounts,
    selectedAccountId,
    filters,
    isLoading,
    error,
    setFilter,
    setSelectedAccountId,
    resetFilters,
    fetchEmails,
    connectNewAccount,
  } = useEmails();

  // Mock notification — simulates real-time email arrival
  useEffect(() => {
    const timeout = setTimeout(() => {
      notifications.show({
        title: '📩 New Email',
        message: 'Hackathon invite at 2 PM — from Google Dev Team',
        color: 'blue',
        autoClose: 5000,
      });
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  // Build a lookup map for accounts
  const accountMap = useMemo(
    () => new Map(accounts.map((a) => [a.id, a])),
    [accounts]
  );

  // Filter emails client-side by intent and search query
  const filteredEmails = emails.filter((email) => {
    if (filters.intent && email.intent !== filters.intent) return false;
    if (
      filters.searchQuery &&
      !email.subject.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !email.sender.toLowerCase().includes(filters.searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const handleConnectAccount = async (provider: 'gmail' | 'outlook' | 'yahoo') => {
    setIsConnecting(true);
    const account = await connectNewAccount(provider);
    setIsConnecting(false);
    if (account) {
      closeAddModal();
      notifications.show({
        title: '✅ Account Connected',
        message: `${account.email} has been linked successfully.`,
        color: 'green',
        autoClose: 4000,
      });
    }
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      }}
    >
      {/* Header */}
      <Box
        py="md"
        px="lg"
        style={{
          borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Container size="lg">
          <Group justify="space-between">
            <Title
              order={3}
              style={{ color: '#f8fafc', letterSpacing: '-0.01em' }}
            >
              Inbox
              <Text
                component="span"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AI
              </Text>
            </Title>

            <Group gap="sm">
              {/* Account Switcher */}
              <AccountSwitcher
                accounts={accounts}
                selectedAccountId={selectedAccountId}
                onSelect={setSelectedAccountId}
              />

              {/* Add Account Button */}
              <Button
                variant="light"
                color="blue"
                size="sm"
                radius="md"
                onClick={openAddModal}
              >
                + Add Account
              </Button>

              <Tooltip label="Logout" position="bottom" withArrow>
                <ActionIcon
                  variant="light"
                  color="red"
                  size="lg"
                  radius="md"
                  onClick={() => {
                    // TODO: Replace with proper logout via auth provider
                    navigate('/');
                  }}
                >
                  <LogoutIcon style={{ fontSize: 18 }} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Filters */}
      <Container size="lg" py="md">
        <Stack gap="md">
          <Group gap="sm" wrap="wrap">
            <Popover position="bottom-start" shadow="md" radius="md">
              <Popover.Target>
                <Tooltip label="Filter by date" position="bottom" withArrow>
                  <ActionIcon
                    variant={filters.date ? 'filled' : 'subtle'}
                    color={filters.date ? 'blue' : 'gray'}
                    size="lg"
                    radius="md"
                  >
                    <CalendarMonthIcon style={{ fontSize: 30 }} />
                  </ActionIcon>
                </Tooltip>
              </Popover.Target>
              <Popover.Dropdown
                style={{
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(148, 163, 184, 0.15)',
                  backdropFilter: 'blur(12px)',
                  padding: 0,
                }}
              >
                <DatePicker
                  value={filters.date}
                  onChange={(date) => setFilter({ date })}
                  styles={{
                    calendarHeader: { color: '#e2e8f0' },
                    monthCell: { color: '#94a3b8' },
                    day: { color: '#e2e8f0' },
                  }}
                />
                {filters.date && (
                  <Box px="sm" pb="sm">
                    <Button
                      variant="subtle"
                      color="gray"
                      size="xs"
                      fullWidth
                      onClick={() => setFilter({ date: null })}
                    >
                      Clear date
                    </Button>
                  </Box>
                )}
              </Popover.Dropdown>
            </Popover>

            <TextInput
              placeholder="Search emails..."
              value={filters.searchQuery}
              onChange={(e) => setFilter({ searchQuery: e.currentTarget.value })}
              size="sm"
              radius="md"
              styles={{
                input: {
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(148, 163, 184, 0.15)',
                  color: '#e2e8f0',
                },
              }}
              style={{ flex: 1, maxWidth: 300 }}
            />

            <SegmentedControl
              value={filters.intent || 'all'}
              onChange={(val) =>
                setFilter({ intent: val === 'all' ? null : (val as EmailIntent) })
              }
              data={[
                { label: 'All', value: 'all' },
                { label: 'Meeting', value: 'meeting' },
                { label: 'Task', value: 'task' },
                { label: 'Info', value: 'info' },
              ]}
              size="sm"
              radius="md"
              styles={{
                root: {
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(148, 163, 184, 0.1)',
                },
              }}
            />
          </Group>

          {/* Connected accounts count */}
          {accounts.length > 0 && (
            <Text size="xs" c="dimmed">
              {accounts.length} account{accounts.length !== 1 ? 's' : ''} connected
              {selectedAccountId !== 'all' && (
                <> · Viewing: {accountMap.get(selectedAccountId)?.email}</>
              )}
            </Text>
          )}

          {/* Edge case: No accounts connected */}
          {accounts.length === 0 && !isLoading && (
            <Box
              p="xl"
              style={{
                textAlign: 'center',
                background: 'rgba(30, 41, 59, 0.4)',
                borderRadius: 12,
                border: '1px dashed rgba(148, 163, 184, 0.2)',
              }}
            >
              <Text size="lg" fw={500} style={{ color: '#94a3b8' }} mb="xs">
                No accounts connected
              </Text>
              <Text size="sm" c="dimmed" mb="md">
                Connect your email account to get started with InboxAI.
              </Text>
              <Button variant="light" color="blue" onClick={openAddModal}>
                + Connect Your First Account
              </Button>
            </Box>
          )}

          {/* Email List */}
          {error && <ErrorState message={error} onRetry={fetchEmails} />}
          {isLoading && <EmailSkeleton />}
          {!isLoading && !error && filteredEmails.length === 0 && accounts.length > 0 && (
            <EmptyState />
          )}
          {!isLoading && !error && filteredEmails.length > 0 && (
            <Stack gap="sm">
              {filteredEmails.map((email) => (
                <EmailCard
                  key={email.id}
                  email={email}
                  account={accountMap.get(email.accountId)}
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Container>

      {/* Add Account Modal */}
      <AddAccountModal
        opened={addModalOpened}
        onClose={closeAddModal}
        onConnect={handleConnectAccount}
        isLoading={isConnecting}
      />
    </Box>
  );
};

export default DashboardPage;