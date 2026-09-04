import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IconDashboard, IconMarkets, IconPortfolio, IconWatchlist, IconMore } from "../ui/Icons";
import MoreMenu from "./MoreMenu";

const items = [
  { to: "/app", Icon: IconDashboard, label: "Dashboard", end: true },
  { to: "/app/markets", Icon: IconMarkets, label: "Markets" },
  { to: "/app/portfolio", Icon: IconPortfolio, label: "Portfolio" },
  { to: "/app/watchlist", Icon: IconWatchlist, label: "Watchlist" },
];

export default function MobileNavigation() {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-white/8 bg-[#0a0a0a]/95 backdrop-blur-md py-2 z-20">
        {items.map(({ to, Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] ${
                isActive ? "text-teal-300" : "text-white/40"
              }`
            }
          >
            <Icon width={18} height={18} />
            {label}
          </NavLink>
        ))}

        <button
          onClick={() => setMoreOpen(true)}
          aria-label="More options"
          className="flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] text-white/40"
        >
          <IconMore width={18} height={18} />
          More
        </button>
      </nav>

      <MoreMenu open={moreOpen} onClose={() => setMoreOpen(false)} />
    </>
  );
}
