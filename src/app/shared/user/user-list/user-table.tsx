/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import TableFilter from "./user-table-filter";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/config/routes";
import { getColumns } from "./user-column";
import ControlledTable from "../../controlled-table";
import { UserApi } from "@/app/(hydrogen)/user/user.api";
import { globalSignOutOnError, useRoleChecker } from "@/utils/role-checker";

const FilterElement = dynamic(
  () => import("@/app/shared/user/user-list/user-filterElement"),
  { ssr: false }
);

const filterState = {
  name: "",
  uuid: "",
  role_uuid: "",
  entity_uuid: "",
  status: "",
};

export default function UserTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(20);
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

  const fetchData = useCallback(async (query?: Record<string, any>) => {
    setIsLoading(true);
    const queryParam = {
      ...query,
    };
    const result: any = await UserApi.getAll(queryParam);
    if (result.statusCode === 200) {
      const data = result?.data;
      setData(data || []);
      setCurrentPage(result?.page || 1);
      setTotalData(result?.totalData || 0);
      setPageSize(result?.pageSize || 20);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const hasParams = searchParams.toString().length > 0;
    if (hasParams) {
      setIsFiltered(true);

      let query: Record<string, any> = {
        name: searchParams.get("name") || "",
        page: +(searchParams.get("page") || "0"),
        limit: +(searchParams.get("limit") || "0"),
      };
      if (searchParams.get("role_uuid"))
        query.role_uuid = searchParams.get("role_uuid");
      if (searchParams.get("entity_uuid"))
        query.entity_uuid = searchParams.get("entity_uuid");
      if (searchParams.get("status")) query.status = searchParams.get("status");

      if (query.name) updateFilter("name", query.name);
      if (query.role_uuid) updateFilter("role_uuid", query.role_uuid);
      if (query.entity_uuid) updateFilter("entity_uuid", query.entity_uuid);
      if (query.status) updateFilter("status", query.status);
      if (query.page) setCurrentPage(query.page);
      if (query.limit) setPageSize(query.limit);

      fetchData(query);
    } else {
      fetchData();
    }
  }, [searchParams]);

  const refreshFilter = () => {
    let query: Record<string, any> = {
      page: currentPage,
      limit: pageSize,
    };

    if (sortConfig?.key)
      query.sort_by = `${sortConfig?.direction}${sortConfig?.key}`;
    if (filters?.name) query.name = filters.name;
    if (filters?.role_uuid) query.role_uuid = filters.role_uuid;
    if (filters?.entity_uuid) query.entity_uuid = filters.entity_uuid;
    if (filters?.status) query.status = filters.status;
    if (filters?.uuid) query.uuid = filters.uuid;

    const params = new URLSearchParams(query);
    router.push(`${routes.user.list}?${params.toString()}`);
  };

  useEffect(() => {
    refreshFilter();
  }, [pageSize, sortConfig, currentPage, isFiltered]);

  const handlePaginate = (page: number) => {
    setCurrentPage(page);
  };

  const onDeleteItem = async (uuid: any) => {
    const result = await UserApi.deletedUser(uuid);
    if (result?.meta?.status) {
      fetchData();
    } else {
      console.log("Gagal menghapus");
    }
  };

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      setSortConfig({
        key: value,
        direction:
          sortConfig?.key === value && sortConfig?.direction === "+"
            ? "-"
            : "+",
      });
      refreshFilter();
    },
  });

  let editUserAccess = ability.can("update", "users/:id");
  let detailUserAccess = ability.can("read", "users/:id");

  const columns = getColumns({
    data,
    onDeleteItem,
    sortConfig,
    onHeaderCellClick,
    currentPage,
    pageSize,
    editUserAccess,
    detailUserAccess,
  });

  const handleReset = () => {
    onResetSearch();
  };

  return (
    <div>
      <TableFilter drawerTitle="User Filter" onSubmit={() => refreshFilter()}>
        <FilterElement
          filters={filters}
          isFiltered={isFiltered}
          updateFilter={updateFilter}
          handleReset={handleReset}
        />
      </TableFilter>
      <ControlledTable
        rowKey={(record) => record.uuid}
        variant="modern"
        isLoading={isLoading}
        showLoadingText={true}
        data={data}
        // @ts-ignore
        columns={columns}
        tableLayout="fixed"
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalData,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
          // rowsPerPage: `Baris per halaman`,
        }}
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </div>
  );
}
