import { View, Pressable, Text } from "react-native";
import estilos from "../estilos/estilos";

function formatCOP(v) {
  if (v === 0 || v === "0") return "Gratis";
  if (typeof v === "string") return v.startsWith("$") ? v : `$${v}`;
  return `$${Number(v).toLocaleString("es-CO")}`;
}


function Boton({ texto = "Comprar", funcion, variante = "magenta", precio, disabled = false, full = false }) {
  const wrapperStyle = [
    estilos.boton,
    variante === "azul" ? estilos.botonAzul : estilos.botonMagenta,
    full && estilos.botonFull,
    disabled && estilos.botonDisabled,
  ];

  return (
    <View style={wrapperStyle}>
      <Pressable
        onPress={funcion}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={precio ? `${texto} ${formatCOP(precio)}` : texto}
        style={estilos.botonPressable}
      >
        <View style={estilos.botonContenido}>
          <Text style={estilos.textoBoton} numberOfLines={1}>{texto}</Text>
          {precio !== undefined && precio !== null && (
            <Text style={[estilos.textoBoton, estilos.textoPrecio]} numberOfLines={1}>
              {formatCOP(precio)}
            </Text>
          )}
        </View>
      </Pressable>
    </View>
  );
}

export default Boton;
