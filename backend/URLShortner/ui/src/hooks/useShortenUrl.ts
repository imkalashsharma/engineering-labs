import { useMutation } from "@tanstack/react-query";
import { shortenUrl } from "../api/urlShortenerApi";

export const useShortenUrl = () => {
  return useMutation({
    mutationFn: shortenUrl,
  });
};
