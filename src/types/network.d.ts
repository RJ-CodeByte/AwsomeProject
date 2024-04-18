
// common api response Type
export interface ApiResponseType<T> {
  status: boolean;
  message: string;
  data: T;
}
