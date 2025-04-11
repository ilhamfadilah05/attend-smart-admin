"use client";

import React, { useState } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import { Button, cn, Password, Text } from "rizzui";
import { Form } from "@ui/form";
import { HorizontalFormBlockWrapper } from "@/components/horizontal-form-default";
import {
  resetPasswordFormSchema,
  ResetPasswordFormTypes,
} from "../change-password.config";
import api from "@/config/axios.config";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import alertNotification from "@/components/alert-notification";

export default function ChangePasswordForm({
  isForce = false,
}: {
  isForce?: boolean;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isOldPasswordValid, setIsOldPasswordValid] = useState(false);
  const [reset, setReset] = useState({
    oldPassword: "",
    newPassword: "",
    confirmedPassword: "",
  });

  const onSubmit: SubmitHandler<ResetPasswordFormTypes> = (data) => {
    if (!isOldPasswordValid) {
      alertNotification("Password lama tidak sesuai", "error");
      return;
    }
    setLoading(true);
    api
      .patch("auth/change-password", { password: data.newPassword })
      .then(async (res) => {
        if (!res?.data?.meta?.status) {
          setLoading(false);
          return;
        }
        // await UserApi.me();

        setReset({
          oldPassword: "",
          newPassword: "",
          confirmedPassword: "",
        });

        setLoading(false);
        toast.success(<Text>Password berhasil di ubah</Text>, {
          position: "top-right",
          style: { background: "#00b324", color: "white", padding: "8px" },
        });
        router.replace("/");
      });
  };

  let timerSearchProject: NodeJS.Timeout;
  return (
    <>
      <Form<ResetPasswordFormTypes>
        validationSchema={resetPasswordFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        className="isomorphic-form flex flex-grow flex-col @container"
        useFormProps={{
          mode: "all",
        }}
      >
        {({
          control,
          formState: { errors },
          getValues,
          register,
          setError,
          clearErrors,
        }) => {
          return (
            <>
              <div className="mx-auto w-full max-w-screen-2xl">
                <HorizontalFormBlockWrapper
                  title="Password Sekarang"
                  className="text-base font-medium mb-5"
                >
                  <Password
                    {...register("oldPassword")}
                    placeholder="Masukkan password sekarang"
                    onChange={(e) => {
                      const value = e.target.value;

                      clearTimeout(timerSearchProject);
                      timerSearchProject = setTimeout(() => {
                        api
                          .post("auth/check-password", { password: value })
                          .then((res) => {
                            console.log(res);
                            if (res?.data?.statusCode === 200) {
                              setIsOldPasswordValid(true);
                              clearErrors("oldPassword");
                            } else {
                              setIsOldPasswordValid(false);
                              setError("oldPassword", {
                                message: "Password lama tidak sesuai",
                              });
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                            setIsOldPasswordValid(false);
                          });
                      }, 1000);
                    }}
                    error={errors.oldPassword?.message}
                    className={cn(
                      "rounded-md",
                      isOldPasswordValid && "bg-green-100"
                    )}
                  />
                </HorizontalFormBlockWrapper>
                <hr />
                <HorizontalFormBlockWrapper
                  title="Password Baru"
                  className="text-base font-medium mb-5 mt-5"
                >
                  <Controller
                    control={control}
                    name="newPassword"
                    render={({ field: { onChange, value } }) => (
                      <Password
                        {...register("newPassword")}
                        placeholder="Masukkan password baru"
                        onChange={onChange}
                        error={errors.newPassword?.message}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="Konfirmasi Password Baru"
                  className="text-base font-medium mb-5"
                >
                  <Controller
                    control={control}
                    name="confirmedPassword"
                    render={({ field: { onChange, value } }) => (
                      <Password
                        {...register("confirmedPassword")}
                        placeholder="Masukkan konfirmasi password baru"
                        onChange={onChange}
                        error={errors.confirmedPassword?.message}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <div className="mt-6 flex w-auto items-center justify-end gap-3">
                  {!isForce && (
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  )}
                  <Button type="submit" variant="solid" isLoading={isLoading}>
                    Update Password
                  </Button>
                </div>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}
