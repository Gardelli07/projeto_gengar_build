import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeAccessToken } from "../services/api";

const AuthContext = createContext(null);
const USER_STORAGE_KEY = "@lingueto:user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(USER_STORAGE_KEY)
      .then((raw) => {
        if (raw) setUser(JSON.parse(raw));
      })
      .catch(() => {})
      .finally(() => setCarregando(false));
  }, []);

  function signIn(userData) {
    setUser(userData);
    AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  }

  function updateUser(dadosParciais) {
    setUser((prev) => {
      const next = { ...prev, ...dadosParciais };
      AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function signOut() {
    setUser(null);
    AsyncStorage.removeItem(USER_STORAGE_KEY);
    removeAccessToken();
  }

  return (
    <AuthContext.Provider
      value={{ user, carregando, signIn, updateUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
