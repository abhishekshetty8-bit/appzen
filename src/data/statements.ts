export interface StatementLineItem {
  invoice_number: string;
  date: string;
  amount: number;
  status: "Matched" | "Missing" | "Discrepancy";
  system_invoice: string | null;
  notes: string;
  action_required?: string;
  potential_recovery?: number;
}

export interface StatementData {
  supplier: string;
  statement_date: string;
  total_amount: number;
  line_items: StatementLineItem[];
  summary: {
    total_lines: number;
    matched: number;
    discrepancies: number;
    missing: number;
    potential_recovery: number;
  };
}

export const sampleStatements: StatementData[] = [
  {
    supplier: "Global Tech Distributors",
    statement_date: "2025-09-30",
    total_amount: 45750,
    line_items: [
      {
        invoice_number: "INV-2024-8891",
        date: "2025-09-05",
        amount: 12500,
        status: "Matched",
        system_invoice: "INV-2024-8891",
        notes: "",
      },
      {
        invoice_number: "INV-2024-8923",
        date: "2025-09-15",
        amount: 8900,
        status: "Discrepancy",
        system_invoice: "INV-2024-8923",
        notes: "System shows $8,750 - $150 difference",
        action_required: "Investigate pricing difference",
      },
      {
        invoice_number: "CREDIT-547",
        date: "2025-09-20",
        amount: -1250,
        status: "Missing",
        system_invoice: null,
        notes: "Credit note not found in system",
        action_required: "Request credit note copy",
        potential_recovery: 1250,
      },
    ],
    summary: {
      total_lines: 8,
      matched: 5,
      discrepancies: 2,
      missing: 1,
      potential_recovery: 1250,
    },
  },
];
