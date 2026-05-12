import React from "react";
import CourseOverviewScreen from "../CourseOverviewScreen";

export const BUSSINES_A2_STORAGE_KEY = "@curso_progress_bussines_A2";
export const BUSSINES_A2_COURSE_NAME = "Bussines English A2";

export const bussinesA2ModuleDefs = [];
export const bussinesA2SampleLessons = [];

export default function BussinesA2Screen(props) {
  return (
    <CourseOverviewScreen
      {...props}
      courseName={BUSSINES_A2_COURSE_NAME}
      storageKey={BUSSINES_A2_STORAGE_KEY}
      moduleDefs={bussinesA2ModuleDefs}
      lessons={bussinesA2SampleLessons}
    />
  );
}
