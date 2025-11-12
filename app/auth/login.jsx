import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import estilos from "../../assets/estilos/estilos";
import { useAuth } from "../../assets/context/AuthContext";

export default function Login() {
  const { redirect } = useLocalSearchParams();
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async () => {
    setErr("");
    try {
      const { status, message } = await login(email, password);
      if (!status) return setErr(message || "Error al iniciar sesión");
      router.replace(redirect || "/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <View style={estilos.pantalla}>
      <View style={[estilos.contenedorBlanco, estilos.authCard]}>
        <Text style={estilos.authTitle}>Inicia sesión</Text>

        <Text style={estilos.inputLabel}>Correo</Text>
        <TextInput
          style={estilos.authInput}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={estilos.inputLabel}>Contraseña</Text>
        <TextInput
          style={estilos.authInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {!!err && <Text style={{ color: "crimson", marginTop: 10 }}>{err}</Text>}

        <Pressable onPress={onSubmit} style={[estilos.navBtn, estilos.navBtnFill, { alignSelf: "flex-start", marginTop: 14 }]}>
          <Text style={estilos.navBtnFillTxt}>Entrar</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/auth/register")} style={{ marginTop: 10 }}>
          <Text style={estilos.authUnderline}>¿No tienes cuenta? Regístrate</Text>
        </Pressable>
      </View>
    </View>
  );
}
