import React, { useState } from "react";
import { Trash2 } from "lucide-react";

import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

const fileUploadCss = {
  cursor: "pointer",
  marginLeft: "-5%",
  width: "110%",
  border: "none",
  height: "100%",
  color: "white",
  backgroundColor: "#FFFFFF",
};

function CourseModel({
  isOpen,
  onClose,
  id,
  deleteLectureButtonHandler,
  addLeactureHandler,
  courseTitle,
  lectures = [],
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const handleClose = () => {
    onClose();
    setTitle("");
    setDescription("");
    setVideo("");
    setVideoPrev("");
  };

  return (
    <Modal
      isOpen={isOpen}
      size="full"
      onClose={handleClose}
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton />

        <ModalBody p="16">
          <Grid templateColumns={["1fr", "3fr 1fr"]}>
            <Box px={["0", "16"]}>
              <Box my="5">
                <Heading children={courseTitle} />
                <Heading children={`#${id}`} size="sm" opacity={0.4} />
              </Box>
              <Heading children={"Lectures"} size="lg" />

              <VideoCard
                title="React Intro"
                description="This is the intro to react"
                num={1}
                lectureId="afafafafafafafaf"
                courseId={id}
                deleteButtonHandler={deleteLectureButtonHandler}
              />
            </Box>

            <Box>
              <form
                onSubmit={(e) =>
                  addLeactureHandler(e, id, title, description, video)
                }
              >
                <VStack spacing={"4"}>
                  <Heading
                    children="Add Lecture"
                    size={"md"}
                    textTransform={"uppercase"}
                  />

                  <Input
                    focusBorderColor="cyan.600"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Input
                    focusBorderColor="cyan.600"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Input
                    accept="video/mp4"
                    required
                    type={"file"}
                    focusBorderColor="cyan.600"
                    css={{
                      "&::file-selector-button": {
                        ...fileUploadCss,
                        color: "black",
                      },
                    }}
                    onChange={changeVideoHandler}
                  />

                  {videoPrev && (
                    <video
                      controlsList="nodownload"
                      controls
                      src={videoPrev}
                    ></video>
                  )}

                  <Button w="full" colorScheme={"blue"} type="submit">
                    {" "}
                    upload
                  </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter>
          {" "}
          <Button colorScheme={"blue"} onClick={handleClose}>
            {" "}
            Close
          </Button>{" "}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CourseModel;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
}) {
  return (
    <Stack
      direction={["column", "row"]}
      my="8"
      borderRadius="lg" // Corrected property name
      boxShadow="0 0 10px rgba(107, 70, 193, 0.5)" // Corrected property name
      justifyContent={["flex-start", "space-between"]}
      p={["4", "8"]}
    >
      <Box>
        <Heading size={"sm"} children={`#${num} ${title} `} />
        <Text children={description} />
      </Box>
      <Button
        color={"cyan.600"}
        onClick={() => deleteButtonHandler(courseId, lectureId)}
      >
        <Trash2 />
      </Button>
    </Stack>
  );
}
