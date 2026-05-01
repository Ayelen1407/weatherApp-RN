import React from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  ciudad: {
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
    color: '#111827',
    marginTop: 32,
    marginBottom: 48,
  }
})

type Props = { 
  nombre: string 
  testID?: string
}
export default function Ciudad({ nombre }: Props) {
  return <Text style={styles.ciudad}>{nombre}</Text>
}