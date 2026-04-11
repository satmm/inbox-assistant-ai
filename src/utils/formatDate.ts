import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * Formats a timestamp into a human-readable relative time string.
 */
export function formatRelativeTime(timestamp: string): string {
  return dayjs(timestamp).fromNow();
}

/**
 * Formats a timestamp into a full date-time string.
 */
export function formatFullDate(timestamp: string): string {
  return dayjs(timestamp).format('MMM D, YYYY [at] h:mm A');
}
