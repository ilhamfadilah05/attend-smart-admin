import alertNotification from "@/components/alert-notification";
import api from "@/config/axios.config";

export const RoleApi = {
  getPermissionList: async () => {
    const response = await api.get(`/roles/permission-list`);
    return response?.data;
  },
  getDefaultRole: async () => {
    const response = await api.get(`/roles/permission-list`);
    return response?.data;
  },

  getAll: async (query?: any) => {
    const response = await api.get(`/roles`, { params: query });
    return response?.data;
  },

  getByUUID: async (uuid?: string) => {
    const response = await api.get(`/roles/` + uuid, {});
    return response?.data;
  },

  createRole: async (dataCreate?: any) => {
    const response = await api.post(`/roles`, dataCreate);
    return response?.data;
  },

  deletedRole: async (uuid?: string) => {
    const response = await api.delete(`/roles/` + uuid);
    return response?.data;
  },

  updateRole: async (uuid?: string, dataUpdate?: any) => {
    const response = await api.patch(`/roles/` + uuid, dataUpdate);
    return response?.data;
  },
};
