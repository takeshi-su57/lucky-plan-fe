import { twMerge } from "tailwind-merge";

interface SectionContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function SectionContainer({
  children,
  id,
  className,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={twMerge(
        "mx-auto w-full max-w-5xl scroll-mt-20 px-6 py-20 md:px-8 md:py-28",
        className,
      )}
    >
      {children}
    </section>
  );
}
