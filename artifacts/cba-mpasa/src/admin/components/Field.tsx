import { AlertCircle } from "lucide-react";

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-3 py-2.5 flex items-start gap-2">
      <AlertCircle size={14} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export function EmptyState({ text, icon }: { text: string; icon?: React.ReactNode }) {
  return (
    <div className="text-center py-12 text-sm text-stone-400 flex flex-col items-center gap-2">
      {icon && <div className="text-stone-300">{icon}</div>}
      {text}
    </div>
  );
}
