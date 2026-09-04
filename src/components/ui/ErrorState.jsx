export function ErrorState({ message = "Something went wrong", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4">
      <p className="text-sm text-white/70 mb-1">Unable to load data</p>
      <p className="text-sm text-white/40 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-1.5 text-sm font-medium rounded-full border border-white/15 text-white/80 hover:bg-white/5 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
