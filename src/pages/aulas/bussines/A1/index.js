import React from "react";
import CourseOverviewScreen from "../CourseOverviewScreen";

export const BUSSINES_STORAGE_KEY = "@curso_progress_bussines_A1";
export const BUSSINES_COURSE_NAME = "Bussines English";

export const bussinesModuleDefs = [
  {
    id: 0,
    name: "Getting Started in Business",
    subtitle: "Aulas A1BU1 até A1BU5",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 1,
    name: "Key Business Communications",
    subtitle: "Aulas A1BU6 até A1BU9",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 2,
    name: "Delivering Presentations",
    subtitle: "Aulas A1BU10 até A1BU14",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 3,
    name: "Business Negotiations",
    subtitle: "Aulas A1BU15 até A1BU19",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
];

export const bussinesSampleLessons = [
  {
    module: 0,
    id: "1",
    title: "Greetings and Basic Introductions",
    type: "Aula",
    screen: "A1BU1",
  },
  {
    module: 0,
    id: "2",
    title: "Describing Work Duties",
    type: "Aula",
    screen: "A1BU2",
  },
  {
    module: 0,
    id: "3",
    title: "Handling Simple Sales Inquiries",
    type: "Aula",
    screen: "A1BU3",
  },
  {
    module: 0,
    id: "4",
    title: "Giving Short Updates in Meetings",
    type: "Aula",
    screen: "A1BU4",
  },
  {
    module: 0,
    id: "5",
    title: "Practicing Basic Travel Conversations",
    type: "Aula",
    screen: "A1BU5",
  },
  {
    module: 1,
    id: "6",
    title: "Participating in Meetings",
    type: "Aula",
    screen: "A1BU6",
  },
  {
    module: 1,
    id: "7",
    title: "Presenting Updates",
    type: "Aula",
    screen: "A1BU7",
  },
  {
    module: 1,
    id: "8",
    title: "Handling Basic Problem Solving",
    type: "Aula",
    screen: "A1BU8",
  },
  {
    module: 1,
    id: "9",
    title: "Writing Professional Emails",
    type: "Aula",
    screen: "A1BU9",
  },
  {
    module: 2,
    id: "10",
    title: "Structuring a Talk",
    type: "Aula",
    screen: "A1BU10",
  },
  {
    module: 2,
    id: "11",
    title: "Describing Charts or Graphs",
    type: "Aula",
    screen: "A1BU11",
  },
  {
    module: 2,
    id: "12",
    title: "Managing Question and Answer Sessions",
    type: "Aula",
    screen: "A1BU12",
  },
  {
    module: 2,
    id: "13",
    title: "Engaging the Audience and Body Language",
    type: "Aula",
    screen: "A1BU13",
  },
  {
    module: 2,
    id: "14",
    title: "Closing a Presentation Strongly",
    type: "Aula",
    screen: "A1BU14",
  },
  {
    module: 3,
    id: "15",
    title: "Making Offers",
    type: "Aula",
    screen: "A1BU15",
  },
  {
    module: 3,
    id: "16",
    title: "Presenting Counter-Offers",
    type: "Aula",
    screen: "A1BU16",
  },
  {
    module: 3,
    id: "17",
    title: "Reaching Agreements and Compromises",
    type: "Aula",
    screen: "A1BU17",
  },
  {
    module: 3,
    id: "18",
    title: "Handling Disagreements Constructively",
    type: "Aula",
    screen: "A1BU18",
  },
  {
    module: 3,
    id: "19",
    title: "Finalizing and Closing the Deal",
    type: "Aula",
    screen: "A1BU19",
  },
];

export default function BussinesScreen(props) {
  return (
    <CourseOverviewScreen
      {...props}
      courseName={BUSSINES_COURSE_NAME}
      storageKey={BUSSINES_STORAGE_KEY}
      moduleDefs={bussinesModuleDefs}
      lessons={bussinesSampleLessons}
    />
  );
}
