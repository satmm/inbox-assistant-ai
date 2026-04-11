import { Alert, Text, Button, Stack } from '@mantine/core';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

/**
 * Reusable error state component with optional retry action.
 */
const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <Alert color="red" variant="light" radius="md" title="Something went wrong">
    <Stack gap="sm">
      <Text size="sm">{message}</Text>
      {onRetry && (
        <Button size="xs" variant="light" color="red" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </Stack>
  </Alert>
);

export default ErrorState;
