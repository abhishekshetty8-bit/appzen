"use client";
import { useState } from "react";
import { useAppState } from "@/context/AppState";

export default function SettingsPage() {
  const { state, dispatch } = useAppState();
  const [confidence, setConfidence] = useState(Math.round(state.agents.inquiry.confidence * 100));
  const [inquiryEnabled, setInquiryEnabled] = useState(state.agents.inquiry.enabled);
  const [reconEnabled, setReconEnabled] = useState(state.agents.reconciliation.enabled);
  const [vendorEnabled, setVendorEnabled] = useState(state.agents.vendorUpdate.enabled);

  const save = () => {
    dispatch({
      type: "setAgents",
      agents: {
        inquiry: { enabled: inquiryEnabled, confidence: confidence / 100 },
        reconciliation: { enabled: reconEnabled },
        vendorUpdate: { enabled: vendorEnabled },
      },
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="rounded border bg-white p-4">
        <div className="text-lg font-semibold mb-2">Supplier Inquiry Agent</div>
        <div className="flex items-center gap-2 mb-3 text-sm">
          <input id="inq-enabled" type="checkbox" checked={inquiryEnabled} onChange={(e) => setInquiryEnabled(e.target.checked)} />
          <label htmlFor="inq-enabled">Enabled</label>
        </div>
        <div className="text-sm mb-1">Auto-Send Threshold: <span className="font-medium">{confidence}%</span></div>
        <input type="range" min={50} max={100} value={confidence} onChange={(e) => setConfidence(parseInt(e.target.value, 10))} className="w-full" />
        <div className="mt-3 text-xs text-gray-600">Agent will auto-send responses when confidence ≥ threshold.</div>
      </div>

      <div className="rounded border bg-white p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToggleCard label="Statement Reconciliation" enabled={reconEnabled} onChange={setReconEnabled} />
        <ToggleCard label="Vendor Update Agent" enabled={vendorEnabled} onChange={setVendorEnabled} />
      </div>

      <div className="flex gap-2">
        <button onClick={save} className="px-3 py-1.5 rounded bg-indigo-600 text-white">Save Changes</button>
      </div>
    </div>
  );
}

function ToggleCard({ label, enabled, onChange }: { label: string; enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="rounded border bg-white p-4">
      <div className="flex items-center gap-2">
        <input id={label} type="checkbox" checked={enabled} onChange={(e) => onChange(e.target.checked)} />
        <label htmlFor={label} className="text-sm font-medium">{label}</label>
      </div>
    </div>
  );
}
