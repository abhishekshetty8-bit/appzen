"use client";
import { useState } from "react";
import { useAppState } from "@/context/AppState";

export default function AgentPanel() {
  const { state, dispatch } = useAppState();
  const email = state.emails.find((e) => e.id === state.selectedEmailId) ?? null;
  const [loading, setLoading] = useState<null | "analyzing" | "sending">(null);
  const [draft, setDraft] = useState<string>("");
  const [analysis, setAnalysis] = useState<string[]>([]);

  if (!email) return null;

  const canRespond = email.classification === "Payment Inquiry" || email.classification === "Update Request";

  const handleAgentRespond = async () => {
    setLoading("analyzing");
    setAnalysis([]);
    await new Promise((r) => setTimeout(r, 800));
    setAnalysis((a) => [...a, `Identified: ${email.classification} for invoice #12345`]);
    await new Promise((r) => setTimeout(r, 800));
    setAnalysis((a) => [...a, "Found invoice in system: $8,500, due Oct 5, payment scheduled for Oct 22"]);
    await new Promise((r) => setTimeout(r, 500));
    setAnalysis((a) => [...a, `Confidence: ${(state.agents.inquiry.confidence * 100).toFixed(0)}%`]);

    const generated = `Hi ${email.from.split("@")[0]},\n\nThank you for reaching out. I've checked on invoice #12345 for $8,500.\nOur records show payment is scheduled for October 22, 2025.\n\nPlease let me know if you need any additional information.\n\nBest regards,\nAppZen Inbox AI Assistant`;
    setDraft(generated);
    setLoading(null);
  };

  const send = async () => {
    setLoading("sending");
    await new Promise((r) => setTimeout(r, 800));
    dispatch({ type: "resolveEmail", id: email.id });
    dispatch({ type: "updateMetrics", delta: { timeSaved: +(state.metrics.timeSaved + 0.05).toFixed(2) } });
    dispatch({ type: "notify", message: "Agent response sent. Email moved to Resolved.", level: "success" });
    setLoading(null);
  };

  return (
    <div className="border-l w-96 flex flex-col h-full">
      <div className="p-3 border-b bg-white font-medium">Agent Actions</div>
      <div className="p-3 space-y-3 text-sm">
        {!canRespond && <div className="text-gray-500">Agent response not available for this classification.</div>}
        {canRespond && (
          <>
            <button
              onClick={handleAgentRespond}
              className="px-3 py-1.5 rounded bg-indigo-600 text-white disabled:opacity-50"
              disabled={loading !== null}
            >
              {loading === "analyzing" ? "Analyzing..." : "Let Agent Respond"}
            </button>
            {loading === "analyzing" && (
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-4/6" />
              </div>
            )}
            {!!analysis.length && (
              <div>
                <div className="font-medium mb-1">Agent analysis</div>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {analysis.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
            {draft && (
              <div>
                <div className="font-medium mb-1">Draft response</div>
                <textarea className="w-full h-40 border rounded p-2 text-sm" value={draft} onChange={(e) => setDraft(e.target.value)} />
                <div className="flex gap-2 mt-2">
                  <button onClick={send} className="px-3 py-1.5 rounded bg-green-600 text-white disabled:opacity-50" disabled={loading === "sending"}>
                    {loading === "sending" ? "Sending..." : "Approve & Send"}
                  </button>
                  <button onClick={() => setDraft("")} className="px-3 py-1.5 rounded border">Reject</button>
                </div>
                {loading === "sending" && (
                  <div className="mt-2 h-2 bg-green-200 rounded animate-pulse" />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
