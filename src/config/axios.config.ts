import alertNotification from "@/components/alert-notification";
import { ResponseData } from "@/types/global-response";
import { KACCESS_TOKEN } from "@/utils/localstorage";
import { globalSignOutOnError } from "@/utils/role-checker";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // baseURL: "https://app-api-v12.dompetdhuafa.org",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const tempAccessToken = localStorage.getItem(KACCESS_TOKEN) || "";
    if (tempAccessToken) {
      const accessToken = JSON.parse(tempAccessToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const res = error?.response;

    if (res) {
      const data = res?.data as ResponseData<null>;
      if (data.statusCode === 401) {
        globalSignOutOnError();
        return res;
      } else {
        alertNotification(
          data?.message ||
            `Oops, Sepertinya ada kesalahan. Ulangi beberapa saat lagi.`,
          "error",
          3000
        );
        return res;
      }
    } else {
      console.error(`Error Axios`, error);
      return res;
    }
    return null;
    // return Promise.reject(error);
  }
);

export default api;
