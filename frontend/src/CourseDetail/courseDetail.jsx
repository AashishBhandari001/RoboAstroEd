import React, { useState } from "react";
import { Grid, Box, Heading, Text, VStack } from "@chakra-ui/react";
import video1 from "../../src/Videos/video1.mp4";

function CourseDetail() {
  const [lectureNumber, setLectureNumber] = useState(0);
  const lectureTitle = "Introduction to the course";

  const lectures = [
    {
      _id: "sadadada",
      title: "sample1",
      description: "sample1 afafafaf fafawf",
      video: {
        url: "sadaad",
      },
    },
    {
      _id: "afafaf",
      title: "sample1",
      description: "sample1 afafafaf fafawf",
      video: {
        url: "afafafa",
      },
    },
    {
      _id: "sadadada",
      title: "sample1",
      description: "sample1 afafafaf fafawf",
      video: {
        url: "sadaad",
      },
    },
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", marginTop: "8rem" }}>
      <Grid
        minH={"90vh"}
        templateColumns={["1fr", "3fr 1fr"]}
        maxWidth="1000px"
        margin="0 auto"
      >
        <Box display="flex" flexDirection="column">
          <video
            width={"100%"}
            controls
            controlsList="nodownload noremoteplaylist"
            disablePictureInPicture
            disableRemotePlayback
            src={video1}
          ></video>

          <Heading
            m="4"
            children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`}
          />

          <Heading m="4" children="Description" />
          <Text m="4" children={lectures[lectureNumber].description} />
        </Box>

        <VStack>
          {lectures.map((element, index) => (
            <button
              onClick={() => setLectureNumber(index)}
              key={element._id}
              className="w-full p-2 text-center border-2 border-cyan-600 ml-3 hover:bg-gray-200  "
            >
              <Text noOfLines={1} children={`#${index + 1} ${element.title}`} />
            </button>
          ))}
        </VStack>
      </Grid>
    </div>
  );
}

export default CourseDetail;
