import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import { LeaderboadWrapper } from "@/app-components/LeaderboardWidgets/LeaderboadWrapper";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <LeaderboadWrapper />
    </Suspense>
  );
}
