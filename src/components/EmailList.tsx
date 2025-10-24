"use client";
import { useAppState } from "@/context/AppState";
import { Badge } from "@/components/ui/badge";

export default function EmailList() {
  const { state, dispatch } = useAppState();
  const filtered = state.emails.filter((e) => {
    const classOk = state.filters.classification === "all" || e.classification === state.filters.classification;
    const statusOk = state.filters.status === "all" || e.status === state.filters.status;
    return classOk && statusOk;
  });
  return (
    <div className="flex flex-col h-full">
      <div className="p-2 border-b bg-white flex gap-2">
        <select
          className="border rounded px-2 py-1 text-sm"
          value={state.filters.classification}
          onChange={(e) =>
            dispatch({ type: "filter", classification: e.target.value as any, status: state.filters.status })
          }
        >
          <option value="all">All types</option>
          <option>Payment Inquiry</option>
          <option>Invoice</option>
          <option>Statement</option>
          <option>Update Request</option>
          <option>Dispute</option>
          <option>Other</option>
        </select>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={state.filters.status}
          onChange={(e) =>
            dispatch({ type: "filter", classification: state.filters.classification, status: e.target.value as any })
          }
        >
          <option value="all">All statuses</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      <div className="overflow-auto divide-y">
        {filtered.map((email) => (
          <button
            key={email.id}
            className={`w-full text-left p-3 hover:bg-gray-50 transition ${
              state.selectedEmailId === email.id ? "bg-indigo-50/70" : ""
            }`}
            onClick={() => dispatch({ type: "selectEmail", id: email.id })}
          >
            <div className="flex items-center justify-between">
              <div className="font-medium text-gray-800">{email.subject}</div>
              <div className="text-xs text-gray-500">{email.timestamp}</div>
            </div>
            <div className="text-xs text-gray-600 flex items-center gap-2">
              <span className="truncate">{email.from}</span>
              <Badge variant="secondary">{email.classification}</Badge>
              <span className="text-gray-500">Conf: {(email.confidence * 100).toFixed(0)}%</span>
            </div>
            {email.status === "unread" && <div className="mt-1 text-xs text-indigo-700">Unread</div>}
          </button>
        ))}
      </div>
    </div>
  );
}
