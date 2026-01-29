import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * cn() merges Tailwind classes conditionally and avoids conflicts
 * Example:
 * cn("px-2 py-2", isActive && "bg-black", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
