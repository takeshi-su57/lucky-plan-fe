import { SVGProps } from "../types";

export function MegaEthIcon({
  fill = "#FF3366",
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
      {/* MegaETH — stylized M mark */}
      <rect x="3" y="3" width="26" height="26" rx="6" fill={fill} opacity="0.12" />
      <path
        d="M8 23V9L13 17L16 12L19 17L24 9V23"
        stroke={fill}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
