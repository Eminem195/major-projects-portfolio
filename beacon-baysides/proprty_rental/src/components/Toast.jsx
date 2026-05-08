const Toast = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 w-[320px] rounded-3xl bg-slate-900 px-5 py-4 text-white shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">Notification</p>
          <p className="mt-2 text-sm text-slate-200">{message}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Toast;
