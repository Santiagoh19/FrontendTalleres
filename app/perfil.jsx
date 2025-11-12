import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, Image as RNImage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import estilos from "../assets/estilos/estilos";
import { useAuth } from "../assets/context/AuthContext";
import { useRouter } from "expo-router";
import { api } from "../assets/api";
import TallerCard from "../assets/componentes/TallerCard";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function Perfil() {

  const removeGuardado = async (tid) => {
  
  setGuardados(prev => prev.filter(x => x._id !== tid));
  try {
    
    try {
      await api.delete(`/me/save/${tid}`);
    } catch {
      
      try {
        await api.post(`/me/unsave/${tid}`);
      } catch {
        
        await api.post(`/me/save/${tid}`);
      }
    }
  } finally {
    // sincroniza con backend por si algo cambió
    fetchLibrary();
  }
};
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [enCurso, setEnCurso] = useState([]);
  const [finalizados, setFinalizados] = useState([]);

  const [guardados, setGuardados] = useState([]);
  const [adquiridos, setAdquiridos] = useState([]);

  const [tab, setTab] = useState("talleres"); // "talleres" | "bitacoras" | "guardados"
  const [menuOpen, setMenuOpen] = useState(false);

 
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  
  useEffect(() => {
    if (!loading && !user && !isLoggingOut) {
      router.replace("/auth/login");
    }
  }, [loading, user, isLoggingOut, router]);

 const fetchLibrary = useCallback(async () => {
  if (!user) return;
  const { data } = await api.get("/me/library");
  if (data?.status) {
    setAdquiridos(data.adquiridos || []);
    setEnCurso(data.enCurso || []);
    setFinalizados(data.finalizados || []);
    setGuardados(data.guardados || []);
  }
}, [user]);

useEffect(() => { fetchLibrary(); }, [fetchLibrary]);
useFocusEffect(useCallback(() => { fetchLibrary(); }, [fetchLibrary]));

  const handleLogout = () => {
    setIsLoggingOut(true);   // <- silencia el efecto de protección
    setMenuOpen(false);
    logout();                // limpia token/usuario
    router.replace("/");     // manda al Home público
    
    setTimeout(() => setIsLoggingOut(false), 1500);
  };

  if (!user) return null;

  const raw = user?.avatarUrl || "";
const stamp = user?.updatedAt ? new Date(user.updatedAt).getTime() : "";
const uiAvatar = /^https?:\/\//.test(raw) && stamp
  ? `${raw}${raw.includes("?") ? "&" : "?"}v=${stamp}`
  : raw;

  return (
    <View style={estilos.pantalla}>
      <ScrollView contentContainerStyle={estilos.scrollContenido} showsVerticalScrollIndicator={false}>
        <View style={[estilos.contenedorBlanco, estilos.perfilCont]}>
          {/* Header */}
          <View style={estilos.perfilHeader}>
            <View style={estilos.perfilHeaderLeft}>
              {uiAvatar ? (
                <RNImage
                  key={uiAvatar}
                  source={{ uri: uiAvatar }}
                  style={estilos.perfilAvatarImg}
                />
              ) : (
               <View style={estilos.perfilAvatar} />
              )}
              <View style={estilos.perfilUserInfo}>
                <Text style={estilos.perfilNombre}>{user?.nombre || user?.email}</Text>
                <Text style={estilos.perfilHandle}>
                  {user?.handle || `@${(user?.email || "").split("@")[0]}`}
                </Text>
                {!!user?.ubicacion && (
                  <View style={estilos.perfilLocRow}>
                    <Ionicons name="location-outline" size={14} color="#3C7289" />
                    <Text style={estilos.perfilLocTxt}>{user.ubicacion}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Engranaje + menú */}
            <View style={estilos.perfilGearWrap}>
              <Pressable
                style={estilos.perfilGearBtn}
                onPress={() => setMenuOpen(v => !v)}
                hitSlop={6}
                accessibilityLabel="Configuración"
              >
                <Ionicons name="settings-outline" size={18} color="#0B4F6C" />
              </Pressable>

              {menuOpen && (
                <View style={estilos.perfilGearMenu}>
                  <Pressable style={estilos.perfilMenuItem} onPress={() => {setMenuOpen(false); router.push("/perfil/editar");}}>
                    <Text style={estilos.perfilMenuTxt}>Editar perfil</Text>
                  </Pressable>
                  <Pressable style={estilos.perfilMenuItem} onPress={() => {setMenuOpen(false); router.push("/perfil/ajustes"); }}>
                    <Text style={estilos.perfilMenuTxt}>Ajustes de la cuenta</Text>
                  </Pressable>
                  <Pressable
                    style={[estilos.perfilMenuItem, estilos.perfilMenuDanger]}
                    onPress={handleLogout}
                  >
                    <Text style={[estilos.perfilMenuTxt, { color: "#fff", fontWeight: "800" }]}>
                      Cerrar sesión
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>

          {/* Tabs */}
          <View style={estilos.perfilTabs}>
            <Pressable onPress={() => setTab("talleres")} style={estilos.perfilTabBtn}>
              <Text style={[estilos.perfilTab, tab === "talleres" && estilos.perfilTabActivo]}>
                Talleres
              </Text>
            </Pressable>
            <Pressable onPress={() => setTab("bitacoras")} style={estilos.perfilTabBtn}>
              <Text style={[estilos.perfilTab, tab === "bitacoras" && estilos.perfilTabActivo]}>
                Bitácoras
              </Text>
            </Pressable>
            <Pressable onPress={() => setTab("guardados")} style={estilos.perfilTabBtn}>
              <Text style={[estilos.perfilTab, tab === "guardados" && estilos.perfilTabActivo]}>
                Guardados
              </Text>
            </Pressable>
          </View>

          {/* Contenido por tab */}
          {tab === "talleres" && (
            <>
              {/* Adquiridos recientemente */}
<View style={estilos.perfilSection}>
  <Text style={estilos.perfilSectionTitle}>Adquiridos recientemente</Text>
  <View style={estilos.grid}>
    {adquiridos.length ? (
      adquiridos.map(t => (
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
                params: { id: t._id, returnTo: "/perfil" }
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
    {enCurso.length ? enCurso.map(t => (
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
          onCtaPress={() => router.push({ pathname: "/taller/clases", params: { id: t._id, returnTo: "/perfil" } })}
          progreso={
            t?.progreso?.totalTemas
              ? Math.round(100 * (t.progreso.completados?.length || 0) / t.progreso.totalTemas)
              : 0
          }
        />
        
      </View>
    )) : (
      <Text style={estilos.tallerParrafo}>Pronto aparecerán aquí tus talleres en curso.</Text>
    )}
  </View>
</View>


             {/* Finalizados */}
<View style={estilos.perfilSection}>
  <Text style={estilos.perfilSectionTitle}>Talleres finalizados</Text>
  <View style={estilos.grid}>
    {finalizados.length ? finalizados.map(t => (
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
          onCtaPress={() => router.push({ pathname: "/taller/clases", params: { id: t._id, returnTo: "/perfil" } })}
        />
        
      </View>
    )) : (
      <Text style={estilos.tallerParrafo}>Aún no tienes talleres finalizados.</Text>
    )}
  </View>
</View>

            </>

          )}

          {tab === "bitacoras" && (
            <View style={estilos.perfilSection}>
              <Text style={estilos.perfilSectionTitle}>Bitácoras</Text>
              <Text style={estilos.tallerParrafo}>Aquí podrás ver tus bitácoras próximamente.</Text>
            </View>
          )}

          {tab === "guardados" && (
  <View style={estilos.perfilSection}>
    <Text style={estilos.perfilSectionTitle}>Talleres guardados</Text>
    <View style={estilos.grid}>
      {guardados.length ? guardados.map(t => (
        <View key={t._id} style={[estilos.celda, { position: "relative" }]}>
         
          <Pressable
            onPress={() => removeGuardado(t._id)}
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              zIndex: 2,
              width: 26,
              height: 26,
              borderRadius: 13,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0B4F6C",
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 3,
              shadowOffset: { width: 0, height: 1 }
            }}
            accessibilityLabel="Quitar de guardados"
          >
            <Ionicons name="close" size={14} color="#fff" />
          </Pressable>

          
          <TallerCard
            titulo={t.titulo}
            descripcion={t.descripcionCorta}
            ubicacion={t.ubicacion}
            rating={t.rating}
            votos={t.votos}
            precio={t.precio}
            imagen={t.imagen}
            onComprar={() =>
              router.push({ pathname: "/taller/[id]", params: { id: t._id } })
            }
          />
        </View>
      )) : (
        <Text style={estilos.tallerParrafo}>Aún no has guardado talleres.</Text>
      )}
    </View>
  </View>
)}

        </View>
      </ScrollView>
    </View>
  );
}
