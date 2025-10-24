"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();
  const link = (href: string, label: string) => (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        pathname === href ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );
  return (
    <div className="flex items-center justify-between px-4 lg:px-6 h-14 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 rounded bg-indigo-600" />
        <div className="text-sm font-semibold text-gray-800 mr-2">AppZen Supplier Hub</div>
        {link("/inbox", "Inbox")}
        {link("/dashboard", "Dashboard")}
        {link("/statements", "Statements")}
        {link("/settings", "Settings")}
        {link("/tracker", "Tracker")}
      </div>
      <div className="flex items-center gap-3">
        <input placeholder="Search" className="hidden md:block h-8 w-48 rounded border px-2 text-sm" />
        <div className="h-8 w-8 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}
