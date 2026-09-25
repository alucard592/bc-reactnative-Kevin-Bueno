import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/donantes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donantes'] });
    },
  });
}