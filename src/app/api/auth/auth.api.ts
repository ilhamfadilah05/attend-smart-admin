import api from "@/config/axios.config";
import { routes } from "@/config/routes";
import { ResponseData } from "@/types/global-response";
import {
  KACCESS_TOKEN,
  KROLES,
  KUSER,
  removeLocalStorage,
  setLocalStorage,
} from "@/utils/localstorage";

export interface ReqLoginDto {
  email: string;
  password: string;
}
export interface ReqProcessOTPDto {
  email: string;
  otp: string;
}

export const AuthApi = {
  logout: async () => {
    try {
      const data = await api.post("/auth/logout");
      return data?.data;
    } catch (err) {
      console.log(`Error Logout`, err);
      return null;
    } finally {
      AuthApi.removeSession();
    }
  },
  login: async (dto: ReqLoginDto) => {
    const { email, password } = dto;
    const data = await api.post<ResDataLogin>("/auth/login", {
      email,
      password,
    });
    return data?.data;
  },
  role: async () => {
    const { data }: any = await api.get(`/auth/role`);
    const result = data?.data?.access || [];
    setLocalStorage(KROLES, result);
    return result;
  },
  removeSession: () => {
    removeLocalStorage(KUSER);
    removeLocalStorage(KACCESS_TOKEN);
    removeLocalStorage(KROLES);
    window.location.replace(routes.signIn);
  },

  processOTP: async (dto: ReqProcessOTPDto) => {
    try {
      const data = await api.post<ResDataLogin>("/auth/process-otp", dto);
      return data?.data;
    } catch (error) {
      console.log(`error`, error);
      return null;
    }
  },
  resendOTP: async (dto: { email: string }) => {
    const data = await api.post<ResponseData>("/auth/resend-otp", dto);
    return data?.data;
  },
};

export type ResDataLogin = ResponseData<ResLoginDto>;
export interface ResLoginDto {
  email: string;
  user: User;
  accessToken: string;
}
export interface User {
  uuid: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}
