import { NavLink } from "react-router-dom";
import { IconTransactions, IconTokenIntel, IconWalletIntel, IconSettings } from "../ui/Icons";

const items = [
  { to: "/app/transactions", Icon: IconTransactions, label: "Transactions" },
  { to: "/app/wallet-intelligence", Icon: IconWalletIntel, label: "Wallet Intelligence" },
  { to: "/app/settings", Icon: IconSettings, label: "Settings" },
];

export default function MoreMenu({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="md:hidden fixed inset-0 z-30" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-[#0e0e0e] border-t border-white/10 rounded-t-2xl p-4 pb-8">
        <div className="w-10 h-1 bg-white/15 rounded-full mx-auto mb-4" />
        <div className="flex flex-col gap-1">
          {items.map(({ to, Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg text-sm ${
                  isActive ? "text-teal-300 bg-teal-400/10" : "text-white/70"
                }`
              }
            >
              <Icon width={18} height={18} />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
