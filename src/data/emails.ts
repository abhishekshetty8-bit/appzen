import { EmailItem } from "@/types";

export const initialEmails: EmailItem[] = [
  {
    id: "email_001",
    from: "accounts@acmesupplies.com",
    subject: "RE: Payment Status for Invoice #12345",
    timestamp: "2025-10-20 09:34 AM",
    classification: "Payment Inquiry",
    confidence: 0.95,
    priority: "High",
    body:
      "Hi, We haven't received payment for invoice #12345 dated Sept 15. The invoice was for $8,500 and is now 30 days overdue. Can you provide an update on when we can expect payment? Thanks, Sarah Chen, Acme Supplies",
    attachments: [],
    status: "unread",
    agent_suggested_action: "Auto-respond with payment status",
  },
  {
    id: "email_002",
    from: "billing@globaltechdist.com",
    subject: "Statement for September",
    timestamp: "2025-10-19 03:10 PM",
    classification: "Statement",
    confidence: 0.88,
    priority: "Medium",
    body:
      "Attached is our statement for September including credits and outstanding invoices.",
    attachments: ["statement-sep.pdf"],
    status: "unread",
  },
  {
    id: "email_003",
    from: "ap@premieroffice.com",
    subject: "PO number for INV-2024-8891",
    timestamp: "2025-10-18 11:05 AM",
    classification: "Update Request",
    confidence: 0.81,
    priority: "Low",
    body: "Could you confirm the PO number for invoice INV-2024-8891?",
    attachments: [],
    status: "read",
  },
];
