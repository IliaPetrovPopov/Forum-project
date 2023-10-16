import { useContext, useState } from "react";
import {
  contentValidation,
  titleValidation,
} from "../../services/document-verifications/post-doc-verification";
import { addPost } from "../../services/post.service";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CategoriesSelect from "../Categories/CategoriesSelect";
import {
  Box,
  Button,
  Center,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";

export const CreatePost = () => {
  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
  });
  const [selectedCategories, setSelectedCategories] = useState([]);

  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);

  const handleChange = (prop) => (e) => {
    setPostInfo({
      ...postInfo,
      [prop]: e.target.value,
    });
  };

  const handleSelectCategory = (categories) => {
    setSelectedCategories(categories);
  };

  const onCreation = (event) => {
    event.preventDefault();

    try {
      titleValidation(postInfo.title);
      contentValidation(postInfo.content);
      addPost(
        postInfo.content,
        userData.handle,
        postInfo.title,
        selectedCategories
      ).then(() => navigate("/"));
    } catch {
      /* empty */
    }
  };

  return (
    <Box
      spacing={8}
      mx={"auto"}
      maxW={"60vw"}
      mt={12}
      mb={6}
      rounded={"lg"}
      bg={"gray.400"}
      boxShadow={"lg"}
      p={8}
      fontSize={"large"}
    >
      <Heading align={"center"}>Create Post</Heading>
      <FormLabel mt={2} fontSize={"larger"}>
        Title:
      </FormLabel>
      <Input
        bg={"white"}
        name="title"
        value={postInfo.title}
        onChange={handleChange("title")}
        placeholder="My title"
      />

      <FormLabel fontSize={"larger"} mt={2}>
        Add content:
      </FormLabel>
      <Textarea
        bg={"white"}
        type="text"
        name="content"
        value={postInfo.content}
        onChange={handleChange("content")}
        placeholder="My content"
        mb={4}
      />
      <CategoriesSelect onSelect={handleSelectCategory} />
      <Center>
        <Button
          mt={4}
          colorScheme="red"
          size={"lg"}
          minWidth="15vw"
          mb={4}
          type="submit"
          fontSize={"larger"}
          onClick={onCreation}
        >
          Create Post
        </Button>
      </Center>
    </Box>
  );
};
