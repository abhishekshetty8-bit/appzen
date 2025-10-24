"use client";
import { AppStateProvider } from "@/context/AppState";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AppStateProvider>{children}</AppStateProvider>;
}
