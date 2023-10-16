/* eslint-disable no-unused-vars */
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../../config/firebase-config";
import { useContext, useEffect, useState } from "react";
import { getPostById, updatePost } from "../../services/post.service";
import { getUserData } from "../../services/user.service";
import { useNavigate, useParams } from "react-router";
import { getCommentsForPost } from "../../services/comment.service";
import ReactPaginate from "react-paginate";
import AddComment from "../../components/Comments/AddComment";
import ShowComments from "../../components/Comments/ShowComments";
import UpvoteButton from "../../components/UpvoteButton/UpvoteButton";
import DownvoteButton from "../../components/DownvoteButton/DownvoteButton";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import EditButton from "../../components/EditButton/EditButton";
import { RoleContext } from "../../context/RoleContext";
import UploadImage from "../../components/Image/UploadImage";
import "./SinglePost.css";
import ShowImages from "../../components/Image/ShowImages";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import SaveButton from "../../components/SaveButton/SaveButton";
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import ReadTime from "../../components/ReadTime/ReadTime";
import { Link } from "react-router-dom";
import { ProfilePic } from "../../components/ProfilePic/ProfilePic";
import CategoriesTags from "../../components/Categories/CategoriesTag";
import "./SinglePost";
import { MAX_COMMENTS_PER_PAGE } from "../../common/constants";
const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [handle, setHandle] = useState(null);
  const [user] = useAuthState(auth);
  const { role } = useContext(RoleContext);
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const imageListRef = ref(storage, `posts/${postId}/images`);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const commentsPerPage = MAX_COMMENTS_PER_PAGE;

  useEffect(() => {
    getPostById(postId)
      .then((data) => {
        setPost(data);
      })
      .catch((e) => console.error("Error fetching post", e));

    getCommentsForPost(postId)
      .then((sortedComments) => {
        setComments(sortedComments);
      })
      .catch((e) => console.error("Error fetching comments", e));
  }, [postId, handle, isEditing, comments]);

  useEffect(() => {
    listAll(imageListRef)
      .then((response) => {
        const urls = [];

        response.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            urls.push(url);
            if (urls.length === response.items.length) {
              setImageUrls(urls);
            }
          });
        });
      })
      .catch((error) => {
        console.error("Error listing images:", error);
      });
  }, []);

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
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleImageUploaded = (url) => {
    setImageUrls((prevImageUrls) => [...prevImageUrls, url]);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );
  const pageNumbers = Math.ceil(comments.length / commentsPerPage);

  if (!post) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="green.500"
        size="xl"
      />
    );
  }

  return (
    <Flex
      bg={"gray.100"}
      borderRadius={10}
      mt={4}
      paddingBottom={7}
      mx={[20, 40, 60]}
      alignItems="center"
      justifyContent="center"
    >
      <Box ml={7} mr={7} borderColor={"black"} justifyItems="center">
        <>
          {" "}
          <HStack mt={4} fontSize="large" fontWeight="medium">
            <IconButton
              fontSize="large"
              fontWeight={700}
              className="bi bi-arrow-left"
              onClick={() => navigate(-1)}
            />
            <Box>
              LAST UPDATED:{" "}
              {post.lastUpdate
                ? new Date(post.lastUpdate).toLocaleDateString()
                : new Date(post.createdOn).toLocaleDateString()}
            </Box>
            <i className="bi bi-dot"></i>
            <ReadTime content={post.content} />
            <Spacer />
            <SaveButton
              postId={postId}
              handle={handle}
              savedBy={Object.keys(post.savedBy)}
            />

            {(role === "admin" || post.author === handle) && (
              <>
                <span onClick={handleEdit}>
                  <i className="bi bi-pencil-square"></i>
                </span>
              </>
            )}
            <DeleteButton
              handle={handle}
              type={"post"}
              post={post}
            ></DeleteButton>
          </HStack>
          {isEditing ? (
            <>
              <UploadImage post={post} onImageUploaded={handleImageUploaded} />
              <EditButton
                type={"post"}
                post={post}
                onCancel={() => setIsEditing(false)}
              />
            </>
          ) : (
            <>
              {Array.isArray(imageUrls) && imageUrls.length > 0 ? (
                <center>
                  <ShowImages imageUrls={imageUrls} />
                </center>
              ) : null}
              <VStack mt={5}>
                <Heading>{post.title}</Heading>
                <Text textAlign="center" fontSize="larger">
                  {post.content}
                </Text>
              </VStack>
            </>
          )}
        </>
        <HStack fontSize="large" mt={5} mb={5}>
          {user ? (
            <Link to={`/users/${post.author}`} className="post-link">
              <ProfilePic handle={post.author} post={post} />
            </Link>
          ) : (
            <ProfilePic handle={post.author} post={post} />
          )}
          <Text fontWeight="bold">{post.author}</Text>
          <Text>-</Text>
          <Text color={"gray.600"} verticalAlign={"center"}>
            CREATED ON {new Date(post.createdOn).toLocaleDateString()}
          </Text>
          <Spacer />
          <UpvoteButton
            id={postId}
            handle={handle}
            likedBy={Object.keys(post.likedBy)}
            dislikedBy={Object.keys(post.dislikedBy)}
          />
          <DownvoteButton
            id={postId}
            handle={handle}
            likedBy={Object.keys(post.likedBy)}
            dislikedBy={Object.keys(post.dislikedBy)}
          />
        </HStack>
        {post.categories && <CategoriesTags post={post} />}
        <Divider />
        {user !== null && (
          <AddComment
            postId={postId}
            handle={handle}
            setComments={setComments}
          />
        )}
        <ShowComments handle={handle} comments={currentComments} post={post} />
        {pageNumbers > 1 && (
          <Flex justifyContent="center" mt={4}>
            <ReactPaginate
              pageCount={pageNumbers}
              onPageChange={handlePageChange}
              containerClassName="pagination"
              pageLinkClassName="page"
              previousLabel={<i className="bi bi-arrow-left"></i>}
              nextLabel={<i className="bi bi-arrow-right"></i>}
              previousClassName="prev"
              nextClassName="next"
              activeClassName="active"
            />
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default SinglePost;
