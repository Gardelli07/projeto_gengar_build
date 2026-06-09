import React from "react";
import IC01 from "./IC01";
import IC02 from "./IC02";
import IC03 from "./IC03";
import IC04 from "./IC04";
import IC05 from "./IC05";
import IC06 from "./IC06";
import IC07 from "./IC07";
import IC08 from "./IC08";
import IC09 from "./IC09";
import IC10 from "./IC10";
import IC11 from "./IC11";
import IC12 from "./IC12";
import IC13 from "./IC13";
import IC14 from "./IC14";
import IC15 from "./IC15";
import IC16 from "./IC16";
import IC17 from "./IC17";
import IC18 from "./IC18";
import IC19 from "./IC19";
import IC20 from "./IC20";
import IC21 from "./IC21";
import IC22 from "./IC22";
import IC23 from "./IC23";
import IC24 from "./IC24";
import IC25 from "./IC25";
import IC26 from "./IC26";
import IC27 from "./IC27";
import IC28 from "./IC28";
import IC29 from "./IC29";
import IC30 from "./IC30";
import IC31 from "./IC31";
import IC32 from "./IC32";
import IC33 from "./IC33";
import IC34 from "./IC34";
import IC35 from "./IC35";
import IC36 from "./IC36";
import IC37 from "./IC37";
import IC38 from "./IC38";
import IC39 from "./IC39";
import IC40 from "./IC40";
import IC41 from "./IC41";
import IC42 from "./IC42";
import IC43 from "./IC43";
import CourseOverviewScreen from "../../CourseOverviewScreen";

export const INGLES_COMPLETO_STORAGE_KEY = "@progesso_ingles_completo_A0-A1";
export const INGLES_COMPLETO_COURSE_NAME = "Inglês Completo";

export const inglesModuleDefs = [
  {
    id: 0,
    name: "BASICS",
    subtitle: "Base de vocabulario, frases e escuta",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 1,
    name: "I’m a student!",
    subtitle: "Aprenda a se apresentar com naturalidade",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 2,
    name: "Good morning!",
    subtitle: "Use frases essenciais em situacoes reais",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 3,
    name: "Alphabet",
    subtitle: "Expanda palavras e compreensao",
    locked: false,
    accent: "#B8C2CF",
    icon: "lock-outline",
  },
  {
    id: 4,
    name: "Numbers",
    subtitle: "Monte respostas e frases com seguranca",
    locked: false,
    accent: "#B8C2CF",
    icon: "lock-outline",
  },
  {
    id: 5,
    name: "Introduction",
    subtitle: "Fixe o conteudo com exercicios guiados",
    locked: false,
    accent: "#B8C2CF",
    icon: "lock-outline",
  },
];

export const inglesSampleLessons = [
  { module: 0, id: "1", title: "Hello/Hi", type: "Aula", screen: "IC01" },
  { module: 0, id: "2", title: "Hey/Hey there!", type: "Aula", screen: "IC02" },
  {
    module: 0,
    id: "3",
    title: "Whatés up/Howdy",
    type: "Aula",
    screen: "IC03",
  },
  { module: 0, id: "4", title: "Bye/See ya!", type: "Aula", screen: "IC04" },
  {
    module: 0,
    id: "5",
    title: "Review Module 1",
    type: "Aula",
    screen: "IC05",
  },
  { module: 0, id: "6", title: "CHALLENGE", type: "Aula", screen: "IC06" },
  { module: 1, id: "7", title: "I am happy!", type: "Aula", screen: "IC07" },
  {
    module: 1,
    id: "8",
    title: "She’s a teacher!",
    type: "Aula",
    screen: "IC08",
  },
  { module: 1, id: "9", title: "Is he nice?", type: "Aula", screen: "IC09" },
  {
    module: 1,
    id: "10",
    title: "You’re my friend!",
    type: "Aula",
    screen: "IC10",
  },
  {
    module: 1,
    id: "11",
    title: "We are family!",
    type: "Aula",
    screen: "IC11",
  },
  {
    module: 1,
    id: "12",
    title: "Are you ready?",
    type: "Aula",
    screen: "IC12",
  },
  {
    module: 1,
    id: "13",
    title: "Review é affirmative",
    type: "Aula",
    screen: "IC13",
  },
  {
    module: 1,
    id: "14",
    title: "Review ? Negative",
    type: "Aula",
    screen: "IC14",
  },
  {
    module: 1,
    id: "15",
    title: "Review ? Interrogative",
    type: "Aula",
    screen: "IC15",
  },
  {
    module: 1,
    id: "16",
    title: "Review ? Complete",
    type: "Aula",
    screen: "IC16",
  },
  { module: 1, id: "17", title: "Challenge", type: "Aula", screen: "IC17" },
  { module: 2, id: "18", title: "Morning!", type: "Aula", screen: "IC18" },
  { module: 2, id: "19", title: "Good evening!", type: "Aula", screen: "IC19" },
  { module: 2, id: "20", title: "See you!", type: "Aula", screen: "IC20" },
  { module: 2, id: "21", title: "Morning!", type: "Aula", screen: "IC21" },
  {
    module: 2,
    id: "22",
    title: "Regional Greetings",
    type: "Aula",
    screen: "IC22",
  },
  { module: 3, id: "23", title: "Vowels", type: "Aula", screen: "IC23" },
  { module: 3, id: "24", title: 'Time do "EE"', type: "Aula", screen: "IC24" },
  { module: 3, id: "25", title: 'Time do "EH"', type: "Aula", screen: "IC25" },
  {
    module: 3,
    id: "26",
    title: "Letras rebeldes",
    type: "Aula",
    screen: "IC26",
  },
  {
    module: 3,
    id: "27",
    title: "Whatés your name?",
    type: "Aula",
    screen: "IC27",
  },
  { module: 3, id: "28", title: "It’s J-A...", type: "Aula", screen: "IC28" },
  {
    module: 3,
    id: "29",
    title: "Diference b/p v/w",
    type: "Aula",
    screen: "IC29",
  },
  {
    module: 3,
    id: "30",
    title: "O Mestre da Soletração",
    type: "Aula",
    screen: "IC30",
  },
  { module: 3, id: "31", title: "Boss Level", type: "Aula", screen: "IC31" },
  { module: 4, id: "32", title: "0-10", type: "Aula", screen: "IC32" },
  { module: 4, id: "33", title: "11-20", type: "Aula", screen: "IC33" },
  { module: 4, id: "34", title: "20-100", type: "Aula", screen: "IC34" },
  {
    module: 4,
    id: "35",
    title: "How old are you?",
    type: "Aula",
    screen: "IC35",
  },
  { module: 4, id: "36", title: "Phone number", type: "Aula", screen: "IC36" },
  {
    module: 4,
    id: "37",
    title: "How much is it?",
    type: "Aula",
    screen: "IC37",
  },
  { module: 4, id: "38", title: "Challenge", type: "Aula", screen: "IC38" },
  {
    module: 5,
    id: "39",
    title: "My name’s/ I’m",
    type: "Aula",
    screen: "IC39",
  },
  {
    module: 5,
    id: "40",
    title: "Whatés your name?",
    type: "Aula",
    screen: "IC40",
  },
  { module: 5, id: "41", title: "This is my...", type: "Aula", screen: "IC41" },
  {
    module: 5,
    id: "42",
    title: "Self introduction",
    type: "Aula",
    screen: "IC42",
  },
  { module: 5, id: "43", title: "Boss level", type: "Aula", screen: "IC43" },
];

export const lessonScreens = {
  IC01,
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
  IC16,
  IC17,
  IC18,
  IC19,
  IC20,
  IC21,
  IC22,
  IC23,
  IC24,
  IC25,
  IC26,
  IC27,
  IC28,
  IC29,
  IC30,
  IC31,
  IC32,
  IC33,
  IC34,
  IC35,
  IC36,
  IC37,
  IC38,
  IC39,
  IC40,
  IC41,
  IC42,
  IC43,
};

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
