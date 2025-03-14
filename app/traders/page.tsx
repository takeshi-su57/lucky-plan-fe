import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

import { WalletAccounts } from "@/app/_components/WalletAccountWidgets/WalletAccounts";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <WalletAccounts />
    </Suspense>
  );
}
