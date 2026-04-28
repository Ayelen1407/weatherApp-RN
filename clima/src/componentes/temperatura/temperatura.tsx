import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 24,
  },
  temp: {
    fontSize: 72,
    fontWeight: '900',
    color: '#111827',
  },
  label: {
    fontSize: 28,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
  }
})

type Props = { max: number; min: number }
export default function Temperatura({ max, min }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.temp}>{max}°</Text>
      <Text style={styles.label}>(max)</Text>
      <Text style={styles.label}>NOW</Text>
      <Text style={styles.temp}>{min}°</Text>
      <Text style={styles.label}>(min)</Text>
    </View>
  )
}