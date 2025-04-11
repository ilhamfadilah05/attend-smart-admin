export interface ResponseData<T = any> {
  data: T;
  filters: Record<string, any>;
  statusCode: number;
  message: string;
  meta: Meta;
}

export interface Meta {
  status: boolean;
  status_code: number;
  path: string;
  timestamp: string;
  message?: string;
  total_data?: number;
  total_pages?: number;
  page?: number;
  limit?: number;
  sort_by?: string;
}
