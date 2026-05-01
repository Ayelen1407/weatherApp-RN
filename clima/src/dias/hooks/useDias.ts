import { useState, useEffect } from 'react'
import { obtenerClimaVillaLugano } from '../../servicios/servicioClima'
import { ClimaDia, MetricasClima } from '../../tipos/clima'

export function useDias() {
  const [dias, setDias] = useState<ClimaDia[]>([])
  const [diaActual, setDiaActual] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    obtenerClimaVillaLugano()
      .then(({ dias }) => {
        setDias(dias)
        setDiaActual(0)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error obteniendo clima:', error)
        setLoading(false)
      })
  }, [])

  const climaDia = dias[diaActual] || dias[0]
  const fechaActual = climaDia?.fecha || ''
  
  const metricas: MetricasClima = {
    humedad: climaDia?.humedad || 0,
    presion: climaDia?.presion || 0,
    viento: climaDia?.viento || 0
  }

  const navegarAnterior = () => setDiaActual(prev => Math.max(0, prev - 1))
  const navegarSiguiente = () => setDiaActual(prev => Math.min(dias.length - 1, prev + 1))

  return {
    diaActual,
    climaDia,
    fechaActual,
    metricas,
    navegarAnterior,
    navegarSiguiente,
    loading
  }
}