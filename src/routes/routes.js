import * as React from "react";
import { Image, TouchableOpacity, BackHandler } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Appbar } from "react-native-paper";

/* ===== PÁGINAS ===== */
// padrão
import Home from "../pages/Home";
import Comunidade from "../pages/Comunidade";
import Login from "../pages/Login";
import SplashScreen from "../pages/SplashScreen";

// Bussines
import MeetingsQuiz from "../pages/bussines/MeetingsQuiz";
import MeetingPhrasebook from "../pages/bussines/MeetingPhrasebook";
import PracticeMeetingExpressions from "../pages/bussines/PracticeMeetingExpressions";
import NetworkingSmallTalk from "../pages/bussines/NetworkingSmallTalk";
import Bussines from "../pages/bussines/Bussines";
import IntroBusinessEnglish from "../pages/bussines/IntroBusinessEnglish";
import ProfessionalEmails from "../pages/bussines/ProfessionalEmails";
import ProfessionalEmailsPart2 from "../pages/bussines/ProfessionalEmailsPart2";
import TelephoneConversations from "../pages/bussines/TelephoneConversations";

// completo
import Inglescompleto from "../pages/completo/Inglescompleto";
import Teste2 from "../pages/completo/teste2";
import Teste1 from "../pages/Teste1";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* ================= TAB NAVIGATOR ================= */
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#0e3174",
          height: 70,
        },

        tabBarActiveTintColor: "#f47c2c",
        tabBarInactiveTintColor: "#ffffffaa",

        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 12,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Comunidade") iconName = "comment";
          else if (route.name === "Login") iconName = "login";

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size ?? 30}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Comunidade" component={Comunidade} />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
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
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={({ navigation }) => ({
            header: () => (
              <Appbar.Header style={{ backgroundColor: "#0e3174" }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Tabs", { screen: "Home" })
                  }
                >
                  <Image
                    source={require("../../assets/logo.png")}
                    style={{ width: 90, height: 90 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <Appbar.Content
                  title="BEA"
                  titleStyle={{
                    color: "#f47c2c",
                    fontWeight: "bold",
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
            headerStyle: {
              backgroundColor: "#0e3174",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="PracticeMeetingExpressions"
          component={PracticeMeetingExpressions}
          options={{
            title: "Quiz: Prática de Expressões",
            headerStyle: {
              backgroundColor: "#0e3174",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="MeetingsQuiz"
          component={MeetingsQuiz}
          options={{
            title: "Agendas & Meetings Quiz",
            headerStyle: {
              backgroundColor: "#0e3174",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="NetworkingSmallTalk"
          component={NetworkingSmallTalk}
          options={{
            title: "Networking & Small Talk",
            headerStyle: {
              backgroundColor: "#0e3174",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="IntroBusinessEnglish"
          component={IntroBusinessEnglish}
          options={{
            title: "Intro Business English",
            headerStyle: {
              backgroundColor: "#0e3174",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="ProfessionalEmails"
          component={ProfessionalEmails}
          options={{
            title: "Professional Emails",
            headerStyle: {
              backgroundColor: "#0e3174",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="ProfessionalEmailsPart2"
          component={ProfessionalEmailsPart2}
          options={{
            title: "Professional Emails Part 2",
            headerStyle: {
              backgroundColor: "#0e3174",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="TelephoneConversations"
          component={TelephoneConversations}
          options={{
            title: "Telephone Conversations",
            headerStyle: {
              backgroundColor: "#0e3174",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Bussines"
          component={Bussines}
          options={{
            title: "Business English",
            headerStyle: {
              backgroundColor: "#0e3174",
            },
            headerTintColor: "#fff", // cor do texto e ícones
          }}
        />

        {/* ===== COMPLETO ===== */}
        <Stack.Screen
          name="Inglescompleto"
          component={Inglescompleto}
          options={{
            title: "Inglês Completo",
            headerStyle: {
              backgroundColor: "#0e3174",
            },
            headerTintColor: "#fff", // cor do texto e ícones
          }}
        />

        <Stack.Screen name="Teste1" component={Teste1} />
        <Stack.Screen
          name="Teste2"
          component={Teste2}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#0e3174",
            },
            headerTintColor: "#fff",
          }}
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
