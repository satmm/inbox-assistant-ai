import type { EmailIntent } from '@/types/email';
import { Badge } from '@mantine/core';

interface IntentBadgeProps {
  intent: EmailIntent;
}

const intentConfig: Record<EmailIntent, { color: string; label: string }> = {
  meeting: { color: 'blue', label: 'Meeting' },
  task: { color: 'orange', label: 'Task' },
  info: { color: 'teal', label: 'Info' },
};

/**
 * Renders a color-coded badge based on AI-classified email intent.
 */
const IntentBadge = ({ intent }: IntentBadgeProps) => {
  const config = intentConfig[intent];
  return (
    <Badge size="sm" variant="light" color={config.color} radius="sm">
      {config.label}
    </Badge>
  );
};

export default IntentBadge;
