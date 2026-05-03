import { useState, useEffect, useCallback } from 'react'
import { useUbicacion } from '../../ubicacion/hooks/useUbicacion'
import { ServicioObtenerClimaPorCiudad } from '../../servicios/servicioClima'
import { ClimaDia, MetricasClima } from '../../tipos/clima'

export function useDias() {
  const [dias, setDias] = useState<ClimaDia[]>([])
  const [diaActual, setDiaActual] = useState(1)
  const [loading, setLoading] = useState(true)
  
  const { ciudad } = useUbicacion()

  const cargarClima = useCallback(async () => {
    setLoading(true)
    try {
      console.log('🌍 Cargando clima para:', ciudad)
      const { dias: nuevosDias } = await ServicioObtenerClimaPorCiudad(ciudad)
      setDias(nuevosDias)
      setDiaActual(1)
    } catch (error) {
      console.error('Error clima:', error)
    } finally {
      setLoading(false)
    }
  }, [ciudad])

  useEffect(() => {
    cargarClima()
  }, [cargarClima])

  useEffect(() => {
    const interval = setInterval(cargarClima, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [cargarClima])

  const climaDia = dias[diaActual] || dias[0]
  const fechaActual = climaDia?.fecha || ''
  const metricas: MetricasClima = {
    humedad: climaDia?.humedad || 0,
    presion: climaDia?.presion || 0,
    viento: climaDia?.viento || 0,
    chanceLluvia: climaDia?.chanceLluvia || 0
  }

  return {
    diaActual,
    climaDia,
    fechaActual,
    metricas,
    ciudad,
    navegarAnterior: () => setDiaActual(prev => Math.max(0, prev - 1)),
    navegarSiguiente: () => setDiaActual(prev => Math.min(dias.length - 1, prev + 1)),
    loading,
    refrescar: cargarClima
  }
}