"use client";

import Image from "next/image";
import Link from "next/link";

import logoSrc from "@/assets/icons/logo.png";

import { usePathname } from "next/navigation";
import {
  FaChartLine,
  FaClipboardList,
  FaCog,
  FaCrown,
  FaRobot,
  FaTerminal,
} from "react-icons/fa";
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
  {
    id: "plans",
    label: "Plan",
    title: "",
    limited: UserPermission.Trader,
    icon: FaClipboardList,
  },
  {
    id: "automations",
    label: "Automation",
    title: "",
    limited: UserPermission.Trader,
    showDivider: true,
    icon: FaRobot,
  },
  {
    id: "experts",
    label: "Expert",
    title: "",
    limited: UserPermission.Trader,
    icon: FaChartLine,
  },
  {
    id: "leaderboards",
    label: "Leaderboard",
    title: "",
    limited: "Public",
    icon: FaCrown,
  },
  {
    id: "settings",
    label: "Setting",
    title: "",
    limited: "Public",
    icon: FaCog,
  },
  {
    id: "logs",
    label: "Log",
    title: "",
    limited: UserPermission.Admin,
    isDevMode: true,
    icon: FaTerminal,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { appSettings } = useAppSettings();

  const { userJwtQuery } = useUserJWT();

  const userPermission = (userJwtQuery?.data?.permission as string) || "Public";

  const visibleLinks = links
    .filter((link) => (appSettings.isDevMode ? true : !link.isDevMode))
    .filter(
      (link) => permissionRank[link.limited] <= permissionRank[userPermission],
    );

  return (
    <div className="flex min-h-full flex-col px-2.5 py-3">
      <Link
        href="/leaderboards"
        className="hover:bg-default-100 mb-4 flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors"
      >
        <div className="bg-default-100 ring-default-200 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1">
          <Image src={logoSrc} alt="Lucky Plans" className="h-9 w-9" />
        </div>
        <div className="min-w-0">
          <div className="text-foreground truncate text-[13px] font-bold tracking-wide">
            Lucky Plans
          </div>
          <div className="mt-0.5 text-[10px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
            Trade Console
          </div>
        </div>
      </Link>

      <nav aria-label="Main navigation" className="flex flex-1 flex-col gap-1">
        {visibleLinks.map((link) => {
          const Icon = link.icon;
          const active = pathname.includes(link.id);

          return (
            <div
              key={link.id}
              className={twMerge(
                link.showDivider && "border-default-200 border-b pb-2",
              )}
            >
              <Link
                href={`/${link.id}`}
                className={twMerge(
                  "group text-default-600 relative flex h-9 items-center gap-2.5 rounded-lg px-3 text-[13px] font-semibold transition-all",
                  "hover:bg-default-100 hover:text-foreground",
                  active &&
                    "bg-default-100 text-foreground shadow-[inset_0_0_0_1px_rgba(24,24,27,0.08)]",
                )}
              >
                <span
                  className={twMerge(
                    "bg-default-700 absolute left-0 h-5 w-0.5 rounded-full opacity-0 transition-opacity",
                    active && "opacity-100",
                  )}
                />
                <Icon
                  className={twMerge(
                    "text-default-500 h-3 w-3 transition-colors",
                    active ? "text-foreground" : "group-hover:text-default-700",
                  )}
                />
                <span className="truncate">{link.label}</span>
              </Link>
            </div>
          );
        })}
      </nav>

      <div className="border-default-200 bg-content2 mt-4 rounded-lg border px-3 py-2.5">
        <div className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
          Access
        </div>
        <div className="text-foreground mt-1 truncate text-[13px] font-semibold">
          {userPermission}
        </div>
      </div>
    </div>
  );
}
