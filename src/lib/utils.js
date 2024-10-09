import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatFirebaseTimestamp(time) {
  return (
    new Date(time * 1000).getHours() +
    ":" +
    (new Date(time * 1000).getMinutes() < 10 ? "0" : "") +
    new Date(time * 1000).getMinutes()
  );
}
