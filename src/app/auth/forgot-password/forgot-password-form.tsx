"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import { Button, Input, Text } from "rizzui";
import { useMedia } from "@hooks/use-media";
import { Form } from "@ui/form";
import { routes } from "@/config/routes";
import { forgetPasswordSchema, ForgetPasswordSchema } from "@/validators/forget-password.schema";
import api from "@/config/axios.config";

const initialValues = {
  email: "",
};

export default function ForgetPasswordForm() {
  const [reset, setReset] = useState({});
  const isMedium = useMedia("(max-width: 1200px)", false);

  const onSubmit: SubmitHandler<ForgetPasswordSchema> = (data) => {
    api.post("auth/forgot-password", data).then((res) => {
      if (!res) return;
      toast.success(
        <Text>
          Tautan reset kata sandi dikirim ke email ini:{" "}
          <Text as="b" className="font-semibold">
            {data.email}
          </Text>
        </Text>,
        {
          position: "top-right",
          style: {
            background: "#00b324",
            color: "white",
            padding: "8px",
          },
        }
      );
    });
    setReset(initialValues);
  };

  return (
    <div className="xl:pe-12 2xl:pe-20">
      <Form<ForgetPasswordSchema>
        validationSchema={forgetPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              size={isMedium ? "lg" : "xl"}
              label="Email"
              placeholder="Masukkan Email ..."
              className="[&>label>span]:font-medium"
              {...register("email")}
              error={errors?.email?.message}
            />
            <Button className="w-full bg-teal-400 hover:bg-teal-900" type="submit" size={isMedium ? "lg" : "xl"}>
              Reset Password
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-9 xl:text-base">
        Tidak ingin reset?{" "}
        <Link href={routes.signIn} className="font-semibold text-teal-400 hover:text-teal-800">
          Sign In
        </Link>
      </Text>
    </div>
  );
}
