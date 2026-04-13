import {
  Menu, Avatar, Text, Group, Stack, Divider, UnstyledButton, Box, Badge, ActionIcon,
} from '@mantine/core';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import type { Account } from '@/types/email';

interface ProfileDropdownProps {
  accounts: Account[];
  selectedAccountId: 'all' | string;
  onSelectAccount: (id: 'all' | string) => void;
  onAddAccount: () => void;
  onLogout: () => void;
}

const ProfileDropdown = ({ accounts, selectedAccountId, onSelectAccount, onAddAccount, onLogout }: ProfileDropdownProps) => {
  const primaryAccount = accounts[0];
  const initials = primaryAccount
    ? primaryAccount.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <Menu shadow="md" width={320} radius="lg" position="bottom-end" transitionProps={{ transition: 'pop-top-right', duration: 150 }}>
      <Menu.Target>
        <ActionIcon variant="transparent" size={40} radius="xl" style={{ overflow: 'hidden' }}>
          <Avatar size={36} radius="xl" color={primaryAccount?.color || 'blue'} style={{ cursor: 'pointer' }}>
            {initials}
          </Avatar>
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {primaryAccount && (
          <Box p="md" style={{ textAlign: 'center' }}>
            <Avatar size={64} radius="xl" color={primaryAccount.color} mx="auto" mb="sm" style={{ fontSize: 24 }}>
              {initials}
            </Avatar>
            <Text fw={600} size="md">Hi, {primaryAccount.name.split(' ')[0]}!</Text>
            <Text size="xs" c="dimmed">{primaryAccount.email}</Text>
          </Box>
        )}

        <Divider />

        <Box p="xs">
          <Text size="xs" fw={500} px="sm" py="xs" c="dimmed">Accounts</Text>
          {accounts.map((acc) => (
            <UnstyledButton
              key={acc.id}
              onClick={() => onSelectAccount(acc.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '8px 12px', borderRadius: 8, width: '100%',
                background: selectedAccountId === acc.id ? 'hsl(210 40% 96%)' : 'transparent',
                transition: 'background 0.15s',
              }}
            >
              <Avatar size={32} radius="xl" color={acc.color}>{acc.name[0].toUpperCase()}</Avatar>
              <Stack gap={0} style={{ flex: 1, minWidth: 0 }}>
                <Text size="sm" fw={500} truncate>{acc.name}</Text>
                <Text size="xs" truncate c="dimmed">{acc.email}</Text>
              </Stack>
              {accounts.indexOf(acc) === 0 && <Badge size="xs" variant="light" color="blue">Default</Badge>}
            </UnstyledButton>
          ))}
        </Box>

        <Divider />

        <Box p="xs">
          <UnstyledButton onClick={onAddAccount} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', borderRadius: 8, width: '100%' }}>
            <PersonAddIcon style={{ fontSize: 20 }} />
            <Text size="sm">Add another account</Text>
          </UnstyledButton>
          <UnstyledButton onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', borderRadius: 8, width: '100%' }}>
            <LogoutIcon style={{ fontSize: 20 }} />
            <Text size="sm">Sign out of all accounts</Text>
          </UnstyledButton>
        </Box>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileDropdown;
