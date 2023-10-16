/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useMemo, useState } from "react";
import { getAllPosts, getPostCategories } from "../../services/post.service";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase-config";
import { getUserData } from "../../services/user.service";
import { CategoryContext } from "../../context/CategoryContext";
import { AuthContext } from "../../context/AuthContext";
import DisplayPost from "../DisplayPost/DisplayPost";
import {
  Grid,
  Box,
  FormControl,
  FormLabel,
  Select,
  Input,
  Flex,
  MenuButton,
  Menu,
  Button,
  MenuItemOption,
  MenuOptionGroup,
  MenuList,
  InputLeftAddon,
  WrapItem
} from "@chakra-ui/react";
import { AdminSearch } from "../AdminButtons/AdminSearch";
import ReactPaginate from "react-paginate";
import { MAX_POSTS_PER_PAGE } from "../../common/constants";

const BrowsePosts = () => {
  const [posts, setPosts] = useState([]);
  // const [handle, setHandle] = useState(null);
  // const [user] = useAuthState(auth);
  const [sortBy, setSortBy] = useState("newest");
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const { userData } = useContext(AuthContext);
  const selectedCategory =
    useContext(CategoryContext).currentCategory?.toString() || null;
  const [categoryFilteredPosts, setCategoryFilteredPosts] = useState([]);

  useEffect(() => {
    getAllPosts()
      .then((posts) => setPosts(posts))
      .catch((e) => console.error("Error fetching posts", e));
  }, [posts]);

  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = MAX_POSTS_PER_PAGE;

  const handleSortChange = (e) => {
    setSortBy(e);
  };

  const sortedPosts = posts.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.createdOn - a.createdOn;
      case "oldest":
        return a.createdOn - b.createdOn;
      case "most-upvotes":
        return b.likedBy.length - a.likedBy.length;
      default:
        return 0;
    }
  });

  const handleFilterChange = (e) => {
    if (e === "none") {
      return setFilterType("");
    }
    setFilterType(e);
    setFilterValue("");
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const filteredPosts = useMemo(() => {
    return sortedPosts.filter((p) => {
      if (
        filterType === "author" &&
        !p.author.toLowerCase().includes(filterValue.toLowerCase())
      ) {
        return false;
      }
      if (
        filterType === "content" &&
        !p.content.toLowerCase().includes(filterValue.toLowerCase()) &&
        !p.title.toLowerCase().includes(filterValue.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [sortBy, sortedPosts, filterType, filterValue]);

  const categoryPosts = async () => {
    if (selectedCategory === null) {
      return filteredPosts;
    } else {
      const categorizedPosts = await Promise.all(
        filteredPosts.map(async (post) => {
          const postCategories = await getPostCategories(post.id);
          return {
            ...post,
            categories: postCategories,
          };
        })
      );
      return categorizedPosts.filter((post) =>
        post.categories.includes(selectedCategory)
      );
    }
  };

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      const finalPosts = await categoryPosts();
      setCategoryFilteredPosts(finalPosts);
    };
    fetchCategoryPosts();
  }, [selectedCategory, filteredPosts]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = categoryFilteredPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const pageNumbers = Math.ceil(categoryFilteredPosts.length / postsPerPage);


  return (
    <Flex direction="column" justify="center">
      <Flex direction="row" justify="center" mb={4}>
        <FormControl mr={4}>
          <Menu closeOnSelect={false}>
            <MenuButton
              minWidth="20vw"
              as={Button}
              colorScheme="green"
              size="lg"
            >
              Sort By:
            </MenuButton>
            <MenuList minWidth="20vw">
              <MenuOptionGroup
                value={sortBy}
                type="radio"
                onChange={handleSortChange}
              >
                <MenuItemOption value="newest">Newest</MenuItemOption>
                <MenuItemOption value="oldest">Oldest</MenuItemOption>
                <MenuItemOption value="most-upvotes">
                  Most Upvotes
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </FormControl>

        <FormControl mr={4}>
          <Menu closeOnSelect={true}>
            <MenuButton
              minWidth="20vw"
              size="lg"
              as={Button}
              colorScheme="gray"
            >
              Filter By:
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup value={filterType} onChange={handleFilterChange}>
                <MenuItemOption value="author">Author</MenuItemOption>
                <MenuItemOption value="content">Content</MenuItemOption>
                <MenuItemOption value="none">None</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </FormControl>
        <FormControl>
          {filterType && (
            <Input
              minWidth="20vw"
              size="lg"
              type="text"
              borderColor="gray.600"
              value={filterValue}
              onChange={handleFilterValueChange}
              placeholder={`Enter ${filterType.toLowerCase()} to filter`}
            />
          )}
        </FormControl>
      </Flex>
      <Grid templateColumns="repeat(1, 1fr)" mt={4} gap={4}>
        {currentPosts.length === 0 ? (
          <Box>No posts match this category and filter values yet.</Box>
        ) : (
          currentPosts.map((post) => (
            <Box key={post.id}>
              <DisplayPost post={post} />
            </Box>
          ))
        )}
      </Grid>
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
    </Flex>
  );
};

export default BrowsePosts;
