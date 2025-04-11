export const KACCESS_TOKEN = "k-access-token";
export const KROLES = "k-roles";
export const KUSER = "k-user";
export const KLOGIN = "k-login";

export type KAccessToken = string;

export type LUser = {
  uuid: string;
  name: string;
  email: string;
  phone: string;
  password_update_ts?: string | Date;
  created_at?: string | Date;
  updated_at?: string | Date;
  deleted_at?: string | Date;
};

export type DetailRole = {
  action: string;
  subject: string;
};

export type LRoles = {
  role: DetailRole[];
  role_name: string;
  role_id: string;
};

export const setLocalStorage = (key: string, value: any) => {
  // TODO: 02/04/25 Enkripsi data
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = <T = any>(key: string) => {
  // TODO: 02/04/25 Dekripsi data
  const storage = localStorage.getItem(key);
  const result: T = storage === undefined ? null : JSON.parse(storage || "{}");
  return result;
};

export const removeLocalStorage = (key: string) => {
  return localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  return localStorage.clear();
};
