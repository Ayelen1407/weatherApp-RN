import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CloudRain, Droplet, Gauge, Wind } from 'lucide-react-native'
import { MetricasClima as MetricasClimaType } from '../../tipos/clima'

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginBottom: 32,
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    width: '100%',
  },
  metrica: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    flex: 1,
    minWidth: 140,
    maxWidth: 160,
    justifyContent: 'center',
  },
  icono: {
    width: 22,
    height: 22,
  },
  valor: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    flexShrink: 1,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    flexShrink: 1,
    textAlign: 'center',
  },
  textos: {
    flexShrink: 1,
    minWidth: 0,
  }
})

export default function MetricasClima({
  metricas,
  testID
}: {
  metricas: MetricasClimaType
  testID?: string
}) {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.grid}>
        <View style={styles.metrica}>
          <Droplet size={22} style={styles.icono} />
          <View style={styles.textos}>
            <Text style={styles.valor}>{metricas.humedad}%</Text>
            <Text style={styles.label}>Humedad</Text>
          </View>
        </View>
        
        <View style={styles.metrica}>
          <Wind size={22} style={styles.icono} />
          <View style={styles.textos}>
            <Text style={styles.valor}>{(metricas.viento / 3.6).toFixed(1)} m/s</Text>
            <Text style={styles.label}>Viento</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.grid}>
        <View style={styles.metrica}>
          <CloudRain size={22}  style={styles.icono} />
          <View style={styles.textos}>
            <Text style={styles.valor}>{metricas.chanceLluvia}%</Text>
            <Text style={styles.label}>Probabilidad lluvia</Text>
          </View>
        </View>
        
        <View style={styles.metrica}>
          <Gauge size={22} style={styles.icono} />
          <View style={styles.textos}>
            <Text style={styles.valor}>{metricas.presion} hPa</Text>
            <Text style={styles.label}>Presión</Text>
          </View>
        </View>
      </View>
    </View>
  )
}