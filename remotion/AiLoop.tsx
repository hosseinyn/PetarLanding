import { Easing, interpolate, useCurrentFrame } from "remotion";

const TOTAL = 120;

const steps = [
  "میفهمه کجای راهی",
  "قدم بعدی رو میچینه",
  "کوییز مخصوص تو میسازه",
];

const ease = Easing.bezier(0.21, 0.47, 0.32, 0.98);

export default function AiLoop() {
  const frame = useCurrentFrame();
  const active = Math.floor(frame / 40) % 3;
  return (
    <div
      dir="rtl"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        backgroundColor: "transparent",
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      {steps.map((s, i) => {
        const local = (frame + i * 40) % TOTAL;
        const opacity = interpolate(
          local,
          [0, 14, 80, 110],
          [0.35, 1, 1, 0.35],
          { easing: ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const y = interpolate(local, [0, 60, TOTAL - 1], [5, 0, 5], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const on = i === active;
        return (
          <div
            key={s}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 9999,
              border: "1px solid #E5E7EB",
              backgroundColor: on ? "#F0F9FF" : "#FFFFFF",
              paddingLeft: 14,
              paddingRight: 14,
              paddingTop: 8,
              paddingBottom: 8,
              opacity,
              transform: `translateY(${y}px)`,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                backgroundColor: on ? "#38BDF8" : "#E5E7EB",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 22, fontWeight: 600, color: "#000000" }}>
              {s}
            </span>
          </div>
        );
      })}
    </div>
  );
}
