import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { NuevoDonante } from '../types';

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (nuevo: NuevoDonante) => {
      const { data } = await api.post('/donantes', nuevo);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donantes'] });
    },
  });
}