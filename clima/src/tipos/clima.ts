export interface ClimaDia {
  fecha: string
  condicion: string
  codigoCondicion: number
  icono: string
  temp: number
  min: number
  max: number
  humedad: number
  presion: number
  viento: number
}

export interface MetricasClima {
  humedad: number
  presion: number
  viento: number
}