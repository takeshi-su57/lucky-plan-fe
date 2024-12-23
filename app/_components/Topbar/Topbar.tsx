"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Topbar() {
  return (
    <div className="sticky flex items-center justify-end">
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
