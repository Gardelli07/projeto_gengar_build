import React from "react";
import Home from "../Home";

export {
  BUSSINES_STORAGE_KEY,
  bussinesModules,
  bussinesSampleLessons,
} from "./data";

export default function Bussines(props) {
  const route = props.route || {};
  const params = route.params || {};

  return (
    <Home
      {...props}
      route={{
        ...route,
        params: {
          ...params,
          initialCourse: "Bussines English",
          initialLevel: "Facil",
        },
      }}
    />
  );
}
