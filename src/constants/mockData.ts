import type { Email, Account } from '@/types/email';

/**
 * Mock accounts for development.
 * TODO: Remove once real backend OAuth flow is connected.
 */
export const MOCK_ACCOUNTS: Account[] = [
  {
    id: 'acc-1',
    email: 'alex.johnson@gmail.com',
    provider: 'gmail',
    name: 'Alex Johnson',
    color: '#3b82f6', // blue
  },
  {
    id: 'acc-2',
    email: 'alex.work@company.com',
    provider: 'outlook',
    name: 'Alex (Work)',
    color: '#8b5cf6', // purple
  },
  {
    id: 'acc-3',
    email: 'alex.side@yahoo.com',
    provider: 'yahoo',
    name: 'Alex (Side)',
    color: '#10b981', // green
  },
];

/**
 * Mock email data for development.
 * TODO: Remove once real backend API is connected.
 */
export const MOCK_EMAILS: Email[] = [
  {
    id: '1',
    accountId: 'acc-1',
    subject: 'Hackathon Invitation',
    sender: 'Google Dev Team',
    senderEmail: 'devteam@google.com',
    summary: 'Invitation to join the annual hackathon event at 2 PM this Saturday. Teams of 3-5 encouraged.',
    intent: 'meeting',
    timestamp: '2026-04-10T14:00:00Z',
    body: `Hi there,\n\nWe're excited to invite you to our annual Hackathon event!\n\nDate: Saturday, April 12, 2026\nTime: 2:00 PM - 10:00 PM\nLocation: Google Campus, Building 42\n\nThis year's theme is "AI for Good." Teams of 3-5 are encouraged. Prizes include $10,000 for first place.\n\nPlease RSVP by April 11.\n\nBest,\nGoogle Dev Team`,
    isRead: false,
  },
  {
    id: '2',
    accountId: 'acc-2',
    subject: 'Q2 Performance Review - Action Required',
    sender: 'HR Department',
    senderEmail: 'hr@company.com',
    summary: 'Complete your Q2 self-assessment by April 15. Peer reviews due April 18.',
    intent: 'task',
    timestamp: '2026-04-09T09:30:00Z',
    body: `Dear Employee,\n\nIt's time for our Q2 performance review cycle.\n\nAction items:\n1. Complete your self-assessment by April 15\n2. Submit peer reviews by April 18\n3. Schedule your 1:1 with your manager by April 20\n\nAccess the review portal at: reviews.company.com\n\nThank you,\nHR Department`,
    isRead: true,
  },
  {
    id: '3',
    accountId: 'acc-1',
    subject: 'Weekly Team Standup Notes',
    sender: 'Sarah Chen',
    senderEmail: 'sarah.chen@company.com',
    summary: "Summary of this week's standup: 3 features shipped, 2 bugs fixed, sprint on track.",
    intent: 'info',
    timestamp: '2026-04-09T16:00:00Z',
    body: `Hey team,\n\nHere's the summary from this week's standups:\n\nShipped:\n- User profile redesign\n- Search autocomplete\n- Dark mode toggle\n\nBugs Fixed:\n- Login redirect loop (#2341)\n- Cart total calculation (#2355)\n\nSprint Status: On track for April 14 release.\n\nNext week's focus: Payment integration.\n\nCheers,\nSarah`,
    isRead: true,
  },
  {
    id: '4',
    accountId: 'acc-2',
    subject: 'Client Meeting Rescheduled to Thursday',
    sender: 'David Park',
    senderEmail: 'david.park@agency.com',
    summary: 'The Acme Corp client meeting moved from Wednesday to Thursday at 3 PM.',
    intent: 'meeting',
    timestamp: '2026-04-08T11:15:00Z',
    body: `Hi,\n\nJust a heads up — the Acme Corp meeting has been rescheduled.\n\nNew time: Thursday, April 10 at 3:00 PM\nLocation: Zoom (link in calendar invite)\n\nAgenda remains the same:\n1. Q1 results review\n2. Q2 campaign planning\n3. Budget allocation\n\nPlease confirm your availability.\n\nThanks,\nDavid`,
    isRead: false,
  },
  {
    id: '5',
    accountId: 'acc-3',
    subject: 'Deploy Checklist for v2.4.0',
    sender: 'DevOps Bot',
    senderEmail: 'devops@company.com',
    summary: 'Pre-deployment checklist for v2.4.0 release. All tests passing, awaiting manual QA sign-off.',
    intent: 'task',
    timestamp: '2026-04-08T08:00:00Z',
    body: `Release v2.4.0 Deployment Checklist\n\n✅ All unit tests passing (342/342)\n✅ Integration tests passing (89/89)\n✅ Staging deployment successful\n⬜ Manual QA sign-off\n⬜ Database migration verified\n⬜ Rollback plan documented\n\nPlease complete remaining items before EOD.\n\nTarget deployment: April 9, 6:00 AM UTC`,
    isRead: true,
  },
  {
    id: '6',
    accountId: 'acc-3',
    subject: 'New Company Policy Updates',
    sender: 'Admin Office',
    senderEmail: 'admin@company.com',
    summary: 'Updated remote work policy: 3 days in-office minimum starting May 1. New expense limits.',
    intent: 'info',
    timestamp: '2026-04-07T13:45:00Z',
    body: `Dear All,\n\nPlease review the following policy updates effective May 1, 2026:\n\n1. Remote Work: Minimum 3 days in-office per week\n2. Expense Policy: Travel meals capped at $75/day\n3. Equipment: New laptop refresh cycle — every 3 years\n4. PTO: Rollover limit increased to 10 days\n\nFull policy documents available on the intranet.\n\nRegards,\nAdmin Office`,
    isRead: false,
  },
  {
    id: '7',
    accountId: 'acc-1',
    subject: 'Your AWS Bill for March 2026',
    sender: 'AWS Billing',
    senderEmail: 'billing@aws.amazon.com',
    summary: 'March AWS bill: $342.18. EC2 usage up 12% from February.',
    intent: 'info',
    timestamp: '2026-04-07T06:00:00Z',
    body: `Hello,\n\nYour AWS bill for March 2026 is ready.\n\nTotal: $342.18\n\nBreakdown:\n- EC2: $198.40 (+12%)\n- S3: $45.20\n- RDS: $72.30\n- Lambda: $26.28\n\nView your full bill at console.aws.amazon.com/billing\n\nAmazon Web Services`,
    isRead: true,
  },
  {
    id: '8',
    accountId: 'acc-2',
    subject: 'Urgent: Security Patch Required',
    sender: 'IT Security',
    senderEmail: 'security@company.com',
    summary: 'Critical CVE detected in production dependencies. Patch by EOD Friday.',
    intent: 'task',
    timestamp: '2026-04-10T08:30:00Z',
    body: `URGENT\n\nA critical vulnerability (CVE-2026-1234) has been identified in our production dependencies.\n\nAffected: express@4.18.x\nSeverity: Critical\nDeadline: EOD Friday, April 11\n\nAction required:\n1. Run npm audit in your repos\n2. Update express to 4.19.2+\n3. Re-deploy affected services\n\nContact security@company.com with questions.\n\nIT Security Team`,
    isRead: false,
  },
];
