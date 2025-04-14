/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import alertNotification from "@/components/alert-notification";

import { useEffect, useState } from "react";
import { SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { Password } from "@/components/ui/password";
import { Checkbox, Select } from "rizzui";
import AsyncSelect from "react-select/async";
import { HorizontalFormBlockWrapper } from "@/components/horizontal-form-default";
import Link from "next/link";
import {
  UserFormInputEdit,
  userFormSchemaEdit,
} from "@/app/(hydrogen)/user/user.validator";
import cn from "@utils/class-names";
import { SelectObject } from "@/types/global-types";
import { validatePassword } from "@/validators/common-rules";
import { created_ataUser, updateDataUser } from "../user.service";
import { RoleApi } from "@/app/api/role";
import DefaultAsyncSelect from "../../default-page/default-form/default-async-select";
import { DefaultOption } from "../../default-page/dto";
import { defaultService } from "../../default-page/default-service";
import { PiPlusBold, PiTrashBold } from "react-icons/pi";
import Table from "@/components/ui/table";
import { UserApi } from "@/app/(hydrogen)/user/user.api";
import { useRoleChecker } from "@/utils/role-checker";
import { staticData } from "@/data/static-data";

export default function CreateUser({
  id,
  user,
  isModalView = true,
  isDetail,
  redirect,
  isProfile = false,
}: {
  id?: string;
  isModalView?: boolean;
  isProfile?: boolean;
  user?: UserFormInputEdit | any;
  isDetail?: string;
  redirect?: string;
}) {
  const { ability } = useRoleChecker();

  const [selectedEntity, setSelectedEntity] = useState("");
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [dataRole, setDataRole] = useState([]);
  const [isChangePassword, setChangePassword] = useState(false);
  const [roleData, setRoleData] = useState<SelectObject>({
    id: "",
    name: "",
  });

  const [entities, setEntities] = useState<Record<string, any>[]>([]);

  const onSubmitEdit: SubmitHandler<UserFormInputEdit> = async (data) => {
    if (data.email) {
      setLoading(true);
      try {
        let schema;
        schema = userFormSchemaEdit;
        if (isChangePassword) {
          schema = schema.extend({
            password: validatePassword,
          });
        }
        schema.parse(data);

        if (id) {
          updateDataUser(
            { ...data },
            roleData,
            router,
            routes,
            id,
            setLoading,
            redirect
          );
        } else {
          created_ataUser({ ...data }, roleData, router, routes, setLoading);
        }
      } catch (error: any) {
        console.error("Validation error:", error);
        setLoading(false);
        alertNotification(`Password tidak valid`, "error");
      }
    }
  };

  const changeStatus = async () => {
    user.status === "ACTIVE";

    setLoading(true);
    const result = await UserApi.updateUser(id, {
      status: user.status === "ACTIVE" ? "BLOCK" : "ACTIVE",
    });

    if (result?.meta?.status) {
      setLoading(false);
      router.push(redirect || routes.user.list);
      alertNotification(`Berhasil merubah data Pengguna`, "success");
    } else {
      setLoading(false);
      alertNotification(result.message, "error");
    }
  };

  const getDataRole = async (name?: string) => {
    const result = await RoleApi.getAll({ limit: 30, name: name });
    if (result) {
      setDataRole(result.data);
      return result.data;
    }
  };

  useEffect(() => {
    getDataRole();
    if (user) {
      if (user.role_name && user.role_id) {
        setRoleData({
          id: user.role_id,
          name: user.role_name,
        });
      }
    }

    if (user && user?.user_master_entities?.length > 0) {
      let tempEntity: Record<string, any>[] = [];
      user?.user_master_entities.map((currEntity: Record<string, any>) => {
        if (currEntity.master_entity) {
          tempEntity.push(currEntity.master_entity);
        }
      });

      setEntities(tempEntity);
    }
  }, []);

  return (
    <Form<UserFormInputEdit>
      validationSchema={userFormSchemaEdit}
      resetValues={reset}
      onSubmit={onSubmitEdit}
      useFormProps={{
        mode: "onChange",
        defaultValues: user,
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
                title="Data Diri"
                description={
                  isDetail ? "" : "Ubah informasi Data Diri anda disini"
                }
                isModalView={isModalView}
              >
                <Input
                  type="text"
                  label={"Nama *"}
                  readOnly={isDetail ? true : false}
                  placeholder={"Masukkan Nama"}
                  {...register("name")}
                  error={errors.name?.message}
                />
                <Input
                  type="email"
                  size="lg"
                  readOnly={isDetail ? true : false}
                  label="Email *"
                  placeholder={"Masukkan Email"}
                  color="info"
                  className="[&>label>span]:font-medium"
                  inputClassName="text-sm"
                  {...register("email")}
                  error={errors.email?.message}
                />

                <div>
                  {id ? (
                    isChangePassword ? (
                      <Password
                        label={"Kata Sandi *"}
                        placeholder={"Masukkan Kata Sandi"}
                        size="lg"
                        readOnly={isDetail ? true : false}
                        className="[&>label>span]:font-medium"
                        inputClassName="text-sm"
                        color="info"
                        {...register("password")}
                        error={errors.password?.message}
                      />
                    ) : null
                  ) : (
                    <Password
                      readOnly={isDetail ? true : false}
                      label={"Kata Sandi"}
                      placeholder={"Masukkan Kata Sandi"}
                      size="lg"
                      className="[&>label>span]:font-medium"
                      inputClassName="text-sm"
                      color="info"
                      {...register("password")}
                      error={errors.password?.message}
                    />
                  )}
                  {id && isDetail === undefined ? (
                    <Checkbox
                      label={"Ubah Kata Sandi ?"}
                      className="mb-2 mt-2 text-sm"
                      checked={isChangePassword}
                      onChange={() => setChangePassword(!isChangePassword)}
                    ></Checkbox>
                  ) : null}
                </div>
                <Input
                  label={"Nomor Handphone"}
                  type="number"
                  readOnly={isDetail ? true : false}
                  placeholder={"Masukkan Nomor Handphone"}
                  {...register("phone")}
                  error={errors.phone?.message}
                />
              </HorizontalFormBlockWrapper>
              <HorizontalFormBlockWrapper
                title="Tipe User"
                description={"Pilih tipe user"}
                isModalView={isModalView}
              >
                <Controller
                  key="is_admin"
                  name="is_admin"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    let result: DefaultOption[] = staticData.users_type.map(
                      (v) => ({
                        label: v.name,
                        value: v.id,
                      })
                    );

                    return (
                      <Select
                        placeholder={`Pilih Tipe User`}
                        value={value}
                        options={result || []}
                        onChange={onChange}
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          result?.find((r) => r?.value === selected)?.label ??
                          ""
                        }
                        error={error?.message}
                        className="col-span-full"
                        clearable
                        onClear={() => onChange("")}
                      />
                    );
                  }}
                />
              </HorizontalFormBlockWrapper>

              {
                <HorizontalFormBlockWrapper
                  title={"Role"}
                  description={
                    isDetail || isProfile
                      ? ""
                      : "Ubah informasi Role anda disini"
                  }
                  isModalView={isModalView}
                >
                  <div>
                    {isDetail || isProfile ? (
                      <Input
                        readOnly
                        value={roleData.name ? roleData.name : "-"}
                      />
                    ) : (
                      <AsyncSelect
                        cacheOptions
                        defaultOptions={dataRole}
                        loadOptions={getDataRole}
                        value={{
                          name: roleData.name,
                          id: roleData.id,
                        }}
                        className="border-zinc-900"
                        getOptionLabel={(option: any) => option.name}
                        getOptionValue={(option: any) => option.id}
                        onChange={(value: any) => {
                          setRoleData({
                            id: value.id,
                            name: value.name,
                          });
                        }}
                      />
                    )}
                  </div>
                </HorizontalFormBlockWrapper>
              }
            </div>
          </div>

          {
            <div
              className={cn(
                "flex items-center justify-end gap-3 bg-gray-0/10  @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col",
                isModalView ? "-mx-10 -mb-7 px-10 py-5" : "py-1"
              )}
            >
              <Link href={redirect || "/user"}>
                <Button variant="outline">Kembali</Button>
              </Link>
              {!isDetail && (
                <Button
                  isLoading={isLoading}
                  // type="submit"
                  onClick={(e) => {
                    onSubmitEdit(getValues());
                  }}
                >
                  {id ? `Ubah` : `Buat`} Pengguna
                </Button>
              )}
              {!isDetail &&
                !isProfile &&
                id &&
                ability.can("block", "user") && (
                  <Button
                    isLoading={isLoading}
                    variant="flat"
                    color={user.status === "ACTIVE" ? "danger" : "primary"}
                    onClick={changeStatus}
                  >
                    {user.status === "ACTIVE" ? "Blokir" : "Aktifkan"}
                  </Button>
                )}
            </div>
          }
        </>
      )}
    </Form>
  );
}
