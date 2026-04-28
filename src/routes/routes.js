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
import BussinesHome from "../pages/aulas/bussines";

// Business
import MeetingsQuiz from "../pages/aulas/bussines/MeetingsQuiz";
import MeetingPhrasebook from "../pages/aulas/bussines/MeetingPhrasebook";
import PracticeMeetingExpressions from "../pages/aulas/bussines/PracticeMeetingExpressions";
import NetworkingSmallTalk from "../pages/aulas/bussines/NetworkingSmallTalk";
import IntroBusinessEnglish from "../pages/aulas/bussines/IntroBusinessEnglish";
import ProfessionalEmails from "../pages/aulas/bussines/ProfessionalEmails";
import ProfessionalEmailsPart2 from "../pages/aulas/bussines/ProfessionalEmailsPart2";
import TelephoneConversations from "../pages/aulas/bussines/TelephoneConversations";

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
          name="MeetingPhrasebook"
          component={MeetingPhrasebook}
          options={{
            title: "Phrasebook: Expressões de Reunião",
            ...defaultHeader,
          }}
        />
        <Stack.Screen
          name="PracticeMeetingExpressions"
          component={PracticeMeetingExpressions}
          options={{ title: "Quiz: Prática de Expressões", ...defaultHeader }}
        />
        <Stack.Screen
          name="MeetingsQuiz"
          component={MeetingsQuiz}
          options={{ title: "Agendas & Meetings Quiz", ...defaultHeader }}
        />
        <Stack.Screen
          name="NetworkingSmallTalk"
          component={NetworkingSmallTalk}
          options={{ title: "Networking & Small Talk", ...defaultHeader }}
        />
        <Stack.Screen
          name="IntroBusinessEnglish"
          component={IntroBusinessEnglish}
          options={{ title: "Intro Business English", ...defaultHeader }}
        />
        <Stack.Screen
          name="ProfessionalEmails"
          component={ProfessionalEmails}
          options={{ title: "Professional Emails", ...defaultHeader }}
        />
        <Stack.Screen
          name="ProfessionalEmailsPart2"
          component={ProfessionalEmailsPart2}
          options={{ title: "Professional Emails Part 2", ...defaultHeader }}
        />
        <Stack.Screen
          name="TelephoneConversations"
          component={TelephoneConversations}
          options={{ title: "Telephone Conversations", ...defaultHeader }}
        />
        <Stack.Screen
          name="Bussines"
          component={BussinesHome}
          options={{
            title: "Business English",
            ...defaultHeader,
            headerShown: false,
          }}
        />

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
