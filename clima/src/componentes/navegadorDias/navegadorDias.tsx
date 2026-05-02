// navegadorDias.tsx - SOLO FORMATO "5/1" (día/mes)
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

type Props = {
  dia: string;
  onPrev: () => void;
  onNext: () => void;
  disabledPrev?: boolean;
  disabledNext?: boolean;
};

function formatearFecha(fecha: string): string {
  // 🆕 SIEMPRE formato "5/1" (día/mes)
  try {
	const date = new Date(fecha);
	if (isNaN(date.getTime())) return fecha;
    
	const dia = date.getDate().toString().padStart(2, '0');
	const mes = (date.getMonth() + 1).toString().padStart(2, '0');
	return `${dia}/${mes}`;
  } catch {
	return fecha;
  }
}

export function BotonNavegacionEntreDias({
  dia,
  onPrev,
  onNext,
  disabledPrev = false,
  disabledNext = false
}: Props) {
  return (
	<View style={styles.container}>
  	<TouchableOpacity
    	onPress={onPrev}
    	style={[
      	styles.boton,
      	disabledPrev && styles.botonDisabled
    	]}
    	disabled={disabledPrev}
  	>
    	<ChevronLeft size={23} color="#6B7280" />
  	</TouchableOpacity>

  	<Text style={styles.diaTexto}>
    	{formatearFecha(dia)}
  	</Text>

  	<TouchableOpacity
    	onPress={onNext}
    	style={[
      	styles.boton,
      	disabledNext && styles.botonDisabled
    	]}
    	disabled={disabledNext}
  	>
    	<ChevronRight size={23} color="#6B7280" />
  	</TouchableOpacity>
	</View>
  );
}

const styles = StyleSheet.create({
  container: {
	flexDirection: "row",
	justifyContent: "space-between",
	width: "100%",
	alignItems: "center",
	gap: 20,
	paddingVertical: 12,
  },
  boton: {
	padding: 6,
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