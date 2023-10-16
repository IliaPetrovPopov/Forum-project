import PropTypes from "prop-types";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import { useContext, useState } from "react";
import { RoleContext } from "../../context/RoleContext";
import {
  Flex,
  Box,
  Text,
  Divider,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ProfilePic } from "../ProfilePic/ProfilePic";
import { getTimeDifference } from "../../common/helper-func.js";
import { AuthContext } from "../../context/AuthContext";

const ShowReplies = ({ handle, replies, post, comment }) => {
  const replyIDs = Object.keys(replies).sort((a, b) => {
    return replies[b].createdOn - replies[a].createdOn;
  });
  const { role } = useContext(RoleContext);
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Flex direction={"column"}>
      <Divider />
      <Box>
        {/* <Text as="h5">Replies:</Text> */}
        {replyIDs.map((id) => (
          <Box
            key={id}
            borderWidth="1px"
            bg={"blue.50"}
            p={4}
            borderRadius="md"
            borderColor={"blue.200"}
          >
            <HStack fontSize={15}>
              {user ? (
                <Link to={`/users/${replies[id].author}`} className="post-link">
                  <ProfilePic handle={replies[id].author} post={replies[id]} />
                </Link>
              ) : (
                <ProfilePic handle={replies[id].author} post={replies[id]} />
              )}
              <Text fontWeight="medium">{replies[id].author}</Text>
              <Text>-</Text>
              <Text
                verticalAlign={"center"}
                fontWeight="bold"
                color={"gray.500"}
              >
                {getTimeDifference(post.createdOn)}
              </Text>
              {(role === "admin" || replies[id].author === handle) && (
                <>
                  <Spacer />
                  <Box as="span" onClick={handleEdit}>
                    <i className="bi bi-pencil-square"></i>
                  </Box>
                  <DeleteButton
                    type={"reply"}
                    post={post}
                    comment={comment}
                    reply={replies[id]}
                    replyID={id}
                    handle={handle}
                  />
                </>
              )}
            </HStack>
            <Box mt={4}>
              {isEditing ? (
                <EditButton
                  type={"reply"}
                  post={post}
                  comment={comment}
                  reply={replies[id]}
                  replyID={id}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <>
                  <Text>{replies[id].content}</Text>
                </>
              )}{" "}
            </Box>
          </Box>
        ))}
      </Box>
    </Flex>
  );
};

ShowReplies.propTypes = {
  replies: PropTypes.object,
  post: PropTypes.object,
  handle: PropTypes.string,
  comment: PropTypes.object,
};

export default ShowReplies;
