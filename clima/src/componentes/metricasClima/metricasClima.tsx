import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  CloudRain,
  Thermometer,
  Wind
} from 'lucide-react-native'
import { MetricasClima as MetricasClimaType } from '@/src/tipos/clima'

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 32,
  },
  metrica: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  icono: {
    width: 28,
    height: 28,
  },
  valor: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  label: {
    fontSize: 16,
    color: '#6B7280',
  }
})

type Props = {
  metricas: MetricasClimaType
  testID?: string
}

export default function MetricasClima({ metricas, testID }: Props) {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.metrica}>
        <CloudRain size={28} color="#3B82F6" style={styles.icono} />
        <View>
          <Text style={styles.valor}>{metricas.humedad}%</Text>
          <Text style={styles.label}>Humedad</Text>
        </View>
      </View>
      
      <View style={styles.metrica}>
        <Thermometer size={28} color="#EF4444" style={styles.icono} />
        <View>
          <Text style={styles.valor}>{metricas.presion} hPa</Text>
          <Text style={styles.label}>Presión</Text>
        </View>
      </View>
      
      <View style={styles.metrica}>
        <Wind size={28} color="#10B981" style={styles.icono} />
        <View>
          <Text style={styles.valor}>{(metricas.viento / 3.6).toFixed(1)} m/s</Text>
          <Text style={styles.label}>Viento</Text>
        </View>
      </View>
    </View>
  )
}