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
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { useEmails } from '@/hooks/useEmails';
import EmailCard from '@/components/EmailCard';
import EmailSkeleton from '@/components/EmailSkeleton';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import AccountSwitcher from '@/components/AccountSwitcher';
import AddAccountModal from '@/components/AddAccountModal';
import ProfileDropdown from '@/components/ProfileDropdown';
import FilterModal from '@/components/FilterModal';
import type { EmailIntent } from '@/types/email';
import { notifications } from '@mantine/notifications';

/**
 * Dashboard page — main email list view with multi-account support and filters.
 */
const DashboardPage = () => {
  const navigate = useNavigate();
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [filterModalOpened, { open: openFilterModal, close: closeFilterModal }] = useDisclosure(false);
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

  // Mock notification
  useEffect(() => {
    const timeout = setTimeout(() => {
      notifications.show({
        title: '📩 New Email',
        message: 'Hackathon invite at 2 PM — from Google Dev Team',
        color: 'blue',
        autoClose: 5000,
        withCloseButton: true,
      });
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  const accountMap = useMemo(
    () => new Map(accounts.map((a) => [a.id, a])),
    [accounts]
  );

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
        background: 'linear-gradient(180deg, hsl(210 20% 98%) 0%, hsl(214 32% 94%) 100%)',
      }}
    >
      {/* Header — no backdropFilter to avoid stacking context issues */}
      <Box
        py="md"
        px="lg"
        style={{
          borderBottom: '1px solid hsl(214 32% 91%)',
          background: 'hsl(0 0% 100%)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <Container size="lg">
          <Group justify="space-between">
            <Title
              order={3}
              style={{ color: 'hsl(222 47% 11%)', letterSpacing: '-0.01em' }}
            >
              Inbox
              <Text
                component="span"
                style={{
                  background: 'linear-gradient(135deg, hsl(221 83% 53%), hsl(259 60% 55%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AI
              </Text>
            </Title>

            <Group gap="sm">
              <AccountSwitcher
                accounts={accounts}
                selectedAccountId={selectedAccountId}
                onSelect={setSelectedAccountId}
              />
              <ProfileDropdown
                accounts={accounts}
                selectedAccountId={selectedAccountId}
                onSelectAccount={setSelectedAccountId}
                onAddAccount={openAddModal}
                onLogout={() => navigate('/')}
              />
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Filters — higher z-index so popovers render above header */}
      <Container size="lg" py="md" style={{ position: 'relative', zIndex: 60 }}>
        <Stack gap="md">
          <Group gap="sm" wrap="wrap">
            {/* Date Picker */}
            <Popover position="bottom-start" shadow="md" radius="md" zIndex={300}>
              <Popover.Target>
                <ActionIcon
                  variant={filters.date ? 'filled' : 'subtle'}
                  color={filters.date ? 'blue' : 'gray'}
                  size="lg"
                  radius="md"
                  aria-label="Filter by date"
                >
                  <CalendarMonthIcon style={{ fontSize: 24 }} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown
                style={{
                  background: 'hsl(0 0% 100%)',
                  border: '1px solid hsl(214 32% 91%)',
                  padding: 0,
                }}
              >
                <DatePicker
                  value={filters.date}
                  onChange={(date) => setFilter({ date })}
                  defaultDate={new Date()}
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

            {/* Search Bar */}
            <TextInput
              placeholder="Search emails..."
              value={filters.searchQuery}
              onChange={(e) => setFilter({ searchQuery: e.currentTarget.value })}
              size="sm"
              radius="md"
              leftSection={<SearchIcon style={{ fontSize: 18, color: 'hsl(215 20% 65%)' }} />}
              rightSection={
                <ActionIcon
                  variant="subtle"
                  size="sm"
                  radius="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    openFilterModal();
                  }}
                  style={{ color: 'hsl(215 20% 65%)' }}
                  aria-label="Advanced search"
                >
                  <TuneIcon style={{ fontSize: 18 }} />
                </ActionIcon>
              }
              rightSectionPointerEvents="all"
              styles={{
                input: {
                  background: 'hsl(210 40% 96%)',
                  border: '1px solid hsl(214 32% 91%)',
                  color: 'hsl(222 47% 11%)',
                },
              }}
              style={{ flex: 1, maxWidth: 400 }}
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
                  background: 'hsl(210 40% 96%)',
                  border: '1px solid hsl(214 32% 91%)',
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

          {/* No accounts */}
          {accounts.length === 0 && !isLoading && (
            <Box
              p="xl"
              style={{
                textAlign: 'center',
                background: 'hsl(210 40% 96%)',
                borderRadius: 12,
                border: '1px dashed hsl(214 32% 91%)',
              }}
            >
              <Text size="lg" fw={500} c="dimmed" mb="xs">
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

      {/* Modals */}
      <AddAccountModal
        opened={addModalOpened}
        onClose={closeAddModal}
        onConnect={handleConnectAccount}
        isLoading={isConnecting}
      />
      <FilterModal
        opened={filterModalOpened}
        onClose={closeFilterModal}
        onSearch={(filters) => {
          if (filters.from) setFilter({ searchQuery: filters.from });
          console.log('[FilterModal] Advanced search:', filters);
        }}
      />
    </Box>
  );
};

export default DashboardPage;
