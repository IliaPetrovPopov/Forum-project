import ShowReplies from "../Replies/ShowReplies";
import AddReply from "../Replies/AddReply";
import PropTypes from "prop-types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";
import { useContext, useState } from "react";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import { RoleContext } from "../../context/RoleContext";
import {
  Flex,
  Box,
  Text,
  Button,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ProfilePic } from "../ProfilePic/ProfilePic";
import { getTimeDifference } from "../../common/helper-func.js";

const ShowComments = ({ comments, post, handle }) => {
  const [user] = useAuthState(auth);
  const { role } = useContext(RoleContext);
  const [seeReplies, setSeeReplies] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  if (!comments.length) {
    return;
  }

  const toggleRepliesVisibility = (commentId) => {
    setSeeReplies((prevVisibleReplies) => ({
      ...prevVisibleReplies,
      [commentId]: !prevVisibleReplies[commentId],
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Flex direction="column" >
      <Box mt={4}>
        {Object.keys(comments).map((cID) => (
          <Box
            key={cID}
            borderWidth="1px"
            bg={"green.50"}
            p={4}
            borderRadius="md"
            mb={4}
            borderColor={'green.300'}
          >
            <HStack>
              {user ? (
                <Link to={`/users/${comments[cID].author}`} className="post-link">
                  <ProfilePic handle={comments[cID].author} post={post} />
                </Link>
              ) : (
                <ProfilePic handle={comments[cID].author} post={post} />
              )}
              <Text fontWeight="medium">{comments[cID].author}</Text>
              <Text>-</Text>
              <Text
                verticalAlign={"center"}
                fontWeight="bold"
                color={"gray.500"}
              >
                {getTimeDifference(post.createdOn)}
              </Text>{" "}
              {(role === "admin" || comments[cID].author === handle) && (
                <>
                  <Spacer />
                  <Box as="span" onClick={handleEdit}>
                    <i className="bi bi-pencil-square"></i>
                  </Box>
                  <DeleteButton
                    type={"comment"}
                    post={post}
                    comment={comments[cID]}
                    handle={handle}
                  />{" "}
                </>
              )}
            </HStack>
            <Box mt={4}>
              {isEditing ? (
                <EditButton
                  type={"comment"}
                  comment={comments[cID]}
                  post={post}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <>
                  <Text fontSize={"large"}>{comments[cID].content}</Text>
                </>
              )}
            </Box>
            <HStack>
              {comments[cID].replies && (
                <Button
                  size={"sm"}
                  colorScheme="telegram"
                  onClick={() => toggleRepliesVisibility(comments[cID].id)}
                >
                  {seeReplies[comments[cID].id]
                    ? "Hide Replies"
                    : `Show ${
                        Object.keys(comments[cID].replies).length
                      } Replies`}
                </Button>
              )}
              {user && (
                <AddReply
                  postId={post.id}
                  handle={handle}
                  commentId={comments[cID].id}
                />
              )}
            </HStack>

            {seeReplies[comments[cID].id] && comments[cID].replies && (
              <ShowReplies
                handle={handle}
                replies={comments[cID].replies}
                post={post}
                comment={comments[cID]}
              />
            )}
          </Box>
        ))}
      </Box>
    </Flex>
  );
};

ShowComments.propTypes = {
  post: PropTypes.object,
  handle: PropTypes.string,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      createdOn: PropTypes.number,
      replies: PropTypes.object,
      id: PropTypes.string,
    })
  ),
};

export default ShowComments;
