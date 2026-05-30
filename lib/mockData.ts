export interface PlaygroundItem {
  id: string;
  type: "content" | "design" | "leads" | "data" | "email";
  title: string;
  preview: string;
  automationName: string;
  createdAt: Date;
  isFavorited: boolean;
  imageUrl?: string;
}

export interface RecentAutomation {
  id: string;
  name: string;
  status: "success" | "running" | "failed";
  createdAt: Date;
}

export interface WorkflowStep {
  id: string;
  appId: string;
  appName: string;
  action: string;
  status: "pending" | "running" | "complete" | "failed";
}

export const MOCK_PLAYGROUND_ITEMS: PlaygroundItem[] = [
  {
    id: "pg-1",
    type: "content",
    title: "10 AI Tools That Will Transform Your Workflow in 2026",
    preview:
      "In the rapidly evolving landscape of artificial intelligence, staying ahead means knowing which tools deliver real results. Here are 10 AI tools that are fundamentally changing how teams work, from automated code review to intelligent data pipelines...",
    automationName: "Daily YouTube Script Generator",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
    isFavorited: true,
  },
  {
    id: "pg-2",
    type: "design",
    title: "YouTube Thumbnail — AI Tools Episode",
    preview: "Generated thumbnail with bold typography and tech-themed visuals",
    automationName: "Thumbnail Generator",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isFavorited: false,
    imageUrl: "/placeholder-thumb.jpg",
  },
  {
    id: "pg-3",
    type: "leads",
    title: "Q2 Marketing Lead List — 847 Contacts",
    preview:
      "Name: Sarah Chen | Company: TechFlow Inc | Email: sarah@techflow.io | Role: VP Marketing\nName: James Wilson | Company: DataScale | Email: james@datascale.com | Role: Head of Growth\n+845 more contacts with verified emails and LinkedIn profiles...",
    automationName: "LinkedIn Lead Scraper",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    isFavorited: true,
  },
  {
    id: "pg-4",
    type: "email",
    title: "Weekly Sales Report — Sent to Team",
    preview:
      "Subject: Weekly Sales Report — May 26-30\n\nHi team, here's your automated weekly sales summary:\n• Total Revenue: $47,320 (+12% WoW)\n• New Deals Closed: 8\n• Pipeline Value: $234,500\n• Top Performer: Alex R. ($18,200)",
    automationName: "Weekly Sales Report",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isFavorited: false,
  },
  {
    id: "pg-5",
    type: "content",
    title: "Twitter Thread — Future of Remote Work",
    preview:
      "🧵 1/12: The future of remote work isn't about working from home. It's about working from anywhere, anytime.\n\nHere's what the data actually shows about distributed teams in 2026...\n\n2/12: Companies with fully distributed teams saw 34% higher retention rates compared to hybrid models...",
    automationName: "Daily Twitter Thread Writer",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    isFavorited: false,
  },
  {
    id: "pg-6",
    type: "data",
    title: "Competitor Pricing Analysis — SaaS Market",
    preview:
      "| Company | Basic | Pro | Enterprise |\n| Zapier | $29/mo | $73/mo | Custom |\n| Make | $10/mo | $18/mo | Custom |\n| n8n | Free | $24/mo | Custom |\n| Connectors | Free | $19/mo | $49/mo |",
    automationName: "Competitor Research Bot",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    isFavorited: true,
  },
  {
    id: "pg-7",
    type: "design",
    title: "Instagram Carousel — Product Launch",
    preview:
      "5-slide carousel with consistent brand colors, product screenshots, and compelling copy for the upcoming feature launch",
    automationName: "Social Media Asset Generator",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isFavorited: false,
    imageUrl: "/placeholder-carousel.jpg",
  },
  {
    id: "pg-8",
    type: "email",
    title: "Cold Outreach Sequence — Draft",
    preview:
      'Subject: Quick question about {{company}} growth\n\nHi {{firstName}},\n\nI noticed {{company}} recently expanded into {{market}}. We help teams like yours automate repetitive workflows, saving an average of 15 hours per week.\n\nWould you be open to a 15-minute call this week?',
    automationName: "Outreach Email Writer",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isFavorited: false,
  },
];

export const MOCK_RECENT_AUTOMATIONS: RecentAutomation[] = [
  {
    id: "auto-1",
    name: "Daily Email Blast",
    status: "success",
    createdAt: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: "auto-2",
    name: "YouTube Script Generator",
    status: "success",
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
  },
  {
    id: "auto-3",
    name: "Lead Gen Pipeline",
    status: "running",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

export const MOCK_WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: "step-1",
    appId: "sheets",
    appName: "Google Sheets",
    action: "Read email list from contacts sheet",
    status: "complete",
  },
  {
    id: "step-2",
    appId: "claude",
    appName: "Claude AI",
    action: "Generate personalized email for each contact",
    status: "complete",
  },
  {
    id: "step-3",
    appId: "gmail",
    appName: "Gmail",
    action: "Send personalized emails to all contacts",
    status: "pending",
  },
];

export const SIMULATED_AI_RESPONSES: {
  trigger: string;
  response: string;
  workflowSteps?: WorkflowStep[];
}[] = [
  {
    trigger: "email",
    response:
      "I'll set up an automated email workflow for you. Let me connect to your Google Sheets to get the contact list, then use Claude to personalize each email before sending via Gmail.",
    workflowSteps: [
      {
        id: "s1",
        appId: "sheets",
        appName: "Google Sheets",
        action: "Read contact list",
        status: "pending",
      },
      {
        id: "s2",
        appId: "claude",
        appName: "Claude AI",
        action: "Personalize email content",
        status: "pending",
      },
      {
        id: "s3",
        appId: "gmail",
        appName: "Gmail",
        action: "Send emails to contacts",
        status: "pending",
      },
    ],
  },
  {
    trigger: "youtube",
    response:
      "I'll create a complete YouTube content pipeline. First, I'll research trending topics, then generate a script, create a thumbnail, and prepare it for upload.",
    workflowSteps: [
      {
        id: "s1",
        appId: "perplexity",
        appName: "Perplexity",
        action: "Research trending AI topics",
        status: "pending",
      },
      {
        id: "s2",
        appId: "claude",
        appName: "Claude AI",
        action: "Write video script",
        status: "pending",
      },
      {
        id: "s3",
        appId: "midjourney",
        appName: "Midjourney",
        action: "Generate thumbnail",
        status: "pending",
      },
      {
        id: "s4",
        appId: "youtube",
        appName: "YouTube Studio",
        action: "Upload and schedule",
        status: "pending",
      },
    ],
  },
  {
    trigger: "default",
    response:
      "I can help you automate that! Let me analyze what apps you'll need and create a workflow. What specific outcome are you looking for?",
  },
];
