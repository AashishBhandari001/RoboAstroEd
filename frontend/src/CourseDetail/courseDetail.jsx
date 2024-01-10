import React, { useState } from "react";
import { Grid, Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Elements/Loading";

function CourseDetail() {
  const dispatch = useDispatch();
  const [lectureNumber, setLectureNumber] = useState(0);
  const { lectures, loading, error } = useSelector((state) => state.lectures);

  if (!lectures || lectures.length === 0) {
    return <div>No lectures available</div>;
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{ maxWidth: "1000px", margin: "0 auto", marginTop: "8rem" }}
        >
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
                src={lectures[lectureNumber].video.url}
              ></video>

              <Heading
                m="4"
                children={`#${lectureNumber + 1} ${
                  lectures[lectureNumber].title
                }`}
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
                  <Text
                    noOfLines={1}
                    children={`#${index + 1} ${element.title}`}
                  />
                </button>
              ))}
            </VStack>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default CourseDetail;
