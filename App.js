import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "./src/context/AuthContext";
import Routes from "./src/routes/routes";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PaperProvider>
          <SafeAreaView
            style={{ flex: 1, backgroundColor: "#48617A" }}
            edges={["bottom"]}
          >
            <Routes />
          </SafeAreaView>
        </PaperProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
