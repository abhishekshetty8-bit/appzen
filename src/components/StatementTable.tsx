"use client";
import { useState } from "react";
import type { StatementData } from "@/data/statements";

export default function StatementTable({ data }: { data: StatementData }) {
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const startProcess = async () => {
    setProcessing(true);
    setDone(false);
    await new Promise((r) => setTimeout(r, 700));
    await new Promise((r) => setTimeout(r, 700));
    await new Promise((r) => setTimeout(r, 700));
    await new Promise((r) => setTimeout(r, 700));
    setProcessing(false);
    setDone(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{data.supplier}</div>
          <div className="text-xs text-gray-600">Statement date: {data.statement_date} • Total ${data.total_amount.toLocaleString()}</div>
        </div>
        <button onClick={startProcess} disabled={processing} className="px-3 py-1.5 rounded bg-indigo-600 text-white disabled:opacity-50">
          {processing ? "Processing..." : "Process Statement"}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <SummaryCard label="Total Lines" value={String(data.summary.total_lines)} />
        <SummaryCard label="Matched" value={String(data.summary.matched)} />
        <SummaryCard label="Discrepancies" value={String(data.summary.discrepancies)} />
        <SummaryCard label="Missing" value={String(data.summary.missing)} />
      </div>

      {processing && (
        <div className="rounded border bg-white p-4 text-sm">
          <div className="font-medium mb-2">AI Agent analyzing statement...</div>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Extracting line items... ✓</li>
            <li>Matching against invoice history... ✓</li>
            <li>Identifying discrepancies... ✓</li>
            <li>Calculating potential recovery... ✓</li>
          </ul>
        </div>
      )}

      {done && data.summary.potential_recovery > 0 && (
        <div className="rounded border bg-green-50 p-4 text-sm text-green-800">
          <strong>Potential recovery found:</strong> ${data.summary.potential_recovery.toLocaleString()} credit discovered!
        </div>
      )}

      <div className="overflow-auto rounded border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-2">Invoice</th>
              <th className="text-left p-2">Date</th>
              <th className="text-right p-2">Amount</th>
              <th className="text-left p-2">Match Status</th>
              <th className="text-left p-2">System Ref</th>
              <th className="text-left p-2">Notes</th>
              <th className="text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.line_items.map((li) => (
              <tr key={li.invoice_number} className="border-t">
                <td className="p-2">{li.invoice_number}</td>
                <td className="p-2">{li.date}</td>
                <td className="p-2 text-right">{li.amount.toLocaleString(undefined, { style: "currency", currency: "USD" })}</td>
                <td className="p-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    li.status === "Matched" ? "bg-green-100 text-green-800" : li.status === "Discrepancy" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                  }`}>
                    {li.status}
                  </span>
                </td>
                <td className="p-2">{li.system_invoice ?? "—"}</td>
                <td className="p-2">{li.notes}</td>
                <td className="p-2">{li.action_required ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border bg-white p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
