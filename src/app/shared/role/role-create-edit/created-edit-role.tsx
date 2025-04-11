/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import alertNotification from "@/components/alert-notification";

import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PiCheckBold, PiXBold } from "react-icons/pi";
import { Text, Title } from "@/components/ui/text";
import { Form } from "@/components/ui/form";
import cn from "@utils/class-names";
import { useRouter } from "next/navigation";
import { RoleFormInput, roleFormSchema } from "@/validators/create-roles.schema";
import { RoleApi } from "@/app/api/role";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { AdvancedCheckbox } from "@/components/ui/advanced-checkbox";
import { routes } from "@/config/routes";
import { Tooltip } from "rizzui";
import Link from "next/link";

// a reusable form wrapper component
function HorizontalFormBlockWrapper({
  title,
  description,
  children,
  className,
  isModalView = true,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
  isModalView?: boolean;
}>) {
  return (
    <div className={cn(className, isModalView ? "@5xl:grid @5xl:grid-cols-6" : " ")}>
      {isModalView && (
        <div className="col-span-2 mb-6 pe-4 @5xl:mb-0">
          <Title as="h6" className="font-semibold">
            {title}
          </Title>
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        </div>
      )}

      <div className={cn("grid gap-3 @lg:gap-4 @2xl:gap-5", isModalView ? "col-span-4" : " ")}>{children}</div>
    </div>
  );
}

interface OriginalData {
  action: string;
  subject: string;
  desc: string;
}

interface TransformedData {
  subject: string;
  action: string[];
  desc: string[];
}

// main category form component for create and update category
export default function CreateEditRole({
  id,
  role,
  isModalView = true,
  isDetail,
}: {
  id?: string;
  isModalView?: boolean;
  role?: RoleFormInput;
  isDetail?: string;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [listDataPermissions, setListDataPermissions] = useState<TransformedData[]>([]);
  const [listAcceptPermission, setListAcceptPermission] = useState<TransformedData[]>([]);

  const onSubmit: SubmitHandler<RoleFormInput> = async (data) => {
    if (id) {
      if (listAcceptPermission.length <= 0) {
        alertNotification(`Akses role harus dipilih minimal 1!`, "error");
      } else {
        setLoading(true);
        let newData = listAcceptPermission.flatMap(({ subject, action }) =>
          action.map((act) => ({ subject, action: act }))
        );

        let mapData = {
          name: data.name,
          permissions: newData,
        };

        const result = await RoleApi.updateRole(id, mapData);

        if (result?.meta?.status) {
          setLoading(false);
          router.push(routes.role.list);
          alertNotification(`Berhasil merubah data Akses role`, "success");
        } else {
          setLoading(false);
          alertNotification(result.message, "error");
        }
      }
    } else {
      if (listAcceptPermission.length <= 0) {
        alertNotification(`Akses role harus dipilih minimal 1!`, "error");
      } else {
        setLoading(true);
        let newData = listAcceptPermission.flatMap(({ subject, action }) =>
          action.map((act) => ({ subject, action: act }))
        );

        let mapData = {
          name: data.name,
          permissions: newData,
        };

        const result = await RoleApi.createRole(mapData);

        if (result?.meta?.status) {
          setLoading(false);
          router.push(routes.role.list);
          alertNotification(`Berhasil merubah data Akses role`, "success");
        } else {
          setLoading(false);
          alertNotification(result.message, "error");
        }
      }
    }
  };

  useEffect(() => {
    getPermissionList();
  }, []);

  const getPermissionList = async () => {
    const result = await RoleApi.getPermissionList();

    if (result?.meta?.status) {
      setListDataPermissions(transformData(result.data));
    }
  };
  const transformData = (data: OriginalData[]): TransformedData[] => {
    if (!Array.isArray(data)) {
      throw new Error("Data should be an array.");
    }
    const transformedData: TransformedData[] = data.reduce((result, current) => {
      const existingItem = result.find((item) => item.subject === current.subject);

      if (existingItem) {
        existingItem.action.push(current.action);
        existingItem.desc.push(current.desc);
      } else {
        result.push({
          subject: current.subject,
          action: [current.action],
          desc: [current.desc],
        });
      }

      return result;
    }, [] as TransformedData[]);

    return transformedData;
  };

  useEffect(() => {
    if (role?.roleList) {
      const result: any = role?.roleList;
      setListAcceptPermission(transformData(result));
    }
  }, []);

  const onClickRoles = (subject: string, selectedAction: string, desc: string) => {
    // Membuat array baru dengan data yang baru ditambahkan atau dihapus
    let newList = listAcceptPermission.map((item) => {
      if (item.subject === subject) {
        // Jika subject sudah ada dalam list
        if (item.action.includes(selectedAction)) {
          // Jika action sudah ada, hapus action tersebut
          if (item.action.length >= 0) {
            item.action = item.action.filter((action) => action !== selectedAction);
          }
        } else {
          // Jika action belum ada, tambahkan action tersebut
          item.action.push(selectedAction);
        }
      }
      return item;
    });

    newList = newList.filter((item) => item.action.length > 0);

    // Jika subject belum ada dalam list, tambahkan subject beserta action yang baru
    if (!listAcceptPermission.some((item) => item.subject === subject)) {
      newList.push({ subject, action: [selectedAction], desc: [desc] });
    }

    setListAcceptPermission(newList);
  };

  const rowsPermission = () =>
    listDataPermissions.map((v, l) => {
      const acceptedPermission = listAcceptPermission.find((item) => item.subject === v.subject);

      return (
        <div className="flex flex-col overflow-x-auto py-2" key={l}>
          <span className="text-base font-bold">{v.subject}</span>

          <CheckboxGroup values={v.action} setValues={(v) => {}} className="grid grid-cols-3 md:flex">
            {v.action.map((j, i) => {
              const isActionAccepted = acceptedPermission ? acceptedPermission.action.includes(v.action[i]) : false;

              return (
                <AdvancedCheckbox
                  key={v.action[i]}
                  name={``}
                  disabled={isDetail ? true : false}
                  onClick={(k) => {
                    onClickRoles(v.subject, v.action[i], v.desc[i]);
                  }}
                  value={v.action[i]}
                  className="items-center justify-center m-1 flex h-9"
                  inputClassName={
                    isActionAccepted
                      ? "[&:checked~span]:bg-teal-600 dark:[&:checked~span]:bg-teal-800 [&:checked~span]:text-white"
                      : ""
                  }
                >
                  <Tooltip size="sm" content={v.desc[i]} placement="top" color="invert" className="mb-2 flex">
                    <div>
                      {isActionAccepted && (
                        <PiCheckBold className="icon h-[14px] w-[14px] mr-1" style={{ display: "initial" }} />
                      )}
                      <span className="font-medium">{v.action[i]}</span>
                    </div>
                  </Tooltip>
                </AdvancedCheckbox>
              );
            })}
          </CheckboxGroup>
        </div>
      );
    });

  return (
    <Form<RoleFormInput>
      validationSchema={roleFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: "onChange",
        defaultValues: {
          name: role?.name,
        },
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ register, control, getValues, setValue, formState: { errors } }) => (
        <>
          <div className="flex-grow pb-10">
            <div
              className={cn(
                "grid grid-cols-1 ",
                isModalView
                  ? "grid grid-cols-1 gap-8 divide-y divide-dashed  divide-gray-200 @2xl:gap-10 @3xl:gap-12 [&>div]:pt-7 first:[&>div]:pt-0 @2xl:[&>div]:pt-9 @3xl:[&>div]:pt-11"
                  : "gap-5"
              )}
            >
              <HorizontalFormBlockWrapper
                title={"Akses"}
                description={isDetail ? "" : "Ubah informasi akses anda disini"}
                isModalView={isModalView}
              >
                <Input
                  label="Nama Akses"
                  readOnly={isDetail ? true : false}
                  placeholder="Masukkan Nama Akses ..."
                  {...register("name")}
                  error={errors.name?.message}
                />
              </HorizontalFormBlockWrapper>
              <HorizontalFormBlockWrapper
                title="Akses Role"
                description={isDetail ? "" : "Edit informasi Akses Role anda disini"}
                isModalView={isModalView}
              >
                {rowsPermission()}
              </HorizontalFormBlockWrapper>
            </div>
          </div>
          <div
            className={cn(
              "sticky bottom-0 z-40 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col",
              isModalView ? "-mx-10 -mb-7 px-10 py-5" : "py-1"
            )}
          >
            <Link href="/role">
              <Button variant="outline" className="w-full @xl:w-auto">
                Kembali
              </Button>
            </Link>
            {isDetail ? null : (
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              >
                {id ? "Ubah" : "Buat"}
                {" Role"}
              </Button>
            )}
          </div>
        </>
      )}
    </Form>
  );
}
