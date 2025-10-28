import * as React from "react";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import AdicionarProduto from "./pages/AdicionarProduto";
import Contato from "./pages/Contato";
import SplashScreen from "./pages/SplashScreen";
import ProdutoDetalhe from "./pages/ProdutoDetalhe";
import Carrinho from "./pages/Carrinho";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#3e3b3b" },
        tabBarActiveTintColor: "#6A0DAD",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Produtos") iconName = "food";
          else if (route.name === "Contato") iconName = "phone";

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Produtos" component={Produtos} />
      <Tab.Screen name="Contato" component={Contato} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{
              header: () => (
                <Appbar.Header style={{ backgroundColor: "#3e3b3b" }}>
                  <Appbar.Content
                    title="Loja do Gengar"
                    titleStyle={{ color: "#6A0DAD", fontWeight: "bold" }}
                  />
                </Appbar.Header>
              ),
            }}
          />
          <Stack.Screen
            name="AdicionarProduto"
            component={AdicionarProduto}
            options={{
              headerStyle: { backgroundColor: "#3e3b3b" },
              headerTintColor: "#6A0DAD",
              title: "Adicionar Produto",
            }}
          />
          <Stack.Screen
            name="ProdutoDetalhe"
            component={ProdutoDetalhe}
            options={{
              headerStyle: { backgroundColor: "#3e3b3b" },
              headerTintColor: "#6A0DAD",
              title: "Detalhes do Produto",
            }}
          />
          <Stack.Screen
            name="Carrinho"
            component={Carrinho}
            options={{
              headerStyle: { backgroundColor: "#3e3b3b" },
              headerTintColor: "#6A0DAD",
              title: "Carrinho",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
