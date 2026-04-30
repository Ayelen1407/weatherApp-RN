import { View, StyleSheet } from "react-native";

export function VistaIconoClima({ Icono }) {
  return (
    <View style={styles.container}>
      <Icono size={80} testID="icon-weather" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});