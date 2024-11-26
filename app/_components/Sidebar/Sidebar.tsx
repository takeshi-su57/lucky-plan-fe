"use client";

import Image from "next/image";
import Link from "next/link";

import logoSrc from "@/assets/icons/logo.png";

import { Listbox, ListboxItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export const links = [
  { id: "users", label: "User", title: "User Management" },
  { id: "followers", label: "Follower", title: "Follower Management" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1">
      <Link href="#">
        <div className="flex items-center gap-2 border-b border-neutral-800 p-2">
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
            href={`/${link.id}`}
            title={link.label}
          />
        ))}
      </Listbox>
    </div>
  );
}
