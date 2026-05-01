import { Text, StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

type Props = {
  valor: number;
  color?: string;
  fontSize?: number;
};

export function TextoTemperaturaActual({ 
  valor, 
  color = "#111827", 
  fontSize = screenWidth > 400 ? 72 : 56 
}: Props) {
  return (
    <Text 
      style={[
        styles.temp, 
        { 
          color, 
          fontSize 
        }
      ]} 
      testID="temp-current"
      accessible
      accessibilityLabel={`${valor} grados`}
    >
      {Math.round(valor)}°
    </Text>
  );
}

const styles = StyleSheet.create({
  temp: {
    fontWeight: "900", 
    textAlign: "center",
    letterSpacing: -1,
    lineHeight: 72,
  },
});