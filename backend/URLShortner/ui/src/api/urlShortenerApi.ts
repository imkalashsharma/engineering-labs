import { api } from "./client";

export interface UrlShortenResponse {
  url: string;
}

export interface ApiResponse<T> {
  isError: boolean;
  message: string;
  data: T;
}

export const shortenUrl = async (url: string) => {
  const response = await api.get<ApiResponse<UrlShortenResponse>>(
    "/get-short-url",
    {
      params: { url },
    },
  );

  return response.data;
};
