"use client";
import { useAppState } from "@/context/AppState";

export default function MetricsCards() {
  const { state } = useAppState();
  const fmtPct = (n: number) => `${Math.round(n * 100)}%`;
  const fmtUsd = (n: number) => `$${n.toLocaleString()}`;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card title="Emails Processed" value={state.metrics.emailsProcessed.toLocaleString()} color="indigo" />
      <Card title="Auto-Resolution Rate" value={fmtPct(state.metrics.autoResolutionRate)} color="green" />
      <Card title="Time Saved" value={`${state.metrics.timeSaved.toFixed(1)} h` } color="amber" />
      <Card title="Cost Savings" value={fmtUsd(state.metrics.costSavings)} color="emerald" />
    </div>
  );
}

function Card({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className={`rounded-lg p-4 border bg-white`}> 
      <div className="text-xs text-gray-500">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}
