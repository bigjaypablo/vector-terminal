import { Link } from "react-router-dom";
import Header from "./Header";
import GradientMesh from "./GradientMesh";
import TerminalPrompt from "./TerminalPrompt";

export default function Hero() {
  return (
    <section className="relative flex-1 min-h-0 flex flex-col overflow-hidden bg-[#0a0a0a]">
      <GradientMesh />

      <Header />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <TerminalPrompt />

        <h1 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-[1.1] max-w-2xl">
          Every wallet. Every token.<br />One terminal.
        </h1>

        <p className="mt-5 text-sm md:text-base text-white/50 max-w-md leading-relaxed">
          Track tokens, wallets, and portfolios across Solana in one precise, data-driven interface.
        </p>

        <div className="flex gap-3 mt-8">
          <Link
            to="/app"
            className="px-6 py-3 text-sm font-medium rounded-full bg-teal-400/15 backdrop-blur-md border border-teal-400/30 text-teal-300 hover:bg-teal-400/20 transition-colors"
          >
            Launch terminal
          </Link>

          <a
            href="https://github.com/bigjaypablo/vector-terminal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full bg-white/5 backdrop-blur-md border border-white/15 text-white/80 hover:bg-white/10 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.29 0 .32.21.7.83.58C20.56 21.79 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View source
          </a>
        </div>
      </div>
    </section>
  );
}
