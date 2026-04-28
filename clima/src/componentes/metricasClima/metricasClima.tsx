import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  metrica: {
    alignItems: 'center',
    gap: 4,
  },
  emoji: {
    fontSize: 28,
  },
  valor: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  }
})

type Props = { metricas: { humedad: number; presion: number; viento: number } }
export default function MetricasClima({ metricas }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.metrica}>
        <Text style={styles.emoji}>💧</Text>
        <Text style={styles.valor}>{metricas.humedad}%</Text>
      </View>
      <View style={styles.metrica}>
        <Text style={styles.emoji}>🌡</Text>
        <Text style={styles.valor}>{metricas.presion} hPa</Text>
      </View>
      <View style={styles.metrica}>
        <Text style={styles.emoji}>🌬</Text>
        <Text style={styles.valor}>{metricas.viento} m/s</Text>
      </View>
    </View>
  )
}