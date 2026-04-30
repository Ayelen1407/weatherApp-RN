import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useClima } from "@/src/clima/hooks/useClima";
import { BotonNavegacionEntreDias } from "@/src/componentes/navegadorDias/navegadorDias";
import { ContenedorIconoClima } from "@/src/componentes/iconoClima/iconoClimaContainer";
import { TextoTemperaturaActual } from "@/src/componentes/temperatura/temperatura";

export default function PantallaClima() {
  const { datos, cargando } = useClima("Tokyo");
  const [indice, setIndice] = useState(0);

  if (cargando || !datos) {
    return <Text>Cargando...</Text>;
  }

  const dia = datos.forecast.forecastday[indice];

  return (
    <View style={styles.container} testID="screen-weather">
      
      <BotonNavegacionEntreDias
        dia={dia.date}
        onPrev={() => indice > 0 && setIndice(indice - 1)}
        onNext={() =>
          indice < datos.forecast.forecastday.length - 1 &&
          setIndice(indice + 1)
        }
      />

      <Text style={styles.city} testID="header-city-name">
        {datos.location.name.toUpperCase()}
      </Text>

      <ContenedorIconoClima codigo={dia.day.condition.code} />

      <TextoTemperaturaActual valor={datos.current.temp_c} />

      <View style={styles.minMax}>
        <Text testID="temp-min">Min: {dia.day.mintemp_c}°</Text>
        <Text testID="temp-max">Max: {dia.day.maxtemp_c}°</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  city: {
    fontSize: 24,
    fontWeight: "bold",
  },
  minMax: {
    flexDirection: "row",
    gap: 10,
  },
});