"use client";

import Image from "next/image";
import Link from "next/link";

import logoSrc from "@/assets/icons/logo.png";

import { Listbox, ListboxItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export const links = [
  { id: "users", label: "User", title: "User Explorer" },
  { id: "followers", label: "Follower", title: "Follower Explorer" },
  { id: "strategies", label: "Strategy", title: "Strategy Explorer" },
  { id: "contracts", label: "Contract", title: "Contract Explorer" },
  { id: "automations", label: "Automation", title: "Automation Explorer" },
  { id: "missions", label: "Mission", title: "Mission Explorer" },
  { id: "tasks", label: "Task", title: "Task Explorer" },
  { id: "actions", label: "Action", title: "Action Explorer" },
  {
    id: "follower-actions",
    label: "Follower Action",
    title: "Follower Action Explorer",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1">
      <Link href="#">
        <div className="flex items-center justify-center gap-2 border-b border-neutral-800 p-2">
          <Image src={logoSrc} alt="Logo" className="h-14 w-14" />
        </div>
      </Link>

      <Listbox
        aria-label="Sidebar"
        color="primary"
        variant="flat"
        selectionMode="single"
        shouldHighlightOnFocus
        selectedKeys={links
          .filter((link) => pathname.includes(link.id))
          .map((item) => item.id)}
        classNames={{
          base: "m-0 p-4",
          list: "gap-2",
        }}
      >
        {links.map((link) => (
          <ListboxItem
            key={link.id}
            classNames={{
              title: "!text-base uppercase font-semibold text-neutral-400",
            }}
            className={twMerge(
              pathname.includes(link.id) &&
                "bg-primary-400/20 !text-primary-400",
            )}
          >
            <Link href={`/${link.id}`}>{link.label}</Link>
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
}
