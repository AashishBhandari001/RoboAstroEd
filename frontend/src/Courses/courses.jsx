import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Heading,
  Input,
  HStack,
  Box,
  VStack,
  Button,
  Text,
  Grid,
  Image,
} from "@chakra-ui/react";
import { getAllCourses, getCourseLectures } from "../Actions/courseAction";

const categories = [
  "Sajilobot",
  "LED Automation",
  "Sajilo Diyo",
  "Web Development",
  "Machine Learning",
  "Artificial Intelligence",
  "Motor",
  "Servo",
];

const Course = ({
  views,
  title,
  imageSrc,
  id,
  creator,
  description,
  lectureCount,
  courseDetailsHandler,
}) => {
  return (
    <Grid
      templateColumns={["1fr", "1fr", "1fr", "1fr", "1fr", "1fr"]}
      gap={4}
      className="mb-2 hover:translate-y-2 p-2"
    >
      <Box>
        <Image
          src={imageSrc}
          objectFit={"contain"}
          boxSize={["400px", "450px", "400px"]}
        />
      </Box>
      <VStack align="start" spacing={2} pl={4} flex="1">
        <Heading
          textAlign={["center", "left"]}
          maxW="200px"
          size={"sm"}
          fontFamily={"sans-serifs"}
          noOfLines={3}
          children={title}
        />
        <Text noOfLines={2} children={description} />

        <HStack>
          <Text
            fontWeight={"bold"}
            textTransform="uppercase"
            children={"Creator"}
          />
          <Text
            fontFamily={"body"}
            textTransform="uppercase"
            children={creator}
          />
        </HStack>

        <Heading
          textAlign={"center"}
          size="xs"
          children={`Lectures - ${lectureCount}`}
          textTransform="uppercase"
        />

        <Heading
          size="xs"
          children={`Views - ${views}`}
          textTransform="uppercase"
        />

        <HStack spacing={4} justifyContent="center">
          <Link to={lectureCount > 0 ? `/lessons/${id}` : "#"}>
            <Button
              onClick={() => courseDetailsHandler(id, title)}
              colorScheme={"orange"}
            >
              {" "}
              Watch Now
            </Button>
          </Link>
        </HStack>
      </VStack>
    </Grid>
  );
};

function Courses() {
  const alert = useAlert();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseTitle, setCourseTitle] = useState("");

  const dispatch = useDispatch();

  const { courses, error } = useSelector((state) => state.courses);
  // const { currentUser } = useSelector((state) => state.user);
  // const token = currentUser.token;

  const courseDetailsHandler = (courseId, title, lectureCount) => {
    if (lectureCount === 0) {
      alert.error("No lectures in this course");
    } else {
      dispatch(getCourseLectures(courseId));
      setCourseId(courseId);
      setCourseTitle(title);
    }
  };

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));

    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
  }, [category, keyword, dispatch, alert, error]);

  return (
    <Container
      className="mt-16"
      minH={"95vh"}
      maxW="container.lg"
      paddingY={"8"}
    >
      <Heading children="All Courses" margin={"8"} />

      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="search a course..."
        type={"text"}
        focusBorderColor="cyan.800"
      />

      <HStack overflowX={"auto"} paddingY="7">
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={"60"}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>
      <Grid
        templateColumns={["1fr", "1fr", "1fr", "1fr", "repeat(2, 1fr)"]}
        gap={4}
        justifyContent="center"
      >
        {courses &&
          courses.map((item) => (
            <Course
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              lectureCount={item.numOfVideos}
              courseDetailsHandler={() => {
                courseDetailsHandler(item._id, item.title, item.numOfVideos);
              }}
            />
          ))}
      </Grid>
    </Container>
  );
}

export default Courses;
