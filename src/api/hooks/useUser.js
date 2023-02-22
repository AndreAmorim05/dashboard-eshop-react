import { useQueryClient, useMutation,  useQuery } from "react-query";
import api from "api/routes";

export function useGetMe() {
  return useQuery("user", api.get.me);
}