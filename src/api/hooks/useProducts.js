import { useQueryClient, useMutation,  useQuery } from "react-query";
import api from "api/routes";


export function useGetProducts() {
  return useQuery("products", api.get.products);
}

export function usePostProduct() {
  const queryClient = useQueryClient();

  return useMutation(api.post.createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });
}

export function usePutProduct() {
  const queryClient = useQueryClient();

  return useMutation(api.put.updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation(api.delete.deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });
}
