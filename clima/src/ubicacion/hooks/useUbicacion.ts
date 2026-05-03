import { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import { ServicioObtenerClimaPorCiudad } from '../../servicios/servicioClima'
import { ClimaDia } from '../../tipos/clima'

export function useUbicacion() {
  const [ciudad, setCiudad] = useState('Villa Lugano, Buenos Aires')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const obtenerUbicacion = async () => {
    try {
      setLoading(true)
      setError(null)

      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        throw new Error('Permiso de ubicación denegado')
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      })

      const { reverseGeocodeAsync } = await import('expo-location')
      const placemarks = await reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })

      if (placemarks.length > 0) {
        const lugar = placemarks[0]
        const ciudadDetectada = `${lugar.city || lugar.subregion || 'Ciudad'}, ${lugar.country}`
        setCiudad(ciudadDetectada)
        console.log('📍 Ubicación detectada:', ciudadDetectada)
        return ciudadDetectada
      } else {
        throw new Error('No se pudo detectar la ciudad')
      }
    } catch (err: any) {
      console.error('❌ Error ubicación:', err)
      setError(err.message)
      return 'Villa Lugano, Buenos Aires'
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    obtenerUbicacion()
  }, [])

  const refrescarUbicacion = () => obtenerUbicacion()

  return {
    ciudad,
    loading,
    error,
    refrescarUbicacion
  }
}