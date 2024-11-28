import { SVGProps } from "./types";

export function CopyIcon({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 0H14C14.6 0 15 0.4 15 1V13H13V2H4V0ZM2 4H10C10.6 4 11 4.4 11 5V15C11 15.6 10.6 16 10 16H2C1.4 16 1 15.6 1 15V5C1 4.4 1.4 4 2 4Z"
        fill={fill || "#505062"}
      />
    </svg>
  );
}
