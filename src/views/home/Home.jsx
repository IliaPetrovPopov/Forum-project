import BrowsePosts from "../../components/BrowsePosts/BrowsePosts";
import Counter from "../../components/Counter/Counter";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";
import RecentlyCreatedPosts from "../../components/PublicSelectedPosts/RecentlyCreatedPosts";
import "./Home.css";
import MostCommentedPosts from "../../components/PublicSelectedPosts/MostCommented";
import MostLikedPosts from "../../components/PublicSelectedPosts/MostLikedPosts";
import { CreatePostButton } from "../../components/CreatePost/CreatePostButton";
import { Box, Flex, Spacer, VStack } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { AdminSearch } from "../../components/AdminButtons/AdminSearch";

const Home = () => {
  const [user] = useAuthState(auth);
  const { userData } = useContext(AuthContext)
  return (
    <Flex id="main-container">
      <Box w="75%">
        {user !== null && <BrowsePosts />}
        {user === null && <RecentlyCreatedPosts />}
        {user === null && <MostLikedPosts />}
        {user === null && <MostCommentedPosts />}
      </Box>
      <Spacer />
      <Box w="25%">
        <VStack marginTop={"2.15cm"} gap="2cm">
        {userData !== null && <AdminSearch />}
          <div className="my-2" id="statistics">
            <Counter />
          </div>
          <CreatePostButton />

        </VStack>
      </Box>
    </Flex>
  );
};

export default Home;
