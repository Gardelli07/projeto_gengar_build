import * as React from "react";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import { Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "./pages/Home";
import Comunidade from "./pages/Comunidade";
import Login from "./pages/Login";
import SplashScreen from "./pages/SplashScreen";
import MeetingsQuiz from "./pages/bussines/MeetingsQuiz";
import MeetingPhrasebook from "./pages/bussines/MeetingPhrasebook";
import PracticeMeetingExpressions from "./pages/bussines/PracticeMeetingExpressions";
import NetworkingSmallTalk from "./pages/bussines/NetworkingSmallTalk";
import Bussines from "./pages/bussines/Bussines";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import { View } from "react-native";
function CustomTabBar(props) {
  // Centraliza os botões do tab bar
  const { state, descriptors, navigation } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0e3174",
        height: 60,
      }}
    >
      {state.routes.map((route, index) => {
        if (route.name === "Bussines") return null;
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        let iconName;
        if (route.name === "Home") iconName = "home";
        else if (route.name === "Comunidade") iconName = "comment";
        else if (route.name === "Login") iconName = "login";
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 40, // espaçamento maior
              flex: 0,
            }}
          >
            <Icon
              name={iconName}
              size={36} // tamanho maior
              color={isFocused ? "#f47c2c" : "gray"}
            />
            {/* <Text style={{ color: isFocused ? "#f47c2c" : "gray", fontSize: 12 }}>{label}</Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Comunidade" component={Comunidade} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen
        name="Bussines"
        component={Bussines}
        options={{ tabBarButton: () => null }}
      />
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
                      style={{ width: 40, height: 40 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <Appbar.Content
                    title="BEA"
                    titleStyle={{
                      color: "#f47c2c",
                      fontWeight: "bold",
                      textAlign: "center",
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
