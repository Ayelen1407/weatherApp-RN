import { ClimaDia } from '../tipos/clima'

export const obtenerClimaVillaLugano = async (): Promise<{ ciudad: string; dias: ClimaDia[] }> => {
  return {
    ciudad: "Villa Lugano",
    dias: [
      { fecha: "4/22", condicion: "lluvia", temp: 21, min: 16, max: 25, humedad: 88, presion: 985, viento: 2.2 },
      { fecha: "4/23", condicion: "nublado", temp: 22, min: 17, max: 26, humedad: 75, presion: 990, viento: 3.1 },
      { fecha: "4/24", condicion: "soleado", temp: 28, min: 18, max: 32, humedad: 55, presion: 1010, viento: 1.8 },
    ]
  }
}
