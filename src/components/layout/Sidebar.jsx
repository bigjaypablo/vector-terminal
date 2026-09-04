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
  IconChevronLeft,
  IconChevronRight,
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

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={`hidden md:flex flex-col shrink-0 border-r border-white/8 py-4 transition-all duration-200 ${
        collapsed ? "w-14" : "w-56"
      }`}
    >
      <button
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="self-end mr-2 mb-3 w-6 h-6 rounded-md flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/5 transition-colors"
      >
        {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
      </button>

      <nav className="flex-1 flex flex-col gap-5 px-2">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <div className="px-2 mb-1.5 text-[12px] uppercase tracking-wider text-white/25">
                {group.label}
              </div>
            )}
            <div className="flex flex-col gap-1">
              {group.items.map(({ to, Icon, text, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  title={collapsed ? text : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                      collapsed ? "justify-center" : ""
                    } ${
                      isActive
                        ? "bg-teal-400/10 text-teal-300"
                        : "text-white/40 hover:text-white/80 hover:bg-white/5"
                    }`
                  }
                >
                  <Icon />
                  {!collapsed && <span className="font-medium">{text}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-2">
        <NavLink
          to="/app/settings"
          title={collapsed ? "Settings" : undefined}
          className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-white/30 hover:text-white/70 hover:bg-white/5 transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <IconSettings />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </div>
    </aside>
  );
}
