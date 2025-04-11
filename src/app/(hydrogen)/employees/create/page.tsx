import PageHeader from "@/app/shared/page-header";
import PageForm from "../components/page-form";

export default function CreatePage() {
  const pageHeader = {
    title: `Tambah Karyawan`,
    breadcrumb: [
      {
        href: "/",
        name: "Halaman Utama",
      },
      {
        href: "/employees",
        name: "Karyawan",
      },
      {
        name: `Tambah Karyawan`,
      },
    ],
  };

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <PageForm
        isDetail={false}
        redirect={`/employees`}
        title={"Karyawan"}
        dataInput={{
          is_highlighted: false,
        }}
      />
    </>
  );
}
