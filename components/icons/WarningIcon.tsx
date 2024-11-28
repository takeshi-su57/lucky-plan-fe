import { SVGProps } from "./types";

export function WarningIcon({
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
        d="M23.6998 18.7895L14.2243 1.32046C13.9906 0.887056 13.6342 0.532242 13.1998 0.300459C12.6096 -0.0153942 11.9185 -0.0854304 11.2769 0.105584C10.6353 0.296599 10.0951 0.733214 9.77378 1.32046L0.29978 18.7895C0.0926193 19.1739 -0.0109604 19.6056 -0.000780739 20.0422C0.00939894 20.4787 0.132988 20.9052 0.357841 21.2795C0.582695 21.6539 0.901077 21.9633 1.2817 22.1773C1.66233 22.3914 2.0921 22.5028 2.52878 22.5005H21.4708C21.8893 22.5005 22.3015 22.3974 22.6708 22.2005C22.9634 22.0452 23.2223 21.8335 23.4327 21.5776C23.6431 21.3217 23.8007 21.0267 23.8965 20.7096C23.9923 20.3925 24.0244 20.0596 23.9909 19.73C23.9574 19.4005 23.8589 19.0808 23.7013 18.7895H23.6998ZM11.9998 19.5005C11.7031 19.5005 11.4131 19.4125 11.1664 19.2477C10.9198 19.0828 10.7275 18.8486 10.614 18.5745C10.5004 18.3004 10.4707 17.9988 10.5286 17.7078C10.5865 17.4169 10.7293 17.1496 10.9391 16.9398C11.1489 16.73 11.4162 16.5872 11.7071 16.5293C11.9981 16.4714 12.2997 16.5011 12.5738 16.6146C12.8479 16.7282 13.0822 16.9204 13.247 17.1671C13.4118 17.4138 13.4998 17.7038 13.4998 18.0005C13.4998 18.3983 13.3417 18.7798 13.0604 19.0611C12.7791 19.3424 12.3976 19.5005 11.9998 19.5005ZM13.4998 14.2505C13.4998 14.4494 13.4208 14.6401 13.2801 14.7808C13.1395 14.9214 12.9487 15.0005 12.7498 15.0005H11.2498C11.0509 15.0005 10.8601 14.9214 10.7195 14.7808C10.5788 14.6401 10.4998 14.4494 10.4998 14.2505V8.25046C10.4998 8.05155 10.5788 7.86078 10.7195 7.72013C10.8601 7.57948 11.0509 7.50046 11.2498 7.50046H12.7498C12.9487 7.50046 13.1395 7.57948 13.2801 7.72013C13.4208 7.86078 13.4998 8.05155 13.4998 8.25046V14.2505Z"
        fill="currentColor"
      />
    </svg>
  );
}
