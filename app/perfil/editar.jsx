import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image as RNImage, TextInput, ScrollView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import estilos from "../../assets/estilos/estilos";
import { useAuth } from "../../assets/context/AuthContext";
import { useRouter } from "expo-router";

export default function EditarPerfil() {
  const { user, updateMe } = useAuth();
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [handle, setHandle]     = useState(user?.handle || "");
  const [nombre, setNombre]     = useState(user?.nombre || "");
  const [apellido, setApellido] = useState(user?.apellido || "");
  const [ubicacion, setUbicacion] = useState(user?.ubicacion || "");
  const [dia, setDia]   = useState(user?.nacimiento?.dia ? String(user.nacimiento.dia) : "");
  const [mes, setMes]   = useState(user?.nacimiento?.mes ? String(user.nacimiento.mes) : "");
  const [anio, setAnio] = useState(user?.nacimiento?.anio ? String(user.nacimiento.anio) : "");
  const [telefono, setTelefono] = useState(user?.telefono || "");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!user) return;
    const raw = user?.avatarUrl || "";
    const stamp = user?.updatedAt ? new Date(user.updatedAt).getTime() : "";
    const stamped = /^https?:\/\//.test(raw) && stamp ? `${raw}${raw.includes("?") ? "&" : "?"}v=${stamp}` : raw;
    setAvatarUrl(stamped);
    setHandle(user.handle || "");
    setNombre(user.nombre || "");
    setApellido(user.apellido || "");
    setUbicacion(user.ubicacion || "");
    setDia(user?.nacimiento?.dia ? String(user.nacimiento.dia) : "");
    setMes(user?.nacimiento?.mes ? String(user.nacimiento.mes) : "");
    setAnio(user?.nacimiento?.anio ? String(user.nacimiento.anio) : "");
    setTelefono(user.telefono || "");
  }, [user]);

  
  useEffect(() => {
    if (Platform.OS !== "web") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const showOk = (msg = "Perfil actualizado") => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const pickAvatar = () => {
    if (typeof document === "undefined") return;
    const inp = document.createElement("input");
    inp.type = "file";
    inp.accept = "image/*";
    inp.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => setAvatarUrl(String(reader.result || ""));
      reader.readAsDataURL(file);
    };
    inp.click();
  };

  const guardarFoto = async () => {
    if (!avatarUrl) return;
    const MAX_BASE64 = 6 * 1024 * 1024;
    if (avatarUrl.startsWith("data:") && avatarUrl.length > MAX_BASE64) {
      alert("La imagen es muy pesada. Sube una de máximo ~4MB.");
      return;
    }
    const resp = await updateMe({ avatarUrl });
    const newUrl = resp?.user?.avatarUrl || avatarUrl;
    let stamped = newUrl;
    if (/^https?:\/\//.test(newUrl)) {
      const ver = resp?.user?.updatedAt ? new Date(resp.user.updatedAt).getTime() : Date.now();
      stamped = `${newUrl}${newUrl.includes("?") ? "&" : "?"}v=${ver}`;
    }
    setAvatarUrl(stamped);
    showOk();
  };

  const guardarInfo = async () => {
    const nacimiento = {
      dia: Number(dia) || null,
      mes: Number(mes) || null,
      anio: Number(anio) || null,
    };
    await updateMe({ handle, nombre, apellido, ubicacion, nacimiento });
    showOk();
  };

  const guardarContacto = async () => {
    await updateMe({ telefono });
    showOk();
  };

  if (!user) return null;

  return (
    <View style={estilos.pantalla}>
      {/* Scroll interno sin barra visible */}
      <ScrollView
        contentContainerStyle={[estilos.scrollContenido, { paddingTop: 0, paddingBottom: 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[estilos.contenedorBlanco, estilos.editWrap, estilos.contenedorBlancoPadBottom]}>
            <View style={estilos.tallerHeader}>
              <Pressable onPress={() => router.back()} style={estilos.tallerBack} hitSlop={6}>
                <Ionicons name="chevron-back" size={22} color="#0B4F6C" />
             </Pressable>
             <Text style={estilos.tallerTitulo}>Editar perfil</Text>
             <View style={{ width: 22 }} />
           </View>
          <View style={estilos.editGrid}>
            {/* -------- LADO IZQUIERDO (guía) -------- */}
            <View style={estilos.editSide}>
              <Text style={estilos.sideTitle}>Editar perfil</Text>
              <Text style={estilos.sideItem}>Foto de perfil</Text>
              <Text style={estilos.sideItem}>Información</Text>
              <Text style={estilos.sideItem}>Datos de contacto</Text>
              <Pressable
                onPress={() => router.push("/perfil/ajustes")}
                style={({ pressed }) => [estilos.sideGroupPressable, pressed && estilos.sideGroupPressed]}
                accessibilityRole="link"
                accessibilityLabel="Ir a ajustes de la cuenta"
              >
               <Text style={[estilos.sideGroup, estilos.sideGroupLink]}>
                  Configuración de la cuenta
               </Text>
              </Pressable>
              <Text style={estilos.sideItem}>Correo electrónico</Text>
              <Text style={estilos.sideItem}>Contraseña</Text>
              <Text style={estilos.sideItem}>Idioma</Text>
            </View>

            {/* -------- CONTENIDO (solo 3 paneles) -------- */}
            <View style={estilos.editMain}>

              {/* FOTO DE PERFIL */}
              <View style={estilos.panel}>
                <Text style={estilos.panelTitle}>Foto de perfil</Text>
                <View style={[estilos.editRow, { marginBottom: 12 }]}>
                  {avatarUrl ? (
                    <RNImage source={{ uri: avatarUrl }} style={estilos.avatarLg} />
                  ) : (
                    <View style={estilos.avatarLg} />
                  )}
                  <Pressable onPress={pickAvatar} style={[estilos.boton, estilos.botonOutline]}>
                    <Text style={estilos.botonOutlineTxt}>Sube imagen</Text>
                  </Pressable>
                </View>
                <Pressable onPress={guardarFoto} style={[estilos.boton, estilos.botonAzul, estilos.saveBtn]}>
                  <View style={estilos.saveBtnInner}>
                  <Text style={estilos.textoBoton}>Guardar</Text>
                  </View>
                </Pressable>
              </View>

              {/* INFORMACIÓN */}
              <View style={estilos.panel}>
                <Text style={estilos.panelTitle}>Información</Text>

                <Text style={estilos.label}>Usuario *</Text>
                <TextInput
                  value={handle}
                  onChangeText={setHandle}
                  placeholder="@usuario"
                  style={[estilos.input, estilos.inputWide]}
                  placeholderTextColor="#9DB7C5"
                />

                <View style={[estilos.editRow, { marginTop: 10 }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={estilos.label}>Nombre</Text>
                    <TextInput
                      value={nombre}
                      onChangeText={setNombre}
                      style={estilos.input}
                      placeholder="Nombre"
                      placeholderTextColor="#9DB7C5"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={estilos.label}>Apellido</Text>
                    <TextInput
                      value={apellido}
                      onChangeText={setApellido}
                      style={estilos.input}
                      placeholder="Apellido"
                      placeholderTextColor="#9DB7C5"
                    />
                  </View>
                </View>

                <Text style={[estilos.label, { marginTop: 10 }]}>Ubicación</Text>
                <TextInput
                  value={ubicacion}
                  onChangeText={setUbicacion}
                  style={[estilos.input, estilos.inputWide]}
                  placeholder="Bogotá, Colombia"
                  placeholderTextColor="#9DB7C5"
                />

                <Text style={[estilos.label, { marginTop: 10 }]}>Fecha de nacimiento</Text>
                <View style={estilos.editRow}>
                  <TextInput value={mes}  onChangeText={setMes}  placeholder="Mes"  style={[estilos.input, { width: 90 }]}  placeholderTextColor="#9DB7C5" keyboardType="numeric" />
                  <TextInput value={dia}  onChangeText={setDia}  placeholder="Día"  style={[estilos.input, { width: 90 }]}  placeholderTextColor="#9DB7C5" keyboardType="numeric" />
                  <TextInput value={anio} onChangeText={setAnio} placeholder="Año"  style={[estilos.input, { width: 110 }]} placeholderTextColor="#9DB7C5" keyboardType="numeric" />
                </View>

                <Pressable onPress={guardarInfo} style={[estilos.boton, estilos.botonAzul, estilos.saveBtn]}>
                  <View style={estilos.saveBtnInner}>
                  <Text style={estilos.textoBoton}>Guardar</Text>
                  </View>
                </Pressable>
              </View>

              {/* DATOS DE CONTACTO */}
              <View style={estilos.panel}>
                <Text style={estilos.panelTitle}>Datos de contacto</Text>

                <Text style={estilos.label}>Teléfono</Text>
                <TextInput
                  value={telefono}
                  onChangeText={setTelefono}
                  style={[estilos.input, estilos.inputWide]}
                  placeholder="3000000000"
                  placeholderTextColor="#9DB7C5"
                  keyboardType="phone-pad"
                />

                <Text style={[estilos.label, { marginTop: 10 }]}>Correo electrónico</Text>
                <TextInput
                  editable={false}
                  value={user?.email || ""}
                  style={[estilos.input, estilos.inputWide, { opacity: 0.7 }]}
                />

                <Pressable onPress={guardarContacto} style={[estilos.boton, estilos.botonAzul, estilos.saveBtn]}>
                  <View style={estilos.saveBtnInner}>
                  <Text style={estilos.textoBoton}>Guardar</Text>
                  </View>
                </Pressable>
              </View>

              
            </View>
          </View>
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
