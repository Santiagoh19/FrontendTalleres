import React from "react";
import { Stack, usePathname } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "../assets/context/AuthContext"; // ✅ default
import NavBar from "../assets/componentes/NavBar";

export default function RootLayout() {
  const pathname = usePathname();
  const hideNav =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");

  return (
    <SafeAreaProvider>
      <AuthProvider>
        {!hideNav && <NavBar />}
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
