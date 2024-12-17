"use client";

import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { links } from "../Sidebar/Sidebar";

export function Topbar() {
  const pathname = usePathname();

  const link = links.find((item) => pathname.includes(item.id));

  return (
    <div className="sticky flex items-center justify-between">
      <h1 className="text-3xl">{link?.title || "Unknown Page"}</h1>

      <ConnectButton
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
        chainStatus="icon"
      />
    </div>
  );
}
