import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@chakra-ui/react";
import "./CreatePostButton.css"

export const CreatePostButton = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user !== null) {
    return (
      <Button
        id="create-post"
        onClick={() => navigate("/create-post")}
        colorScheme="red"
        size={"lg"}
        minWidth="15vw"
        mb={4}
      >
        Create New Post
      </Button>
    );
  }
};
