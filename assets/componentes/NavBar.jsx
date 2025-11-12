import React from "react";
import { View, Text, Pressable, Image as RNImage } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import estilos from "../estilos/estilos";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();     // ruta actual para volver luego
  const { isAuth, user } = useAuth();

  const goHome = () => router.push("/");

  const goMisTalleres = () => {
    if (!isAuth) {
      router.push({
        pathname: "/auth/login",
        params: { redirect: pathname },   // volver a donde estaba
      });
    } else {
      router.push("/mis-talleres");
    }
  };

  const goPerfil   = () => router.push("/perfil");
  const goLogin    = () => router.push({ pathname: "/auth/login",    params: { redirect: pathname }});
  const goRegister = () => router.push({ pathname: "/auth/register", params: { redirect: pathname }});


  const uiAvatar = user?.avatarUrl
    ? `${user.avatarUrl}${user.avatarUrl.includes("?") ? "&" : "?"}v=${user?.avatarStamp ?? ""}`
    : "";

  return (
    <View style={estilos.navBar}>
      {/* Izquierda: Brand */}
      <Pressable onPress={goHome} style={estilos.navLeft} accessibilityLabel="Inicio">
        <Text style={estilos.navBrand}>TalleresCo</Text>
      </Pressable>

      {/* Centro: Mis talleres (solo si hay sesión) */}
      <View style={estilos.navCenter}>
        {isAuth && (
          <Pressable
            onPress={goMisTalleres}
            style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            accessibilityLabel="Mis talleres"
          >
            <Ionicons name="create-outline" size={16} color="#fff" />
            <Text style={estilos.navLink}>Mis talleres</Text>
          </Pressable>
        )}
      </View>

      {/* Derecha: Perfil o Login/Register */}
      <View style={estilos.navRight}>
      {isAuth ? (
  <Pressable onPress={goPerfil} style={estilos.navUserBtn} accessibilityLabel="Perfil">
    {(() => {
      const raw = user?.avatarUrl || "";
      const stamp = user?.updatedAt ? new Date(user.updatedAt).getTime() : "";
      const uiAvatar = /^https?:\/\//.test(raw) && stamp
        ? `${raw}${raw.includes("?") ? "&" : "?"}v=${stamp}`
        : raw; // no estampar data:
      return uiAvatar ? (
        <RNImage key={uiAvatar} source={{ uri: uiAvatar }} style={estilos.navAvatar} />
      ) : (
        <Ionicons name="person-circle-outline" size={26} color="#fff" />
      );
    })()}
  </Pressable>
        ) : (
          <View style={estilos.navCtas}>
            <Pressable onPress={goLogin} style={[estilos.navBtn, estilos.navBtnOutline]}>
              <Text style={estilos.navBtnOutlineTxt}>Inicia sesión</Text>
            </Pressable>
            <Pressable onPress={goRegister} style={[estilos.navBtn, estilos.navBtnFill]}>
              <Text style={estilos.navBtnFillTxt}>Regístrate</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
