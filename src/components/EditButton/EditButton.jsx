import { useEffect, useState } from "react";
import {
  contentValidation,
  titleValidation,
} from "../../services/document-verifications/post-doc-verification";
import { updatePost } from "../../services/post.service";
import { updateComment, updateReply } from "../../services/comment.service";
import PropTypes from "prop-types";
import { Button, Box, Textarea, HStack } from "@chakra-ui/react";
import { Form } from "react-bootstrap";
import CategoriesSelect from "../Categories/CategoriesSelect";

const EditButton = ({ type, post, comment, reply, replyID, onCancel }) => {
  let data;
  if (type === "post") {
    data = post;
  } else if (type === "comment") {
    data = comment;
  } else if (type === "reply") {
    data = reply;
  }

  const [editedContent, setEditedContent] = useState(data.content);
  const [editedTitle, setEditedTitle] = useState(data.title);
  const [editedCategories, setEditedCategories] = useState(data.categories);

  const handleSave = () => {
    if (editedContent.trim() === "") {
      return onCancel();
    }
    if (type === "post") {
      titleValidation(editedTitle);
      contentValidation(editedContent);
      updatePost(data.id, editedTitle, editedContent, new Date(), editedCategories);
    } else if (type === "comment") {
      updateComment(post.id, comment.id, editedContent);
    } else if (type === "reply") {
      updateReply(post.id, comment.id, replyID, editedContent);
    }
    onCancel();
  };

  return (
    <Box mt={4} mb={4}>
      {type === "post" && (<>
        <CategoriesSelect onSelect={setEditedCategories} categories={editedCategories} />
        <Textarea
          width="100%"
          mt={4}
          height={'5vh'}
          borderColor="gray.400"
          focusBorderColor="green.400"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          variant={"filled"}
        /></>
      )}
      <Textarea
      mt={4}
        width="100%"
        height={'15vh'}
        borderColor="gray.400"
        focusBorderColor="green.400"
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        variant={"filled"}
      />
      <HStack justifyItems={"end"} mt={4}/>
      <Button onClick={handleSave} size="sm" colorScheme="pink" mr={2}>
        Save
      </Button>
      <Button onClick={onCancel} size="sm" colorScheme="teal">
        Cancel
      </Button>
      <HStack />
    </Box>
  );
};

EditButton.propTypes = {
  type: PropTypes.oneOf(["post", "comment", "reply"]),
  post: PropTypes.object,
  comment: PropTypes.object,
  reply: PropTypes.object,
  replyID: PropTypes.string,
  onCancel: PropTypes.func,
};

export default EditButton;
