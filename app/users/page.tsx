import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";

import { Users } from "@/app-components/UserWidgets/Users";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <Users />
    </Suspense>
  );
}
