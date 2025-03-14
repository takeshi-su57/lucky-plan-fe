import { SVGProps } from "./types";

export function ClockIcon({
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
      <g id="vuesax/outline/clock">
        <g id="clock">
          <path
            id="Vector"
            d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
            fill={fill ? fill : "#9494A8"}
          />
          <path
            id="Vector_2"
            d="M15.7099 15.9298C15.5799 15.9298 15.4499 15.8998 15.3299 15.8198L12.2299 13.9698C11.4599 13.5098 10.8899 12.4998 10.8899 11.6098V7.50977C10.8899 7.09977 11.2299 6.75977 11.6399 6.75977C12.0499 6.75977 12.3899 7.09977 12.3899 7.50977V11.6098C12.3899 11.9698 12.6899 12.4998 12.9999 12.6798L16.0999 14.5298C16.4599 14.7398 16.5699 15.1998 16.3599 15.5598C16.2099 15.7998 15.9599 15.9298 15.7099 15.9298Z"
            fill={fill ? fill : "#9494A8"}
          />
        </g>
      </g>
    </svg>
  );
}
