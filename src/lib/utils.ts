import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function classNames(
  ...items: Array<string | false | null | undefined>
): string {
  return items.filter(Boolean).join(" ");
}

export function minutesAgoLabel(minutes: number): string {
  if (minutes <= 1) return "agora";
  return `${minutes} min atrás`;
}

export function createId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
}

export function downloadCsv(
  filename: string,
  rows: Array<Record<string, string | number>>,
) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers.map((header) => JSON.stringify(row[header] ?? "")).join(","),
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
