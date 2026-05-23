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
import InglesCompletoHome from "../pages/aulas/completo/A0-A1";
import InglesCompletoA2Home from "../pages/aulas/completo/A2";
import InglesCompletoB1Home from "../pages/aulas/completo/B1";
import BussinesHome from "../pages/aulas/bussines/A1";
import BussinesB1Home from "../pages/aulas/bussines/B1";
import TravelHome from "../pages/aulas/viagem/A1";

// Business
import A1BU1 from "../pages/aulas/bussines/A1/A1BU1";
import A1BU2 from "../pages/aulas/bussines/A1/A1BU2";
import A1BU3 from "../pages/aulas/bussines/A1/A1BU3";
import A1BU4 from "../pages/aulas/bussines/A1/A1BU4";
import A1BU5 from "../pages/aulas/bussines/A1/A1BU5";
import A1BU6 from "../pages/aulas/bussines/A1/A1BU6";
import A1BU7 from "../pages/aulas/bussines/A1/A1BU7";
import A1BU8 from "../pages/aulas/bussines/A1/A1BU8";
import A1BU9 from "../pages/aulas/bussines/A1/A1BU9";
import A1BU10 from "../pages/aulas/bussines/A1/A1BU10";
import A1BU11 from "../pages/aulas/bussines/A1/A1BU11";
import A1BU12 from "../pages/aulas/bussines/A1/A1BU12";
import A1BU13 from "../pages/aulas/bussines/A1/A1BU13";
import A1BU14 from "../pages/aulas/bussines/A1/A1BU14";
import A1BU15 from "../pages/aulas/bussines/A1/A1BU15";
import A1BU16 from "../pages/aulas/bussines/A1/A1BU16";
import A1BU17 from "../pages/aulas/bussines/A1/A1BU17";
import A1BU18 from "../pages/aulas/bussines/A1/A1BU18";
import A1BU19 from "../pages/aulas/bussines/A1/A1BU19";
import A1BU20 from "../pages/aulas/bussines/A1/A1BU20";
import B1BU1 from "../pages/aulas/bussines/B1/B1BU1";
import B1BU2 from "../pages/aulas/bussines/B1/B1BU2";
import B1BU3 from "../pages/aulas/bussines/B1/B1BU3";
import B1BU4 from "../pages/aulas/bussines/B1/B1BU4";
import B1BU5 from "../pages/aulas/bussines/B1/B1BU5";
import B1BU6 from "../pages/aulas/bussines/B1/B1BU6";
import B1BU7 from "../pages/aulas/bussines/B1/B1BU7";
import B1BU8 from "../pages/aulas/bussines/B1/B1BU8";
import B1BU9 from "../pages/aulas/bussines/B1/B1BU9";
import B1BU10 from "../pages/aulas/bussines/B1/B1BU10";
import B1BU11 from "../pages/aulas/bussines/B1/B1BU11";
import B1BU12 from "../pages/aulas/bussines/B1/B1BU12";
import B1BU13 from "../pages/aulas/bussines/B1/B1BU13";
import B1BU14 from "../pages/aulas/bussines/B1/B1BU14";
import B1BU15 from "../pages/aulas/bussines/B1/B1BU15";
import B1BU16 from "../pages/aulas/bussines/B1/B1BU16";
import B1BU17 from "../pages/aulas/bussines/B1/B1BU17";
import B1BU18 from "../pages/aulas/bussines/B1/B1BU18";
import B1BU19 from "../pages/aulas/bussines/B1/B1BU19";
import B1BU20 from "../pages/aulas/bussines/B1/B1BU20";
import A1TR1 from "../pages/aulas/viagem/A1/A1TR1";
import A1TR2 from "../pages/aulas/viagem/A1/A1TR2";
import A1TR3 from "../pages/aulas/viagem/A1/A1TR3";
import A1TR4 from "../pages/aulas/viagem/A1/A1TR4";
import A1TR5 from "../pages/aulas/viagem/A1/A1TR5";
import A1TR6 from "../pages/aulas/viagem/A1/A1TR6";
import A1TR7 from "../pages/aulas/viagem/A1/A1TR7";
import A1TR8 from "../pages/aulas/viagem/A1/A1TR8";
import A1TR9 from "../pages/aulas/viagem/A1/A1TR9";
import A1TR10 from "../pages/aulas/viagem/A1/A1TR10";
import A1TR11 from "../pages/aulas/viagem/A1/A1TR11";
import A1TR12 from "../pages/aulas/viagem/A1/A1TR12";
import A1TR13 from "../pages/aulas/viagem/A1/A1TR13";
import A1TR14 from "../pages/aulas/viagem/A1/A1TR14";
import A1TR15 from "../pages/aulas/viagem/A1/A1TR15";
import A1TR16 from "../pages/aulas/viagem/A1/A1TR16";
import A1TR17 from "../pages/aulas/viagem/A1/A1TR17";
import A1TR18 from "../pages/aulas/viagem/A1/A1TR18";
import A1TR19 from "../pages/aulas/viagem/A1/A1TR19";
import A1TR20 from "../pages/aulas/viagem/A1/A1TR20";
import A1TR21 from "../pages/aulas/viagem/A1/A1TR21";
import A1TR22 from "../pages/aulas/viagem/A1/A1TR22";
import A1TR23 from "../pages/aulas/viagem/A1/A1TR23";
import A1TR24 from "../pages/aulas/viagem/A1/A1TR24";
import A1TR25 from "../pages/aulas/viagem/A1/A1TR25";
import A1TR26 from "../pages/aulas/viagem/A1/A1TR26";

// Completo
import IC01 from "../pages/aulas/completo/A0-A1/IC01";
import IC02 from "../pages/aulas/completo/A0-A1/IC02";
import IC03 from "../pages/aulas/completo/A0-A1/IC03";
import IC04 from "../pages/aulas/completo/A0-A1/IC04";
import IC05 from "../pages/aulas/completo/A0-A1/IC05";
import IC06 from "../pages/aulas/completo/A0-A1/IC06";
import IC07 from "../pages/aulas/completo/A0-A1/IC07";
import IC08 from "../pages/aulas/completo/A0-A1/IC08";
import IC09 from "../pages/aulas/completo/A0-A1/IC09";
import IC10 from "../pages/aulas/completo/A0-A1/IC10";
import IC11 from "../pages/aulas/completo/A0-A1/IC11";
import IC12 from "../pages/aulas/completo/A0-A1/IC12";
import IC13 from "../pages/aulas/completo/A0-A1/IC13";
import IC14 from "../pages/aulas/completo/A0-A1/IC14";
import IC15 from "../pages/aulas/completo/A0-A1/IC15";
import IC16 from "../pages/aulas/completo/A0-A1/IC16";
import IC17 from "../pages/aulas/completo/A0-A1/IC17";
import IC18 from "../pages/aulas/completo/A0-A1/IC18";
import IC19 from "../pages/aulas/completo/A0-A1/IC19";
import IC20 from "../pages/aulas/completo/A0-A1/IC20";
import IC21 from "../pages/aulas/completo/A0-A1/IC21";
import IC22 from "../pages/aulas/completo/A0-A1/IC22";
import IC23 from "../pages/aulas/completo/A0-A1/IC23";
import IC24 from "../pages/aulas/completo/A0-A1/IC24";
import IC25 from "../pages/aulas/completo/A0-A1/IC25";
import IC26 from "../pages/aulas/completo/A0-A1/IC26";
import IC27 from "../pages/aulas/completo/A0-A1/IC27";
import IC28 from "../pages/aulas/completo/A0-A1/IC28";
import IC29 from "../pages/aulas/completo/A0-A1/IC29";
import IC30 from "../pages/aulas/completo/A0-A1/IC30";
import IC31 from "../pages/aulas/completo/A0-A1/IC31";
import IC32 from "../pages/aulas/completo/A0-A1/IC32";
import IC33 from "../pages/aulas/completo/A0-A1/IC33";
import IC34 from "../pages/aulas/completo/A0-A1/IC34";
import IC35 from "../pages/aulas/completo/A0-A1/IC35";
import IC36 from "../pages/aulas/completo/A0-A1/IC36";
import IC37 from "../pages/aulas/completo/A0-A1/IC37";
import IC38 from "../pages/aulas/completo/A0-A1/IC38";
import IC39 from "../pages/aulas/completo/A0-A1/IC39";
import IC40 from "../pages/aulas/completo/A0-A1/IC40";
import IC41 from "../pages/aulas/completo/A0-A1/IC41";
import IC42 from "../pages/aulas/completo/A0-A1/IC42";
import IC43 from "../pages/aulas/completo/A0-A1/IC43";
import A2IC01 from "../pages/aulas/completo/A2/A2IC01";
import A2IC02 from "../pages/aulas/completo/A2/A2IC02";
import A2IC03 from "../pages/aulas/completo/A2/A2IC03";
import A2IC04 from "../pages/aulas/completo/A2/A2IC04";
import A2IC05 from "../pages/aulas/completo/A2/A2IC05";
import A2IC06 from "../pages/aulas/completo/A2/A2IC06";
import A2IC07 from "../pages/aulas/completo/A2/A2IC07";
import A2IC08 from "../pages/aulas/completo/A2/A2IC08";
import A2IC09 from "../pages/aulas/completo/A2/A2IC09";
import A2IC10 from "../pages/aulas/completo/A2/A2IC10";
import A2IC11 from "../pages/aulas/completo/A2/A2IC11";
import A2IC12 from "../pages/aulas/completo/A2/A2IC12";
import A2IC13 from "../pages/aulas/completo/A2/A2IC13";
import A2IC14 from "../pages/aulas/completo/A2/A2IC14";
import A2IC15 from "../pages/aulas/completo/A2/A2IC15";
import A2IC16 from "../pages/aulas/completo/A2/A2IC16";
import A2IC17 from "../pages/aulas/completo/A2/A2IC17";
import A2IC18 from "../pages/aulas/completo/A2/A2IC18";
import A2IC19 from "../pages/aulas/completo/A2/A2IC19";
import A2IC20 from "../pages/aulas/completo/A2/A2IC20";
import A2IC21 from "../pages/aulas/completo/A2/A2IC21";
import A2IC22 from "../pages/aulas/completo/A2/A2IC22";
import A2IC23 from "../pages/aulas/completo/A2/A2IC23";
import A2IC24 from "../pages/aulas/completo/A2/A2IC24";
import A2IC25 from "../pages/aulas/completo/A2/A2IC25";
import A2IC26 from "../pages/aulas/completo/A2/A2IC26";
import A2IC27 from "../pages/aulas/completo/A2/A2IC27";
import A2IC28 from "../pages/aulas/completo/A2/A2IC28";
import A2IC29 from "../pages/aulas/completo/A2/A2IC29";
import A2IC30 from "../pages/aulas/completo/A2/A2IC30";
import A2IC31 from "../pages/aulas/completo/A2/A2IC31";
import A2IC32 from "../pages/aulas/completo/A2/A2IC32";
import A2IC33 from "../pages/aulas/completo/A2/A2IC33";
import A2IC34 from "../pages/aulas/completo/A2/A2IC34";
import A2IC35 from "../pages/aulas/completo/A2/A2IC35";
import A2IC36 from "../pages/aulas/completo/A2/A2IC36";
import A2IC37 from "../pages/aulas/completo/A2/A2IC37";
import A2IC38 from "../pages/aulas/completo/A2/A2IC38";
import A2IC39 from "../pages/aulas/completo/A2/A2IC39";
import A2IC40 from "../pages/aulas/completo/A2/A2IC40";
import A2IC41 from "../pages/aulas/completo/A2/A2IC41";
import A2IC42 from "../pages/aulas/completo/A2/A2IC42";
import A2IC43 from "../pages/aulas/completo/A2/A2IC43";
import A2IC44 from "../pages/aulas/completo/A2/A2IC44";
import A2IC45 from "../pages/aulas/completo/A2/A2IC45";
import A2IC46 from "../pages/aulas/completo/A2/A2IC46";
import A2IC47 from "../pages/aulas/completo/A2/A2IC47";
import A2IC48 from "../pages/aulas/completo/A2/A2IC48";
import A2IC49 from "../pages/aulas/completo/A2/A2IC49";
import A2IC50 from "../pages/aulas/completo/A2/A2IC50";
import A2IC51 from "../pages/aulas/completo/A2/A2IC51";
import A2IC52 from "../pages/aulas/completo/A2/A2IC52";
import A2IC53 from "../pages/aulas/completo/A2/A2IC53";
import A2IC54 from "../pages/aulas/completo/A2/A2IC54";
import A2IC55 from "../pages/aulas/completo/A2/A2IC55";
import A2IC56 from "../pages/aulas/completo/A2/A2IC56";
import A2IC57 from "../pages/aulas/completo/A2/A2IC57";
import A2IC58 from "../pages/aulas/completo/A2/A2IC58";
import A2IC59 from "../pages/aulas/completo/A2/A2IC59";
import A2IC60 from "../pages/aulas/completo/A2/A2IC60";
import A2IC61 from "../pages/aulas/completo/A2/A2IC61";
import A2IC62 from "../pages/aulas/completo/A2/A2IC62";
import A2IC63 from "../pages/aulas/completo/A2/A2IC63";
import A2IC64 from "../pages/aulas/completo/A2/A2IC64";
import A2IC65 from "../pages/aulas/completo/A2/A2IC65";
import A2IC66 from "../pages/aulas/completo/A2/A2IC66";
import A2IC67 from "../pages/aulas/completo/A2/A2IC67";
import A2IC68 from "../pages/aulas/completo/A2/A2IC68";
import A2IC69 from "../pages/aulas/completo/A2/A2IC69";
import A2IC70 from "../pages/aulas/completo/A2/A2IC70";
import A2IC71 from "../pages/aulas/completo/A2/A2IC71";
import A2IC72 from "../pages/aulas/completo/A2/A2IC72";
import A2IC73 from "../pages/aulas/completo/A2/A2IC73";
import A2IC74 from "../pages/aulas/completo/A2/A2IC74";
import B1IC01 from "../pages/aulas/completo/B1/B1IC01";
import B1IC02 from "../pages/aulas/completo/B1/B1IC02";
import B1IC03 from "../pages/aulas/completo/B1/B1IC03";
import B1IC04 from "../pages/aulas/completo/B1/B1IC04";
import B1IC05 from "../pages/aulas/completo/B1/B1IC05";
import B1IC06 from "../pages/aulas/completo/B1/B1IC06";
import B1IC07 from "../pages/aulas/completo/B1/B1IC07";
import B1IC08 from "../pages/aulas/completo/B1/B1IC08";
import B1IC09 from "../pages/aulas/completo/B1/B1IC09";
import B1IC10 from "../pages/aulas/completo/B1/B1IC10";
import B1IC11 from "../pages/aulas/completo/B1/B1IC11";
import B1IC12 from "../pages/aulas/completo/B1/B1IC12";
import B1IC13 from "../pages/aulas/completo/B1/B1IC13";
import B1IC14 from "../pages/aulas/completo/B1/B1IC14";
import B1IC15 from "../pages/aulas/completo/B1/B1IC15";
import B1IC16 from "../pages/aulas/completo/B1/B1IC16";
import B1IC17 from "../pages/aulas/completo/B1/B1IC17";
import B1IC18 from "../pages/aulas/completo/B1/B1IC18";
import B1IC19 from "../pages/aulas/completo/B1/B1IC19";
import B1IC20 from "../pages/aulas/completo/B1/B1IC20";
import B1IC21 from "../pages/aulas/completo/B1/B1IC21";
import B1IC22 from "../pages/aulas/completo/B1/B1IC22";
import B1IC23 from "../pages/aulas/completo/B1/B1IC23";
import B1IC24 from "../pages/aulas/completo/B1/B1IC24";
import B1IC25 from "../pages/aulas/completo/B1/B1IC25";
import B1IC26 from "../pages/aulas/completo/B1/B1IC26";
import B1IC27 from "../pages/aulas/completo/B1/B1IC27";
import B1IC28 from "../pages/aulas/completo/B1/B1IC28";
import B1IC29 from "../pages/aulas/completo/B1/B1IC29";
import B1IC30 from "../pages/aulas/completo/B1/B1IC30";
import B1IC31 from "../pages/aulas/completo/B1/B1IC31";
import B1IC32 from "../pages/aulas/completo/B1/B1IC32";
import B1IC33 from "../pages/aulas/completo/B1/B1IC33";
import B1IC34 from "../pages/aulas/completo/B1/B1IC34";
import B1IC35 from "../pages/aulas/completo/B1/B1IC35";
import B1IC36 from "../pages/aulas/completo/B1/B1IC36";
import B1IC37 from "../pages/aulas/completo/B1/B1IC37";
import B1IC38 from "../pages/aulas/completo/B1/B1IC38";
import B1IC39 from "../pages/aulas/completo/B1/B1IC39";
import B1IC40 from "../pages/aulas/completo/B1/B1IC40";

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
        {[
          A1BU1,
          A1BU2,
          A1BU3,
          A1BU4,
          A1BU5,
          A1BU6,
          A1BU7,
          A1BU8,
          A1BU9,
          A1BU10,
          A1BU11,
          A1BU12,
          A1BU13,
          A1BU14,
          A1BU15,
          A1BU16,
          A1BU17,
          A1BU18,
          A1BU19,
          A1BU20,
        ].map((Screen, index) => {
          const screenName = `A1BU${index + 1}`;

          return (
            <Stack.Screen
              key={screenName}
              name={screenName}
              component={Screen}
              options={{ headerShown: false }}
            />
          );
        })}
        <Stack.Screen
          name="BussinesB1"
          component={BussinesB1Home}
          options={{
            title: "Business English B1",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {[
          B1BU1,
          B1BU2,
          B1BU3,
          B1BU4,
          B1BU5,
          B1BU6,
          B1BU7,
          B1BU8,
          B1BU9,
          B1BU10,
          B1BU11,
          B1BU12,
          B1BU13,
          B1BU14,
          B1BU15,
          B1BU16,
          B1BU17,
          B1BU18,
          B1BU19,
          B1BU20,
        ].map((Screen, index) => {
          const screenName = `B1BU${index + 1}`;

          return (
            <Stack.Screen
              key={screenName}
              name={screenName}
              component={Screen}
              options={{ headerShown: false }}
            />
          );
        })}

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
        {[
          A1TR1,
          A1TR2,
          A1TR3,
          A1TR4,
          A1TR5,
          A1TR6,
          A1TR7,
          A1TR8,
          A1TR9,
          A1TR10,
          A1TR11,
          A1TR12,
          A1TR13,
          A1TR14,
          A1TR15,
          A1TR16,
          A1TR17,
          A1TR18,
          A1TR19,
          A1TR20,
          A1TR21,
          A1TR22,
          A1TR23,
          A1TR24,
          A1TR25,
          A1TR26,
        ].map((Screen, index) => {
          const screenName = `A1TR${index + 1}`;

          return (
            <Stack.Screen
              key={screenName}
              name={screenName}
              component={Screen}
              options={{ headerShown: false }}
            />
          );
        })}

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
        {[
          B1IC01,
          B1IC02,
          B1IC03,
          B1IC04,
          B1IC05,
          B1IC06,
          B1IC07,
          B1IC08,
          B1IC09,
          B1IC10,
          B1IC11,
          B1IC12,
          B1IC13,
          B1IC14,
          B1IC15,
          B1IC16,
          B1IC17,
          B1IC18,
          B1IC19,
          B1IC20,
          B1IC21,
          B1IC22,
          B1IC23,
          B1IC24,
          B1IC25,
          B1IC26,
          B1IC27,
          B1IC28,
          B1IC29,
          B1IC30,
          B1IC31,
          B1IC32,
          B1IC33,
          B1IC34,
          B1IC35,
          B1IC36,
          B1IC37,
          B1IC38,
          B1IC39,
          B1IC40,
        ].map((Screen, index) => {
          const screenNumber = String(index + 1).padStart(2, "0");

          return (
            <Stack.Screen
              key={`B1IC${screenNumber}`}
              name={`B1IC${screenNumber}`}
              component={Screen}
              options={{ headerShown: false }}
            />
          );
        })}
        {[
          A2IC01,
          A2IC02,
          A2IC03,
          A2IC04,
          A2IC05,
          A2IC06,
          A2IC07,
          A2IC08,
          A2IC09,
          A2IC10,
          A2IC11,
          A2IC12,
          A2IC13,
          A2IC14,
          A2IC15,
          A2IC16,
          A2IC17,
          A2IC18,
          A2IC19,
          A2IC20,
          A2IC21,
          A2IC22,
          A2IC23,
          A2IC24,
          A2IC25,
          A2IC26,
          A2IC27,
          A2IC28,
          A2IC29,
          A2IC30,
          A2IC31,
          A2IC32,
          A2IC33,
          A2IC34,
          A2IC35,
          A2IC36,
          A2IC37,
          A2IC38,
          A2IC39,
          A2IC40,
          A2IC41,
          A2IC42,
          A2IC43,
          A2IC44,
          A2IC45,
          A2IC46,
          A2IC47,
          A2IC48,
          A2IC49,
          A2IC50,
          A2IC51,
          A2IC52,
          A2IC53,
          A2IC54,
          A2IC55,
          A2IC56,
          A2IC57,
          A2IC58,
          A2IC59,
          A2IC60,
          A2IC61,
          A2IC62,
          A2IC63,
          A2IC64,
          A2IC65,
          A2IC66,
          A2IC67,
          A2IC68,
          A2IC69,
          A2IC70,
          A2IC71,
          A2IC72,
          A2IC73,
          A2IC74,
        ].map((Screen, index) => {
          const screenNumber = String(index + 1).padStart(2, "0");

          return (
            <Stack.Screen
              key={`A2IC${screenNumber}`}
              name={`A2IC${screenNumber}`}
              component={Screen}
              options={{ headerShown: false }}
            />
          );
        })}

        {[
          IC01,
          IC02,
          IC03,
          IC04,
          IC05,
          IC06,
          IC07,
          IC08,
          IC09,
          IC10,
          IC11,
          IC12,
          IC13,
          IC14,
          IC15,
          IC16,
          IC17,
          IC18,
          IC19,
          IC20,
          IC21,
          IC22,
          IC23,
          IC24,
          IC25,
          IC26,
          IC27,
          IC28,
          IC29,
          IC30,
          IC31,
          IC32,
          IC33,
          IC34,
          IC35,
          IC36,
          IC37,
          IC38,
          IC39,
          IC40,
          IC41,
          IC42,
          IC43,
        ].map((Screen, index) => {
          const screenNumber = String(index + 1).padStart(2, "0");

          return (
            <Stack.Screen
              key={`IC${screenNumber}`}
              name={`IC${screenNumber}`}
              component={Screen}
              options={{ headerShown: false }}
            />
          );
        })}

        {/* ===== SANTANDER ===== */}
        <Stack.Screen
          name="HomeSantander"
          component={HomeSantander}
          options={{
            title: "Área Santander",
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

        {/* ===== SPLASH ===== */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
