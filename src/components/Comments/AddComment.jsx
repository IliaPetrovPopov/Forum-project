import { useState } from "react";
import { addComment } from "../../services/comment.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { Button, FormControl, HStack, Input } from "@chakra-ui/react";

const AddComment = ({ postId, handle }) => {
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    if (commentText === "") return;
    addComment(postId, commentText, handle).then(() => {
      toast.success("Comment added");
    });
    setCommentText("");
  };

  return (
    <FormControl>
      <HStack>
        <Input
          type="text"
          placeholder="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          size={"md"}
          borderColor="green.300"
          focusBorderColor="green.500"
        />
        <Button
          onClick={handleAddComment}
          size="md"
          colorScheme="green"
          variant={"ghost"}
        >
          <i className="bi bi-chat-left-dots"></i>
        </Button>
      </HStack>
    </FormControl>
  );
};

AddComment.propTypes = {
  postId: PropTypes.string,
  handle: PropTypes.string,
};

export default AddComment;
