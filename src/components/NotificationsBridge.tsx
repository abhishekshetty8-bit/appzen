"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppState } from "@/context/AppState";

export default function NotificationsBridge() {
  const { state, dispatch } = useAppState();

  useEffect(() => {
    if (state.notifications.length === 0) return;
    for (const n of [...state.notifications].reverse()) {
      const fn = n.type === "success" ? toast.success : n.type === "error" ? toast.error : n.type === "warning" ? toast.warning : toast.info;
      fn(n.message);
    }
    dispatch({ type: "clearNotifications" });
  }, [state.notifications, dispatch]);

  return null;
}
