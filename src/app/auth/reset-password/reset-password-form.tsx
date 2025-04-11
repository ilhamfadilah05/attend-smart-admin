"use client";

import React, { useState } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import { Button, Password, Text } from "rizzui";
import { Form } from "@ui/form";
import { HorizontalFormBlockWrapper } from "@/components/horizontal-form-default";
import { resetPasswordFormSchema, ResetPasswordFormTypes } from "./reset-password.schema";
import api from "@/config/axios.config";
import toast from "react-hot-toast";
import { routes } from "@/config/routes";

export default function PasswordSettingsView({ token }: { token: string }) {
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState({
    newPassword: "",
    confirmedPassword: "",
  });

  const onSubmit: SubmitHandler<ResetPasswordFormTypes> = (data) => {
    setLoading(true);
    api.post("auth/reset-password", { token, password: data.newPassword }).then((res) => {
      setLoading(false);
      if (!res) return;
      toast.success(<Text>Password berhasil di reset</Text>, {
        position: "top-right",
        style: {
          background: "#00b324",
          color: "white",
          padding: "8px",
        },
      });
      window.location.replace(routes.signIn);
    });

    setReset({
      newPassword: "",
      confirmedPassword: "",
    });
  };

  return (
    <>
      <Form<ResetPasswordFormTypes>
        validationSchema={resetPasswordFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        className="isomorphic-form flex flex-grow flex-col @container"
        useFormProps={{
          mode: "onChange",
        }}
      >
        {({ control, formState: { errors }, getValues, register }) => {
          return (
            <>
              <div className="mx-auto w-full max-w-screen-2xl">
                <HorizontalFormBlockWrapper title="Password Baru" className="text-base font-medium mb-5">
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

                <HorizontalFormBlockWrapper title="Konfirmasi Password Baru" className="text-base font-medium mb-5">
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
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
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
