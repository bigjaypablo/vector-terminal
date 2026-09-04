import { NavLink } from "react-router-dom";
import {
  IconDashboard,
  IconMarkets,
  IconWatchlist,
  IconPortfolio,
  IconTransactions,
  IconTokenIntel,
  IconWalletIntel,
  IconSettings,
} from "../ui/Icons";

const navGroups = [
  {
    label: "Overview",
    items: [{ to: "/app", Icon: IconDashboard, text: "Dashboard", end: true }],
  },
  {
    label: "Markets",
    items: [
      { to: "/app/markets", Icon: IconMarkets, text: "Markets" },
      { to: "/app/watchlist", Icon: IconWatchlist, text: "Watchlist" },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { to: "/app/portfolio", Icon: IconPortfolio, text: "Portfolio" },
      { to: "/app/transactions", Icon: IconTransactions, text: "Transactions" },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { to: "/app/token-intelligence", Icon: IconTokenIntel, text: "Token Intelligence" },
      { to: "/app/wallet-intelligence", Icon: IconWalletIntel, text: "Wallet Intelligence" },
    ],
  },
];

export default function FullMobileMenu({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="md:hidden fixed inset-0 z-30" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute top-0 left-0 bottom-0 w-64 bg-[#0e0e0e] border-r border-white/10 p-4 overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-4 h-4 rounded-[4px] bg-teal-400" />
          <span className="text-sm text-white font-medium">VECTOR</span>
        </div>

        <nav className="flex flex-col gap-5">
          {navGroups.map((group) => (
            <div key={group.label}>
              <div className="px-2 mb-1.5 text-[10px] uppercase tracking-wider text-white/25">
                {group.label}
              </div>
              <div className="flex flex-col gap-1">
                {group.items.map(({ to, Icon, text, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm ${
                        isActive ? "bg-teal-400/10 text-teal-300" : "text-white/60"
                      }`
                    }
                  >
                    <Icon />
                    <span>{text}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}

          <NavLink
            to="/app/settings"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-white/40"
          >
            <IconSettings />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
