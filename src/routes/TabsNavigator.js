import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 8);
  const isSantander = user?.empresa?.toLowerCase() === "santander";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#F5F5F5",
          height: 52 + bottomInset,
          paddingTop: 2,
          paddingBottom: bottomInset,
        },

        tabBarBackground: () => (
          <View style={styles.tabBarBackground}>
            <View
              style={[
                styles.tabBarMainBackground,
                { bottom: bottomInset > 0 ? bottomInset : 0 },
              ]}
            />
            <View
              style={[
                styles.nativeButtonsBackground,
                { height: bottomInset > 0 ? bottomInset : 0 },
              ]}
            />
          </View>
        ),
        tabBarItemStyle: {
          paddingVertical: 0,
        },

        tabBarActiveTintColor: "#f5f5f5e3",
        tabBarInactiveTintColor: "#000000aa",
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 11,
          lineHeight: 12,
          marginTop: -1,
          marginBottom: 0,
        },

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
            tabBarButton: (props) => (
              <ButtonSantander
                {...props}
                bottomInset={bottomInset}
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
    top: 0,
    bottom: 0,
  },
  tabBarMainBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: CORES.PRIMARY,
    borderTopWidth: 1.5,
    borderTopColor: "#ffffff",
  },
  nativeButtonsBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#F5F5F5",
  },
});
