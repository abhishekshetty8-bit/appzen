"use client";
import MetricsCards from "@/components/MetricsCards";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardPage() {
  const emailVolume = Array.from({ length: 30 }).map((_, i) => {
    const day = i + 1;
    const manual = Math.max(5, 40 - i);
    const ai = Math.min(45, i + 5);
    return { day: `${day}`, Manual: manual, AI: ai };
  });

  const responseTime = [
    { label: "Before Inbox", Minutes: 2.3 * 24 * 60 },
    { label: "With Inbox", Minutes: 8 },
  ];

  const typeBreakdown = [
    { name: "Payment Status", value: 45 },
    { name: "Invoice Questions", value: 25 },
    { name: "Updates", value: 15 },
    { name: "Disputes", value: 10 },
    { name: "Other", value: 5 },
  ];

  const confidenceDist = Array.from({ length: 10 }).map((_, i) => ({
    bucket: `${75 + i * 3}-${77 + i * 3}%`,
    Count: Math.max(2, 10 - Math.abs(5 - i) + (i > 3 && i < 8 ? 4 : 0)),
  }));

  const colors = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6B7280"]; 

  return (
    <div className="p-6 space-y-6">
      <MetricsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded border bg-white p-4 h-64">
          <div className="text-sm font-medium mb-2">Email Volume Trend (30 days)</div>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={emailVolume}>
              <XAxis dataKey="day" hide />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Manual" stroke="#6B7280" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="AI" stroke="#4F46E5" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded border bg-white p-4 h-64">
          <div className="text-sm font-medium mb-2">Response Time Comparison</div>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={responseTime}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip formatter={(v: number) => `${Math.round(v)} min`} />
              <Bar dataKey="Minutes" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded border bg-white p-4 h-64">
          <div className="text-sm font-medium mb-2">Inquiry Type Breakdown</div>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie data={typeBreakdown} dataKey="value" nameKey="name" outerRadius={80} label>
                {typeBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded border bg-white p-4 h-64">
          <div className="text-sm font-medium mb-2">Agent Confidence Distribution</div>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={confidenceDist}>
              <XAxis dataKey="bucket" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Count" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
