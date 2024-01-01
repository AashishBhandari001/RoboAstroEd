import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import AllCourses from "../../Admin/Courses/AllCourses";

function AllCourse() {
  return (
    <ChakraProvider>
      <AllCourses />
    </ChakraProvider>
  );
}

export default AllCourse;
