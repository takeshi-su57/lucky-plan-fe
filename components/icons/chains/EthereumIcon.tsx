import { SVGProps } from "../types";

export function EthereumIcon({
  fill = "#627EEA",
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
      {/* Ethereum diamond — official shape */}
      <path d="M16 2L6.5 16.5L16 22L25.5 16.5L16 2Z" fill={fill} opacity="0.6" />
      <path d="M6.5 16.5L16 2V12.5L6.5 16.5Z" fill={fill} />
      <path d="M16 2V12.5L25.5 16.5L16 2Z" fill={fill} opacity="0.8" />
      <path d="M6.5 18.5L16 30V24L6.5 18.5Z" fill={fill} />
      <path d="M16 24V30L25.5 18.5L16 24Z" fill={fill} opacity="0.8" />
    </svg>
  );
}
