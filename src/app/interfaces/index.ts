export interface ResGetAllData<T = any> {
  data: T;
  filters: Record<string, any>;
  meta: Meta;
}

export interface Meta {
  status: boolean;
  statusCode: number;
  path: string;
  timestamp: string;
  message?: string;
  total_data?: number;
  total_pages?: number;
  page?: number;
  limit?: number;
  sort_by?: string;
}
