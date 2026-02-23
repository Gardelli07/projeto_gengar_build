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
import Teste1 from "../pages/Teste1";

// Business
import MeetingsQuiz from "../pages/bussines/MeetingsQuiz";
import MeetingPhrasebook from "../pages/bussines/MeetingPhrasebook";
import PracticeMeetingExpressions from "../pages/bussines/PracticeMeetingExpressions";
import NetworkingSmallTalk from "../pages/bussines/NetworkingSmallTalk";
import Bussines from "../pages/bussines/Bussines";
import IntroBusinessEnglish from "../pages/bussines/IntroBusinessEnglish";
import ProfessionalEmails from "../pages/bussines/ProfessionalEmails";
import ProfessionalEmailsPart2 from "../pages/bussines/ProfessionalEmailsPart2";
import TelephoneConversations from "../pages/bussines/TelephoneConversations";

// Completo
import Inglescompleto from "../pages/completo/Inglescompleto";
import IC01 from "../pages/completo/IC01";
import IC02 from "../pages/completo/IC02";
import IC03 from "../pages/completo/IC03";
import IC04 from "../pages/completo/IC04";
import IC05 from "../pages/completo/IC05";
import IC06 from "../pages/completo/IC06";
import IC07 from "../pages/completo/IC07";
import IC08 from "../pages/completo/IC08";
import IC09 from "../pages/completo/IC09";
import IC10 from "../pages/completo/IC10";
import IC11 from "../pages/completo/IC11";
import IC12 from "../pages/completo/IC12";
import IC13 from "../pages/completo/IC13";
import IC14 from "../pages/completo/IC14";
import IC15 from "../pages/completo/IC15";

// Santander
import HomeSantander from "../pages/santander";
import HomeCRM from "../pages/santander/crm/HomeCRM";
import CRM1 from "../pages/santander/crm/CRM1";

const Stack = createNativeStackNavigator();

/* ===== HEADER PADRÃO (EXTRA 💎) ===== */
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
                    color: "#000",
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
          component={Bussines}
          options={{ title: "Business English", ...defaultHeader }}
        />

        {/* ===== COMPLETO ===== */}
        <Stack.Screen
          name="Inglescompleto"
          component={Inglescompleto}
          options={{
            title: "Inglês Completo",
            ...defaultHeader,
            headerShown: false,
          }}
        />

        <Stack.Screen name="Teste1" component={Teste1} />

        <Stack.Screen
          name="IC01"
          component={IC01}
          options={{ headerShown: false }}
        />

        {[
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
        ].map((Screen, index) => {
          const screenNumber = String(index + 2).padStart(2, "0");

          return (
            <Stack.Screen
              key={index}
              name={`IC${screenNumber}`}
              component={Screen}
              options={defaultHeader}
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
