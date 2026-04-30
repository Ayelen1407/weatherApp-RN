import { Text, StyleSheet } from "react-native";

export function TextoTemperaturaActual({ valor }) {
  return (
    <Text style={styles.temp} testID="temp-current">
      {valor}°
    </Text>
  );
}

const styles = StyleSheet.create({
  temp: {
    fontSize: 48,
    fontWeight: "bold",
  },
});