export type FieldType =
  | "number"
  | "email"
  | "search"
  | "text"
  | "url"
  | "time"
  | "date"
  | "tel"
  | "week"
  | "month"
  | "datetime-local"
  | "select"
  | "textarea"
  | "file"
  | "async-select"
  | "date_range"
  | "num_range"
  | "curr_range"
  | "currency";

export type FieldExt = "like" | "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "in" | "nin" | "between";

export type DefaultOption = {
  label: string;
  value: any;
  disabled?: boolean;
  [key: string]: any;
};

export interface DetailFieldDto {
  key: string;
  label?: string;
  required?: boolean;
  is_label?: boolean;
  placeholder?: string;
  type: FieldType;
  options?: DefaultOption[];
  defaultOption?: DefaultOption;
  getDataOptions?: (param?: string) => Promise<DefaultOption[]>;
  filterOptionKey?: string;
  className?: string;
}

export interface FilterFieldDto extends DetailFieldDto {
  ext?: FieldExt;
}

export interface FormInputDto {
  section: { title: string; desc?: string };
  field: DetailFieldDto[];
}
