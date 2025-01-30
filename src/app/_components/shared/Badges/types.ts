import { ReactNode } from "react";

export interface BadgesProps {
  variant?: "default" | "success" | "warning" | "error" | "outline";
  children: ReactNode;
  className?: string;
}
