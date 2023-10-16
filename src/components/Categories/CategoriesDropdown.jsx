import { useContext, useState } from "react";
import { CATEGORIES } from "../../common/constants";
import { CategoryContext } from "../../context/CategoryContext";
import "./Categories.css";
import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import ResetCategoryButton from "./ResetCategoryButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";

const CategoriesDropdown = () => {
  const [user] = useAuthState(auth);
  const { category, setCategory } = useContext(CategoryContext);
  const categoryToShow =
    useContext(CategoryContext).currentCategory || "Categories";

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <HStack>
      {(location.pathname === "/" || location.pathname === "/browse-posts") &&
        user !== null && (
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<i className="bi bi-list"></i>}
              variant="ghost"
              size={"lg"}
            >
              Categories
            </MenuButton>
            <MenuList>
              <MenuOptionGroup>
                {CATEGORIES.map((categoryItem) => (
                  <MenuItemOption
                    key={categoryItem}
                    value={categoryItem}
                    onClick={() => handleCategorySelect(categoryItem)}
                    isSelected={category === categoryItem}
                  >
                    {categoryItem}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        )}
      {user &&
        (location.pathname === "/" || location.pathname === "/browse-posts") &&
        categoryToShow &&
        categoryToShow !== "Categories" &&
        categoryToShow.length !== 0 && <ResetCategoryButton />}
    </HStack>
  );
};
export default CategoriesDropdown;
