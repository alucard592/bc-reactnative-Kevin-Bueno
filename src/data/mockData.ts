import { Donante } from '../types';

export const donantes: Donante[] = [
  {
    id: '1',
    nombre: 'Carlos Ramírez',
    tipoSangre: 'O+',
    ultimaDonacion: '2026-06-15',
    fotoUrl: 'https://i.pravatar.cc/150?img=12',
    disponible: true,
  },
  {
    id: '2',
    nombre: 'Laura Gómez',
    tipoSangre: 'A-',
    ultimaDonacion: '2026-07-02',
    fotoUrl: 'https://i.pravatar.cc/150?img=25',
    disponible: false,
  },
  {
    id: '3',
    nombre: 'Andrés Torres',
    tipoSangre: 'AB+',
    ultimaDonacion: '2026-05-20',
    fotoUrl: 'https://i.pravatar.cc/150?img=33',
    disponible: true,
  },
  {
    id: '4',
    nombre: 'Mariana Ríos',
    tipoSangre: 'B+',
    ultimaDonacion: '2026-08-01',
    fotoUrl: 'https://i.pravatar.cc/150?img=47',
    disponible: true,
  },
];