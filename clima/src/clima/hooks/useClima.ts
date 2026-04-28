import { useState, useEffect } from 'react'
import { useDias } from '../../dias'
import { obtenerClimaVillaLugano } from '../../servicios/servicioClima'
import { ClimaDia } from '../../tipos/clima'

export function useClima() {
  const { diaActual, climaDia } = useDias()
  return { climaActual: climaDia }
}