import { Link } from "react-router-dom";
import { Skeleton } from "../ui/Skeleton";
import { ErrorState } from "../ui/ErrorState";

const statusStyle = {
  confirmed: "text-teal-400",
  pending: "text-amber-400",
  failed: "text-red-400",
};

export default function RecentActivity({ data, loading, error, onRetry }) {
  return (
    <div className="md:h-full md:flex md:flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white/50 tracking-wide">Recent activity</span>
        <Link to="/app/transactions" className="text-[12px] text-teal-400/80 hover:text-teal-300">
          View all
        </Link>
      </div>

      <div className="bg-white/4 border border-white/10 rounded-xl divide-y divide-white/8 flex-1">
        {error ? (
          <ErrorState message={error} onRetry={onRetry} />
        ) : loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="px-3 py-2.5">
              <Skeleton className="h-3 w-32 mb-1" />
              <Skeleton className="h-2.5 w-20" />
            </div>
          ))
        ) : data.length === 0 ? (
          <p className="text-sm text-white/35 text-center py-6">No recent activity</p>
        ) : (
          data.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between px-3 py-2.5">
              <div>
                <div className="text-sm text-white/90 font-medium">{tx.type}</div>
                <div className="text-[12px] text-white/40 mt-0.5">
                  {tx.amount} · {tx.timestamp}
                </div>
              </div>
              <span className={`text-[12px] font-medium ${statusStyle[tx.status]}`}>
                {tx.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
