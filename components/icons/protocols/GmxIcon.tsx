import { useId } from "react";
import { SVGProps } from "../types";

export function GmxIcon({
  size = 24,
  height,
  width,
  ...props
}: SVGProps) {
  const uid = useId();
  return (
    <svg
      width={width || size}
      height={height || size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Official GMX logo from gmx-io/gmx-interface */}
      <defs>
        <linearGradient id={uid} gradientUnits="objectBoundingBox" x1=".536" x2=".011" y1=".026" y2="1">
          <stop offset="0" stopColor="#03d1cf" />
          <stop offset="1" stopColor="#4e09f8" />
        </linearGradient>
      </defs>
      <path
        d="m554.956 716.042-13.62-20.042-13.67 20.042h19.034l-5.368-7.649-2.722 4h-2.81l5.533-8.013 8.026 11.666z"
        fill={`url(#${uid})`}
        transform="translate(-526.31 -691.059)"
      />
    </svg>
  );
}
