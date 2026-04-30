import { obtenerIconoClima } from "@/src/constantes/condicionesClima";
import { VistaIconoClima } from "./iconoClima";

type Props = {
  codigo: number;
};

export function ContenedorIconoClima({ codigo }: Props) {
  const Icono = obtenerIconoClima(codigo);

  return <VistaIconoClima Icono={Icono} />;
}