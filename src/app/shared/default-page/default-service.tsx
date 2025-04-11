import alertNotification from "@/components/alert-notification";
import { AxiosRequestConfig } from "axios";
import { ResGetAllData } from "@/app/interfaces";
import api from "@/config/axios.config";
import { globalSignOutOnError } from "@/utils/role-checker";
import { boolean } from "zod";

export const defaultService = async <T = any,>(
  config: AxiosRequestConfig = {}
) => {
  const result = await api(config);

  return result?.data;
};

export interface FormServiceOptions {
  multipart: boolean;
}
export const defaultFormService = async (
  title: string = "",
  path: string = "",
  data: Record<string, any>,
  options: FormServiceOptions = { multipart: false }
) => {
  if (!data || Object.keys(data).length <= 0)
    alertNotification(`Data tidak boleh kosong`, "error");
  let method = "GET";
  let url = path;

  const { id, ...rest } = data;

  let messageSuccess = `Simpan ${title}`;
  method = "POST";
  if (id) {
    method = "PATCH";
    messageSuccess = `Ubah ${title}`;
    url += `/${id}`;
  }

  let config: AxiosRequestConfig = { url, method, data: rest };
  if (options.multipart) {
    config.headers = { "Content-Type": "multipart/form-data" };
    let formData = new FormData();

    for (const key in rest) {
      if (Array.isArray(rest[key])) {
        rest[key].map((v) => {
          formData.append(`${key}[]`, v);
        });
      } else if (rest[key] instanceof File) {
        formData.append(key, rest[key], rest[key]?.name || "another-file");
      } else if (rest[key] || rest[key] === false) {
        formData.append(key, rest[key]);
      }
    }
    config.data = formData;
  }

  const result = await defaultService(config);

  console.log("result default service", result);

  if (result.status === 401) {
    globalSignOutOnError();
    return null;
  }

  if (result.statusCode === 200) {
    alertNotification(`Berhasil ${messageSuccess}`, "success");
    if (result.data === null || result.data === undefined) return result;
    return result?.data;
  }

  if (result.statusCode === 201) {
    alertNotification(`Berhasil ${messageSuccess}`, "success");
    return result;
  }

  return null;
};

export const defaultListService = async <T = any,>(
  path: string = "",
  query?: Record<string, any>,
  headers?: Record<string, any>
) => {
  if (query) {
    Object.keys(query).map((key) => {
      if (!query[key]) delete query[key];
    });
  }

  let method = "GET";
  let url = path;

  const result = await defaultService<T[]>({
    url,
    method,
    params: query,
    headers,
  });

  return result || { data: [], meta: { status: false } };
};

export const defaultDeleteService = async (
  path: string,
  uuid: string,
  title?: string,
  methode?: string,
  message?: string
) => {
  let method = methode || "DELETE";
  let url = `${path}/${uuid}`;

  const result = await defaultService({ url, method });
  let messageSuccess = message || `Berhasil menghapus data ${title || ""}`;

  if (result.statusCode === 200) {
    alertNotification(messageSuccess, "success");
    return true;
  } else {
    return false;
  }
};

export const defaultOneService = async <T = any,>(
  path: string,
  uuid: string
) => {
  let method = "GET";
  let url = `${path}/${uuid}`;

  const result = await defaultService<T>({ url, method });

  return result?.data;
};
