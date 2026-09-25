export interface Donante {
  id: string;
  nombre: string;
  tipoSangre: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  ultimaDonacion: string; // fecha
  fotoUrl: string;
  disponible: boolean;
}