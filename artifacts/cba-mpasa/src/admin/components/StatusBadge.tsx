type Variant = "success" | "warning" | "error" | "info" | "neutral" | "amber";

const STYLES: Record<Variant, string> = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-100",
  warning: "bg-amber-50 text-amber-700 border-amber-100",
  error: "bg-red-50 text-red-700 border-red-100",
  info: "bg-sky-50 text-sky-700 border-sky-100",
  neutral: "bg-stone-100 text-stone-600 border-stone-200",
  amber: "bg-amber-50 text-amber-800 border-amber-200",
};

export function StatusBadge({
  label,
  variant = "neutral",
}: {
  label: string;
  variant?: Variant;
}) {
  return (
    <span
      className={`inline-flex items-center text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-full border ${STYLES[variant]}`}
    >
      {label}
    </span>
  );
}
