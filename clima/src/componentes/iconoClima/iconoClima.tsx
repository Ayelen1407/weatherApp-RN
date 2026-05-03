import { View, StyleSheet } from "react-native";
import type { ComponentType } from 'react';

type Props = {
  Icono: ComponentType<{ size?: number; color?: string }>;
};

export function VistaIconoClima({ Icono }: Props) {
  return (
    <View style={[styles.container, { marginTop: -5 }]} testID="icon-weather-container">
      <Icono size={100} color="#333" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 22,
    alignItems: 'center',
  },
});