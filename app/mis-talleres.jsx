import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, ActivityIndicator, Pressable } from "react-native";
import { Redirect, useRootNavigationState, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import estilos from "../assets/estilos/estilos";
import { useAuth } from "../assets/context/AuthContext";
import { api } from "../assets/api";
import TallerCard from "../assets/componentes/TallerCard";
import { Ionicons } from "@expo/vector-icons";

export default function MisTalleres() {
  const router = useRouter();
  const nav = useRootNavigationState();
  const { isAuth } = useAuth();

  const [adquiridos, setAdquiridos] = useState([]);
  const [enCurso, setEnCurso] = useState([]);
  const [finalizados, setFinalizados] = useState([]);

  const fetchLibrary = useCallback(async () => {
    try {
      const { data } = await api.get("/me/library");
      if (data?.status) {
        setAdquiridos(data.adquiridos || []);
        setEnCurso(data.enCurso || []);
        setFinalizados(data.finalizados || []);
      }
    } catch {
      
    }
  }, []);

  useEffect(() => {
    if (isAuth) fetchLibrary();
  }, [isAuth, fetchLibrary]);

  useFocusEffect(
    useCallback(() => {
      if (isAuth) fetchLibrary();
    }, [isAuth, fetchLibrary])
  );

  // Espera a que el root esté listo
  if (!nav?.key) {
    return (
      <View style={estilos.pantalla}>
        <View style={[estilos.contenedorBlanco, { paddingVertical: 24, alignItems: "center" }]}>
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  // Si no está autenticado, manda a login con redirect
  if (!isAuth) {
    return <Redirect href={{ pathname: "/auth/login", params: { redirect: "/mis-talleres" } }} />;
  }

  return (
  <View style={estilos.pantalla}>
    <ScrollView contentContainerStyle={estilos.scrollContenido} showsVerticalScrollIndicator={false}>
      {/* contenedor grande blanco como en Perfil */}
      <View style={[estilos.contenedorBlanco, estilos.perfilCont, estilos.contenedorBlancoPadBottom]}>

        {/* Header con flecha + título */}
        <View style={estilos.tallerHeader}>
          <Pressable onPress={() => router.back()} style={estilos.tallerBack}>
            <Ionicons name="chevron-back" size={22} color="#0B4F6C" />
          </Pressable>
          <Text style={estilos.tallerTitulo}>Talleres</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Adquiridos recientemente */}
<View style={estilos.perfilSection}>
  <Text style={estilos.perfilSectionTitle}>Adquiridos recientemente</Text>
  <View style={estilos.grid}>
    {adquiridos.length ? (
      adquiridos.map((t) => (
        <View key={t._id} style={estilos.celda}>
          <TallerCard
            titulo={t.titulo}
            descripcion={t.descripcionCorta}
            ubicacion={t.ubicacion}
            rating={t.rating}
            votos={t.votos}
            precio={t.precio}
            imagen={t.imagen}
            variante="perfil-adquirido"
            progreso={0}
            fechaInicio={t.fechaInicio || "—"}
            onCtaPress={() =>
              router.push({
                pathname: "/taller/clases",
                params: { id: t._id, returnTo: "/mis-talleres" }
              })
            }
          />
        </View>
      ))
    ) : (
      <Text style={estilos.tallerParrafo}>Aún no has adquirido talleres.</Text>
    )}
  </View>
</View>


        {/* Talleres en curso */}
        <View style={estilos.perfilSection}>
          <Text style={estilos.perfilSectionTitle}>Talleres en curso</Text>
          <View style={estilos.grid}>
            {enCurso.length ? (
              enCurso.map((t) => (
                <View key={t._id} style={estilos.celda}>
                  <TallerCard
                    titulo={t.titulo}
                    descripcion={t.descripcionCorta}
                    ubicacion={t.ubicacion}
                    rating={t.rating}
                    votos={t.votos}
                    precio={t.precio}
                    imagen={t.imagen}
                    variante="perfil-curso"
                    progreso={
                      t?.progreso?.totalTemas
                        ? Math.round(100 * (t.progreso.completados?.length || 0) / t.progreso.totalTemas)
                        : 0
                    }
                    onCtaPress={() => router.push({ pathname: "/taller/clases", params: { id: t._id, returnTo: "/mis-talleres" } })}
                  />
                </View>
              ))
            ) : (
              <Text style={estilos.tallerParrafo}>Pronto aparecerán aquí tus talleres en curso.</Text>
            )}
          </View>
        </View>

        {/* Talleres finalizados */}
        <View style={estilos.perfilSection}>
          <Text style={estilos.perfilSectionTitle}>Talleres finalizados</Text>
          <View style={estilos.grid}>
            {finalizados.length ? (
              finalizados.map((t) => (
                <View key={t._id} style={estilos.celda}>
                  <TallerCard
                    titulo={t.titulo}
                    descripcion={t.descripcionCorta}
                    ubicacion={t.ubicacion}
                    rating={t.rating}
                    votos={t.votos}
                    precio={t.precio}
                    imagen={t.imagen}
                    variante="perfil-finalizado"
                    progreso={100}
                    onCtaPress={() => router.push({ pathname: "/taller/clases", params: { id: t._id, returnTo: "/mis-talleres"} })}
                  />
                </View>
              ))
            ) : (
              <Text style={estilos.tallerParrafo}>Aún no tienes talleres finalizados.</Text>
            )}
          </View>
        </View>

      </View>
    </ScrollView>
  </View>
);
}