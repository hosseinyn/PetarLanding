export function HeroFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="absolute -top-10 right-[8%] size-40 rounded-full bg-sky-100" />
      <span className="absolute top-40 left-[4%] hidden size-28 rounded-full bg-green-100 sm:block" />
      <span className="absolute bottom-10 right-[38%] hidden size-16 rounded-full bg-yellow-100 lg:block" />
      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="absolute -left-10 top-10 h-64 w-64 opacity-60"
      >
        <g stroke="#38BDF8" strokeWidth="2" opacity="0.5">
          <rect x="150" y="150" width="100" height="100" rx="18" />
          <rect
            x="150"
            y="150"
            width="100"
            height="100"
            rx="18"
            transform="rotate(45 200 200)"
          />
          <circle cx="200" cy="200" r="26" fill="#E0F2FE" stroke="none" />
        </g>
        <g fill="#FACC15" opacity="0.7">
          <circle cx="70" cy="90" r="7" />
          <circle cx="330" cy="70" r="5" />
          <circle cx="350" cy="300" r="8" />
        </g>
        <g fill="#22C55E" opacity="0.35">
          <circle cx="90" cy="300" r="10" />
          <circle cx="300" cy="340" r="6" />
        </g>
      </svg>
    </div>
  );
}

export function DividerFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-3 bg-white">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <span
          key={i}
          className={
            i % 3 === 0
              ? "size-2.5 rounded-full bg-sky-400"
              : i % 3 === 1
                ? "size-2 rounded-full bg-green-500"
                : "size-2.5 rounded-full bg-yellow-400"
          }
        />
      ))}
    </div>
  );
}

export function RobotFallback() {
  return (
    <div className="grid h-56 w-full place-items-center sm:h-64">
      <svg viewBox="0 0 200 230" fill="none" className="h-56 w-auto sm:h-64">
        <ellipse cx="100" cy="216" rx="44" ry="8" fill="#E9D5FF" />
        <rect x="80" y="180" width="14" height="28" rx="7" fill="#7C3AED" />
        <rect x="106" y="180" width="14" height="28" rx="7" fill="#7C3AED" />
        <rect x="58" y="112" width="84" height="74" rx="20" fill="#A855F7" />
        <circle cx="100" cy="140" r="21" fill="#FFFFFF" opacity="0.92" />
        <rect x="52" y="40" width="96" height="62" rx="24" fill="#A855F7" />
        <rect x="64" y="54" width="72" height="38" rx="15" fill="#2E1065" />
        <ellipse cx="86" cy="71" rx="7" ry="9" fill="#FFFFFF" />
        <ellipse cx="114" cy="71" rx="7" ry="9" fill="#FFFFFF" />
        <circle cx="86" cy="73" r="3.5" fill="#2E1065" />
        <circle cx="114" cy="73" r="3.5" fill="#2E1065" />
        <line
          x1="100"
          y1="40"
          x2="100"
          y2="24"
          stroke="#7C3AED"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="100" cy="19" r="7" fill="#FACC15" />
      </svg>
    </div>
  );
}
