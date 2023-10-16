import { HStack, Tag } from "@chakra-ui/react";
import { CATEGORY_COLORS } from "../../common/constants";
import PropTypes from "prop-types";

const CategoriesTags = ({ post }) => {
  if (!post.categories || post.categories.length === 0) {
    return;
  }
  return (
    <HStack spacing={2}>
      {post.categories.map((tag) => {
        const colorScheme = CATEGORY_COLORS[tag] || "gray";
        return (
          <Tag
            size={"md"}
            minWidth={17}
            variant="solid"
            colorScheme={colorScheme}
            key={tag}
          >
            {tag.toLowerCase()}
          </Tag>
        );
      })}
    </HStack>
  );
};
export default CategoriesTags;

CategoriesTags.propTypes = {
  post: PropTypes.object,
};
