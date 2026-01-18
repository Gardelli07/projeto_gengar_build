import * as React from "react";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import { Image, TouchableOpacity, BackHandler } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//padrão
import Home from "./pages/Home";
import Comunidade from "./pages/Comunidade";
import Login from "./pages/Login";
import SplashScreen from "./pages/SplashScreen";
//Bussines
import MeetingsQuiz from "./pages/bussines/MeetingsQuiz";
import MeetingPhrasebook from "./pages/bussines/MeetingPhrasebook";
import PracticeMeetingExpressions from "./pages/bussines/PracticeMeetingExpressions";
import NetworkingSmallTalk from "./pages/bussines/NetworkingSmallTalk";
import Bussines from "./pages/bussines/Bussines";
import IntroBusinessEnglish from "./pages/bussines/IntroBusinessEnglish";
import ProfessionalEmails from "./pages/bussines/ProfessionalEmails";
import ProfessionalEmailsPart2 from "./pages/bussines/ProfessionalEmailsPart2";
import TelephoneConversations from "./pages/bussines/TelephoneConversations";
//completo
import Inglescompleto from "./pages/completo/Inglescompleto";
import Teste2 from "./pages/completo/teste2";

import Teste1 from "./pages/Teste1";

const Tab = createBottomTabNavigator();

export default function Routes() {
  return <Tab.Navigator></Tab.Navigator>;
}
