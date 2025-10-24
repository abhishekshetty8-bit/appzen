export type EmailClassification =
  | "Invoice"
  | "Payment Inquiry"
  | "Statement"
  | "Update Request"
  | "Dispute"
  | "Other";

export type Priority = "Low" | "Medium" | "High";

export interface EmailItem {
  id: string;
  from: string;
  subject: string;
  timestamp: string;
  classification: EmailClassification;
  confidence: number; // 0..1
  priority: Priority;
  body: string;
  attachments: string[];
  status: "unread" | "read" | "resolved";
  agent_suggested_action?: string;
}

export interface AgentConfig {
  inquiry: { enabled: boolean; confidence: number };
  reconciliation: { enabled: boolean };
  vendorUpdate: { enabled: boolean };
}

export interface Metrics {
  emailsProcessed: number;
  autoResolutionRate: number; // 0..1
  timeSaved: number; // hours
  costSavings: number; // USD
}

export interface AppStateShape {
  emails: EmailItem[];
  selectedEmailId: string | null;
  filters: { classification: "all" | EmailClassification; status: "all" | "unread" | "read" | "resolved" };
  agents: AgentConfig;
  metrics: Metrics;
  notifications: { id: string; message: string; type: "success" | "info" | "warning" | "error" }[];
}
