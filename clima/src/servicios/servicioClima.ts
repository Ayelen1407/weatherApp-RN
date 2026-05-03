import Constants from 'expo-constants';
import { ClimaDia } from '../tipos/clima';

const API_KEY = Constants?.expoConfig?.extra?.apiKey;
const BASE_URL = "https://api.weatherapi.com/v1";

interface RespuestaForecast {
  forecast: {
    forecastday: ClimaDiaAPI[];
  };
}

interface RespuestaHistory {
  forecast: {
    forecastday: ClimaDiaAPI[];
  };
}

interface ClimaDiaAPI {
  date: string;
  date_epoch: number;
  day: {
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    avgtemp_c: number;
    maxtemp_c: number;
    mintemp_c: number;
    avghumidity: number;
    avgpressure_mb: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    daily_chance_of_rain: number;
  };
}

function formatearFecha(date: Date): string {
  const dia = date.getDate().toString().padStart(2, '0');
  const mes = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${dia}/${mes}`;
}

function transformarDia(dia: ClimaDiaAPI, fechaCalculada: Date): ClimaDia {
  return {
    fecha: formatearFecha(fechaCalculada),
    condicion: dia.day.condition.text,
    icono: dia.day.condition.icon,
    temp: Math.round(dia.day.avgtemp_c),
    min: Math.round(dia.day.mintemp_c),
    max: Math.round(dia.day.maxtemp_c),
    humedad: Math.round(dia.day.avghumidity),
    presion: Math.round(dia.day.avgpressure_mb),
    viento: Math.round(dia.day.maxwind_kph),
    codigoCondicion: dia.day.condition.code,
	chanceLluvia: Math.round(dia.day.daily_chance_of_rain)
  };
}

export async function ServicioObtenerClimaPorCiudad(ciudad: string): Promise<{ dias: ClimaDia[] }> {
  try {
    const hoy = new Date();
    const ayer = new Date(hoy);
    ayer.setDate(ayer.getDate() - 1);
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);
    
    const fechaAyerStr = ayer.toISOString().split('T')[0];

    console.log('FECHAS HOY:', {
      ayer: formatearFecha(ayer),
      hoy: formatearFecha(hoy),
      manana: formatearFecha(manana),
      sistema: hoy.toLocaleDateString('es-AR')
    });

    const urlForecast = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${ciudad}&days=2&aqi=no&alerts=no`;
    const urlHistory = `${BASE_URL}/history.json?key=${API_KEY}&q=${ciudad}&dt=${fechaAyerStr}&aqi=no&alerts=no`;

    const [forecastRes, historyRes] = await Promise.all([
      fetch(urlForecast),
      fetch(urlHistory)
    ]);

    if (!forecastRes.ok) throw new Error(`Forecast: ${forecastRes.status}`);
    if (!historyRes.ok) throw new Error(`History: ${historyRes.status}`);

    const forecastData: RespuestaForecast = await forecastRes.json();
    const historyData: RespuestaHistory = await historyRes.json();

    const dias: ClimaDia[] = [
      transformarDia(historyData.forecast.forecastday[0], ayer),
      transformarDia(forecastData.forecast.forecastday[0], hoy),
      transformarDia(forecastData.forecast.forecastday[1], manana)
    ];
    
    return { dias };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const obtenerClimaVillaLugano = () =>
  ServicioObtenerClimaPorCiudad("Villa Lugano, Buenos Aires");

export async function ServicioObtenerClimaSimple(ciudad: string): Promise<{ dias: ClimaDia[] }> {
  const hoy = new Date();
  const ayer = new Date(hoy);
  ayer.setDate(ayer.getDate() - 1);
  const manana = new Date(hoy);
  manana.setDate(manana.getDate() + 1);
  
  const urlForecast = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${ciudad}&days=3&aqi=no&alerts=no`;
  const res = await fetch(urlForecast);
  if (!res.ok) throw new Error("Error forecast");

  const data: RespuestaForecast = await res.json();
  return {
    dias: [
      transformarDia(data.forecast.forecastday[0], ayer),
      transformarDia(data.forecast.forecastday[0], hoy),
      transformarDia(data.forecast.forecastday[1], manana),
    ]
  };
}