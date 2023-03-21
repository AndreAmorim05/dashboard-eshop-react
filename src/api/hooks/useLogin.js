import { useQueryClient, useMutation, useQuery } from 'react-query';
import api from 'api/routes';

export default function usePostLogin() {
  const queryClient = useQueryClient();

  return useMutation(api.post.userLogin, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('login');
    },
    onError: (error) => {
      console.log('Erro ao fazer login do usuário:', error);
    },
  });
}
