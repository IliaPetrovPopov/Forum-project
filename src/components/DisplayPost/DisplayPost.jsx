import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./DisplayPost.css";
import { ProfilePic } from "../ProfilePic/ProfilePic";
import DeleteButton from "../DeleteButton/DeleteButton";
import SaveButton from "../SaveButton/SaveButton";
import { useEffect, useState } from "react";
import { getUserData } from "../../services/user.service";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";
import UpvoteButton from "../UpvoteButton/UpvoteButton";
import DownvoteButton from "../DownvoteButton/DownvoteButton";
import {
  Box,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Text,
  Wrap,
} from "@chakra-ui/react";
import CategoriesTags from "../Categories/CategoriesTag";

const DisplayPost = ({ post }) => {
  const [user] = useAuthState(auth);
  const [handle, setHandle] = useState(null);

  useEffect(() => {
    if (user) {
      getUserData(user.uid)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const userHandle = userData[Object.keys(userData)[0]].handle;
            setHandle(userHandle);
          }
        })
        .catch((e) => console.error("Error fetching user data", e));
    }
  }, [user, post]);

  const likedBy = Array.isArray(post.likedBy)
    ? post.likedBy
    : post.likedBy
    ? Object.keys(post.likedBy)
    : [];
  const dislikedBy = Array.isArray(post.dislikedBy)
    ? post.dislikedBy
    : post.dislikedBy
    ? Object.keys(post.dislikedBy)
    : [];
  const savedBy = Array.isArray(post.savedBy)
    ? post.savedBy
    : post.savedBy
    ? Object.keys(post.savedBy)
    : [];

  const comments = Array.isArray(post.comments)
    ? post.comments
    : post.comments
    ? Object.keys(post.comments)
    : [];

  return (
    <Container className="short-post" maxW={"7xl"} p="3" ml={0.5}>
      <Wrap spacing="10px" marginTop={3} ml={1}>
        {/* <WrapItem> */}
        <Box w="100%">
          <Grid
            templateColumns="repeat(4, 1fr)"
            templateRows="repeat(2, 1fr)"
            alignItems="center"
            fontSize="larger"
          >
            <GridItem colStart={1} colSpan={3}>
              <Link to={`/single-post/${post.id}`} className="post-link">
                <Heading fontSize="xl" marginTop="3">
                  <Text
                    fontSize="x-large"
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  >
                    {post.title}
                  </Text>
                </Heading>
              </Link>
            </GridItem>
            {post.categories && (
              <GridItem rowStart={2} colStart={1} colSpan={3}>
                <CategoriesTags post={post} />
              </GridItem>
            )}
            {user && (
              <GridItem colStart={5} alignItems="right" mr={3}>
                <SaveButton
                  postId={post.id}
                  handle={handle}
                  savedBy={savedBy}
                />{" "}
                <DeleteButton type={"post"} post={post} />{" "}
              </GridItem>
            )}
            <GridItem rowStart={3} colStart={5} alignItems="right" mr={3}>
              <UpvoteButton
                id={post.id}
                handle={handle}
                likedBy={likedBy}
                dislikedBy={dislikedBy}
              />
              <DownvoteButton
                id={post.id}
                handle={handle}
                likedBy={likedBy}
                dislikedBy={dislikedBy}
              />{" "}
            </GridItem>
            <GridItem rowStart={3} colSpan={3}>
              <HStack
                marginTop="3"
                spacing="3"
                alignItems="center"
                fontSize="large"
              >
                {user ? (
                  <Link to={`/users/${post.author}`} className="post-link">
                    <ProfilePic handle={post.author} post={post} />
                  </Link>
                ) : (
                  <ProfilePic handle={post.author} post={post} />
                )}
                <Text fontWeight="medium">{post.author}</Text>
                <Text>-</Text>
                <Text>
                  Created on {new Date(post.createdOn).toLocaleDateString()}
                  {" - "}
                  {comments.length} comments
                </Text>
              </HStack>
            </GridItem>
          </Grid>{" "}
        </Box>
        {/* </WrapItem> */}
      </Wrap>
    </Container>
  );
};

DisplayPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    likedBy: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.objectOf(PropTypes.bool),
    ]),
    dislikedBy: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.objectOf(PropTypes.bool),
    ]),
    savedBy: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.objectOf(PropTypes.bool),
    ]),
    comments: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    categories: PropTypes.array,
    createdOn: PropTypes.any,
    author: PropTypes.string,
  }),
};

export default DisplayPost;
