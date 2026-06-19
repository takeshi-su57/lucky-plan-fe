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
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  error: "border-rose-200 bg-rose-50 text-rose-700",
  default: "border-zinc-200 bg-white text-zinc-800",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
};

function generateSnackbar(variant: VariantType) {
  return forwardRef<HTMLDivElement, CustomContentProps>(
    function PureSuccessSnackbar(props, ref) {
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
            className="absolute top-2 right-2 cursor-pointer text-sm text-zinc-500"
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
