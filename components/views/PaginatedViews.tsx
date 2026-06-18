"use client";

import { ReactNode, useState } from "react";

import { Button, Card, CardBody, Pagination, Spinner } from "@heroui/react";
import { NumericInput } from "../inputs/NumericInput";

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
  const [tempPage, setTempPage] = useState(1);

  return (
    <Card className="w-full">
      <CardBody className="flex min-h-[300px] w-full flex-col gap-6">
        {!loading ? (
          <div className="flex w-full items-center justify-end gap-4">
            <Pagination
              color="secondary"
              page={currentPage}
              total={totalPages}
              onChange={onChangePage}
            />

            <div className="w-[150px]">
              <NumericInput
                amount={`${tempPage}`}
                onChange={(v) => (!Number.isNaN(+v) ? setTempPage(+v) : null)}
                min={1}
                labelPlacement="outside-left"
                max={totalPages + 1}
                label="Page"
              />
            </div>

            <Button
              color="secondary"
              onPress={() => onChangePage(tempPage)}
              size="sm"
            >
              Go
            </Button>
          </div>
        ) : null}

        {loading ? (
          <div className="flex w-full items-center justify-center">
            <Spinner color="warning" size="lg" />
          </div>
        ) : (
          children
        )}
      </CardBody>
    </Card>
  );
}
