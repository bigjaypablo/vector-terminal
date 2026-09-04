import { useTypewriter } from "../../hooks/useTypewriter";

const commands = [
  "scan wallet 7xKp...9mQ2",
  "fetch markets --top 10",
  "track portfolio --live",
  "watch JUP/SOL",
];

export default function TerminalPrompt() {
  const text = useTypewriter(commands);

  return (
    <div className="font-mono text-xs text-white/50 mb-6 tracking-wide flex items-center gap-1.5">
      <span className="text-teal-400">vector@solana</span>
      <span className="text-white/30">:~$</span>
      <span className="text-white/80">{text}</span>
      <span className="inline-block w-[6px] h-[13px] bg-teal-400/80 animate-pulse" />
    </div>
  );
}
