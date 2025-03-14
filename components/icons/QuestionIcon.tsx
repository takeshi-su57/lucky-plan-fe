import { SVGProps } from "./types";

export function QuestionIcon({
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
        fill={fill ? fill : "currentColor"}
        fillRule="evenodd"
        d="M.877 7.5a6.623 6.623 0 1113.246 0 6.623 6.623 0 01-13.246 0zM7.5 1.827a5.673 5.673 0 100 11.346 5.673 5.673 0 000-11.346zm.75 8.673a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-2.2-4.25c0-.678.585-1.325 1.45-1.325s1.45.647 1.45 1.325c0 .491-.27.742-.736 1.025-.051.032-.111.066-.176.104a5.28 5.28 0 00-.564.36c-.242.188-.524.493-.524.961a.55.55 0 001.1.004.443.443 0 01.1-.098c.102-.079.215-.144.366-.232.078-.045.167-.097.27-.159.534-.325 1.264-.861 1.264-1.965 0-1.322-1.115-2.425-2.55-2.425-1.435 0-2.55 1.103-2.55 2.425a.55.55 0 001.1 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
