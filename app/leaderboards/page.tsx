import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";
import { Leaderboard } from "@/app-components/LeaderboardWidgets/Leaderboard";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <Leaderboard />
    </Suspense>
  );
}
