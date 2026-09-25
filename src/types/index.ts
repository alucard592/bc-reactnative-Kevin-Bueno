export interface Donante {
  id: string;
  name: string;
  avatar: string;
  tipoSangre: string;
  ultimaDonacion: string;
  disponible: boolean;
  createdAt: string;
}

export interface NuevoDonante {
  name: string;
  tipoSangre: string;
  ultimaDonacion: string;
  disponible: boolean;
}