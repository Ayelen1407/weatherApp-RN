import { View, Text, StyleSheet } from "react-native";
import { useDias } from "@/src/dias";
import { BotonNavegacionEntreDias } from "@/src/componentes/navegadorDias/navegadorDias";
import { ContenedorIconoClima } from "@/src/componentes/iconoClima/iconoClimaContainer";
import { TextoTemperaturaActual } from "@/src/componentes/temperatura/temperatura";
import MetricasClima from "@/src/componentes/metricasClima/metricasClima";
import Ciudad from "@/src/componentes/ciudad";

export default function PantallaClima() {
  const { 
    climaDia, 
    fechaActual, 
    metricas, 
    navegarAnterior, 
    navegarSiguiente, 
    loading,
    diaActual  // Para calcular disabled
  } = useDias();

  if (loading) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container} testID="screen-weather">
      <BotonNavegacionEntreDias
        dia={fechaActual}
        onPrev={navegarAnterior}
        onNext={navegarSiguiente}
        disabledPrev={diaActual === 0}
        disabledNext={diaActual === 2}  // 3 días máximo
      />

      <Ciudad nombre="VILLA LUGANO" testID="header-city-name" />
      
      <ContenedorIconoClima codigo={climaDia?.codigoCondicion || 1000} />
      
      <TextoTemperaturaActual valor={climaDia?.temp || 0} />
      
      <View style={styles.minMax}>
        <Text testID="temp-min">Min: {climaDia?.min || 0}°</Text>
        <Text testID="temp-max">Max: {climaDia?.max || 0}°</Text>
      </View>
      
      <MetricasClima metricas={metricas} testID="metrics-container" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8fafc"
  },
  minMax: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 16
  },
});