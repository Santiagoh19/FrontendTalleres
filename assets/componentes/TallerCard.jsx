import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import estilos from "../estilos/estilos";

export default function TallerCard({
  titulo,
  descripcion,
  ubicacion,
  rating,
  votos,
  precio = 0,
  imagen,

  // Handlers
  onComprar,     // Home / exploración -> botón "Comprar"
  onCtaPress,    // Perfil (adquirido/en curso/finalizado) -> "Empezar/Continuar/Ver contenido"

  // Variantes
  variante,      // "perfil-adquirido" | "perfil-curso" | "perfil-finalizado" | undefined

  // Info extra
  progreso = 0,  // 0–100
  fechaInicio,   // string
  ctaLabel      
}) {
  const precioFmt = new Intl.NumberFormat("es-CO").format(Number(precio ?? 0));

  // Estado por variante
  const esAdquirido  = variante === "perfil-adquirido";
  const esCurso      = variante === "perfil-curso";
  const esFinalizado = variante === "perfil-finalizado";
  const esPerfil     = esAdquirido || esCurso || esFinalizado;

  // Texto del CTA (por defecto)
  const labelCTA =
    ctaLabel ??
    (esAdquirido ? "Empezar" : esCurso ? "Continuar" : esFinalizado ? "Ver contenido" : "Comprar");

  // Precio solo en cards de catálogo (no en perfil)
  const showPrice = !esPerfil;

  // Handler según variante
  const onPressCTA = esPerfil ? onCtaPress : onComprar;
  const disabled = !onPressCTA;

  return (
    <View style={estilos.card}>
      {!!imagen && (
        <Image source={{ uri: imagen }} style={estilos.cardCover} resizeMode="cover" />
      )}

      <View style={estilos.cardBody}>
        <Text numberOfLines={1} style={estilos.cardTitle}>{titulo}</Text>
        <Text numberOfLines={2} style={estilos.cardDesc}>{descripcion}</Text>

        <View style={estilos.cardMetaRow}>
          <View style={estilos.cardMetaItem}>
            <Ionicons name="location-outline" size={14} color="#3C7289" />
            <Text numberOfLines={1} style={estilos.cardMetaText}>{ubicacion || "—"}</Text>
          </View>

          <View style={estilos.cardMetaItem}>
            <Ionicons name="star" size={14} color="#F5C045" />
            <Text style={estilos.cardMetaText}>
              {Number(rating || 0).toFixed(1)} ({votos || 0})
            </Text>
          </View>
        </View>

        {/* Extra en perfil: progreso (adquirido o en curso) y fecha de inicio (solo adquirido) */}
        {(esAdquirido || esCurso) && (
          <View style={{ marginTop: 8, gap: 6 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Ionicons name="trending-up-outline" size={14} color="#3C7289" />
              <Text style={estilos.cardMetaText}>Progreso: {progreso}%</Text>
            </View>

            {esAdquirido && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Ionicons name="calendar-clear-outline" size={14} color="#3C7289" />
                <Text style={estilos.cardMetaText}>Fecha de inicio: {fechaInicio || "—"}</Text>
              </View>
            )}
          </View>
        )}

        {/* CTA inferior dentro de la tarjeta */}
        <View style={estilos.cardCtaRow}>
          <Pressable
            disabled={disabled}
            onPress={onPressCTA}
            style={({ pressed }) => [
              estilos.boton,
              esPerfil ? estilos.botonAzul : estilos.botonMagenta,
              {
                alignSelf: esPerfil ? "flex-start" : "center",
                opacity: disabled ? 0.5 : pressed ? 0.95 : 1
              }
            ]}
          >
            <View style={estilos.botonPressable}>
              <View style={estilos.botonContenido}>
                <Text style={estilos.textoBoton}>{labelCTA}</Text>
                {showPrice && (
                  <Text style={[estilos.textoBoton, estilos.textoPrecio]}>${precioFmt}</Text>
                )}
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
