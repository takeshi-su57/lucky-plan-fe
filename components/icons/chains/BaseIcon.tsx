import { SVGProps } from "../types";

export function BaseIcon({
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
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Base — official circle + cutout from brand-kit */}
      <circle cx="16" cy="16" r="14" fill={fill} />
      <path
        d="M16.1 27.1C22.2 27.1 27.1 22.2 27.1 16.1C27.1 10 22.2 5.1 16.1 5.1C10.3 5.1 5.5 9.6 5.1 15.2H20V17H5.1C5.5 22.6 10.3 27.1 16.1 27.1Z"
        fill="white"
      />
    </svg>
  );
}
