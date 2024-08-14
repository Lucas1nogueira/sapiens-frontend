import { Pagination } from "@nextui-org/react";

type Props = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export function PaginationTable({ page, totalPages, setPage }: Props) {
  return (
    <div className="flex w-full justify-center">
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={totalPages}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
}
