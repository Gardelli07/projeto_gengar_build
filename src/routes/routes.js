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
import InglesCompletoHome from "../pages/aulas/completo";
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
import IC01 from "../pages/aulas/completo/IC01";
import IC02 from "../pages/aulas/completo/IC02";
import IC03 from "../pages/aulas/completo/IC03";
import IC04 from "../pages/aulas/completo/IC04";
import IC05 from "../pages/aulas/completo/IC05";
import IC06 from "../pages/aulas/completo/IC06";
import IC07 from "../pages/aulas/completo/IC07";
import IC08 from "../pages/aulas/completo/IC08";
import IC09 from "../pages/aulas/completo/IC09";
import IC10 from "../pages/aulas/completo/IC10";
import IC11 from "../pages/aulas/completo/IC11";
import IC12 from "../pages/aulas/completo/IC12";
import IC13 from "../pages/aulas/completo/IC13";
import IC14 from "../pages/aulas/completo/IC14";
import IC15 from "../pages/aulas/completo/IC15";
import IC16 from "../pages/aulas/completo/IC16";
import IC17 from "../pages/aulas/completo/IC17";
import IC18 from "../pages/aulas/completo/IC18";
import IC19 from "../pages/aulas/completo/IC19";
import IC20 from "../pages/aulas/completo/IC20";
import IC21 from "../pages/aulas/completo/IC21";
import IC22 from "../pages/aulas/completo/IC22";
import IC23 from "../pages/aulas/completo/IC23";
import IC24 from "../pages/aulas/completo/IC24";
import IC25 from "../pages/aulas/completo/IC25";
import IC26 from "../pages/aulas/completo/IC26";
import IC27 from "../pages/aulas/completo/IC27";
import IC28 from "../pages/aulas/completo/IC28";
import IC29 from "../pages/aulas/completo/IC29";
import IC30 from "../pages/aulas/completo/IC30";
import IC31 from "../pages/aulas/completo/IC31";
import IC32 from "../pages/aulas/completo/IC32";
import IC33 from "../pages/aulas/completo/IC33";
import IC34 from "../pages/aulas/completo/IC34";
import IC35 from "../pages/aulas/completo/IC35";
import IC36 from "../pages/aulas/completo/IC36";
import IC37 from "../pages/aulas/completo/IC37";
import IC38 from "../pages/aulas/completo/IC38";
import IC39 from "../pages/aulas/completo/IC39";
import IC40 from "../pages/aulas/completo/IC40";
import IC41 from "../pages/aulas/completo/IC41";
import IC42 from "../pages/aulas/completo/IC42";
import IC43 from "../pages/aulas/completo/IC43";

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
