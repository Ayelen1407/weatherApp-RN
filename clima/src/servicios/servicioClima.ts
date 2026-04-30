import Constants from 'expo-constants';
import { ClimaDia } from '../tipos/clima';

const API_KEY = Constants?.expoConfig?.extra?.apiKey;
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

interface RespuestaAPI {
  forecast: {
    forecastday: ClimaDiaAPI[]
  }
}

interface ClimaDiaAPI {
  date: string
  day: {
    condition: {
      text: string
      icon: string
      code: number
    }
    avgtemp_c: number
    maxtemp_c: number
    mintemp_c: number
    avghumidity: number
    avgpressure_mb: number
    maxwind_kph: number
  }
}

export { ClimaDia, MetricasClima } from '../tipos/clima';

export async function ServicioObtenerClimaPorCiudad(ciudad: string): Promise<{ dias: ClimaDia[] }> {
  const url = `${BASE_URL}?key=${API_KEY}&q=${ciudad}&days=3&aqi=no&alerts=no`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al obtener clima");
  
  const data: RespuestaAPI = await response.json();
  
  const dias: ClimaDia[] = data.forecast.forecastday.map(dia => ({
    fecha: dia.date,
    condicion: dia.day.condition.text,
    icono: dia.day.condition.icon,
    temp: dia.day.avgtemp_c,
    min: dia.day.mintemp_c,
    max: dia.day.maxtemp_c,
    humedad: dia.day.avghumidity,
    presion: dia.day.avgpressure_mb,
    viento: dia.day.maxwind_kph,
    codigoCondicion: dia.day.condition.code,
  }));

  return { dias };
}

export const obtenerClimaVillaLugano = () => 
  ServicioObtenerClimaPorCiudad("Villa Lugano, Buenos Aires");