import { useEffect, useState } from "react";
import { ServicioObtenerClimaPorCiudad, ClimaDia } from "@/src/servicios/servicioClima";

export function useClima(ciudad: string) {
  const [dias, setDias] = useState<ClimaDia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCargando(true);
    setError(null);
    
    ServicioObtenerClimaPorCiudad(ciudad)
      .then(({ dias }) => {
        setDias(dias);
      })
      .catch((err: Error) => {
        setError(err.message);
        console.error(`Error clima ${ciudad}:`, err);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [ciudad]);

  return { 
    dias, 
    cargando, 
    error,
    diaActual: dias[0]
  };
}