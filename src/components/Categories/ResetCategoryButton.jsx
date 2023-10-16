/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { Button } from "@chakra-ui/react";

const ResetCategoryButton = () => {
  const { category, setCategory } = useContext(CategoryContext);
  
  const resetCategory = () => {
    setCategory(null);
  };
  return <Button fontSize={'lg'} variant={'ghost'} m={1} onClick={resetCategory}>Reset category</Button>;
};
export default ResetCategoryButton;
