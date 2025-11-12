import React, { useEffect, useState, useMemo } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter, useRootNavigationState } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import estilos from "../../assets/estilos/estilos";
import { api } from "../../assets/api";
import { useAuth } from "../../assets/context/AuthContext";

export default function ClasesTaller() {
  const router = useRouter();
  const nav = useRootNavigationState();          // <-- saber cuándo está listo el Root
  const { id, returnTo } = useLocalSearchParams();         // <-- una sola vez
  const { isAuth, loading } = useAuth();
  const ready = !!nav?.key;
  const backTarget = typeof returnTo === "string" ? returnTo : "/perfil";

  const safeBack = () => { if (nav?.key) router.back(); };

  const [taller, setTaller] = useState(null);
  const [contenido, setContenido] = useState(null);
  const [prog, setProg] = useState({ totalTemas: 0, completados: [], status: "adquirido" });
  const [toast, setToast] = useState("");
  const [mounted, setMounted] = useState(false);

  const nextExpected = useMemo(() => (prog.completados?.length || 0) + 1, [prog]);
  const allDone = useMemo(
    () => prog.completados?.length === prog.totalTemas && prog.totalTemas > 0,
    [prog]
  );

  useEffect(() => { setMounted(true);}, []);

  //  Redirección a login SOLO cuando el Root está listo
  useEffect(() => {
    if (!mounted || !ready || loading) return;                      // espera al Root
    if (!isAuth) {
      router.replace({
        pathname: "/auth/login",
        params: { redirect: `/taller/clases?id=${id || ""}` },
      });
    }
  }, [mounted, ready, loading, isAuth, id, router]);

  // Carga de datos (no navega, así que puede correr sin esperar a nav.key)
  useEffect(() => {
    if (!id) return;
    let vivo = true;
    (async () => {
      const [t, c, p] = await Promise.all([
        api.get(`/talleres/${id}`),
        api.get(`/talleres/${id}/contenido`),
        api.get(`/talleres/${id}/progreso`),
      ]);
      if (!vivo) return;
      setTaller(t.data?.data || null);
      setContenido(c.data?.data || null);
      setProg(p.data?.data || { totalTemas: 0, completados: [], status: "adquirido" });
    })();
    return () => { vivo = false; };
  }, [id]);

  const ok = (m) => { setToast(m); setTimeout(() => setToast(""), 1800); };

  const completarTema = async (idx) => {
    try {
      const { data } = await api.post(`/talleres/${id}/tema/${idx}/complete`);
      if (!data?.status) return;
      setProg(data.data);
      ok(idx === 1 ? "¡Comenzaste el taller! Aparecerá en 'En curso'." : "Temática completada.");
    } catch (e) {
      const msg = e?.response?.data?.message || "Error";
      ok(msg);
    }
  };

  const finalizarTaller = async () => {
    try {
      const { data } = await api.post(`/talleres/${id}/finalizar`);
      if (data?.status) {
        ok("¡Taller finalizado!");
        setTimeout(() => {
          if (!ready) return;
          if (router.canGoBack()) router.back();
          else router.replace(backTarget);    // ✅ navega solo si ya está listo
        }, 800);
      }
    } catch (e) {
      ok(e?.response?.data?.message || "No se pudo finalizar");
    }
  };

  if (!taller || !contenido) return null;

  return (
    <View style={estilos.pantalla}>
      <ScrollView contentContainerStyle={estilos.scrollContenido} showsVerticalScrollIndicator={false}>
        {/* Contenedor 1: header del taller */}
        <View style={[estilos.contenedorBlanco, estilos.detalleContenedor]}>
  {/* Header con back como en [id] */}
  <View style={estilos.tallerHeader}>
    <Pressable onPress={safeBack} style={estilos.tallerBack} hitSlop={8}>
      <Ionicons name="chevron-back" size={22} color="#0B4F6C" />
    </Pressable>

    <Text style={estilos.tallerTitulo} numberOfLines={1}>
      {taller.titulo}
    </Text>

    
    <View style={{ width: 22 }} />
  </View>

 
  <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
    <View style={estilos.chip}><Text style={estilos.chipTexto}>★ {taller.rating || 4.5}</Text></View>
    <View style={estilos.chip}><Text style={estilos.chipTexto}>
      {(contenido.tematicas || []).reduce((a, t) => a + t.clases.length, 0)} clases
    </Text></View>
    <View style={estilos.chip}><Text style={estilos.chipTexto}>{contenido.tematicas.length} temáticas</Text></View>
  </View>

  <Text style={[estilos.tallerParrafo, { marginTop: 10 }]}>{contenido.descripcionLarga}</Text>
</View>

        {/* Contenedor 2: clases del taller */}
        <View style={[estilos.contenedorBlanco, estilos.tallerWrap]}>
          <Text style={estilos.tallerTitulo}>Clases del taller</Text>

          {(contenido.tematicas || []).map((tema, i) => {
            const idx = i + 1;
            const done = prog.completados.includes(idx);

            return (
              <View
                key={idx}
                style={{ marginTop: 16, borderLeftWidth: 3, borderLeftColor: done ? "#2FC33C" : "#B3E9FA", paddingLeft: 12 }}
              >
                <Text style={[estilos.tallerSubtitulo]}>
                  <Text style={[estilos.temaIndex, done && estilos.temaIndexDone]}>{idx}</Text>{"  "}
                  {tema.titulo}
                </Text>

                {/* Lista de clases */}
                <View style={{ marginTop: 6 }}>
                  {tema.clases.map((c, k) => (
                    <View key={k} style={{ marginBottom: 6 }}>
                      <Text style={{ color: "#0B4F6C", fontWeight: "700" }}>{c.titulo}</Text>
                      {done && (
                        <View style={estilos.claseDoneRow}>
                          <Ionicons name="checkmark-circle" size={14} color="#2FC33C" />
                          <Text style={{ color: "#2FC33C", fontWeight: "700" }}>Completo</Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>

                {/* Botón Tema finalizado */}
                <Pressable
                  disabled={done || idx !== nextExpected}
                  onPress={() => completarTema(idx)}
                  style={[
                    estilos.boton, estilos.botonAzul,
                    { alignSelf: "flex-start", marginTop: 10, opacity: (done || idx !== nextExpected) ? 0.55 : 1 }
                  ]}
                >
                  <View style={estilos.saveBtnInner}>
                    <Text style={estilos.textoBoton}>{done ? "Temática completada" : "Tema finalizado"}</Text>
                  </View>
                </Pressable>
              </View>
            );
          })}

          {/* Botón Taller finalizado */}
          <Pressable
            disabled={!allDone}
            onPress={finalizarTaller}
            style={[estilos.boton, estilos.botonAzul, { alignSelf: "center", marginTop: 16, opacity: allDone ? 1 : 0.55 }]}
          >
            <View style={estilos.saveBtnInner}><Text style={estilos.textoBoton}>Taller finalizado</Text></View>
          </Pressable>
        </View>
      </ScrollView>

      {!!toast && (
        <View style={[estilos.toast, estilos.toastOk]}>
          <Ionicons name="checkmark-circle" size={16} color="#fff" />
          <Text style={estilos.toastTxt}>&nbsp;{toast}</Text>
        </View>
      )}
    </View>
  );
}
