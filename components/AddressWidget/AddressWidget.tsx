import React, { useState, MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { shrinkAddress } from "@/utils";
import { CopyIcon } from "@/components/icons/CopyIcon";
import { Address } from "viem";

export function AddressWidget({
  address,
  className,
}: {
  address: Address;
  className?: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    navigator.clipboard.writeText(address);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000); // Reset "copied" state after 2 seconds
  };

  return (
    <div
      onClick={handleCopy}
      className={twMerge(
        "flex items-center gap-2 text-sm leading-7 text-neutral-400",
        className,
      )}
    >
      <span>{shrinkAddress(address)}</span>
      <CopyIcon size={16} width={12} height={12} className="cursor-pointer" />
      <span>{isCopied ? "Copied!" : ""}</span>
    </div>
  );
}
