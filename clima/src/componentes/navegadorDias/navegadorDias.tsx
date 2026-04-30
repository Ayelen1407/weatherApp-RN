import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

export function BotonNavegacionEntreDias({ dia, onPrev, onNext }) {
  return (
    <View style={styles.container} testID="navigation-container">
      <TouchableOpacity onPress={onPrev} testID="navigation-prev-button">
        <ChevronLeft size={28} />
      </TouchableOpacity>

      <Text testID="navigation-current-day">{dia}</Text>

      <TouchableOpacity onPress={onNext} testID="navigation-next-button">
        <ChevronRight size={28} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
});