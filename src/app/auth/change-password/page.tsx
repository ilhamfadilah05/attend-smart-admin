import ChangePasswordForm from "@/app/(hydrogen)/change-password/components/page-form";
import PageHeader from "@/app/shared/page-header";
import WidgetCard from "@components/cards/widget-card";
import React from "react";

export default function ChangePassword() {
  return (
    <>
      <WidgetCard title="" className="m-10">
        <PageHeader title="Halaman Ubah Password" breadcrumb={[]} />
        <div className="mt-5">
          <ChangePasswordForm isForce />
        </div>
      </WidgetCard>
    </>
  );
}
