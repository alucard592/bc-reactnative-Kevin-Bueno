import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { Donante } from '../types';

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (donante: Donante) => {
      const { id, ...rest } = donante;
      const { data } = await api.put(`/donantes/${id}`, rest);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donantes'] });
    },
  });
}