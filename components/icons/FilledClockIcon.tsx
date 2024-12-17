import { SVGProps } from "./types";

export function FilledClockIcon({
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
        d="M14 0C6.3 0 9.31323e-09 6.3 9.31323e-09 14C9.31323e-09 21.7 6.3 28 14 28C21.7 28 28 21.7 28 14C28 6.3 21.7 0 14 0ZM21 15.75H12.25V7H15.75V12.25H21V15.75Z"
        fill={fill || "#73738C"}
      />
    </svg>
  );
}
