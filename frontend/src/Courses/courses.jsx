import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Heading,
  Input,
  HStack,
  Button,
  Text,
  Stack,
  VStack,
  Image,
} from "@chakra-ui/react";

const addToPlaylistHandler = () => {};

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
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
}) => {
  return (
    <VStack
      className="mb-2 hover:translate-y-2 p-2"
      alignItems={["center", "flex-start"]}
    >
      <Image src={imageSrc} objectFit={"contain"} />
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

      <Stack direction={["column", "row"]} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={"orange"}> Watch Now</Button>
        </Link>

        <Button
          variant={"ghost"}
          colorScheme={"orange"}
          onClick={() => addToPlaylistHandler(id)}
        >
          Add to playlist
        </Button>
      </Stack>
    </VStack>
  );
};

function Courses() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  return (
    <Container
      className="mt-12"
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
      <Stack
        direction={["column", "row"]}
        flexWrap="wrap"
        justifyContent={["flex-start", "space-evenly"]}
        alignItems={["center", "flex-start"]}
      >
        <Course
          title={"Sample1"}
          description={"Sample1"}
          views={23}
          imageSrc={"https://picsum.photos/id/237/200/300"}
          creator={"Aashish"}
          lectureCount={2}
          addToPlaylistHandler={addToPlaylistHandler}
        />
      </Stack>
    </Container>
  );
}

export default Courses;
