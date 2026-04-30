import { Sun, Cloud, CloudRain, CloudLightning } from 'lucide-react-native';

export interface CondicionClima {
  codigo: number;
  nombre: string;
  Icono: any;
}

export const MAPA_CONDICIONES_CLIMA: Record<number, CondicionClima> = {
  1000: { codigo: 1000, nombre: "Soleado", Icono: Sun },
  1003: { codigo: 1003, nombre: "Parcialmente nublado", Icono: Cloud },
  1006: { codigo: 1006, nombre: "Nublado", Icono: Cloud },
  1009: { codigo: 1009, nombre: "Muy nublado", Icono: Cloud },
  1063: { codigo: 1063, nombre: "Llovizna", Icono: CloudRain },
  1180: { codigo: 1180, nombre: "Lluvia ligera", Icono: CloudRain },
  1183: { codigo: 1183, nombre: "Lluvia", Icono: CloudRain },
  1186: { codigo: 1186, nombre: "Lluvia fuerte", Icono: CloudRain },
  1087: { codigo: 1087, nombre: "Tormenta", Icono: CloudLightning },
};

export const obtenerIconoClima = (codigo: number) => {
  return MAPA_CONDICIONES_CLIMA[codigo]?.Icono || Cloud;
};