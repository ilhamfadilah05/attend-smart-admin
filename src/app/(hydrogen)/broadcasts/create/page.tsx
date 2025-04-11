import PageForm from "../components/page-form";
import { title, urlRoot } from "../page.config";
import PageHeader from "@/app/shared/page-header";

export default function CreatePage() {
  const pageHeader = {
    title,
    breadcrumb: [
      {
        href: "/",
        name: "Halaman Utama",
      },
      {
        href: `/${urlRoot}`,
        name: title,
      },
      {
        name: `Tambah ${title}`,
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
        redirect={`/${urlRoot}`}
        title={title}
        // dataInput={defaultFormValue}
      />
    </>
  );
}
