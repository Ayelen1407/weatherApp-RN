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

function transformarDia(dia: ClimaDiaAPI, label?: string): ClimaDia {
  return {
	fecha: label || dia.date,
	condicion: dia.day.condition.text,
	icono: dia.day.condition.icon,
	temp: Math.round(dia.day.avgtemp_c),
	min: Math.round(dia.day.mintemp_c),
	max: Math.round(dia.day.maxtemp_c),
	humedad: Math.round(dia.day.avghumidity),
	presion: Math.round(dia.day.avgpressure_mb),
	viento: Math.round(dia.day.maxwind_kph),
	codigoCondicion: dia.day.condition.code,
  };
}

export async function ServicioObtenerClimaPorCiudad(ciudad: string): Promise<{ dias: ClimaDia[] }> {
  try {

	const fechaHoy = new Date();
	const fechaAyer = new Date(fechaHoy);
	fechaAyer.setDate(fechaAyer.getDate() - 1);
	const fechaAyerStr = fechaAyer.toISOString().split('T')[0];

	const urlForecast = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${ciudad}&days=2&aqi=no&alerts=no`;
    
	const urlHistory = `${BASE_URL}/history.json?key=${API_KEY}&q=${ciudad}&dt=${fechaAyerStr}&aqi=no&alerts=no`;

	console.log('Fetching:', { ciudad, fechaAyerStr });

	const [forecastRes, historyRes] = await Promise.all([
  	fetch(urlForecast),
  	fetch(urlHistory)
	]);

	if (!forecastRes.ok) {
  	throw new Error(`Forecast error: ${forecastRes.status} ${forecastRes.statusText}`);
	}
	if (!historyRes.ok) {
  	throw new Error(`History error: ${historyRes.status} ${historyRes.statusText}`);
	}

	const forecastData: RespuestaForecast = await forecastRes.json();
	const historyData: RespuestaHistory = await historyRes.json();

	const dias: ClimaDia[] = [
  	transformarDia(historyData.forecast.forecastday[0]),
  	transformarDia(forecastData.forecast.forecastday[0]),
  	transformarDia(forecastData.forecast.forecastday[1]),
	];

	console.log('Datos obtenidos:', dias.map(d => ({ fecha: d.fecha, temp: d.temp })));

	return { dias };

  } catch (error) {
	console.error('❌ Error en ServicioObtenerClimaPorCiudad:', error);
	throw new Error(`Error al obtener clima de ${ciudad}: ${error}`);
  }
}

export const obtenerClimaVillaLugano = () =>
  ServicioObtenerClimaPorCiudad("Villa Lugano, Buenos Aires");

export async function ServicioObtenerClimaSimple(ciudad: string): Promise<{ dias: ClimaDia[] }> {
  const urlForecast = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${ciudad}&days=3&aqi=no&alerts=no`;
 
  const res = await fetch(urlForecast);
  if (!res.ok) throw new Error("Error en forecast simple");

  const data: RespuestaForecast = await res.json();
 
  return {
	dias: [
  	transformarDia(data.forecast.forecastday[0], "Ayer"),
  	transformarDia(data.forecast.forecastday[0], "Hoy"),
  	transformarDia(data.forecast.forecastday[1], "Mañana"),
	]
  };
}