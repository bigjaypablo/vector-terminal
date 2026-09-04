export function Skeleton({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-white/8 ${className}`}
    >
      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          backgroundSize: "400px 100%",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
