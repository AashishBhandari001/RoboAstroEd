import React, { useState } from "react";
import {
  Grid,
  Container,
  Heading,
  VStack,
  Input,
  Select,
  Image,
  Button,
} from "@chakra-ui/react";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const fileUploadCss = {
    cursor: "pointer",
    marginLeft: "-5%",
    width: "110%",
    border: "none",
    height: "100%",
    color: "white",
    backgroundColor: "#FFFFFF",
  };

  const categories = ["Web Dev", "AI", "LED", "Sajilo Diyo"];

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  return (
    <Grid minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
      <Container>
        <Heading
          textTransform={"uppercase"}
          children="create course"
          my="16"
          textAlign={["center", "left"]}
        />
        <form>
          <VStack m="auto" spacing={"8"}>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title.."
              type="text"
              focusBorderColor="cyan.600"
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description.."
              type="text"
              focusBorderColor="cyan.600"
            />
            <Input
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              placeholder="Creator Name"
              type="text"
              focusBorderColor="cyan.600"
            />

            <Select
              focusBorderColor="cyan.600"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category.."
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>

            <Input
              accept="image/*"
              required
              type={"file"}
              focusBorderColor="cyan.600"
              css={{
                "&::file-selector-button": {
                  ...fileUploadCss,
                  color: "black",
                },
              }}
              onChange={changeImageHandler}
            />
            {imagePrev && (
              <Image src={imagePrev} boxSize="64" objectFit={"contain"} />
            )}

            <Button w="full" colorScheme={"blue"} type="submit">
              Create
            </Button>
          </VStack>
        </form>
      </Container>
    </Grid>
  );
}

export default CreateCourse;
