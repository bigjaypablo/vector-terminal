export default function TotalValueCard({ total }) {
  return (
    <div className="mb-6">
      <div className="text-sm text-white/40 mb-1">Total Value</div>
      <div className="text-4xl font-semibold text-white tabular-nums tracking-tight">
        ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>
    </div>
  );
}
