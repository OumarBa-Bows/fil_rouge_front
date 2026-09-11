export interface PageResponse<T>{
  data: T[];
  totalElements: number;
  totalPages: number;
  pageSize: number;
}
