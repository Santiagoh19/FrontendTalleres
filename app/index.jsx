import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import estilos from "../assets/estilos/estilos";
import { api } from "../assets/api";
import TallerCard from "../assets/componentes/TallerCard";


const DETAIL_ROUTE = "/taller/[id]";

export default function Home() {
  const router = useRouter();

  const [talleres, setTalleres] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // UI filtros
  const [q, setQ] = useState("");                 // búsqueda
  const [precio, setPrecio] = useState(null);     // "gratis" | "0-50" | "50-100" | ">200" | null
  const [cercanos, setCercanos] = useState(false);
  const [ordenFecha, setOrdenFecha] = useState("asc"); // "asc" cercana→lejana | "desc" lejana→cercana

  useEffect(() => {
    let vivo = true;
    api
      .get("/talleres")
      .then(res => vivo && setTalleres(res.data?.data || []))
      .catch(e => vivo && setError(e.message))
      .finally(() => vivo && setCargando(false));
    return () => { vivo = false; };
  }, []);

  const listFiltrada = useMemo(() => {
    let data = [...talleres];

    // búsqueda (titulo y descripción corta)
    if (q.trim()) {
      const term = q.trim().toLowerCase();
      data = data.filter(t =>
        (t.titulo || "").toLowerCase().includes(term) ||
        (t.descripcionCorta || "").toLowerCase().includes(term)
      );
    }

    // filtro de precio
    if (precio) {
      if (precio === "gratis") data = data.filter(t => (t.precio || 0) === 0);
      if (precio === "0-50")  data = data.filter(t => t.precio >= 0 && t.precio <= 50000);
      if (precio === "50-100") data = data.filter(t => t.precio > 50000 && t.precio <= 100000);
      if (precio === ">200")  data = data.filter(t => t.precio > 200000);
    }

    // (placeholder) cercanos: aquí luego usarás geolocalización/coords del usuario
    if (cercanos) {
      
    }

    // ordenar por fecha de inicio
    data.sort((a, b) => {
      const A = new Date(a.fechaInicio || 0).getTime();
      const B = new Date(b.fechaInicio || 0).getTime();
      return ordenFecha === "asc" ? A - B : B - A;
    });

    return data;
  }, [talleres, q, precio, cercanos, ordenFecha]);

  const Chip = ({ label, activo, onPress, varianteAzul }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        estilos.chip,
        varianteAzul && estilos.chipAzul,
        activo && (varianteAzul ? estilos.chipAzulActivo : estilos.chipActivo),
        pressed && estilos.chipPressed,
      ]}
    >
      <Text style={[estilos.chipTexto, activo && estilos.chipTextoActivo]}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={estilos.pantalla}>
      <ScrollView contentContainerStyle={estilos.scrollContenido} showsVerticalScrollIndicator={false}>
        {/* Buscador */}
        <View style={estilos.buscadorWrap}>
          <Ionicons name="search-outline" size={18} color="#fff" style={estilos.buscadorIcono} />
          <TextInput
            style={estilos.buscadorInput}
            placeholder="Busca diferentes talleres en Bogotá…"
            placeholderTextColor="#E6FAFF"
            value={q}
            onChangeText={setQ}
          />
        </View>

        {/* Filtros */}
        <View style={estilos.filtrosWrap}>
          <Chip label="Gratis"     activo={precio === "gratis"} onPress={() => setPrecio(precio === "gratis" ? null : "gratis")} />
          <Chip label="0–50.000"   activo={precio === "0-50"}   onPress={() => setPrecio(precio === "0-50" ? null : "0-50")} />
          <Chip label="50–100.000" activo={precio === "50-100"} onPress={() => setPrecio(precio === "50-100" ? null : "50-100")} />
          <Chip label="> 200.000"  activo={precio === ">200"}   onPress={() => setPrecio(precio === ">200" ? null : ">200")} />
          <Chip
            label="Cercanos a mí"
            activo={cercanos}
            onPress={() => setCercanos(v => !v)}
            varianteAzul
          />
          <Chip
            label={`Fecha: ${ordenFecha === "asc" ? "cercana→lejana" : "lejana→cercana"}`}
            activo={true}
            onPress={() => setOrdenFecha(s => (s === "asc" ? "desc" : "asc"))}
            varianteAzul
          />
        </View>

        {/* Contenedor blanco con grid */}
        <View style={estilos.contenedorBlanco}>
          {cargando ? (
            <ActivityIndicator />
          ) : error ? (
            <Text style={{ color: "crimson" }}>Error: {error}</Text>
          ) : (
            <View style={estilos.grid}>
              {listFiltrada.map((t) => (
                <View key={t._id} style={estilos.celda}>
                  <TallerCard
                    titulo={t.titulo}
                    descripcion={t.descripcionCorta}
                    ubicacion={t.ubicacion}
                    rating={t.rating}
                    votos={t.votos}
                    precio={t.precio}
                    imagen={t.imagen}
                    onComprar={() => router.push({ pathname: DETAIL_ROUTE, params: { id: t._id } })}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
