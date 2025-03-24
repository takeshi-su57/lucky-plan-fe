"use client";

import { useUserJWT } from "@/app-hooks/useUserJWT";
import { Spinner } from "@nextui-org/react";
import WalletConnectButton from "../_components/Topbar/WalletConnectButton";
import { UserPermission } from "@/graphql/gql/graphql";

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

  if (userJwtQuery.data.permission === UserPermission.Trial) {
    return (
      <div className="flex h-[300px] w-full flex-col items-center justify-center gap-2">
        <p className="text-base text-gray-500">
          You are not authorized to access this page.
        </p>
        <p className="text-sm text-gray-500">
          Please{" "}
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`}
            className="text-primary hover:underline"
          >
            contact the admin
          </a>{" "}
          to upgrade your permission
        </p>
      </div>
    );
  }

  return children;
}
