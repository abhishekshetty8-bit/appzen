"use client";
import { useMemo } from "react";
import { useAppState } from "@/context/AppState";

export default function EmailDetail() {
  const { state, dispatch } = useAppState();
  const email = useMemo(() => state.emails.find((e) => e.id === state.selectedEmailId) ?? null, [state]);
  if (!email) return <div className="p-6 text-gray-500">Select an email to view details.</div>;
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-white flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold text-gray-800">{email.subject}</div>
          <div className="text-xs text-gray-600">From: {email.from} • {email.timestamp}</div>
        </div>
        <div className="flex gap-2">
          {email.status !== "read" && (
            <button className="px-2 py-1 border rounded" onClick={() => dispatch({ type: "markRead", id: email.id })}>Mark read</button>
          )}
          {email.status !== "unread" && (
            <button className="px-2 py-1 border rounded" onClick={() => dispatch({ type: "markUnread", id: email.id })}>Mark unread</button>
          )}
        </div>
      </div>
      <div className="p-4 text-sm whitespace-pre-wrap flex-1 overflow-auto">{email.body}</div>
      <div className="border-t p-3 bg-gray-50 text-xs text-gray-600">
        Classification: {email.classification} • Confidence {(email.confidence * 100).toFixed(0)}% • Priority {email.priority}
      </div>
    </div>
  );
}
