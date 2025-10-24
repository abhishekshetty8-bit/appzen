"use client";
import StatementTable from "@/components/StatementTable";
import { sampleStatements } from "@/data/statements";

export default function StatementsPage() {
  const data = sampleStatements[0];
  return (
    <div className="p-6 space-y-6">
      <StatementTable data={data} />
    </div>
  );
}
