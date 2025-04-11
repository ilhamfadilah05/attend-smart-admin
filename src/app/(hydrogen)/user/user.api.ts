import api from "@/config/axios.config";
import { ResponseData } from "@/types/global-response";
import { KUSER, setLocalStorage } from "@/utils/localstorage";

export const UserApi = {
  getAll: async (query?: any) => {
    const { name, entity_uuid, ...rest } = query;

    let params = {
      ...rest,
      "name[like]": name,
    };
    if (entity_uuid)
      params["user_master_entities[master_entity_uuid]"] = entity_uuid;

    const response = await api.get<ResponseData>(`/users`, { params });
    return response?.data;
  },

  getByUUID: async (uuid?: string) => {
    const response = await api.get(`/users/` + uuid);
    return response?.data;
  },

  createUser: async (dataCreate?: any) => {
    const response = await api.post(`/users`, dataCreate);
    return response?.data;
  },

  deletedUser: async (uuid?: string) => {
    const response = await api.delete(`/users/` + uuid, {});
    return response?.data;
  },

  updateUser: async (uuid?: string, dataUpdate?: any) => {
    const response = await api.patch(`/users/` + uuid, dataUpdate);

    return response?.data;
  },

  me: async () => {
    const response = await api.get(`/users/me`);
    const result = response?.data?.data;

    if (result) {
      setLocalStorage(KUSER, {
        uuid: result.uuid,
        name: result.name,
        email: result.email,
        phone: result.phone,
        password_update_ts: result.password_update_ts,
        created_at: result.created_at,
        updated_at: result.updated_at,
        deleted_at: result.deleted_at,
      });

      if (!result.password_update_ts && window)
        window.location.replace("/auth/change-password");
    }

    return result;
  },
};
