"use client";

import { usePathname } from "next/navigation";
import { links } from "../Sidebar/Sidebar";
import { Button } from "@nextui-org/react";

export function Topbar() {
  const pathname = usePathname();

  const link = links.find((item) => pathname.includes(item.id));

  return (
    <div className="sticky flex items-center justify-between">
      <h1 className="text-3xl">{link?.title || "Unknown Page"}</h1>

      <Button color="danger">Logout</Button>
    </div>
  );
}
