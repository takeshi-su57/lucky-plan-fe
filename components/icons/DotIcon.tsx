import { SVGProps } from "./types";

export function DotIcon({
  fill = "currentColor",
  filled,
  size = 32,
  height,
  width,
  ...props
}: SVGProps) {
  return (
    <svg
      width={width || size}
      height={height || size}
      viewBox={`0 0 ${size} ${size}`}
      fill={filled ? fill : "none"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="4.33301" cy="4" r="4" fill={fill ? fill : "currentColor"} />
    </svg>
  );
}
