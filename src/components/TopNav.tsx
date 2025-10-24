"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();
  const link = (href: string, label: string) => (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        pathname === href ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </Link>
  );
  return (
    <div className="flex items-center justify-between px-4 h-14 border-b bg-white">
      <div className="flex gap-2">{link("/inbox", "Inbox")}{link("/dashboard", "Dashboard")}</div>
      <div className="text-sm text-gray-500">AppZen Inbox Demo</div>
    </div>
  );
}
