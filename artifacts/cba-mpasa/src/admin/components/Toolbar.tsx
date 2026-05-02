import { Plus, Search } from "lucide-react";

interface ToolbarProps {
  search: string;
  setSearch: (s: string) => void;
  onAdd?: () => void;
  addLabel?: string;
  placeholder?: string;
  extra?: React.ReactNode;
}

export function Toolbar({
  search,
  setSearch,
  onAdd,
  addLabel = "Ajouter",
  placeholder = "Rechercher…",
  extra,
}: ToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
      <div className="relative flex-1">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
        />
      </div>
      {extra}
      {onAdd && (
        <button
          onClick={onAdd}
          className="inline-flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow-sm shrink-0"
        >
          <Plus size={15} /> {addLabel}
        </button>
      )}
    </div>
  );
}
