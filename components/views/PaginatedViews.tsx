"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";

import { Button, Input, Pagination, Spinner } from "@heroui/react";

export type PaginatedViewsProps = {
  children: ReactNode;
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
  loading: boolean;
};

export function PaginatedViews({
  totalPages,
  loading,
  children,
  currentPage,
  onChangePage,
}: PaginatedViewsProps) {
  const [tempPage, setTempPage] = useState(`${currentPage}`);

  useEffect(() => {
    setTempPage(`${currentPage}`);
  }, [currentPage]);

  const handleSubmitPage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedPage = Number(tempPage);

    if (!Number.isFinite(parsedPage)) {
      setTempPage(`${currentPage}`);
      return;
    }

    const nextPage = Math.min(
      Math.max(Math.trunc(parsedPage), 1),
      Math.max(totalPages, 1),
    );

    setTempPage(`${nextPage}`);

    if (nextPage !== currentPage) {
      onChangePage(nextPage);
    }
  };

  return (
    <div className="flex w-full flex-col gap-1">
      {loading ? (
        <div className="flex w-full items-center justify-center">
          <Spinner color="warning" size="lg" />
        </div>
      ) : (
        children
      )}

      {!loading ? (
        <div className="border-default-200 bg-content1 flex w-full flex-wrap items-center justify-between gap-3 rounded-lg border px-3 py-2">
          <span className="text-xs text-neutral-500">
            Page {currentPage} of {Math.max(totalPages, 1)}
          </span>

          <Pagination
            isCompact
            showControls
            color="secondary"
            page={currentPage}
            total={Math.max(totalPages, 1)}
            onChange={onChangePage}
            classNames={{
              wrapper: "gap-1 shadow-none",
              item: "h-8 min-w-8 rounded-md text-xs",
              cursor: "h-8 min-w-8 rounded-md text-xs",
              prev: "h-8 min-w-8 rounded-md",
              next: "h-8 min-w-8 rounded-md",
            }}
          />

          <form className="flex items-center gap-2" onSubmit={handleSubmitPage}>
            <Input
              aria-label="Go to page"
              value={tempPage}
              onValueChange={(value) => {
                if (value === "" || /^\d+$/.test(value)) {
                  setTempPage(value);
                }
              }}
              size="sm"
              variant="bordered"
              classNames={{
                base: "w-24",
                inputWrapper: "h-8 min-h-8 rounded-md",
                input: "text-center text-xs",
              }}
              min={1}
              max={Math.max(totalPages, 1)}
              type="text"
              inputMode="numeric"
              placeholder="Page"
            />

            <Button color="secondary" size="sm" type="submit">
              Go
            </Button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
