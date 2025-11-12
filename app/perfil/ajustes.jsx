import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import estilos from "../../assets/estilos/estilos";
import { useAuth } from "../../assets/context/AuthContext";

export default function AjustesPerfil() {
  const router = useRouter();
  const { user, updateEmail, updatePassword, updateMe } = useAuth();

  const [toast, setToast] = useState("");

  // --- Correo ---
  const [email, setEmail] = useState(user?.email || "");
  const [pwdConf, setPwdConf] = useState("");

  // --- Password ---
  const [currPwd, setCurrPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [repPwd, setRepPwd] = useState("");

  // --- Idioma ---
  const idiomas = [
    { code: "es", label: "Español" },
    { code: "en", label: "Inglés" },
    { code: "pt", label: "Portugués" },
  ];
  const [idioma, setIdioma] = useState(user?.idioma || "es");
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    setEmail(user?.email || "");
    setIdioma(user?.idioma || "es");
  }, [user]);

  const ok = (m = "Guardado correctamente") => {
    setToast(m);
    setTimeout(() => setToast(""), 2000);
  };
  const fail = (m = "Error al guardar") => {
    setToast(m);
    setTimeout(() => setToast(""), 2200);
  };

  const guardarCorreo = async () => {
    try {
      if (!email?.includes("@")) return fail("Email inválido");
      if (!pwdConf) return fail("Escribe tu contraseña");
      const { status, message } = await updateEmail({ email, password: pwdConf });
      if (!status) return fail(message || "No se pudo actualizar el correo");
      setPwdConf("");
      ok("Correo actualizado");
    } catch (e) { fail(); }
  };

  const guardarPassword = async () => {
    try {
      if (!currPwd || !newPwd || !repPwd) return fail("Completa todos los campos");
      if (newPwd.length < 6) return fail("La nueva contraseña debe tener 6+ caracteres");
      if (newPwd !== repPwd) return fail("Las contraseñas no coinciden");
      const { status, message } = await updatePassword({ current: currPwd, next: newPwd });
      if (!status) return fail(message || "No se pudo cambiar la contraseña");
      setCurrPwd(""); setNewPwd(""); setRepPwd("");
      ok("Contraseña actualizada");
    } catch { fail(); }
  };

  const guardarIdioma = async () => {
    try {
      await updateMe({ idioma });
      ok("Idioma actualizado");
    } catch { fail(); }
  };

  if (!user) return null;

  return (
    <View style={estilos.pantalla}>
      <ScrollView contentContainerStyle={estilos.scrollContenido} showsVerticalScrollIndicator={false}>
        <View style={[estilos.contenedorBlanco, estilos.editWrap, estilos.contenedorBlancoPadBottom]}>
          
        <View style={estilos.tallerHeader}>
          <Pressable onPress={() => router.back()} style={estilos.tallerBack} hitSlop={6}>
            <Ionicons name="chevron-back" size={22} color="#0B4F6C" />
         </Pressable>
         <Text style={estilos.tallerTitulo}>Ajustes de la cuenta</Text>
         <View style={{ width: 22 }} />
       </View>
          <View style={estilos.editGrid}>
          {/* -------- SIDEBAR -------- */}
          <View style={estilos.editSide}>
            <Pressable onPress={() => router.push("/perfil/editar")} accessibilityRole="link">
              <Text style={estilos.sideTitle}>Editar perfil</Text>
            </Pressable>

   
            <Text style={estilos.sideItem}>Foto de perfil</Text>
            <Text style={estilos.sideItem}>Información</Text>
            <Text style={estilos.sideItem}>Datos de contacto</Text>

            <Text style={estilos.sideGroup}>Configuración de la cuenta</Text>
            <Text style={[estilos.sideItem, estilos.sideItemActive]}>Correo electrónico</Text>
            <Text style={[estilos.sideItem, estilos.sideItemActive]}>Contraseña</Text>
            <Text style={[estilos.sideItem, estilos.sideItemActive]}>Idioma</Text>
          </View>

            {/* -------- CONTENIDO -------- */}
            <View style={estilos.editMain}>
              {/* Correo */}
              <View style={estilos.panel}>
                <Text style={estilos.panelTitle}>Correo electrónico</Text>
                <Text style={estilos.label}>Correo electrónico</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  style={[estilos.input, estilos.inputWide]}
                  placeholder="ejemplo@gmail.com"
                  placeholderTextColor="#9DB7C5"
                  keyboardType="email-address"
                />
                <Text style={[estilos.label, { marginTop: 8 }]}>Contraseña</Text>
                <TextInput
                  value={pwdConf}
                  onChangeText={setPwdConf}
                  style={[estilos.input, estilos.inputWide]}
                  placeholder="••••••••"
                  placeholderTextColor="#9DB7C5"
                  secureTextEntry
                />
                <Pressable onPress={guardarCorreo} style={[estilos.boton, estilos.botonAzul, estilos.saveBtn]}>
                  <View style={estilos.saveBtnInner}><Text style={estilos.textoBoton}>Guardar</Text></View>
                </Pressable>
              </View>

              {/* Contraseña */}
              <View style={estilos.panel}>
                <Text style={estilos.panelTitle}>Contraseña</Text>
                <Text style={estilos.label}>Contraseña actual</Text>
                <TextInput
                  value={currPwd}
                  onChangeText={setCurrPwd}
                  style={[estilos.input, estilos.inputWide]}
                  placeholder="••••••••"
                  placeholderTextColor="#9DB7C5"
                  secureTextEntry
                />
                <Text style={[estilos.label, { marginTop: 8 }]}>Contraseña nueva</Text>
                <TextInput
                  value={newPwd}
                  onChangeText={setNewPwd}
                  style={[estilos.input, estilos.inputWide]}
                  placeholder="••••••••"
                  placeholderTextColor="#9DB7C5"
                  secureTextEntry
                />
                <Text style={[estilos.label, { marginTop: 8 }]}>Repite la contraseña</Text>
                <TextInput
                  value={repPwd}
                  onChangeText={setRepPwd}
                  style={[estilos.input, estilos.inputWide]}
                  placeholder="••••••••"
                  placeholderTextColor="#9DB7C5"
                  secureTextEntry
                />
                <Pressable onPress={guardarPassword} style={[estilos.boton, estilos.botonAzul, estilos.saveBtn]}>
                  <View style={estilos.saveBtnInner}><Text style={estilos.textoBoton}>Guardar</Text></View>
                </Pressable>
              </View>

              {/* Idioma */}
              <View style={estilos.panel}>
                <Text style={estilos.panelTitle}>Idioma</Text>
                <Text style={estilos.label}>Idioma</Text>

                {/* Select simple */}
                <Pressable
                  onPress={() => setLangOpen(o => !o)}
                  style={[estilos.input, { width: 180, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}
                >
                  <Text style={{ color: "#0B4F6C", fontWeight: "700" }}>
                    {idiomas.find(x => x.code === idioma)?.label || "Español"}
                  </Text>
                  <Ionicons name={langOpen ? "chevron-up" : "chevron-down"} size={16} color="#0B4F6C" />
                </Pressable>

                {langOpen && (
                  <View style={{ marginTop: 6, borderWidth: 1, borderColor: "#DDEAF5", borderRadius: 10, backgroundColor: "#F6FAFF", width: 180 }}>
                    {idiomas.map(x => (
                      <Pressable key={x.code} onPress={() => { setIdioma(x.code); setLangOpen(false); }}
                        style={{ paddingVertical: 8, paddingHorizontal: 10 }}>
                        <Text style={{ color: "#0B4F6C", fontWeight: idioma === x.code ? "800" : "600" }}>{x.label}</Text>
                      </Pressable>
                    ))}
                  </View>
                )}

                <Pressable onPress={guardarIdioma} style={[estilos.boton, estilos.botonAzul, estilos.saveBtn]}>
                  <View style={estilos.saveBtnInner}><Text style={estilos.textoBoton}>Guardar</Text></View>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Toast OK / error */}
      {!!toast && (
        <View style={[estilos.toast, estilos.toastOk]}>
          <Ionicons name="checkmark-circle" size={16} color="#fff" />
          <Text style={estilos.toastTxt}>&nbsp;{toast}</Text>
        </View>
      )}
    </View>
  );
}
