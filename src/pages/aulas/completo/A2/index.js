import React from "react";
import CourseOverviewScreen from "../../CourseOverviewScreen";

export const INGLES_COMPLETO_STORAGE_KEY = "@progesso_ingles_completo_A2";
export const INGLES_COMPLETO_COURSE_NAME = "Inglês Completo";

export const inglesModuleDefs = [
  {
    id: 0,
    name: "Presente continuous",
    subtitle: "Aulas A2IC01 ate A2IC10",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 1,
    name: "Simple Past",
    subtitle: "Aulas A2IC11 ate A2IC22",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 2,
    name: "Past continuous",
    subtitle: "Aulas A2IC23 ate A2IC34",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 3,
    name: "Comparatives",
    subtitle: "Aulas A2IC35 ate A2IC40",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
];

export const inglesSampleLessons = [
  { module: 0, id: "1", title: "A2IC01", type: "Aula", screen: "A2IC01" },
  { module: 0, id: "2", title: "A2IC02", type: "Aula", screen: "A2IC02" },
  { module: 0, id: "3", title: "A2IC03", type: "Aula", screen: "A2IC03" },
  { module: 0, id: "4", title: "A2IC04", type: "Aula", screen: "A2IC04" },
  { module: 0, id: "5", title: "A2IC05", type: "Aula", screen: "A2IC05" },
  { module: 0, id: "6", title: "A2IC06", type: "Aula", screen: "A2IC06" },
  { module: 0, id: "7", title: "A2IC07", type: "Aula", screen: "A2IC07" },
  { module: 0, id: "8", title: "A2IC08", type: "Aula", screen: "A2IC08" },
  { module: 0, id: "9", title: "A2IC09", type: "Aula", screen: "A2IC09" },
  { module: 0, id: "10", title: "A2IC10", type: "Aula", screen: "A2IC10" },
  { module: 1, id: "11", title: "A2IC11", type: "Aula", screen: "A2IC11" },
  { module: 1, id: "12", title: "A2IC12", type: "Aula", screen: "A2IC12" },
  { module: 1, id: "13", title: "A2IC13", type: "Aula", screen: "A2IC13" },
  { module: 1, id: "14", title: "A2IC14", type: "Aula", screen: "A2IC14" },
  { module: 1, id: "15", title: "A2IC15", type: "Aula", screen: "A2IC15" },
  { module: 1, id: "16", title: "A2IC16", type: "Aula", screen: "A2IC16" },
  { module: 1, id: "17", title: "A2IC17", type: "Aula", screen: "A2IC17" },
  { module: 1, id: "18", title: "A2IC18", type: "Aula", screen: "A2IC18" },
  { module: 1, id: "19", title: "A2IC19", type: "Aula", screen: "A2IC19" },
  { module: 1, id: "20", title: "A2IC20", type: "Aula", screen: "A2IC20" },
  { module: 1, id: "21", title: "A2IC21", type: "Aula", screen: "A2IC21" },
  { module: 1, id: "22", title: "A2IC22", type: "Aula", screen: "A2IC22" },
  { module: 2, id: "23", title: "A2IC23", type: "Aula", screen: "A2IC23" },
  { module: 2, id: "24", title: "A2IC24", type: "Aula", screen: "A2IC24" },
  { module: 2, id: "25", title: "A2IC25", type: "Aula", screen: "A2IC25" },
  { module: 2, id: "26", title: "A2IC26", type: "Aula", screen: "A2IC26" },
  { module: 2, id: "27", title: "A2IC27", type: "Aula", screen: "A2IC27" },
  { module: 2, id: "28", title: "A2IC28", type: "Aula", screen: "A2IC28" },
  { module: 2, id: "29", title: "A2IC29", type: "Aula", screen: "A2IC29" },
  { module: 2, id: "30", title: "A2IC30", type: "Aula", screen: "A2IC30" },
  { module: 2, id: "31", title: "A2IC31", type: "Aula", screen: "A2IC31" },
  { module: 2, id: "32", title: "A2IC32", type: "Aula", screen: "A2IC32" },
  { module: 2, id: "33", title: "A2IC33", type: "Aula", screen: "A2IC33" },
  { module: 2, id: "34", title: "A2IC34", type: "Aula", screen: "A2IC34" },
  { module: 3, id: "35", title: "A2IC35", type: "Aula", screen: "A2IC35" },
  { module: 3, id: "36", title: "A2IC36", type: "Aula", screen: "A2IC36" },
  { module: 3, id: "37", title: "A2IC37", type: "Aula", screen: "A2IC37" },
  { module: 3, id: "38", title: "A2IC38", type: "Aula", screen: "A2IC38" },
  { module: 3, id: "39", title: "A2IC39", type: "Aula", screen: "A2IC39" },
  { module: 3, id: "40", title: "A2IC40", type: "Aula", screen: "A2IC40" },
];

export default function InglesCompletoScreen(props) {
  return (
    <CourseOverviewScreen
      {...props}
      courseName={INGLES_COMPLETO_COURSE_NAME}
      storageKey={INGLES_COMPLETO_STORAGE_KEY}
      moduleDefs={inglesModuleDefs}
      lessons={inglesSampleLessons}
    />
  );
}
