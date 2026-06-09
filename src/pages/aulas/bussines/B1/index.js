import React from "react";
import B1BU1 from "./B1BU1";
import B1BU2 from "./B1BU2";
import B1BU3 from "./B1BU3";
import B1BU4 from "./B1BU4";
import B1BU5 from "./B1BU5";
import B1BU6 from "./B1BU6";
import B1BU7 from "./B1BU7";
import B1BU8 from "./B1BU8";
import B1BU9 from "./B1BU9";
import B1BU10 from "./B1BU10";
import B1BU11 from "./B1BU11";
import B1BU12 from "./B1BU12";
import B1BU13 from "./B1BU13";
import B1BU14 from "./B1BU14";
import B1BU15 from "./B1BU15";
import B1BU16 from "./B1BU16";
import B1BU17 from "./B1BU17";
import B1BU18 from "./B1BU18";
import B1BU19 from "./B1BU19";
import B1BU20 from "./B1BU20";
import CourseOverviewScreen from "../CourseOverviewScreen";

export const BUSSINES_B1_STORAGE_KEY = "@curso_progress_bussines_B1";
export const BUSSINES_B1_COURSE_NAME = "Bussines English B1";

export const bussinesB1ModuleDefs = [
  {
    id: 0,
    name: "Controlling the Narrative",
    subtitle: "Aulas B1BU1 até B1BU5",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 1,
    name: "The Art of Nuance & Diplomacy",
    subtitle: "Aulas B1BU6 até B1BU10",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 2,
    name: "High-Stakes Negotiations",
    subtitle: "Aulas B1BU11 até B1BU15",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 3,
    name: "Resolution & Accountability",
    subtitle: "Aulas B1BU16 até B1BU20",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
];

export const bussinesB1SampleLessons = [
  {
    module: 0,
    id: "1",
    title: "Setting the Stage & Defining the Agenda",
    type: "Aula",
    screen: "B1BU1",
  },
  {
    module: 0,
    id: "2",
    title: "The Parking Lot",
    type: "Aula",
    screen: "B1BU2",
  },
  {
    module: 0,
    id: "3",
    title: "Silencing Dominators",
    type: "Aula",
    screen: "B1BU3",
  },
  {
    module: 0,
    id: "4",
    title: "Timeboxing and Pacing",
    type: "Aula",
    screen: "B1BU4",
  },
  {
    module: 0,
    id: "5",
    title: "De-escalating Conflict",
    type: "Aula",
    screen: "B1BU5",
  },
  { module: 1, id: "6", title: "Hedging & Softening", type: "Aula", screen: "B1BU6" },
  { module: 1, id: "7", title: "Strategic Interruptions", type: "Aula", screen: "B1BU7" },
  { module: 1, id: "8", title: "Clarifying & Probing", type: "Aula", screen: "B1BU8" },
  { module: 1, id: "9", title: "Diplomatic Disagreement", type: "Aula", screen: "B1BU9" },
  {
    module: 1,
    id: "10",
    title: "Navigating Cross-Cultural & Virtual Nuances",
    type: "Aula",
    screen: "B1BU10",
  },
  { module: 2, id: "11", title: "Setting the Anchor & The Pitch", type: "Aula", screen: "B1BU11" },
  { module: 2, id: "12", title: "Concessions & Counter-Offers", type: "Aula", screen: "B1BU12" },
  { module: 2, id: "13", title: "Sourcing & Supply Chain Terminology", type: "Aula", screen: "B1BU13" },
  { module: 2, id: "14", title: "The International Vendor Scenario", type: "Aula", screen: "B1BU14" },
  { module: 2, id: "15", title: "Breaking Deadlocks & Closing the Deal", type: "Aula", screen: "B1BU15" },
  { module: 3, id: "16", title: "Distilling & Summarizing Complex Agreements", type: "Aula", screen: "B1BU16" },
  { module: 3, id: "17", title: "Assigning Deliverables & Action Items", type: "Aula", screen: "B1BU17" },
  { module: 3, id: "18", title: "The Executive Follow-up Email", type: "Aula", screen: "B1BU18" },
  { module: 3, id: "19", title: "Feedback Loops & Status Reports", type: "Aula", screen: "B1BU19" },
  { module: 3, id: "20", title: "Analyzing Meeting Effectiveness (ROI)", type: "Aula", screen: "B1BU20" },
];

export const lessonScreens = {
  B1BU1,
  B1BU2,
  B1BU3,
  B1BU4,
  B1BU5,
  B1BU6,
  B1BU7,
  B1BU8,
  B1BU9,
  B1BU10,
  B1BU11,
  B1BU12,
  B1BU13,
  B1BU14,
  B1BU15,
  B1BU16,
  B1BU17,
  B1BU18,
  B1BU19,
  B1BU20,
};

export default function BussinesB1Screen(props) {
  return (
    <CourseOverviewScreen
      {...props}
      courseName={BUSSINES_B1_COURSE_NAME}
      storageKey={BUSSINES_B1_STORAGE_KEY}
      moduleDefs={bussinesB1ModuleDefs}
      lessons={bussinesB1SampleLessons}
    />
  );
}
