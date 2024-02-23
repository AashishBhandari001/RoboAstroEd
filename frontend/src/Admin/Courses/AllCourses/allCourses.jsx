import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import CourseModel from "../CourseModel";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../../../Router/Metadata/metaData";

import {
  deleteCourse,
  getAllCourses,
  getCourseLectures,
  clearErrors,
  addLecture,
  deleteLecture,
} from "../../../Actions/courseAction";

import {
  Grid,
  Button,
  Box,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  HStack,
  Image,
  useDisclosure,
} from "@chakra-ui/react";

function AllCourses() {
  const alert = useAlert();
  const [courseId, setCourseId] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const { courses } = useSelector((state) => state.courses);

  const { currentUser } = useSelector((state) => state.user);
  const { lectures, error } = useSelector((state) => state.lectures);

  const token = currentUser.token;

  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const courseDetailsHandler = (courseId, title) => {
    dispatch(getCourseLectures(courseId, { token }));
    onOpen();
    setCourseId(courseId);
    setCourseTitle(title);
  };

  const deleteButtonHandler = (courseId) => {
    dispatch(deleteCourse(courseId, { token }));
    alert.success("Course Deleted Successfully");
    dispatch(getAllCourses());
  };

  const deleteLectureButtonHandler = async (lectureId, courseId) => {
    await dispatch(deleteLecture(lectureId, courseId, { token }));
    dispatch(getCourseLectures(courseId, { token }));
  };

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    await dispatch(addLecture(courseId, myForm, { token }));
    dispatch(getCourseLectures(courseId, { token }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllCourses());
  }, [dispatch, error, alert]);

  return (
    <Grid minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
      <MetaData title="All Courses" />
      <Box p={["0", "2"]} overflow="auto">
        <TableContainer w={["100vm", "full"]}>
          <Table variant="simple" size="lg">
            <TableCaption> All available courses in the database</TableCaption>
            <Thead>
              <Tr>
                <Th> Id</Th>
                <Th>poster</Th>
                <Th> Title</Th>
                <Th> Category</Th>
                <Th> CreatedBy</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Actions</Th>
              </Tr>
            </Thead>

            <Tbody>
              {courses &&
                courses.map((item) => (
                  <Row
                    courseDetailsHandler={courseDetailsHandler}
                    deleteButtonHandler={deleteButtonHandler}
                    key={item._id}
                    item={item}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModel
          isOpen={isOpen}
          onClose={onClose}
          id={courseId}
          courseTitle={courseTitle}
          deleteLectureButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          lectures={lectures}
        />
      </Box>
    </Grid>
  );
}

function Row({ item, courseDetailsHandler, deleteButtonHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={"uppercase"}> {item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button
            onClick={() => courseDetailsHandler(item._id, item.title)}
            varient={"outline"}
            color="cyan.600"
          >
            {" "}
            View Lecture{" "}
          </Button>

          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={"cyan.600"}
          >
            {" "}
            <Trash2 />{" "}
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default AllCourses;
