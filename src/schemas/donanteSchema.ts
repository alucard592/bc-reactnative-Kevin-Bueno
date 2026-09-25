import { z } from 'zod';

export const donanteSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre es muy largo'),
  tipoSangre: z
    .string()
    .min(1, 'Selecciona un tipo de sangre'),
  ultimaDonacion: z
    .string()
    .min(1, 'La fecha es requerida'),
  disponible: z.boolean().default(true),
});

export type DonanteFormData = z.infer<typeof donanteSchema>;
