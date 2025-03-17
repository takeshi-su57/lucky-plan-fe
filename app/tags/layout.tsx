"use client";

import { useUserJWT } from "@/app-hooks/useUserJWT";
import { Spinner } from "@nextui-org/react";
import WalletConnectButton from "@/app-components/Topbar/WalletConnectButton";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userJwtQuery } = useUserJWT();

  if (!userJwtQuery.isFetched) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <Spinner size="lg" color="warning" />
      </div>
    );
  }

  if (!userJwtQuery.data) {
    return (
      <div className="flex h-[300px] w-full flex-col items-center justify-center gap-2">
        <WalletConnectButton />
        <p className="text-sm text-gray-500">
          Please connect your wallet to continue
        </p>
      </div>
    );
  }

  return children;
}
