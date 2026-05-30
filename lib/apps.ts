export interface AppInfo {
  id: string;
  name: string;
  category: AppCategory;
  brandColor: string;
  description: string;
  icon: string; // SVG path data or emoji fallback
}

export type AppCategory =
  | "popular"
  | "ai"
  | "productivity"
  | "social"
  | "email"
  | "crm"
  | "developer"
  | "ecommerce";

export const APP_CATEGORIES: { id: AppCategory; label: string }[] = [
  { id: "popular", label: "Popular" },
  { id: "ai", label: "AI Models" },
  { id: "productivity", label: "Productivity" },
  { id: "social", label: "Social" },
  { id: "email", label: "Email" },
  { id: "crm", label: "CRM" },
  { id: "developer", label: "Developer" },
  { id: "ecommerce", label: "E-commerce" },
];

export const APP_CATALOG: AppInfo[] = [
  // Popular
  {
    id: "youtube",
    name: "YouTube Studio",
    category: "popular",
    brandColor: "#FF0000",
    description: "Upload, manage, and analyze YouTube videos",
    icon: "youtube",
  },
  {
    id: "gmail",
    name: "Gmail",
    category: "popular",
    brandColor: "#EA4335",
    description: "Read, draft, and send emails via Gmail",
    icon: "gmail",
  },
  {
    id: "notion",
    name: "Notion",
    category: "popular",
    brandColor: "#FFFFFF",
    description: "Create and manage pages, databases, and wikis",
    icon: "notion",
  },
  {
    id: "slack",
    name: "Slack",
    category: "popular",
    brandColor: "#4A154B",
    description: "Send messages, manage channels, and automate workflows",
    icon: "slack",
  },
  {
    id: "sheets",
    name: "Google Sheets",
    category: "popular",
    brandColor: "#34A853",
    description: "Read, write, and analyze spreadsheet data",
    icon: "sheets",
  },
  {
    id: "drive",
    name: "Google Drive",
    category: "popular",
    brandColor: "#4285F4",
    description: "Upload, organize, and share files",
    icon: "drive",
  },

  // AI Models
  {
    id: "claude",
    name: "Claude AI",
    category: "ai",
    brandColor: "#D4A27F",
    description: "Generate text, analyze data, and reason with Claude",
    icon: "claude",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "ai",
    brandColor: "#10A37F",
    description: "Generate content and analyze data with GPT-4",
    icon: "chatgpt",
  },
  {
    id: "gemini",
    name: "Gemini",
    category: "ai",
    brandColor: "#4285F4",
    description: "Multimodal AI reasoning and generation",
    icon: "gemini",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    category: "ai",
    brandColor: "#FFFFFF",
    description: "Generate stunning images from text descriptions",
    icon: "midjourney",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    category: "ai",
    brandColor: "#20B2AA",
    description: "AI-powered search and research assistant",
    icon: "perplexity",
  },

  // Productivity
  {
    id: "airtable",
    name: "Airtable",
    category: "productivity",
    brandColor: "#18BFFF",
    description: "Flexible database and spreadsheet hybrid",
    icon: "airtable",
  },
  {
    id: "linear",
    name: "Linear",
    category: "productivity",
    brandColor: "#5E6AD2",
    description: "Issue tracking and project management",
    icon: "linear",
  },
  {
    id: "jira",
    name: "Jira",
    category: "productivity",
    brandColor: "#0052CC",
    description: "Project tracking and agile management",
    icon: "jira",
  },
  {
    id: "calendar",
    name: "Google Calendar",
    category: "productivity",
    brandColor: "#4285F4",
    description: "Manage events, schedules, and reminders",
    icon: "calendar",
  },
  {
    id: "todoist",
    name: "Todoist",
    category: "productivity",
    brandColor: "#E44232",
    description: "Task management and to-do lists",
    icon: "todoist",
  },

  // Social
  {
    id: "twitter",
    name: "X (Twitter)",
    category: "social",
    brandColor: "#FFFFFF",
    description: "Post tweets, analyze trends, manage threads",
    icon: "twitter",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    category: "social",
    brandColor: "#0A66C2",
    description: "Post content, generate leads, manage connections",
    icon: "linkedin",
  },
  {
    id: "instagram",
    name: "Instagram",
    category: "social",
    brandColor: "#E4405F",
    description: "Post images, stories, and manage engagement",
    icon: "instagram",
  },
  {
    id: "tiktok",
    name: "TikTok",
    category: "social",
    brandColor: "#FFFFFF",
    description: "Upload and manage short-form video content",
    icon: "tiktok",
  },

  // Email
  {
    id: "outlook",
    name: "Outlook",
    category: "email",
    brandColor: "#0078D4",
    description: "Microsoft email and calendar integration",
    icon: "outlook",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    category: "email",
    brandColor: "#FFE01B",
    description: "Email marketing campaigns and automation",
    icon: "mailchimp",
  },
  {
    id: "sendgrid",
    name: "SendGrid",
    category: "email",
    brandColor: "#1A82E2",
    description: "Transactional and marketing email delivery",
    icon: "sendgrid",
  },

  // CRM
  {
    id: "hubspot",
    name: "HubSpot",
    category: "crm",
    brandColor: "#FF7A59",
    description: "CRM, marketing, and sales automation",
    icon: "hubspot",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "crm",
    brandColor: "#00A1E0",
    description: "Enterprise CRM and sales management",
    icon: "salesforce",
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    category: "crm",
    brandColor: "#1B1B1B",
    description: "Sales pipeline and deal management",
    icon: "pipedrive",
  },

  // Developer
  {
    id: "github",
    name: "GitHub",
    category: "developer",
    brandColor: "#FFFFFF",
    description: "Repository management, issues, and pull requests",
    icon: "github",
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "developer",
    brandColor: "#FFFFFF",
    description: "Deploy and manage web applications",
    icon: "vercel",
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "developer",
    brandColor: "#3ECF8E",
    description: "Database, auth, and real-time subscriptions",
    icon: "supabase",
  },

  // E-commerce
  {
    id: "shopify",
    name: "Shopify",
    category: "ecommerce",
    brandColor: "#96BF48",
    description: "E-commerce store management and analytics",
    icon: "shopify",
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "ecommerce",
    brandColor: "#635BFF",
    description: "Payment processing and subscription management",
    icon: "stripe",
  },
];

export function getAppById(id: string): AppInfo | undefined {
  return APP_CATALOG.find((app) => app.id === id);
}

export function getAppsByCategory(category: AppCategory): AppInfo[] {
  return APP_CATALOG.filter((app) => app.category === category);
}

export function searchApps(query: string): AppInfo[] {
  const lowerQuery = query.toLowerCase();
  return APP_CATALOG.filter(
    (app) =>
      app.name.toLowerCase().includes(lowerQuery) ||
      app.description.toLowerCase().includes(lowerQuery) ||
      app.category.includes(lowerQuery)
  );
}
