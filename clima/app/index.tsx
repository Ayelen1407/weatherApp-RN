import React from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import { useClima } from '@/src/clima'
import NavegadorDias from '@/src/componentes/navegadorDias/navegadorDias'
import IconoClima from '@/src/componentes/iconoClima/iconoClima'
import MetricasClima from '@/src/componentes/metricasClima/metricasClima'
import Temperatura from '@/src/componentes/temperatura/temperatura'
import Ciudad from '@/src/componentes/ciudad'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
    justifyContent: 'space-between',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default function PantallaClima() {
  const { climaActual } = useClima()
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <NavegadorDias />
        <Ciudad nombre={climaActual.ciudad} />
        <View style={styles.iconContainer}>
          <IconoClima condicion={climaActual.condicion} />
        </View>
        <MetricasClima metricas={climaActual.metricas} />
        <Temperatura max={climaActual.max} min={climaActual.min} />
      </View>
    </SafeAreaView>
  )
}