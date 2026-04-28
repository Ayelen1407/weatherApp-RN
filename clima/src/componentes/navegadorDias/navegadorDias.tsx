import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useDias } from '../../dias'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  button: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
  },
  fecha: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
  }
})

export default function NavegadorDias() {
  const { fechaActual, navegarAnterior, navegarSiguiente } = useDias()
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navegarAnterior}>
        <Text style={styles.button}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.fecha}>{fechaActual}</Text>
      <TouchableOpacity onPress={navegarSiguiente}>
        <Text style={styles.button}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  )
}