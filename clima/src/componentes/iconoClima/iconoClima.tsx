import React from 'react'
import { View, StyleSheet } from 'react-native'
import { 
  CloudRain, Sun, Cloud, CloudLightning 
} from 'lucide-react-native'
import { condicionesIcono } from '../../constantes/condicionesClima'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})

type Props = { condicion: string }
export default function IconoClima({ condicion }: Props) {
  const IconoComponent = condicionesIcono[condicion] || CloudRain
  
  return (
    <View style={styles.container}>
      <IconoComponent size={200} color="#6B7280" strokeWidth={1} />
    </View>
  )
}