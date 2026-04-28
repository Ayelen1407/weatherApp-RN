import { useState, useEffect } from 'react'
import { obtenerClimaVillaLugano } from '../../servicios/servicioClima'
import { ClimaDia } from '../../tipos/clima'

export function useDias() {
  const [dias, setDias] = useState<ClimaDia[]>([])
  const [diaActual, setDiaActual] = useState(0)

  useEffect(() => {
    obtenerClimaVillaLugano().then(({ dias }) => {
      setDias(dias)
      setDiaActual(0)
    })
  }, [])

  const climaDia = dias[diaActual] || dias[0]
  const fechaActual = climaDia?.fecha || ''

  const navegarAnterior = () => setDiaActual(prev => Math.max(0, prev - 1))
  const navegarSiguiente = () => setDiaActual(prev => Math.min(dias.length - 1, prev + 1))

  return { diaActual, climaDia, fechaActual, navegarAnterior, navegarSiguiente }
}