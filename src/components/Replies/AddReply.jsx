import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { addReplyToComment } from "../../services/comment.service";
import { Button, FormControl, HStack, Input } from "@chakra-ui/react";

const AddReply = ({ postId, commentId, handle }) => {
  const [replyText, setReplyText] = useState("");

  const handleAddReply = () => {
    if (replyText.trim() === "") return;
    addReplyToComment(postId, commentId, replyText, handle).then(() => {
      toast.success("Replied successfully");
    });
    setReplyText("");
  };

  return (
    <FormControl>
      <HStack >
        <Input
          type="text"
          placeholder="Add a reply"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          fontSize={'medium'}
          size={'sm'}
          borderRadius={'md'}
          borderColor='blue.300'
          focusBorderColor="blue.500"
        />
        <Button onClick={handleAddReply} size={'sm'} colorScheme="telegram" variant={'ghost'}>
          <i className="bi bi-arrow-return-left"></i>
        </Button>
      </HStack>
    </FormControl>
  );
};

AddReply.propTypes = {
  postId: PropTypes.string,
  commentId: PropTypes.string,
  handle: PropTypes.string,
};

export default AddReply;
