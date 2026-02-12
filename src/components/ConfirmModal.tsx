type Props = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-base-100 rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-2">
          {title}
        </h2>

        <p className="opacity-80 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="btn btn-ghost"
            onClick={onCancel}
          >
            No
          </button>

          <button
            className="btn btn-primary"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
