import { SVGProps } from "../types";

export function ArbitrumIcon({
  fill = "#28A0F0",
  size = 24,
  height,
  width,
  ...props
}: SVGProps) {
  return (
    <svg
      width={width || size}
      height={height || size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Arbitrum — simplified A shield mark */}
      <path
        d="M16 3L28 9.5V22.5L16 29L4 22.5V9.5L16 3Z"
        fill={fill}
        opacity="0.15"
      />
      <path
        d="M16 3L28 9.5V22.5L16 29L4 22.5V9.5L16 3Z"
        stroke={fill}
        strokeWidth="1.5"
      />
      <path
        d="M12 22L16 10L20 22M13.5 19H18.5"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
