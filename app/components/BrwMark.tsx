// Set-of-Marks wordmark — dot-peen "BRW" (5x7 pin-stamp dot matrix) rendered as
// SVG inside a selection-viewfinder frame (corner brackets) with an "e17" ref tag.
// The RGB-split glitch (ghost layers) is driven entirely by CSS in globals.css,
// so this stays a server component with no client JS.

type Glyph = readonly [string, string, string, string, string, string, string];

const FONT: Record<string, Glyph> = {
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  W: ["10001", "10001", "10001", "10101", "10101", "11011", "01010"],
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
};

type Dot = { cx: number; cy: number };

function buildDots(text: string, p: number) {
  const glyphW = 4 * p;
  const space = 4 * p;
  const r = p * 0.34;
  const gap = p * 1.45;

  const charW = (ch: string) => (ch === " " ? space : glyphW) + gap;
  let lineW = 0;
  for (const ch of text) lineW += charW(ch);
  lineW -= gap;

  const dots: Dot[] = [];
  let cx0 = r;
  const oy = r;
  for (const ch of text) {
    const rows = FONT[ch] ?? FONT[" "];
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 5; x++) {
        if (rows[y][x] === "1") {
          dots.push({
            cx: +(cx0 + x * p).toFixed(2),
            cy: +(oy + y * p).toFixed(2),
          });
        }
      }
    }
    cx0 += charW(ch);
  }

  const matrixW = +(lineW + 2 * r).toFixed(2);
  const matrixH = +(6 * p + 2 * r).toFixed(2);
  return { dots, matrixW, matrixH, r };
}

type BrwMarkProps = {
  text?: string;
  /** Base (resting) dot colour. */
  color?: string;
  /** RGB-split ghost colours that flare during the glitch. */
  ghostA?: string;
  ghostB?: string;
  pitch?: number;
  /** Render the selection-viewfinder frame + e17 ref tag around the matrix. */
  frame?: boolean;
  className?: string;
  title?: string;
};

export function BrwMark({
  text = "BRW",
  color = "var(--color-magenta)",
  ghostA = "var(--color-cyan)",
  ghostB = "var(--color-red)",
  pitch = 14,
  frame = true,
  className,
  title = "brw",
}: BrwMarkProps) {
  const { dots, matrixW, matrixH, r } = buildDots(text, pitch);

  // Frame padding around the dot matrix; corner brackets + ref tag live in here.
  const padX = frame ? pitch * 2.4 : 0;
  const padY = frame ? pitch * 2.4 : 0;
  const width = +(matrixW + padX * 2).toFixed(2);
  const height = +(matrixH + padY * 2).toFixed(2);

  // dot matrix offset inside the frame
  const ox = padX;
  const matY = padY;

  const stroke = pitch * 0.78;
  const bracket = pitch * 3.2; // bracket arm length
  const inset = stroke / 2;

  const circles = (cls: string, fill: string) => (
    <g className={cls} fill={fill}>
      {dots.map((d, i) => (
        <circle key={`${cls}-${i}`} cx={ox + d.cx} cy={matY + d.cy} r={r} />
      ))}
    </g>
  );

  // ref tag geometry — annotation-style label tab floating just above the
  // top-left corner of the selection frame: left edge flush with the frame's
  // outer edge, bottom edge resting a hair above the top border. Keeps the
  // corner bracket fully readable instead of swallowing it.
  const tagW = pitch * 3.3;
  const tagH = pitch * 1.55;
  const tagGap = pitch * 0.16;
  const tagX = 0;
  const tagY = -(tagH + tagGap);
  const topExtra = tagH + tagGap; // extend the viewBox upward to reveal the tab

  return (
    <svg
      className={["peen", className].filter(Boolean).join(" ")}
      viewBox={`0 ${(-topExtra).toFixed(2)} ${width} ${+(height + topExtra).toFixed(2)}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={title}
    >
      {frame && (
        <g className="markframe" stroke={color} fill="none" strokeWidth={stroke} strokeLinecap="square">
          {/* top-left */}
          <path d={`M ${inset} ${inset + bracket} L ${inset} ${inset} L ${inset + bracket} ${inset}`} />
          {/* top-right */}
          <path d={`M ${width - inset - bracket} ${inset} L ${width - inset} ${inset} L ${width - inset} ${inset + bracket}`} />
          {/* bottom-left */}
          <path d={`M ${inset} ${height - inset - bracket} L ${inset} ${height - inset} L ${inset + bracket} ${height - inset}`} />
          {/* bottom-right */}
          <path d={`M ${width - inset - bracket} ${height - inset} L ${width - inset} ${height - inset} L ${width - inset} ${height - inset - bracket}`} />
        </g>
      )}

      {circles("gh ghA", ghostA)}
      {circles("gh ghB", ghostB)}
      {circles("base", color)}

      {frame && (
        <g className="marktag">
          <rect
            x={tagX}
            y={tagY}
            width={tagW}
            height={tagH}
            rx={pitch * 0.18}
            fill={color}
          />
          <text
            x={tagX + tagW / 2}
            y={tagY + tagH * 0.72}
            textAnchor="middle"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize={pitch * 1.05}
            fontWeight={700}
            fill="var(--color-bg)"
          >
            e17
          </text>
        </g>
      )}
    </svg>
  );
}
