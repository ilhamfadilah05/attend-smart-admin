/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ControlledTable from "@/components/controlled-table";
import TableFilter, { PageBreadcrumb } from "./default-table-filter";
import { useRouter, useSearchParams } from "next/navigation";
import { DefaultColumnFormat, getColumns } from "./default-column";
import { IRoute } from "@/config/routes";
import { defaultDeleteService, defaultListService } from "../default-service";
import { useRoleChecker } from "@/utils/role-checker";
import { FilterFieldDto } from "../dto";
import { Title } from "rizzui";
import cn from "@utils/class-names";
import { TableLayout } from "rc-table/lib/interface";
import { ExportProps } from "./default-export-form";

const FilterElement = dynamic(
  () => import("@/app/shared/default-page/default-list/default-filter-element"),
  {
    ssr: false,
  }
);

const filterState: Record<string, any> = {};

export interface DefaultTableProps {
  routes: IRoute;
  apiPath: string;
  columnFormat: DefaultColumnFormat[];
  title?: string;
  filterFields?: FilterFieldDto[];
  reformatQuery?: (query: Record<string, any>) => Record<string, any>;
  breadcrumb?: PageBreadcrumb[];
  showHeader?: boolean;
  renderEdit?: (row: any, fetchData?: () => Promise<void>) => JSX.Element;
  renderDetail?: (row: any, fetchData?: () => Promise<void>) => JSX.Element;
  renderDelete?: (row: any, fetchData?: () => Promise<void>) => JSX.Element;
  useDelete?: boolean;
  useDetail?: boolean;
  useEdit?: boolean;
  useExport?: boolean;
  useAction?: boolean;
  addButton?: (fetchData?: () => Promise<void>) => JSX.Element;
  initQuery?: Record<string, any>;
  tableLayout?: TableLayout;
  formatExport?: (data: Record<string, any>[]) => Record<string, any>[];
  additionalButton?: (
    row: any,
    fetchData?: (query?: Record<string, any>) => Promise<void>
  ) => JSX.Element | undefined;
  deletedKeyText?: string;
}

export default function DefaultTable({
  routes,
  apiPath,
  title,
  columnFormat,
  filterFields,
  reformatQuery,
  breadcrumb,
  showHeader = true,
  renderEdit,
  renderDelete,
  renderDetail,
  useDelete = true,
  useDetail = true,
  useEdit = true,
  useAction = true,
  addButton,
  initQuery = {},
  tableLayout,
  formatExport,
  additionalButton,
  deletedKeyText,
  useExport = false,
}: DefaultTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });
  const [filters, setFilters] = useState(filterState);
  const [isFiltered, setIsFiltered] = useState(false);
  const { ability } = useRoleChecker();

  const onResetSearch = () => {
    setFilters(filterState);
    setCurrentPage(1);
    setPageSize(20);
    setSortConfig({
      key: "",
      direction: "",
    });
  };

  const updateFilter = (key: string, value: any) => {
    setFilters((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const formatQuery = (query: Record<string, any>) => {
    Object.keys(query).map((key) => {
      let fieldKey = key;
      let tempExt = "";
      if (fieldKey.includes(".")) {
        const arrKey = fieldKey.split(".");
        fieldKey = arrKey[0];
        tempExt = arrKey[1];
      }
      // const filterField = filterFields?.find((field) => field.key === fieldKey);

      // if (tempExt) {
      //   query[`${fieldKey}[${tempExt}]`] = query[`${fieldKey}.${tempExt}`];
      //   delete query[`${fieldKey}.${tempExt}`];
      // } else if (filterField?.ext) {
      //   query[`${fieldKey}[${filterField.ext}]`] = query[fieldKey];
      //   delete query[fieldKey];
      // }
    });
  };

  const fetchData = useCallback(async (query?: Record<string, any>) => {
    if (reformatQuery && query) query = reformatQuery(query);
    else if (query) {
      formatQuery(query);
    }

    setIsLoading(true);
    const result = await defaultListService(apiPath, {
      ...initQuery,
      ...query,
    });

    const data = result?.data;

    setIsLoading(false);

    if (data) {
      setData(data || []);
      setCurrentPage(result.page || 1);
      setTotalData(result.totalData || 0);
      setPageSize(result.pageSize || 20);
    }
  }, []);

  useEffect(() => {
    setIsFiltered(false);
    const hasParams = searchParams.toString().length > 0;
    if (hasParams) {
      const query: Record<string, any> = {
        page: +(searchParams.get("page") || 1),
        limit: +(searchParams.get("limit") || 20),
      };

      let tempIsFiltered = false;
      searchParams.forEach((value, key) => {
        if (!["page", "limit", "sort_by"].includes(key) && value) {
          query[key] = value;
          updateFilter(key, value);
          tempIsFiltered = true;
        }
      });

      if (tempIsFiltered) setIsFiltered(true);

      if (query.page) setCurrentPage(query.page);
      if (query.limit) setPageSize(query.limit);

      if (searchParams.get("sort_by"))
        query.sort_by = searchParams.get("sort_by");

      fetchData(query);
    } else {
      fetchWithQuery();
    }
  }, [searchParams]);

  const refreshFilter = () => {
    let query: Record<string, any> = {
      page: currentPage,
      limit: pageSize,
      ...filters,
    };

    if (sortConfig?.key)
      query.sort_by = `${sortConfig?.key}${sortConfig?.direction}`;

    const params = new URLSearchParams(query);
    router.push(routes.list + `?${params}`);
  };

  useEffect(() => {
    refreshFilter();
  }, [pageSize, sortConfig, currentPage, isFiltered]);

  const handlePaginate = (page: number) => {
    setCurrentPage(page);
  };

  const onDeleteItem = async (id: string) => {
    setIsLoading(true);
    let deleteApiPath = apiPath;
    // if (apiPath.includes("/list")) {
    //   deleteApiPath = apiPath.replace("/list", "");
    // }
    const result = await defaultDeleteService(deleteApiPath, id);
    setIsLoading(false);
    if (result) {
      let query: Record<string, any> = {
        page: currentPage,
        limit: pageSize,
        ...filters,
      };

      if (sortConfig?.key)
        query.sort_by = `${sortConfig?.key}${sortConfig?.direction}`;

      fetchData(query);
    }
  };

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      setSortConfig({
        key: value,
        direction:
          sortConfig?.key === value && sortConfig?.direction === "-desc"
            ? "-asc"
            : "-desc",
      });
    },
  });

  // let editAccess = ability.can("update", `${apiPath}/:uuid`);
  // let detailAccess = ability.can("read", `${apiPath}/:uuid`);
  // let deleteAccess = ability.can("delete", `${apiPath}/:uuid`);

  let editAccess = true;
  let detailAccess = true;
  let deleteAccess = true;

  const fetchWithQuery = async () => {
    await fetchData({
      page: currentPage,
      limit: pageSize,
      sort_by: "created_at-desc",
      ...filters,
    });
  };

  const fetchExportData = async (
    dto: Record<string, any> = {}
  ): Promise<ExportProps> => {
    let query: Record<string, any> = {
      sort_by: "created_at-desc",
      ...dto,
    };

    if (reformatQuery && query) {
      query = reformatQuery(query);
    } else if (query) {
      formatQuery(query);
    }

    if (searchParams.get("sort_by"))
      query.sort_by = searchParams.get("sort_by");

    const result = await defaultListService(
      apiPath,
      { ...initQuery, ...query },
      { "x-req-type": "export" }
    );
    const data = result?.data;
    const meta = result?.meta;

    if (meta?.status && data) {
      if (formatExport)
        return {
          data: formatExport(data),
          meta,
        };
      return result;
    }
    return { data: [], meta: { status: false } };
  };

  const columns = getColumns({
    sortConfig,
    onDeleteItem,
    onHeaderCellClick,
    currentPage,
    pageSize,
    editAccess,
    detailAccess,
    deleteAccess,
    routes,
    title,
    columnFormat,
    renderEdit,
    renderDelete,
    renderDetail,
    useDelete,
    useDetail,
    useEdit,
    useAction,
    fetchData: fetchWithQuery,
    additionalButton,
    deletedKeyText,
  });

  const handleReset = () => {
    onResetSearch();
  };

  return (
    <div>
      {showHeader && (
        <header className={cn("@container xs:-mt-2")}>
          <div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between">
            <div>
              <Title
                as="h2"
                className="text-[22px] lg:text-2xl 4xl:text-[26px]"
              >
                {title}
              </Title>
            </div>
          </div>
        </header>
      )}
      <TableFilter
        drawerTitle={`${title} Filter`}
        onSubmit={() => refreshFilter()}
        routes={routes}
        apiPath={apiPath}
        title={title}
        isFiltered={isFiltered}
        breadcrumb={breadcrumb}
        addButton={addButton && addButton(fetchWithQuery)}
        getDataExport={useExport ? fetchExportData : undefined}
        exportFilterFields={filterFields}
      >
        {filterFields && filterFields.length > 0 && (
          <FilterElement
            filters={filters}
            updateFilter={updateFilter}
            filterFields={filterFields}
            handleReset={handleReset}
          />
        )}
      </TableFilter>
      <ControlledTable
        rowKey={(record) => record.uuid}
        variant="modern"
        isLoading={isLoading}
        showLoadingText={true}
        data={data}
        columns={columns}
        tableLayout={tableLayout}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalData,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
          rowsPerPage: `Baris per halaman`,
        }}
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </div>
  );
}
