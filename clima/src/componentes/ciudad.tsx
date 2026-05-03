import React from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  ciudad: {
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    color: '#111827',
    marginTop: 35,
    marginBottom: 48,
  }
})

export default function Ciudad({ nombre, testID }: { nombre: string, testID?: string }) {
  return <Text style={styles.ciudad} testID={testID}>{nombre}</Text>
}