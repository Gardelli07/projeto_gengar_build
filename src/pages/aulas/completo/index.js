import React from "react";
import CourseOverviewScreen from "../CourseOverviewScreen";

export const INGLES_COMPLETO_STORAGE_KEY = "@progesso_ingles_completo";
export const INGLES_COMPLETO_COURSE_NAME = "Inglês Completo";

export const inglesModuleDefs = [
  {
    id: 0,
    name: "Fundamentos do ingles",
    subtitle: "Base de vocabulario, frases e escuta",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 1,
    name: "Cumprimentos e apresentacao",
    subtitle: "Aprenda a se apresentar com naturalidade",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 2,
    name: "Dia a dia e conversacao",
    subtitle: "Use frases essenciais em situacoes reais",
    locked: true,
    accent: "#B8C2CF",
    icon: "lock-outline",
  },
  {
    id: 3,
    name: "Leitura e vocabulario",
    subtitle: "Expanda palavras e compreensao",
    locked: true,
    accent: "#B8C2CF",
    icon: "lock-outline",
  },
  {
    id: 4,
    name: "Escrita e estrutura",
    subtitle: "Monte respostas e frases com seguranca",
    locked: true,
    accent: "#B8C2CF",
    icon: "lock-outline",
  },
  {
    id: 5,
    name: "Revisao e pratica",
    subtitle: "Fixe o conteudo com exercicios guiados",
    locked: true,
    accent: "#B8C2CF",
    icon: "lock-outline",
  },
];

export const inglesSampleLessons = [
  { module: 0, id: "1", title: "Aula 01", type: "Aula", screen: "IC01" },
  { module: 0, id: "2", title: "Aula 02", type: "Aula", screen: "IC02" },
  { module: 0, id: "3", title: "Aula 03", type: "Aula", screen: "IC03" },
  { module: 0, id: "4", title: "Aula 04", type: "Aula", screen: "IC04" },
  { module: 0, id: "5", title: "Aula 05", type: "Aula", screen: "IC05" },
  { module: 0, id: "6", title: "Aula 06", type: "Aula", screen: "IC06" },
  { module: 0, id: "7", title: "Aula 07", type: "Aula", screen: "IC07" },
  { module: 0, id: "8", title: "Aula 08", type: "Aula", screen: "IC08" },
  { module: 0, id: "9", title: "Aula 09", type: "Aula", screen: "IC09" },
  { module: 0, id: "10", title: "Aula 10", type: "Aula", screen: "IC10" },
  { module: 0, id: "11", title: "Aula 11", type: "Aula", screen: "IC11" },
  { module: 0, id: "12", title: "Aula 12", type: "Aula", screen: "IC12" },
  { module: 0, id: "13", title: "Aula 13", type: "Aula", screen: "IC13" },
  { module: 0, id: "14", title: "Aula 14", type: "Aula", screen: "IC14" },
  { module: 0, id: "15", title: "Aula 15", type: "Aula", screen: "IC15" },
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
