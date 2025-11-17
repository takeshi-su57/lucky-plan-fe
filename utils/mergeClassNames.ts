import { SlotsToClasses } from "@heroui/theme";
import { twMerge } from "tailwind-merge";

export function mergeClassNames<T extends string>(
  classNamesA?: SlotsToClasses<T>,
  classNamesB?: SlotsToClasses<T>,
): SlotsToClasses<T> {
  const mergedClassNames: SlotsToClasses<T> = {};

  if (classNamesA) {
    Object.keys(classNamesA).forEach((key) => {
      mergedClassNames[key as keyof SlotsToClasses<T>] =
        classNamesA[key as keyof typeof classNamesA];
    });
  }

  if (classNamesB) {
    Object.keys(classNamesB).forEach((key) => {
      mergedClassNames[key as keyof SlotsToClasses<T>] = twMerge(
        mergedClassNames[key as keyof SlotsToClasses<T>],
        classNamesB[key as keyof typeof classNamesA],
      );
    });
  }

  return mergedClassNames;
}
