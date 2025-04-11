import { UserApi } from "@/app/(hydrogen)/user/user.api";
import { UserFormInputEdit } from "@/app/(hydrogen)/user/user.validator";
import alertNotification from "@/components/alert-notification";
import { SelectObject } from "@/types/global-types";
import { SetStateAction } from "react";

export const created_ataUser = async (
  data: UserFormInputEdit | any,
  roleData: SelectObject,
  router: any,
  routes: any,
  setLoading: (value: SetStateAction<boolean>) => void
) => {
  if (data.name && data.email && roleData.id && data.password) {
    let dataMap = {
      ...data,
      role_id: roleData.id,
    };

    if (!data.phone) {
      delete dataMap.phone;
    }

    const result = await UserApi.createUser(dataMap);

    if (result.statusCode === 200) {
      setLoading(false);
      router.push(routes.user.list);
      alertNotification(`Berhasil menambahkan Pengguna`, "success");
    } else {
      setLoading(false);
      alertNotification(result.message, "error");
    }
  } else {
    setLoading(false);
    alertNotification(`Data tidak boleh kosong!`, "error");
  }
};

export const updateDataUser = async (
  data: UserFormInputEdit | any,
  roleData: SelectObject,
  router: any,
  routes: any,
  id: string,
  setLoading: (value: SetStateAction<boolean>) => void,
  redirect?: string
) => {
  if (data.name && data.email && roleData.id) {
    let dataMap = {
      ...data,
      role_id: roleData.id,
    };

    delete dataMap.role;

    if (!data.phone) {
      delete dataMap.phone;
    }

    if (!data.password) {
      delete dataMap.password;
    }

    try {
      const result = await UserApi.updateUser(id, dataMap);

      if (result.statusCode === 200 || result.statusCode === 201) {
        setLoading(false);
        if (redirect) {
          UserApi.me();
        }
        router.push(redirect || routes.user.list);
        alertNotification(`Berhasil merubah data Pengguna`, "success");
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  } else {
    setLoading(false);
  }
};
