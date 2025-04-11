"use client";

import Link from "next/link";
import { SubmitHandler } from "react-hook-form";
import { Password, Button, Switch, Input, Text } from "rizzui";
import { useMedia } from "@hooks/use-media";
import { Form } from "@ui/form";
import { routes } from "@/config/routes";
import { loginSchema, LoginSchema } from "@/validators/login.schema";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { AuthApi } from "../api/auth/auth.api";
import { useLocalStorage } from "react-use";
import {
  KACCESS_TOKEN,
  KLOGIN,
  KUSER,
  setLocalStorage,
} from "@/utils/localstorage";
import { useEffect, useRef, useState } from "react";
import alertNotification from "@/components/alert-notification";
import ReCAPTCHA from "react-google-recaptcha";

export default function SignInForm() {
  const [isLoading, setisLoading] = useState(false);
  const [dataLogin, setDataLogin] = useLocalStorage<Record<string, any>>(
    KLOGIN,
    {}
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  const isMedium = useMedia("(max-width: 1200px)", false);
  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    // if (!isVerified)
    //   return alertNotification(
    //     "Please verify you are not a robot",
    //     "error",
    //     3000
    //   );

    setisLoading(true);
    const response = await AuthApi.login(data);
    const resLogin = response?.data;
    setisLoading(false);

    if (resLogin) {
      if (!resLogin?.accessToken) {
        return router.push(`/auth/otp?email=${data.email}`);
      }
      var user = {
        email: resLogin?.email,
      };
      setLocalStorage(KACCESS_TOKEN, resLogin?.accessToken);
      setLocalStorage(KUSER, user);
      await AuthApi.role();

      if (data.rememberMe) {
        setDataLogin(data);
      } else {
        setDataLogin({});
      }

      // router.replace("/");
      let lastPath = searchParams.get("last-path");
      if (
        lastPath &&
        ["/auth/otp", "/auth/forgot-password", "/signin"].includes(lastPath)
      )
        lastPath = "/";
      return router.replace(lastPath || "/");
    } else {
      let lastPath = searchParams.get("last-path");

      return router.replace(lastPath || "/");
    }
  };

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        // setIsVerified(true);
      }
    } catch (e) {
      // setIsVerified(false);
    }
  }

  const handleChange = (token: string | null) => {
    handleCaptchaSubmission(token);
  };

  function handleExpired() {
    // setIsVerified(false);
  }

  return (
    <div className="xl:pe-12 2xl:pe-20">
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          defaultValues: dataLogin,
        }}
      >
        {({ getValues, register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              size={isMedium ? "lg" : "xl"}
              label="Email"
              placeholder="Masukkan email"
              className="[&>label>span]:font-medium"
              {...register("email")}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Masukkan password"
              size={isMedium ? "lg" : "xl"}
              className="[&>label>span]:font-medium"
              {...register("password")}
              error={errors.password?.message}
            />

            <div className="flex items-center justify-between">
              {/* <Switch
                label="Ingat Saya"
                className="[&>label>span]:font-medium [&>label]:my-1"
                {...register("rememberMe")}
              /> */}
              <Link
                href={routes.auth.forgotPassword}
                className="h-auto p-0 text-sm font-medium text-gray-900 underline transition-colors hover:text-primary hover:no-underline"
              >
                Lupa Password?
              </Link>
            </div>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              ref={recaptchaRef}
              onChange={handleChange}
              onExpired={handleExpired}
            />
            <Button
              // disabled={!isVerified}
              isLoading={isLoading}
              className="w-full bg-teal-400 hover:bg-teal-900"
              type="submit"
              size={isMedium ? "lg" : "xl"}
            >
              Sign In
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}
