import { Skeleton, Stack, Paper } from '@mantine/core';

/**
 * Loading skeleton placeholder for email cards.
 */
const EmailSkeleton = () => (
  <Stack gap="sm">
    {Array.from({ length: 4 }).map((_, i) => (
      <Paper
        key={i}
        p="md"
        radius="md"
        style={{
          background: 'rgba(30, 41, 59, 0.4)',
          border: '1px solid rgba(148, 163, 184, 0.05)',
        }}
      >
        <Stack gap="xs">
          <Skeleton height={16} width="60%" radius="sm" />
          <Skeleton height={12} width="30%" radius="sm" />
          <Skeleton height={12} width="90%" radius="sm" />
        </Stack>
      </Paper>
    ))}
  </Stack>
);

export default EmailSkeleton;
