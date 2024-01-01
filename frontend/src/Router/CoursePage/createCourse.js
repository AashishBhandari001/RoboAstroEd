import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import CreateCourse from "../../Admin/Courses/CreateCourse";

function CreateCourses() {
  return (
    <ChakraProvider>
      <CreateCourse />
    </ChakraProvider>
  );
}

export default CreateCourses;
