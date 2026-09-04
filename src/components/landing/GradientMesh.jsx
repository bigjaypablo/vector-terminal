export default function GradientMesh() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 50% at 30% 0%, rgba(93,202,165,0.05), transparent 65%)," +
            "radial-gradient(ellipse 60% 45% at 75% 15%, rgba(120,180,255,0.035), transparent 70%)," +
            "radial-gradient(ellipse 50% 40% at 50% 40%, rgba(93,202,165,0.03), transparent 75%)",
        }}
      />
      <svg width="0" height="0">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.02 0" />
        </filter>
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: "url(#grain)",
          opacity: 0.5,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
