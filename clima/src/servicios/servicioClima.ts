import {  API_KEY } from "@env";

const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

export async function ServicioObtenerClimaPorCiudad(ciudad: string) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${ciudad}&days=3&aqi=no&alerts=no`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al obtener clima");
  }

  return response.json();
}