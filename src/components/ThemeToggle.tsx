import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

/**
 * Theme toggle button — switches between light and dark modes.
 * Persists preference via Mantine's built-in localStorage integration.
 */
const ThemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tooltip label={isDark ? 'Light mode' : 'Dark mode'} position="bottom" withArrow>
      <ActionIcon
        variant="subtle"
        size="lg"
        radius="md"
        onClick={() => toggleColorScheme()}
        style={{
          color: 'hsl(var(--inbox-text-secondary))',
        }}
      >
        {isDark ? <LightModeIcon style={{ fontSize: 20 }} /> : <DarkModeIcon style={{ fontSize: 20 }} />}
      </ActionIcon>
    </Tooltip>
  );
};

export default ThemeToggle;
