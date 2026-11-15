const letters = [
  "10,14 30,14 30,20 16,20 16,27 30,27 30,46 10,46 10,40 24,40 24,33 10,33",
  "34,14 54,14 54,46 34,46 34,36 40,36 40,40 48,40 48,20 34,20",
];

export default function Logo() {
  return (
    <svg viewBox="0 0 64 64" width={32} height={32} aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="58"
        height="58"
        rx="6"
        strokeWidth="3"
        className="fill-surface stroke-line"
      />
      <g transform="translate(3 3)" className="fill-line">
        {letters.map((points) => (
          <polygon key={points} points={points} />
        ))}
      </g>
      <g className="fill-accent">
        {letters.map((points) => (
          <polygon key={points} points={points} />
        ))}
      </g>
    </svg>
  );
}
