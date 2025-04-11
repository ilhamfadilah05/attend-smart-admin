/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import alertNotification from "@/components/alert-notification";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ControlledTable from "@/components/controlled-table";
import TableFilter from "./role-table-filter";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/config/routes";
import { getColumns } from "./role-column";
import { RoleApi } from "@/app/api/role";
import { useRoleChecker } from "@/utils/role-checker";
const FilterElement = dynamic(
  () => import("@/app/shared/role/role-list/role-filterElement"),
  { ssr: false }
);

const filterState = {
  name: "",
  id: "",
};

export default function RoleTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(5);
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
    setPageSize(10);
    setSortConfig({
      key: "",
      direction: "",
    });
  };

  const fetchData = useCallback(async (query?: any) => {
    setIsLoading(true);
    const queryParam = {
      ...query,
    };
    const result = await RoleApi.getAll(queryParam);
    const data = result?.data;

    if (result.statusCode === 200) {
      setData(data);
      setCurrentPage(result?.page || 1);
      setTotalData(result?.totalData || 0);
      setPageSize(result?.pageSize || 10);
    }

    setIsLoading(false);
  }, []);

  useEffect(
    () => {
      const hasParams = searchParams.toString().length > 0;
      if (hasParams) {
        setIsFiltered(true);

        const query = {
          name: searchParams.get("name") || "",
          page: +(searchParams.get("page") || "0"),
          limit: +(searchParams.get("limit") || "0"),
        };

        if (query.name) updateFilter("name", query.name);
        if (query.page) setCurrentPage(query.page);
        if (query.limit) setPageSize(query.limit);

        fetchData(query);
      } else {
        fetchData();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams]
  );

  const handlePaginate = (page: number) => {
    setCurrentPage(page);
  };

  const onSubmitSearch = () => {
    let query: Record<string, any> = {
      page: currentPage,
      limit: pageSize,
    };

    if (sortConfig?.key)
      query.sort_by = `${sortConfig?.key}-${sortConfig?.direction}`;
    // if (sortConfig?.key) query.sort_by = `${sortConfig?.direction}${sortConfig?.key}`;
    if (filters?.name) query.name = filters.name;
    if (filters?.id) query.id = filters.id;

    const params = new URLSearchParams(query);
    router.push(`${routes.role.list}?${params.toString()}`);
  };

  useEffect(() => {
    onSubmitSearch();
  }, [pageSize, sortConfig, currentPage, isFiltered]);

  const onDeleteItem = async (id: any) => {
    const result = await RoleApi.deletedRole(id);
    if (result.statusCode === 200 || result.statusCode === 201) {
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
          sortConfig?.key === value && sortConfig?.direction === "ASC"
            ? "DESC"
            : "ASC",
      });
    },
  });

  let name = "Nama";
  let created = "Tanggal Dibuat";
  let action = "Aksi";

  let detailRoleAccess = ability.can("read", "roles/:id");
  let editRoleAccess = ability.can("update", "roles/:id");
  let deleteRoleAccess = ability.can("delete", "roles/:id");

  const columns = getColumns({
    data,
    onDeleteItem,
    sortConfig,
    onHeaderCellClick,
    currentPage,
    pageSize,
    name,
    created,
    action,
    detailRoleAccess,
    editRoleAccess,
    deleteRoleAccess,
  });

  const handleReset = () => {
    onResetSearch();
  };

  const updateFilter = (key: string, value: any) => {
    setFilters((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <div>
      <TableFilter drawerTitle="Akses Filter" onSubmit={() => onSubmitSearch()}>
        <FilterElement
          filters={filters}
          isFiltered={isFiltered}
          updateFilter={updateFilter}
          handleReset={handleReset}
        />
      </TableFilter>
      <ControlledTable
        rowKey={(record) => record.id}
        variant="modern"
        isLoading={isLoading}
        showLoadingText={true}
        data={data}
        // @ts-ignore
        columns={columns}
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
