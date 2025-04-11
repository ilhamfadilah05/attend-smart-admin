import PageHeader from "@/app/shared/page-header";
import React from "react";
import ChangePasswordForm from "./components/page-form";

export default function ChangePassword() {
  let pageHeader = {
    title: "",
    breadcrumb: [
      {
        href: "/",
        name: "Halaman Utama",
      },
      {
        name: "Ubah Password",
      },
    ],
  };

  return (
    <>
      <PageHeader title="Halaman Ubah Password" breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <ChangePasswordForm />
    </>
  );
}
