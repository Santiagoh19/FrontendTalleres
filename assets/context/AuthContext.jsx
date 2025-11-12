import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export default function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // <- clave para la NavBar
  const isAuth = !!token;

  const saveSession = (tk, u) => {
    setToken(tk || null);
    setUser(u || null);
    if (tk) localStorage.setItem("tk", tk);
    else localStorage.removeItem("tk");
    
    if (tk) api.defaults.headers.common.Authorization = `Bearer ${tk}`;
    else delete api.defaults.headers.common.Authorization;
  };

  const refreshMe = async () => {
    try {
      const tk = localStorage.getItem("tk");
      if (!tk) { saveSession(null, null); return; }
      api.defaults.headers.common.Authorization = `Bearer ${tk}`;
      const { data } = await api.get("/auth/me");
      if (data?.status) saveSession(tk, data.user);
      else saveSession(null, null);
    } catch {
      saveSession(null, null);
    }
  };

  const register = async (email, password) => {
    const { data } = await api.post("/auth/register", { email, password });
    if (data?.status) saveSession(data.token, data.user);
    return data;
  };

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    if (data?.status) saveSession(data.token, data.user);
    return data;
  };

 const updateMe = async (payload) => {
   const { data } = await api.put("/auth/me", payload);
   if (data?.status && data.user) {
  
   const u = data.user;
   const stampedUser = u?.avatarUrl ? { ...u, avatarStamp: Date.now() } : u;
   setUser(stampedUser);
   return { ...data, user: stampedUser };

  }
  return data;
  };

  const updateEmail = async ({ email, password }) => {
  const { data } = await api.put("/auth/email", { email, password });
  if (data?.status && data.user) setUser(data.user);
  return data; 
};

const updatePassword = async ({ current, next }) => {
  const { data } = await api.put("/auth/password", { current, next });
  return data; 
};

  const logout = () => saveSession(null, null);

  useEffect(() => {
    (async () => {
      await refreshMe();
      setLoading(false);
    })();
  }, []);

  return (
    <Ctx.Provider
      value={{
        user, token, isAuth, loading,
        register, login, logout, refreshMe, setUser, updateMe, updateEmail, updatePassword,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
