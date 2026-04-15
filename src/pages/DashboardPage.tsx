import { useEffect, useState, useMemo, useCallback } from 'react';
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
  Checkbox,
  Menu,
  Badge,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { CheckCheck, MailOpen, Trash2, ChevronDown } from 'lucide-react';
import { format, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
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
 * Dashboard page — main email list view with multi-account support, 
 * date range filtering, bulk actions, and read/unread UX.
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
    selectedEmailIds,
    setFilter,
    setSelectedAccountId,
    resetFilters,
    fetchEmails,
    connectNewAccount,
    markAsRead,
    bulkMarkAsRead,
    bulkMarkAsUnread,
    bulkDelete,
    toggleSelectEmail,
    selectAllEmails,
    deselectAllEmails,
  } = useEmails();

  /** Keyboard shortcuts: R = mark read, U = mark unread */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const ids = Array.from(selectedEmailIds);
      if (ids.length === 0) return;
      if (e.key === 'r' || e.key === 'R') bulkMarkAsRead(ids);
      if (e.key === 'u' || e.key === 'U') bulkMarkAsUnread(ids);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedEmailIds, bulkMarkAsRead, bulkMarkAsUnread]);

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

  /** Client-side filtering: intent, search, and date range */
  const filteredEmails = useMemo(() => {
    return emails.filter((email) => {
      // Intent filter
      if (filters.intent && email.intent !== filters.intent) return false;

      // Search filter
      if (
        filters.searchQuery &&
        !email.subject.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !email.sender.toLowerCase().includes(filters.searchQuery.toLowerCase())
      )
        return false;

      // Date range filter
      const [start, end] = filters.dateRange;
      if (start && end) {
        const emailDate = new Date(email.timestamp);
        if (!isWithinInterval(emailDate, { start: startOfDay(start), end: endOfDay(end) })) {
          return false;
        }
      } else if (start && !end) {
        const emailDate = new Date(email.timestamp);
        if (emailDate < startOfDay(start)) return false;
      }

      return true;
    });
  }, [emails, filters]);

  const unreadCount = useMemo(
    () => filteredEmails.filter((e) => !e.isRead).length,
    [filteredEmails]
  );

  const allSelected = filteredEmails.length > 0 && selectedEmailIds.size === filteredEmails.length;
  const someSelected = selectedEmailIds.size > 0;

  const handleSelectAll = () => {
    if (allSelected) {
      deselectAllEmails();
    } else {
      selectAllEmails(filteredEmails.map((e) => e.id));
    }
  };

  /** Quick-select dropdown (Gmail-like) */
  const handleQuickSelect = (type: string) => {
    switch (type) {
      case 'all':
        selectAllEmails(filteredEmails.map((e) => e.id));
        break;
      case 'none':
        deselectAllEmails();
        break;
      case 'read':
        selectAllEmails(filteredEmails.filter((e) => e.isRead).map((e) => e.id));
        break;
      case 'unread':
        selectAllEmails(filteredEmails.filter((e) => !e.isRead).map((e) => e.id));
        break;
    }
  };

  const handleEmailClick = useCallback((emailId: string) => {
    markAsRead(emailId);
    navigate(`/email/${emailId}`);
  }, [markAsRead, navigate]);

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

  const [rangeStart, rangeEnd] = filters.dateRange;
  const hasDateRange = rangeStart !== null;

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, hsl(210 20% 98%) 0%, hsl(214 32% 94%) 100%)',
      }}
    >
      {/* Sticky Header */}
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

      {/* Filters */}
      <Container size="lg" py="md" style={{ position: 'relative', zIndex: 60 }}>
        <Stack gap="md">
          <Group gap="sm" wrap="wrap">
            {/* Date Range Picker */}
            <Popover position="bottom-start" shadow="lg" radius="lg" zIndex={300}>
              <Popover.Target>
                <ActionIcon
                  variant={hasDateRange ? 'filled' : 'subtle'}
                  color={hasDateRange ? 'blue' : 'gray'}
                  size="lg"
                  radius="md"
                  aria-label="Filter by date range"
                >
                  <CalendarMonthIcon style={{ fontSize: 24 }} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown
                style={{
                  background: 'hsl(0 0% 100%)',
                  border: '1px solid hsl(214 32% 91%)',
                  borderRadius: 16,
                  padding: 4,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                }}
              >
                <DatePicker
                  type="range"
                  value={filters.dateRange}
                  onChange={(range) => setFilter({ dateRange: range })}
                  defaultDate={new Date()}
                  styles={{
                    day: {
                      borderRadius: 8,
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        background: 'hsl(221 83% 53% / 0.1)',
                      },
                      '&[data-selected]': {
                        background: 'hsl(221 83% 53%)',
                        color: 'white',
                      },
                      '&[data-in-range]': {
                        background: 'hsl(221 83% 53% / 0.1)',
                      },
                    },
                  }}
                />
                {hasDateRange && (
                  <Box px="sm" pb="sm">
                    <Button
                      variant="subtle"
                      color="gray"
                      size="xs"
                      fullWidth
                      onClick={() => setFilter({ dateRange: [null, null] })}
                    >
                      Clear date range
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

            {/* Intent Filter Tabs */}
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

          {/* Date range label */}
          {rangeStart && (
            <Text size="xs" c="dimmed" fw={500}>
              📅 Showing emails from {format(rangeStart, 'MMM d')}
              {rangeEnd ? ` – ${format(rangeEnd, 'MMM d, yyyy')}` : ' onwards'}
            </Text>
          )}

          {/* Info bar: accounts + unread count */}
          <Group justify="space-between" align="center">
            {accounts.length > 0 && (
              <Text size="xs" c="dimmed">
                {accounts.length} account{accounts.length !== 1 ? 's' : ''} connected
                {selectedAccountId !== 'all' && (
                  <> · Viewing: {accountMap.get(selectedAccountId)?.email}</>
                )}
              </Text>
            )}
            {unreadCount > 0 && (
              <Badge variant="light" color="blue" size="sm" radius="xl">
                {unreadCount} unread
              </Badge>
            )}
          </Group>

          {/* Bulk action bar */}
          {filteredEmails.length > 0 && (
            <Group
              gap="xs"
              align="center"
              py={4}
              style={{
                borderBottom: someSelected ? '1px solid hsl(221 83% 53% / 0.2)' : undefined,
                paddingBottom: someSelected ? 8 : 0,
                transition: 'all 0.2s ease',
              }}
            >
              {/* Select-all checkbox + dropdown */}
              <Group gap={2}>
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected && !allSelected}
                  onChange={handleSelectAll}
                  size="sm"
                  styles={{
                    input: {
                      cursor: 'pointer',
                      borderRadius: 4,
                    },
                  }}
                />
                <Menu shadow="md" radius="md" zIndex={300}>
                  <Menu.Target>
                    <ActionIcon variant="subtle" size="xs" color="gray">
                      <ChevronDown size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item onClick={() => handleQuickSelect('all')}>All</Menu.Item>
                    <Menu.Item onClick={() => handleQuickSelect('none')}>None</Menu.Item>
                    <Menu.Item onClick={() => handleQuickSelect('read')}>Read</Menu.Item>
                    <Menu.Item onClick={() => handleQuickSelect('unread')}>Unread</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>

              {/* Bulk actions — visible when items selected */}
              {someSelected && (
                <Group gap="xs" style={{ animation: 'fadeIn 0.2s ease' }}>
                  <Button
                    variant="subtle"
                    size="xs"
                    color="blue"
                    leftSection={<CheckCheck size={16} />}
                    onClick={() => bulkMarkAsRead(Array.from(selectedEmailIds))}
                  >
                    Mark Read
                  </Button>
                  <Button
                    variant="subtle"
                    size="xs"
                    color="gray"
                    leftSection={<MailOpen size={16} />}
                    onClick={() => bulkMarkAsUnread(Array.from(selectedEmailIds))}
                  >
                    Mark Unread
                  </Button>
                  <Button
                    variant="subtle"
                    size="xs"
                    color="red"
                    leftSection={<Trash2 size={16} />}
                    onClick={() => {
                      bulkDelete(Array.from(selectedEmailIds));
                      notifications.show({
                        title: '🗑️ Deleted',
                        message: `${selectedEmailIds.size} email(s) removed.`,
                        color: 'red',
                        autoClose: 3000,
                      });
                    }}
                  >
                    Delete
                  </Button>
                  <Text size="xs" c="dimmed" ml="xs">
                    {selectedEmailIds.size} selected
                  </Text>
                </Group>
              )}
            </Group>
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
            <Stack gap={6}>
              {filteredEmails.map((email) => (
                <EmailCard
                  key={email.id}
                  email={email}
                  account={accountMap.get(email.accountId)}
                  isSelected={selectedEmailIds.has(email.id)}
                  onToggleSelect={() => toggleSelectEmail(email.id)}
                  onClick={() => handleEmailClick(email.id)}
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
