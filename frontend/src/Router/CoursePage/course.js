import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Courses from "../../Courses";

function Course() {
  return (
    <ChakraProvider>
      <Courses />
    </ChakraProvider>
  );
}

export default Course;
