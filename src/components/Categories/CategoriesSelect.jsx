import { useEffect, useState } from "react";
import { CATEGORIES, MAX_CATEGORIES_SELECT } from "../../common/constants";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Box, Divider, FormLabel, Select } from "@chakra-ui/react";
import "./Categories.css";

const CategoriesSelect = ({ onSelect, categories }) => {
  const [selectedCategories, setSelectedCategories] = useState(
    categories ? categories : []
  );

  const handleCategorySelect = (category) => {
    setSelectedCategories((categories) => {
      let updateCategories;

      if (categories.includes(category)) {
        updateCategories = categories.filter((c) => c !== category);
      } else if (categories.length < MAX_CATEGORIES_SELECT) {
        updateCategories = categories.concat(category);
      } else {
        if (categories.length === MAX_CATEGORIES_SELECT) {
          toast.info(
            `You have already added ${MAX_CATEGORIES_SELECT} categories`
          );
        }
        updateCategories = categories;
      }
      return updateCategories;
    });
  };

  useEffect(() => {
    onSelect(selectedCategories);
  }, [selectedCategories, onSelect]);

  return (
    <Box>
      <FormLabel fontSize="larger">
        Select up to {MAX_CATEGORIES_SELECT} categories that match your post:
      </FormLabel>
      <select className='categories-select' multiple value={selectedCategories}>
        {CATEGORIES.map((category) => (
          <option
            key={category}
            value={category}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </option>
        ))}
      </select>
      <Box fontSize="large" marginTop="10px">
        Selected Categories: <br />
        {selectedCategories.join(", ")}
      </Box>
      <Divider />
    </Box>
  );
};
export default CategoriesSelect;

CategoriesSelect.propTypes = {
  onSelect: PropTypes.func,
};
