import alertNotification from "@/components/alert-notification";
import api from "@/config/axios.config";

export const PartnerAPI = {
  getAll: async (query?: any) => {
    const response = await api.get(`/partner`, { params: query });
    return response?.data;
  },

  getByUUID: async (uuid?: string) => {
    const response = await api.get(`/partner/` + uuid);
    return response?.data;
  },

  createDepartment: async (dataCreate?: any) => {
    const response = await api.post(`/partner`, dataCreate, {});
    return response?.data;
  },

  deletedDepartment: async (uuid?: string) => {
    const response = await api.delete(`/partner/` + uuid);
    return response?.data;
  },

  updateDepartment: async (uuid?: string, dataUpdate?: any) => {
    const response = await api.patch(`/partner/` + uuid, dataUpdate);
    return response?.data;
  },
};
