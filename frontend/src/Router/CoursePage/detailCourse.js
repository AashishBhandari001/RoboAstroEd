import React from "react";
import CourseDetail from "../../CourseDetail";
import { ChakraProvider } from "@chakra-ui/react";

function DetailCourse() {
  return (
    <ChakraProvider>
      <CourseDetail />
    </ChakraProvider>
  );
}

export default DetailCourse;
