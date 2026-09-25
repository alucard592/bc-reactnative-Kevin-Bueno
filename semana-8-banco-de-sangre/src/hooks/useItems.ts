import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Donante } from '../types';

export function useItems() {
  return useQuery({
    queryKey: ['donantes'],
    queryFn: async (): Promise<Donante[]> => {
      const { data } = await api.get<Donante[]>('/donantes');
      return data;
    },
  });
}