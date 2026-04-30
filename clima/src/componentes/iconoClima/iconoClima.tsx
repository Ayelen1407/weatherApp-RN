import { View, StyleSheet } from "react-native";
import type { ComponentType } from 'react';

type Props = {
  Icono: ComponentType<{ size?: number; color?: string }>;
};

export function VistaIconoClima({ Icono }: Props) {
  return (
    <View style={styles.container} testID="icon-weather-container">
      <Icono size={80} color="#333" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
});