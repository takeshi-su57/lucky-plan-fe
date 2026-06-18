"use client";

import Image from "next/image";
import Link from "next/link";

import logoSrc from "@/assets/icons/logo.png";

import { Listbox, ListboxItem } from "@heroui/react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { UserPermission } from "@/graphql/gql/graphql";
import { useUserJWT } from "@/app/_hooks/useUserJWT";
import { useAppSettings } from "@/app/_hooks/useAppSettings";

const permissionRank: Record<string, number> = {
  [UserPermission.Admin]: 3,
  [UserPermission.Trader]: 2,
  [UserPermission.Trial]: 1,
  Public: 0,
};

export const links = [
  { id: "plans", label: "Plan", title: "", limited: UserPermission.Trader },
  {
    id: "automations",
    label: "Automation",
    title: "",
    limited: UserPermission.Trader,
    showDivider: true,
  },
  {
    id: "experts",
    label: "Expert",
    title: "",
    limited: UserPermission.Trader,
  },
  {
    id: "leaderboards",
    label: "Leaderboard",
    title: "",
    limited: "Public",
  },
  {
    id: "settings",
    label: "Setting",
    title: "",
    limited: "Public",
  },
  {
    id: "logs",
    label: "Log",
    title: "",
    limited: UserPermission.Admin,
    isDevMode: true,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { appSettings } = useAppSettings();

  const { userJwtQuery } = useUserJWT();

  const userPermissoin = (userJwtQuery?.data?.permission as string) || "Public";

  return (
    <div className="flex flex-col gap-1">
      <Link href="#">
        <div className="flex items-center gap-2 border-b border-neutral-800 p-2 px-6">
          <Image src={logoSrc} alt="Logo" className="h-14 w-14" />
          <h6 className="text-xl font-bold text-green-400/80 uppercase">
            Lucky Plans
          </h6>
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
        {links
          .filter((link) => (appSettings.isDevMode ? true : !link.isDevMode))
          .filter(
            (link) =>
              permissionRank[link.limited] <= permissionRank[userPermissoin],
          )
          .map((link) => (
            <ListboxItem
              key={link.id}
              classNames={{
                title: "text-base uppercase font-semibold text-neutral-400",
              }}
              className={twMerge(
                pathname.includes(link.id) &&
                  "bg-primary-400/20 text-primary-400",
              )}
              showDivider={link.showDivider}
              textValue={link.label}
            >
              <Link href={`/${link.id}`}>{link.label}</Link>
            </ListboxItem>
          ))}
      </Listbox>
    </div>
  );
}
