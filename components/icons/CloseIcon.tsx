import { SVGProps } from "./types";

export function CloseIcon({
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
      <path
        d="M18 6L6 18"
        stroke={fill ? fill : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke={fill ? fill : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
