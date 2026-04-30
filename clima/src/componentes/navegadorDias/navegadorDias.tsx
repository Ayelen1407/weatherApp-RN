import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

type Props = {
  dia: string;
  onPrev: () => void;
  onNext: () => void;
  disabledPrev?: boolean;
  disabledNext?: boolean;
};

export function BotonNavegacionEntreDias({ 
  dia, 
  onPrev, 
  onNext, 
  disabledPrev = false, 
  disabledNext = false 
}: Props) {
  return (
    <View style={styles.container} testID="navigation-container">
      <TouchableOpacity 
        onPress={onPrev} 
        testID="navigation-prev-button"
        style={[
          styles.boton, 
          disabledPrev && styles.botonDisabled
        ]}
        disabled={disabledPrev}
      >
        <ChevronLeft size={28} color="#6B7280" />
      </TouchableOpacity>

      <Text style={styles.diaTexto} testID="navigation-current-day">
        {dia}
      </Text>

      <TouchableOpacity 
        onPress={onNext}
        testID="navigation-next-button"
        style={[
          styles.boton, 
          disabledNext && styles.botonDisabled
        ]}
        disabled={disabledNext}
      >
        <ChevronRight size={28} color="#6B7280" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingVertical: 12,
  },
  boton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  botonDisabled: {
    opacity: 0.5,
  },
  diaTexto: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    minWidth: 60,
    textAlign: 'center',
  },
});