export default function TrackerPage() {
  const phases = [
    { title: "Phase 0: Email-Only", status: "current", items: ["Email triage active", "Inquiry agent responding", "Benefits: Instant value, no setup"] },
    { title: "Phase 1: Basic Data Sync", status: "next", items: ["Upload invoice history", "Statement reconciliation enabled", "Benefits: Richer context, better accuracy"] },
    { title: "Phase 2: ERP Integration", status: "planned", items: ["Connect to NetSuite/SAP", "Real-time payment status", "Benefits: Full autonomy, advanced features"] },
    { title: "Phase 3: Advanced Automation", status: "future", items: ["Custom agents", "Multi-entity support", "Benefits: Enterprise-grade automation"] },
  ] as const;

  return (
    <div className="p-6 space-y-6">
      <div className="text-lg font-semibold">Integration Progress</div>
      <div className="space-y-4">
        {phases.map((p, idx) => (
          <div key={p.title} className={`rounded border p-4 bg-white ${p.status === "current" ? "border-green-500" : p.status === "next" ? "border-amber-400" : ""}`}>
            <div className="flex items-center justify-between">
              <div className="font-medium">{p.title} {p.status === "current" && <span className="ml-2 text-xs px-2 py-0.5 rounded bg-green-100 text-green-800">CURRENT</span>} {p.status === "next" && <span className="ml-2 text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800">NEXT</span>}</div>
              <div className="text-xs text-gray-500">Step {idx}</div>
            </div>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-1">
              {p.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
