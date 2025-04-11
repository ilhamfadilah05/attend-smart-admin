"use client";

import { Button, PinCode } from "rizzui";
import { SubmitHandler } from "react-hook-form";
import { Form } from "@ui/form";
import { useEffect, useRef, useState } from "react";
import { AuthApi } from "@/app/api/auth/auth.api";
import { KACCESS_TOKEN, KUSER, setLocalStorage } from "@/utils/localstorage";
import { useRouter } from "next/navigation";
import alertNotification from "@/components/alert-notification";
import { useSetState } from "react-use";

type FormValues = {
  otp: string;
};

type Props = {
  email: string;
};

export default function OtpForm({ email }: Props) {
  const [isLoading, setisLoading] = useState(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setisLoading(true);
    const response = await AuthApi.processOTP({
      email,
      otp: data.otp,
    });
    const resProcessOtp = response?.data;
    setisLoading(false);

    if (resProcessOtp) {
      var user = {
        email: resProcessOtp?.email,
        name: resProcessOtp?.email,
      };
      setLocalStorage(KACCESS_TOKEN, resProcessOtp?.accessToken);
      setLocalStorage(KUSER, user);
      await AuthApi.role();

      router.replace("/");
    }
  };

  const onResend = async () => {
    setisLoading(true);

    const response = await AuthApi.resendOTP({
      email,
    });
    if (response?.data) {
      onTimerStart();
      alertNotification(
        `Kode OTP sudah dikirimkan ke email ${email}`,
        "success",
        3000
      );
    }

    setisLoading(false);
  };

  const duration = 300; // * in seconds (300 seconds = 5 minutes)
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onTimerStart = (): void => {
    setTimeLeft(duration);
    setIsActive(true);
  };
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsActive(false);
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  }, [isActive]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useSetState(() => {
    onTimerStart();
  });

  return (
    <Form<FormValues> onSubmit={onSubmit} className="w-full">
      {({ setValue, getValues }) => (
        <div className="space-y-5 lg:space-y-7">
          <PinCode
            variant="outline"
            className="lg:justify-start"
            size="lg"
            length={6}
            type="text"
            setValue={(value) => setValue("otp", String(value))}
          />
          <div className="grid grid-cols-1 gap-5 pt-3 sm:grid-cols-2">
            <Button
              isLoading={isLoading}
              className="w-full"
              type="button"
              size="xl"
              variant="outline"
              onClick={onResend}
              disabled={timeLeft > 0}
            >
              {"Resend OTP" +
                (timeLeft > 0 ? ` (${formatTime(timeLeft)})` : "")}
            </Button>
            <Button
              isLoading={isLoading}
              className="w-full bg-teal-400 hover:bg-teal-900"
              type="submit"
              size="xl"
            >
              Verify OTP
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
}
