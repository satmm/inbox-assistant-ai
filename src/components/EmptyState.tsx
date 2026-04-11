import { Stack, Text, Center } from '@mantine/core';

/**
 * Empty state displayed when no emails match the current filters.
 */
const EmptyState = () => (
  <Center py="xl">
    <Stack align="center" gap="xs">
      <Text size="xl">📭</Text>
      <Text size="sm" c="dimmed">
        No emails found
      </Text>
      <Text size="xs" c="dimmed">
        Try adjusting your filters or check back later.
      </Text>
    </Stack>
  </Center>
);

export default EmptyState;
