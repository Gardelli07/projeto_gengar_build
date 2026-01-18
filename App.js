import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Routes from "./src/routes/routes";

export default function App() {
  return (
    <PaperProvider>
      <Routes />
    </PaperProvider>
  );
}
