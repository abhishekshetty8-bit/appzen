"use client";
import MetricsCards from "@/components/MetricsCards";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <MetricsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded border bg-white p-4 h-64 flex items-center justify-center text-gray-500 text-sm">
          Charts placeholder (Email Volume Trend)
        </div>
        <div className="rounded border bg-white p-4 h-64 flex items-center justify-center text-gray-500 text-sm">
          Charts placeholder (Response Time Comparison)
        </div>
      </div>
    </div>
  );
}
