import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";


const ReadTime = ({ content }) => {
  const wordsPerMinute = 225;
  const words = content.split(" ").length;
  const readTimeMinutes = Math.ceil(words / wordsPerMinute);

  return (
      <Box>{readTimeMinutes} MIN READ</Box>
  );
};

export default ReadTime;


ReadTime.propTypes = {
  content: PropTypes.string,
};