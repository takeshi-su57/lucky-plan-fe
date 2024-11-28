import { SVGProps } from "./types";

export function FilledInfoIcon({
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
        d="M6 0C2.7 0 0 2.7 0 6C0 9.3 2.7 12 6 12C9.3 12 12 9.3 12 6C12 2.7 9.3 0 6 0ZM6.75 9H5.25V5.25H6.75V9ZM6 4.5C5.55 4.5 5.25 4.2 5.25 3.75C5.25 3.3 5.55 3 6 3C6.45 3 6.75 3.3 6.75 3.75C6.75 4.2 6.45 4.5 6 4.5Z"
        fill={fill ? fill : "#73738C"}
      />
    </svg>
  );
}
