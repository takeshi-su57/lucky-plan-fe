"use client";

import { forwardRef, ReactNode } from "react";

import {
  SnackbarContent,
  CustomContentProps,
  useSnackbar,
  VariantType,
} from "notistack";
import { twMerge } from "tailwind-merge";

import { SuccessIcon } from "./SuccessIcon";
import { ErrorIcon } from "./ErrorIcon";
import { DefaultIcon } from "./DefaultIcon";
import { WarningIcon } from "./WarningIcon";
import { InfoIcon } from "./InfoIcon";

import { CloseIcon } from "@/components/icons/CloseIcon";

const icons: Record<VariantType, ReactNode> = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  default: <DefaultIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
};

const classNames: Record<VariantType, string> = {
  success: "border-[#17c964] bg-[#162b1b] text-[#17c964]",
  error: "border-[#fb3b2d] bg-[#310e0b] text-[#fb3b2d]",
  default: "border-gray-50 bg-[#464646] text-gray-50",
  warning: "border-[#f5a524] bg-[#2e1c01] text-[#f5a524]",
  info: "border-[#55a2ff] bg-[#294464] text-[#fffdf7]",
};

function generateSnackbar(variant: VariantType) {
  return forwardRef<HTMLDivElement, CustomContentProps>(
    function PureSuccessSnackbar(props, ref) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, message, className, style } = props;

      const { closeSnackbar } = useSnackbar();

      const handleClose = () => {
        closeSnackbar(id);
      };

      return (
        <SnackbarContent
          key={id}
          ref={ref}
          role="alert"
          className={twMerge(
            "relative flex items-center gap-3 rounded-md border p-3",
            classNames[variant],
            className,
          )}
          style={style}
        >
          <CloseIcon
            size={24}
            width={18}
            height={18}
            onClick={handleClose}
            className="absolute right-2 top-2 cursor-pointer text-sm text-stone-200"
          />
          {icons[variant]}
          <div className="flex flex-col font-sans text-xs leading-[18px]">
            {message}
          </div>
        </SnackbarContent>
      );
    },
  );
}

export const SuccessSnackbar = generateSnackbar("success");
export const WarningSnackbar = generateSnackbar("warning");
export const DefaultSnackbar = generateSnackbar("default");
export const InfoSnackbar = generateSnackbar("info");
export const ErrorSnackbar = generateSnackbar("error");
