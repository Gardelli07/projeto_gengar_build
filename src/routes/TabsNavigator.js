import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CORES from "../util/cores";

import Home from "../pages/Home";
import Comunidade from "../pages/Comunidade";
import Login from "../pages/Login";
import HomeSantander from "../pages/santander";

import { useAuth } from "../context/AuthContext";
import { Empresas } from "../util/images";
import ButtonSantander from "./Empresas/ButtonSantander";

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  const { user } = useAuth();
  const isSantander = user?.empresa?.toLowerCase() === "santander";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: CORES.PRIMARY,
          height: 50,

          // REMOVE SOMBRA
          elevation: 0, // Android
          shadowColor: "transparent", // iOS
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,

          borderTopWidth: 0,
        },

        tabBarBackground: () => <View style={styles.tabBarBackground} />,

        tabBarActiveTintColor: "#f5f5f5e3",
        tabBarInactiveTintColor: "#000000aa",
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 12 },

        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: "home",
            Comunidade: "comment",
            Login: "login",
          };

          if (!icons[route.name]) return null;

          return (
            <MaterialCommunityIcons
              name={icons[route.name]}
              size={size ?? 26}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Comunidade" component={Comunidade} />
      <Tab.Screen name="Login" component={Login} />

      {isSantander && (
        <Tab.Screen
          name="HomeSantander"
          component={HomeSantander}
          options={{
            tabBarLabel: "",
            tabBarButton: ({ onPress }) => (
              <ButtonSantander
                onPress={onPress}
                source={Empresas.logoSantander}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: CORES.PRIMARY,
    borderTopWidth: 1.5,
    borderTopColor: "#ffffff",
  },
});
