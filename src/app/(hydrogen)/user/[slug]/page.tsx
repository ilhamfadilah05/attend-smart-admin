"use client";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { useEffect, useState } from "react";
import CreateUser from "@/app/shared/user/user-create-edit/create-edit-user";
import { UserFormInputEdit } from "../user.validator";
import { useRoleChecker } from "@/utils/role-checker";
import { UserApi } from "../user.api";

type Props = {
  params: { slug: string };
};

export default function DetailPage({ params }: Props) {
  const [dataUser, setDataUser] = useState<UserFormInputEdit>();
  const { ability } = useRoleChecker();

  const pageHeader = {
    title: "Detail Pengguna",
    breadcrumb: [
      { href: "/", name: "Halaman Utama" },
      {
        href: routes.user.list,
        name: "Pengguna",
      },
      {
        name: "Detail Pengguna",
      },
      // { name: params.slug },
    ],
  };

  const getDataByid = async (id: any) => {
    if (ability.can("read", "users/:id")) {
      const result = await UserApi.getByUUID(id);

      if (result.statusCode === 200) {
        setDataUser({
          ...result.data,
          password: "",
          role_name: result.data?.role?.name,
          role_id: result.data?.role?.id,
        });
      }
    }
  };

  useEffect(() => {
    if (params.slug) {
      getDataByid(params.slug);
    }
  }, []);

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      {dataUser?.name && ability.can("read", "users/:id") ? (
        <CreateUser id={params.slug} user={dataUser} isDetail="1" />
      ) : null}
      {/* <DetailCategory id={params.slug} category={dataCategory}/> */}
    </>
  );
}
