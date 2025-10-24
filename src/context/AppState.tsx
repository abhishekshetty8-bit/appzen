"use client";
import React, { createContext, useContext, useMemo, useReducer, useEffect } from "react";
import type { AppStateShape, EmailItem, EmailClassification, AgentConfig } from "@/types";
import { initialEmails } from "@/data/emails";

// Actions
type Action =
  | { type: "selectEmail"; id: string | null }
  | { type: "markRead"; id: string }
  | { type: "markUnread"; id: string }
  | { type: "resolveEmail"; id: string }
  | { type: "filter"; classification: AppStateShape["filters"]["classification"]; status: AppStateShape["filters"]["status"] }
  | { type: "addEmail"; email: EmailItem }
  | { type: "notify"; message: string; level?: "success" | "info" | "warning" | "error" }
  | { type: "updateMetrics"; delta: Partial<AppStateShape["metrics"]> }
  | { type: "setAgents"; agents: AgentConfig };

const initialState: AppStateShape = {
  emails: initialEmails,
  selectedEmailId: initialEmails[0]?.id ?? null,
  filters: { classification: "all", status: "all" },
  agents: {
    inquiry: { enabled: true, confidence: 0.85 },
    reconciliation: { enabled: true },
    vendorUpdate: { enabled: false },
  },
  metrics: {
    emailsProcessed: 847,
    autoResolutionRate: 0.82,
    timeSaved: 43.2,
    costSavings: 2160,
  },
  notifications: [],
};

function reducer(state: AppStateShape, action: Action): AppStateShape {
  switch (action.type) {
    case "selectEmail":
      return { ...state, selectedEmailId: action.id };
    case "markRead":
      return { ...state, emails: state.emails.map(e => (e.id === action.id ? { ...e, status: "read" as const } : e)) };
    case "markUnread":
      return { ...state, emails: state.emails.map(e => (e.id === action.id ? { ...e, status: "unread" as const } : e)) };
    case "resolveEmail": {
      const emails = state.emails.map(e => (e.id === action.id ? { ...e, status: "resolved" as const } : e));
      return { ...state, emails };
    }
    case "filter":
      return { ...state, filters: { classification: action.classification, status: action.status } };
    case "addEmail":
      return { ...state, emails: [action.email, ...state.emails] };
    case "notify": {
      const id = Math.random().toString(36).slice(2);
      return { ...state, notifications: [{ id, message: action.message, type: action.level ?? "info" }, ...state.notifications] };
    }
    case "updateMetrics":
      return { ...state, metrics: { ...state.metrics, ...action.delta } };
    case "setAgents":
      return { ...state, agents: action.agents };
    default:
      return state;
  }
}

const AppStateContext = createContext<{ state: AppStateShape; dispatch: React.Dispatch<Action> } | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Simulate new email arrival every 45s
  useEffect(() => {
    const interval = setInterval(() => {
      const rnd = Math.random();
      const classifications: EmailClassification[] = [
        "Payment Inquiry",
        "Invoice",
        "Statement",
        "Update Request",
        "Dispute",
        "Other",
      ];
      const classification = classifications[Math.floor(Math.random() * classifications.length)];
      const email: EmailItem = {
        id: `email_${Date.now()}`,
        from: "noreply@supplierdemo.com",
        subject: `New ${classification} received`,
        timestamp: new Date().toLocaleString(),
        classification,
        confidence: 0.7 + Math.random() * 0.3,
        priority: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)] as any,
        body: `Auto-generated ${classification} email for demo purposes.`,
        attachments: [],
        status: "unread",
        agent_suggested_action: classification === "Payment Inquiry" ? "Auto-respond with payment status" : undefined,
      };
      dispatch({ type: "addEmail", email });
      dispatch({ type: "updateMetrics", delta: { emailsProcessed: state.metrics.emailsProcessed + 1 } });
      dispatch({ type: "notify", message: "New email arrived", level: "info" });
    }, 45000);
    return () => clearInterval(interval);
  }, [state.metrics.emailsProcessed]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
