import React from "react";
import A1TR1 from "./A1TR1";
import A1TR2 from "./A1TR2";
import A1TR3 from "./A1TR3";
import A1TR4 from "./A1TR4";
import A1TR5 from "./A1TR5";
import A1TR6 from "./A1TR6";
import A1TR7 from "./A1TR7";
import A1TR8 from "./A1TR8";
import A1TR9 from "./A1TR9";
import A1TR10 from "./A1TR10";
import A1TR11 from "./A1TR11";
import A1TR12 from "./A1TR12";
import A1TR13 from "./A1TR13";
import A1TR14 from "./A1TR14";
import A1TR15 from "./A1TR15";
import A1TR16 from "./A1TR16";
import A1TR17 from "./A1TR17";
import A1TR18 from "./A1TR18";
import A1TR19 from "./A1TR19";
import A1TR20 from "./A1TR20";
import A1TR21 from "./A1TR21";
import A1TR22 from "./A1TR22";
import A1TR23 from "./A1TR23";
import A1TR24 from "./A1TR24";
import A1TR25 from "./A1TR25";
import A1TR26 from "./A1TR26";
import CourseOverviewScreen from "../CourseOverviewScreen";

export const TRAVEL_STORAGE_KEY = "@curso_progress_travel_A1";
export const TRAVEL_COURSE_NAME = "Inglês para Viagem";

export const travelModuleDefs = [
  {
    id: 0,
    name: "Preparando as Malas",
    subtitle: "Aulas A1TR1 até A1TR4",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 1,
    name: "O Aeroporto e o Voo",
    subtitle: "Aulas A1TR5 até A1TR8",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 2,
    name: "Chegando e Se Localizando",
    subtitle: "Aulas A1TR9 até A1TR11",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 3,
    name: "Hospedagem",
    subtitle: "Aulas A1TR12 até A1TR15",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 4,
    name: "Alimentação",
    subtitle: "Aulas A1TR16 até A1TR19",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 5,
    name: "Passeios e Compras",
    subtitle: "Aulas A1TR20 até A1TR23",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 6,
    name: "Saúde e Emergências",
    subtitle: "Aulas A1TR24 até A1TR26",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
];

export const travelSampleLessons = [
  {
    module: 0,
    id: "1",
    title: "Greetings & Politeness",
    type: "Aula",
    screen: "A1TR1",
  },
  {
    module: 0,
    id: "2",
    title: "The Magic Words",
    type: "Aula",
    screen: "A1TR2",
  },
  {
    module: 0,
    id: "3",
    title: "Numbers & Money",
    type: "Aula",
    screen: "A1TR3",
  },
  {
    module: 0,
    id: "4",
    title: "Time & Days",
    type: "Aula",
    screen: "A1TR4",
  },
  {
    module: 1,
    id: "5",
    title: "At the Check-in Desk",
    type: "Aula",
    screen: "A1TR5",
  },
  {
    module: 1,
    id: "6",
    title: "Security & Boarding",
    type: "Aula",
    screen: "A1TR6",
  },
  {
    module: 1,
    id: "7",
    title: "On the Airplane",
    type: "Aula",
    screen: "A1TR7",
  },
  {
    module: 1,
    id: "8",
    title: "Immigration & Customs",
    type: "Aula",
    screen: "A1TR8",
  },
  {
    module: 2,
    id: "9",
    title: "Baggage Claim & Exiting",
    type: "Aula",
    screen: "A1TR9",
  },
  {
    module: 2,
    id: "10",
    title: "Getting to the City",
    type: "Aula",
    screen: "A1TR10",
  },
  {
    module: 2,
    id: "11",
    title: "Where is...? (Directions)",
    type: "Aula",
    screen: "A1TR11",
  },
  {
    module: 3,
    id: "12",
    title: "Checking In",
    type: "Aula",
    screen: "A1TR12",
  },
  {
    module: 3,
    id: "13",
    title: "Hotel Amenities",
    type: "Aula",
    screen: "A1TR13",
  },
  {
    module: 3,
    id: "14",
    title: "Making Requests & Solving Problems",
    type: "Aula",
    screen: "A1TR14",
  },
  {
    module: 3,
    id: "15",
    title: "Checking Out",
    type: "Aula",
    screen: "A1TR15",
  },
  {
    module: 4,
    id: "16",
    title: "At the Café / Fast Food",
    type: "Aula",
    screen: "A1TR16",
  },
  {
    module: 4,
    id: "17",
    title: "Booking a Table & Sitting Down",
    type: "Aula",
    screen: "A1TR17",
  },
  {
    module: 4,
    id: "18",
    title: "Ordering Food",
    type: "Aula",
    screen: "A1TR18",
  },
  {
    module: 4,
    id: "19",
    title: "Paying the Bill",
    type: "Aula",
    screen: "A1TR19",
  },
  {
    module: 5,
    id: "20",
    title: "Buying Tickets",
    type: "Aula",
    screen: "A1TR20",
  },
  {
    module: 5,
    id: "21",
    title: "At the Store",
    type: "Aula",
    screen: "A1TR21",
  },
  {
    module: 5,
    id: "22",
    title: "Price & Paying",
    type: "Aula",
    screen: "A1TR22",
  },
  {
    module: 5,
    id: "23",
    title: "Souvenirs & Gifts",
    type: "Aula",
    screen: "A1TR23",
  },
  {
    module: 6,
    id: "24",
    title: "At the Pharmacy",
    type: "Aula",
    screen: "A1TR24",
  },
  {
    module: 6,
    id: "25",
    title: "Sickness & Symptoms",
    type: "Aula",
    screen: "A1TR25",
  },
  {
    module: 6,
    id: "26",
    title: "Help & Emergencies",
    type: "Aula",
    screen: "A1TR26",
  },
];

export const lessonScreens = {
  A1TR1,
  A1TR2,
  A1TR3,
  A1TR4,
  A1TR5,
  A1TR6,
  A1TR7,
  A1TR8,
  A1TR9,
  A1TR10,
  A1TR11,
  A1TR12,
  A1TR13,
  A1TR14,
  A1TR15,
  A1TR16,
  A1TR17,
  A1TR18,
  A1TR19,
  A1TR20,
  A1TR21,
  A1TR22,
  A1TR23,
  A1TR24,
  A1TR25,
  A1TR26,
};

export default function TravelScreen(props) {
  return (
    <CourseOverviewScreen
      {...props}
      courseName={TRAVEL_COURSE_NAME}
      storageKey={TRAVEL_STORAGE_KEY}
      moduleDefs={travelModuleDefs}
      lessons={travelSampleLessons}
    />
  );
}
