import { SVGProps } from "../types";

export function AvntIcon({
  fill = "#0052FF",
  size = 24,
  height,
  width,
  ...props
}: SVGProps) {
  return (
    <svg
      width={width || size}
      height={height || size}
      viewBox="0 0 40 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Official Avantis icon mark — mirrored arrow shapes */}
      <path
        d="M9.71 0.889C8.572 6.943 4.901 11.06 0 11.06V22c6.92 0 8.62-1.238 11.474-5.093 1.686-2.276 4.466-5.884 8.24-5.884V0h-8.957a1.05 1.05 0 0 0-1.047.889Z"
        fill={fill}
      />
      <path
        d="M29.72 21.111c1.138-6.054 4.81-10.17 9.71-10.17V0c-6.92 0-8.62 1.238-11.474 5.095-1.685 2.276-4.466 5.884-8.24 5.884V22h8.957c.516 0 .951-.382 1.047-.889Z"
        fill={fill}
      />
    </svg>
  );
}
