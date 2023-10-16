import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [currentCategory, setCurrentCategory] = useState([]);

  const setCategory = (category) => {
    setCurrentCategory(category);
  };

  return (
    <CategoryContext.Provider value={{ currentCategory, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
CategoryProvider.propTypes = {
  children: PropTypes.object,
};
