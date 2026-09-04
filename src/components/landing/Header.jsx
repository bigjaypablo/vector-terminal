export default function Header() {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-5">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-[4px] bg-teal-400" />
        <span className="text-sm font-medium text-white tracking-wide">VECTOR</span>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
        <a href="#markets" className="hover:text-white transition-colors">Markets</a>
        <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
        <a href="#wallet" className="hover:text-white transition-colors">Wallet</a>
      </nav>
      <button className="px-4 py-2 text-xs font-medium rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white hover:bg-white/15 transition-colors">
        Launch app
      </button>
    </header>
  );
}
