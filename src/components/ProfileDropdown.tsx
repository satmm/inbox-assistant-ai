import { useState } from 'react';
import {
  Menu,
  Avatar,
  Text,
  Group,
  Stack,
  Divider,
  UnstyledButton,
  Box,
  Badge,
  ActionIcon,
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

/**
 * Gmail-style profile dropdown with account list and actions.
 * TODO: Replace with real user profile data from auth provider.
 */
const ProfileDropdown = ({
  accounts,
  selectedAccountId,
  onSelectAccount,
  onAddAccount,
  onLogout,
}: ProfileDropdownProps) => {
  const primaryAccount = accounts[0];
  const initials = primaryAccount
    ? primaryAccount.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <Menu
      shadow="md"
      width={320}
      radius="lg"
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right', duration: 150 }}
    >
      <Menu.Target>
        <ActionIcon
          variant="transparent"
          size={40}
          radius="xl"
          style={{ overflow: 'hidden' }}
        >
          <Avatar
            size={36}
            radius="xl"
            color={primaryAccount?.color || 'blue'}
            style={{ cursor: 'pointer' }}
          >
            {initials}
          </Avatar>
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown
        style={{
          background: 'hsl(var(--inbox-card-bg))',
          border: '1px solid hsl(var(--inbox-card-border))',
        }}
      >
        {/* Profile header */}
        {primaryAccount && (
          <Box p="md" style={{ textAlign: 'center' }}>
            <Avatar
              size={64}
              radius="xl"
              color={primaryAccount.color}
              mx="auto"
              mb="sm"
              style={{ fontSize: 24 }}
            >
              {initials}
            </Avatar>
            <Text fw={600} size="md" style={{ color: 'hsl(var(--inbox-text-primary))' }}>
              Hi, {primaryAccount.name.split(' ')[0]}!
            </Text>
            <Text size="xs" style={{ color: 'hsl(var(--inbox-text-secondary))' }}>
              {primaryAccount.email}
            </Text>
          </Box>
        )}

        <Divider color="hsl(var(--inbox-card-border))" />

        {/* Account list */}
        <Box p="xs">
          <Text size="xs" fw={500} px="sm" py="xs" style={{ color: 'hsl(var(--inbox-text-muted))' }}>
            Accounts
          </Text>
          {accounts.map((acc) => (
            <UnstyledButton
              key={acc.id}
              onClick={() => onSelectAccount(acc.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '8px 12px',
                borderRadius: 8,
                width: '100%',
                background:
                  selectedAccountId === acc.id
                    ? 'hsl(var(--inbox-surface))'
                    : 'transparent',
                transition: 'background 0.15s',
              }}
            >
              <Avatar size={32} radius="xl" color={acc.color}>
                {acc.name[0].toUpperCase()}
              </Avatar>
              <Stack gap={0} style={{ flex: 1, minWidth: 0 }}>
                <Text size="sm" fw={500} truncate style={{ color: 'hsl(var(--inbox-text-primary))' }}>
                  {acc.name}
                </Text>
                <Text size="xs" truncate style={{ color: 'hsl(var(--inbox-text-secondary))' }}>
                  {acc.email}
                </Text>
              </Stack>
              {accounts.indexOf(acc) === 0 && (
                <Badge size="xs" variant="light" color="blue">
                  Default
                </Badge>
              )}
            </UnstyledButton>
          ))}
        </Box>

        <Divider color="hsl(var(--inbox-card-border))" />

        {/* Actions */}
        <Box p="xs">
          <UnstyledButton
            onClick={onAddAccount}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '8px 12px',
              borderRadius: 8,
              width: '100%',
              transition: 'background 0.15s',
            }}
          >
            <PersonAddIcon style={{ fontSize: 20, color: 'hsl(var(--inbox-text-secondary))' }} />
            <Text size="sm" style={{ color: 'hsl(var(--inbox-text-primary))' }}>
              Add another account
            </Text>
          </UnstyledButton>

          <UnstyledButton
            onClick={onLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '8px 12px',
              borderRadius: 8,
              width: '100%',
              transition: 'background 0.15s',
            }}
          >
            <LogoutIcon style={{ fontSize: 20, color: 'hsl(var(--inbox-text-secondary))' }} />
            <Text size="sm" style={{ color: 'hsl(var(--inbox-text-primary))' }}>
              Sign out of all accounts
            </Text>
          </UnstyledButton>
        </Box>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileDropdown;
