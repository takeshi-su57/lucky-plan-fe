import { redirect } from "next/navigation";

export default async function RootPage() {
  return redirect("/users");
}
