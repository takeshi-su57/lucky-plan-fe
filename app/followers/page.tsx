import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

import { Followers } from "@/app-components/FollowerWidgets/Followers";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <Followers />
    </Suspense>
  );
}
