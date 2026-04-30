import * as Icons from "lucide-react-native";
import { MAPA_CONDICIONES_CLIMA } from "@/src/constantes/condicionesClima";
import { VistaIconoClima } from "./iconoClima";
type Props = {
  codigo: number;
};
export function ContenedorIconoClima({ codigo }: Props) {
  const nombre = MAPA_CONDICIONES_CLIMA[codigo] || "Cloud";
  const Icono = Icons[nombre as keyof typeof Icons];

  return <VistaIconoClima Icono={Icono} />;
}