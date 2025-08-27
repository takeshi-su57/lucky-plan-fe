import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";
import { LeaderboadWrapper } from "@/app/_components/LeaderboardV2/LeaderboadWrapper";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <LeaderboadWrapper />
    </Suspense>
  );
}
