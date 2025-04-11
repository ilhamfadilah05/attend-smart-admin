import { PiCaretDownBold } from "react-icons/pi";
import Pagination, { type PaginationProps } from "@ui/pagination";
import { Select } from "rizzui";
import cn from "@utils/class-names";
import { formatNumber } from "@/utils/fun-util";

const paginationLimitOptions = [10, 25, 50, 100].map((v, idx) => ({
  id: idx,
  label: String(v),
  value: v,
}));

export type TablePaginationProps = {
  pageSize: number;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  paginatorClassName?: string;
  rowsPerPage?: string;
} & PaginationProps;

export default function TablePagination({
  pageSize,
  setPageSize,
  total,
  paginatorClassName = "mt-5 xs:mt-6 sm:mt-7",
  rowsPerPage = "Rows per page",
  ...props
}: TablePaginationProps) {
  let showFrom = 0;
  let showTo = 0;
  if (total) {
    (props.current || 1) * pageSize > total
      ? (showTo = total)
      : (showTo = (props.current || 1) * pageSize);
    showFrom = ((props.current || 1) - 1) * pageSize + 1;
  }
  return (
    <div
      className={cn(
        "table-pagination flex items-center justify-center sm:justify-between",
        paginatorClassName
      )}
    >
      {!setPageSize ? (
        total && (
          <div className="hidden text-gray-500 sm:inline-flex">
            {props.current} of {Math.ceil(total / pageSize)} pages
          </div>
        )
      ) : (
        <div className="hidden items-center sm:flex">
          {rowsPerPage}:{" "}
          <Select
            options={paginationLimitOptions}
            onChange={setPageSize}
            size="sm"
            variant="outline"
            value={pageSize}
            getOptionValue={({ value }) => value}
            suffix={<PiCaretDownBold />}
            dropdownClassName="!p-1.5 border w-12 border-gray-100 !z-10 shadow-lg dropdownClassName"
            className="ms-1 w-auto [&_button]:font-medium"
            optionClassName="px-1"
          />
          <span className="ml-2">
            Menampilkan {formatNumber({ amount: showFrom, style: "decimal" })}{" "}
            ke {formatNumber({ amount: showTo, style: "decimal" })} dari{" "}
            {formatNumber({ amount: total || 0, style: "decimal" })} data
          </span>
        </div>
      )}
      {/* <Pagination
        total={total}
        pageSize={pageSize}
        defaultCurrent={1}
        showLessItems={true}
        prevIconClassName="py-0 text-gray-500 !leading-[26px]"
        nextIconClassName="py-0 text-gray-500 !leading-[26px]"
        className="text-white"
        {...props}
      /> */}

      <Pagination
        total={total}
        pageSize={pageSize}
        defaultCurrent={1}
        showLessItems={true}
        prevIconClassName="py-0 text-gray-500 !leading-[26px]"
        nextIconClassName="py-0 text-gray-500 !leading-[26px]"
        className="text-white"
        itemRender={(page, type, originalElement) => {
          if (type === "page") {
            return (
              <span
                className={`${
                  page === props.current ? "text-white" : "text-gray-500"
                }`}
              >
                {page}
              </span>
            );
          }
          return originalElement;
        }}
        {...props}
      />
    </div>
  );
}
