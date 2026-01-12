import * as React from "react";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import { Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

try {
  MaterialCommunityIcons &&
    MaterialCommunityIcons.loadFont &&
    MaterialCommunityIcons.loadFont();
} catch (e) {}

import Home from "./pages/Home";
import Comunidade from "./pages/Comunidade";
import Login from "./pages/Login";
import SplashScreen from "./pages/SplashScreen";
import MeetingsQuiz from "./pages/bussines/MeetingsQuiz";
import MeetingPhrasebook from "./pages/bussines/MeetingPhrasebook";
import PracticeMeetingExpressions from "./pages/bussines/PracticeMeetingExpressions";
import NetworkingSmallTalk from "./pages/bussines/NetworkingSmallTalk";
import Bussines from "./pages/bussines/Bussines";
import IntroBusinessEnglish from "./pages/bussines/IntroBusinessEnglish";
import ProfessionalEmails from "./pages/bussines/ProfessionalEmails";
import ProfessionalEmailsPart2 from "./pages/bussines/ProfessionalEmailsPart2";
import TelephoneConversations from "./pages/bussines/TelephoneConversations";
import Teste1 from "./pages/Teste1";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#0e3174",
          height: 70,
          justifyContent: "center",
        },

        tabBarActiveTintColor: "#f47c2c",
        tabBarInactiveTintColor: "#ffffffaa",

        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },

        tabBarIconStyle: {
          justifyContent: "center",
          alignItems: "center",
        },

        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 12,
          textAlign: "center",
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Comunidade") iconName = "comment";
          else if (route.name === "Login") iconName = "login";
          else if (route.name === "Bussines") iconName = "briefcase-outline";

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

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="MeetingPhrasebook"
            component={MeetingPhrasebook}
            options={{
              headerStyle: { backgroundColor: "#0e3174" },
              headerTintColor: "#fff",
              title: "Phrasebook: Expressões de Reunião",
            }}
          />
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
                    style={{ marginLeft: 10 }}
                  >
                    <Image
                      source={require("./assets/logo.png")}
                      style={{ width: 90, height: 90 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <Appbar.Content
                    title="BEA"
                    titleStyle={{
                      color: "#f47c2c",
                      fontWeight: "bold",
                      paddingHorizontal: 10,
                    }}
                  />
                </Appbar.Header>
              ),
            })}
          />
          <Stack.Screen
            name="PracticeMeetingExpressions"
            component={PracticeMeetingExpressions}
            options={{
              headerStyle: { backgroundColor: "#0e3174" },
              headerTintColor: "#fff",
              title: "Quiz: Prática de Expressões",
            }}
          />
          <Stack.Screen
            name="MeetingsQuiz"
            component={MeetingsQuiz}
            options={{
              headerStyle: { backgroundColor: "#0e3174" },
              headerTintColor: "#fff",
              title: "Agendas & Meetings Quiz",
            }}
          />
          <Stack.Screen
            name="NetworkingSmallTalk"
            component={NetworkingSmallTalk}
            options={{
              headerStyle: { backgroundColor: "#0e3174" },
              headerTintColor: "#fff",
              title: "Networking & Small Talk",
            }}
          />
          <Stack.Screen
            name="IntroBusinessEnglish"
            component={IntroBusinessEnglish}
            options={{
              headerStyle: { backgroundColor: "#0e3174" },
              headerTintColor: "#fff",
              title: "Intro Business English",
            }}
          />
          <Stack.Screen
            name="ProfessionalEmails"
            component={ProfessionalEmails}
            options={{
              headerStyle: { backgroundColor: "#0e3174" },
              headerTintColor: "#fff",
              title: "Professional Emails",
            }}
          />
          <Stack.Screen
            name="ProfessionalEmailsPart2"
            component={ProfessionalEmailsPart2}
            options={{
              headerStyle: { backgroundColor: "#0e3174" },
              headerTintColor: "#fff",
              title: "Professional Emails Part 2",
            }}
          />
          <Stack.Screen
            name="TelephoneConversations"
            component={TelephoneConversations}
            options={{
              headerStyle: { backgroundColor: "#0e3174" },
              headerTintColor: "#fff",
              title: "Telephone Conversations",
            }}
          />
          <Stack.Screen
            name="Bussines"
            component={Bussines}
            options={{
              headerStyle: { backgroundColor: "#0e3174" },
              headerTintColor: "#fff",
              title: "Business English",
            }}
          />
          <Stack.Screen
            name="Teste1"
            component={Teste1}
            options={{
              headerStyle: { backgroundColor: "#j" },
              headerTintColor: "#fff",
              title: "Quiz: Networking & Small Talk",
            }}
          />
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
