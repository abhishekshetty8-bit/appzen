"use client";
import EmailList from "@/components/EmailList";
import EmailDetail from "@/components/EmailDetail";
import AgentPanel from "@/components/AgentPanel";

export default function InboxPage() {
  return (
    <div className="h-[calc(100vh-3.5rem)] grid grid-cols-[1fr,2fr,24rem]">
      <div className="border-r bg-white">
        <EmailList />
      </div>
      <div className="bg-white">
        <EmailDetail />
      </div>
      <div className="bg-white">
        <AgentPanel />
      </div>
    </div>
  );
}
