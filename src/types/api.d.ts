export type ApiResponse<T> = {
  headers: Record<string, string>;
  body: T;
  statusCode: string;
  statusCodeValue: number;
};
