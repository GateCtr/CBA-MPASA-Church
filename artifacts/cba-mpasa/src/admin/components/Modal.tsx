import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  if (!open) return null;

  const widthCls = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-2xl",
  }[size];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-stone-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full ${widthCls} max-h-[90vh] overflow-hidden flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 shrink-0">
          <h3 className="font-['Playfair_Display'] font-bold text-lg text-stone-900">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 transition p-1 rounded-lg hover:bg-stone-100"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto p-6 flex-1">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmDelete({
  open,
  onCancel,
  onConfirm,
  label,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  label: string;
}) {
  return (
    <Modal open={open} onClose={onCancel} title="Confirmer la suppression" size="sm">
      <p className="text-sm text-stone-600 mb-6">
        Voulez-vous vraiment supprimer{" "}
        <span className="font-semibold text-stone-900">« {label} »</span> ?
        Cette action est irréversible.
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm rounded-lg border border-stone-200 hover:bg-stone-50 transition"
        >
          Annuler
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition inline-flex items-center gap-2"
        >
          Supprimer
        </button>
      </div>
    </Modal>
  );
}
