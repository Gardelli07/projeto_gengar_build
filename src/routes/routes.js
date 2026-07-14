import * as React from "react";
import { Image, TouchableOpacity, BackHandler } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";
import CORES from "../util/cores";

import TabsNavigator from "./TabsNavigator";

/* ===== PÁGINAS ===== */
// padrão
import SplashScreen from "../pages/SplashScreen";
import Login from "../pages/Login";
import PlacementFlow from "../pages/PlacementFlow";
import InglesCompletoHome, { lessonScreens as inglesCompletoA0A1LessonScreens } from "../pages/aulas/completo/A0-A1";
import InglesCompletoA2Home, { lessonScreens as inglesCompletoA2LessonScreens } from "../pages/aulas/completo/A2";
import InglesCompletoB1Home, { lessonScreens as inglesCompletoB1LessonScreens } from "../pages/aulas/completo/B1";
import BussinesHome, { lessonScreens as bussinesA1LessonScreens } from "../pages/aulas/bussines/A1";
import BussinesB1Home, { lessonScreens as bussinesB1LessonScreens } from "../pages/aulas/bussines/B1";
import TravelHome, { lessonScreens as travelA1LessonScreens } from "../pages/aulas/viagem/A1";
import { lessonScreens as aulasPlusLessonScreens } from "../pages/aulas/aulasplus";

// Business

// Completo

// Santander
import HomeSantander from "../pages/santander";
import HomeCRM from "../pages/santander/crm/HomeCRM";
import CRM1 from "../pages/santander/crm/CRM1";

const Stack = createNativeStackNavigator();

/* ===== HEADER PADRÃO ===== */
const defaultHeader = {
  headerStyle: { backgroundColor: CORES.PRIMARY },
  headerTintColor: "#fff",
};

function renderLessonScreens(lessonScreens) {
  return Object.entries(lessonScreens).map(([screenName, Screen]) => (
    <Stack.Screen
      key={screenName}
      name={screenName}
      component={Screen}
      options={{ headerShown: false }}
    />
  ));
}

/* ================= STACK NAVIGATOR ================= */
export default function Routes() {
  const navigationRef = React.useRef();

  React.useEffect(() => {
    const onBackPress = () => {
      const current = navigationRef.current?.getCurrentRoute?.();
      if (current?.name === "Bussines") {
        navigationRef.current.navigate("Tabs", { screen: "Home" });
        return true;
      }
      return false;
    };

    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Splash">
        {/* ===== TABS ===== */}
        <Stack.Screen
          name="Tabs"
          component={TabsNavigator}
          options={({ navigation }) => ({
            header: () => (
              <Appbar.Header
                style={{
                  backgroundColor: CORES.PRIMARY,
                  height: 55,
                  paddingHorizontal: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Tabs", { screen: "Home" })
                  }
                >
                  <Image
                    source={require("../../assets/logo.png")}
                    style={{ width: 45, height: 45 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <Appbar.Content
                  title="Lingueto"
                  titleStyle={{
                    color: "#ffffff",
                    fontWeight: "bold",
                    paddingHorizontal: 5,
                  }}
                />
              </Appbar.Header>
            ),
          })}
        />

        {/* ===== BUSINESS ===== */}
        <Stack.Screen
          name="Bussines"
          component={BussinesHome}
          options={{
            title: "Business English",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(bussinesA1LessonScreens)}
        <Stack.Screen
          name="BussinesB1"
          component={BussinesB1Home}
          options={{
            title: "Business English B1",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(bussinesB1LessonScreens)}

        {/* ===== TRAVEL ===== */}
        <Stack.Screen
          name="TravelEnglish"
          component={TravelHome}
          options={{
            title: "Ingles para viagem",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(travelA1LessonScreens)}

        {/* ===== COMPLETO ===== */}
        <Stack.Screen
          name="Inglescompleto"
          component={InglesCompletoHome}
          options={{
            title: "Inglês Completo",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="InglescompletoA2"
          component={InglesCompletoA2Home}
          options={{
            title: "Inglês Completo A2",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="InglescompletoB1"
          component={InglesCompletoB1Home}
          options={{
            title: "Inglês Completo B1",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(inglesCompletoB1LessonScreens)}
        {renderLessonScreens(inglesCompletoA2LessonScreens)}

        {renderLessonScreens(inglesCompletoA0A1LessonScreens)}

        {/* ===== AULAS PLUS ===== */}
        {renderLessonScreens(aulasPlusLessonScreens)}

        {/* ===== SANTANDER ===== */}
        <Stack.Screen
          name="HomeSantander"
          component={HomeSantander}
          options={{
            title: "área Santander",
            headerStyle: { backgroundColor: "#EC0000" },
            headerTintColor: "#F3F4F6",
          }}
        />

        <Stack.Screen
          name="HomeCRM"
          component={HomeCRM}
          options={{
            title: "CRM",
            headerStyle: { backgroundColor: "#EC0000" },
            headerTintColor: "#F3F4F6",
          }}
        />

        <Stack.Screen
          name="CRM1"
          component={CRM1}
          options={{
            title: "CRM",
            headerStyle: { backgroundColor: "#EC0000" },
            headerTintColor: "#F3F4F6",
          }}
        />

        {/* ===== AUTENTICAÇÃO ===== */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PlacementFlow"
          component={PlacementFlow}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
