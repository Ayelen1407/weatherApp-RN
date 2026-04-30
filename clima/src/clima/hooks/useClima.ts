import { useEffect, useState } from "react";
import { ServicioObtenerClimaPorCiudad } from "@/src/servicios/servicioClima";

export function useClima(ciudad: string) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    ServicioObtenerClimaPorCiudad(ciudad)
      .then(setDatos)
      .finally(() => setCargando(false));
  }, []);

  return { datos, cargando };
}