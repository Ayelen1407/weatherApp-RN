import React from 'react'
import { View, Text, StyleSheet, ScrollView, RefreshControl, StatusBar } from "react-native"
import { useDias } from "@/src/dias"
import { BotonNavegacionEntreDias } from "@/src/componentes/navegadorDias/navegadorDias"
import { ContenedorIconoClima } from "@/src/componentes/iconoClima/iconoClimaContainer"
import { TextoTemperaturaActual } from "@/src/componentes/temperatura/temperatura"
import MetricasClima from "@/src/componentes/metricasClima/metricasClima"
import Ciudad from "@/src/componentes/ciudad"

export default function PantallaClima() {
  const {
    climaDia,
    fechaActual,
    metricas,
    navegarAnterior,
    navegarSiguiente,
    loading,
    diaActual,
    refrescar,
    ciudad
  } = useDias()

  if (loading) {
    return (
      <View style={[styles.container, styles.centrado]}>
        <Text style={styles.loadingText}>Actualizando clima...</Text>
      </View>
    )
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl 
            refreshing={loading}
            onRefresh={refrescar}
            colors={['#3B82F6']}
            tintColor="#3B82F6"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.navegacion}>
          <BotonNavegacionEntreDias
            dia={fechaActual}
            onPrev={navegarAnterior}
            onNext={navegarSiguiente}
            disabledPrev={diaActual === 0}
            disabledNext={diaActual === 2}
          />
        </View>

        <Ciudad nombre={ciudad.toUpperCase()} testID="header-city-name" />
        <ContenedorIconoClima codigo={climaDia?.codigoCondicion || 1000} />
        <TextoTemperaturaActual valor={climaDia?.temp || 0} />
        
        <MetricasClima metricas={metricas} testID="metrics-container" />

        <View style={styles.minMax}>
          <Text testID="temp-min" style={styles.tempText}>
            Min {climaDia?.min || 0}°
          </Text>
          <Text testID="temp-max" style={styles.tempText}>
            Max {climaDia?.max || 0}°
          </Text>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8fafc",
    paddingBottom: 80,
  },
  navegacion: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  centrado: {
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#6B7280',
  },
  minMax: {
    flexDirection: 'row',
    gap: 40,
    marginVertical: 24,
  },
  tempText: {
    fontSize: 20,
    fontWeight: '600',
  }  
})
