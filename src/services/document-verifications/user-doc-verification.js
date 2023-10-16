import { equalTo, orderByChild, query, ref, get } from "firebase/database";
import {
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "../../common/constants";
import { db } from "../../config/firebase-config";
import { toast } from "react-toastify";

export const validateName = (name) => {
  if (name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH) {
    toast.warn(
      `Name is required and must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters long`
    );
    throw new Error();
  }
  return true;
};

export const validateEmail = async (email) => {
  if (!/\S+@\S+\.\S+/.test(email)) {
    toast.warn("Invalid email format");
    throw new Error("Invalid email format");
  }

  const retrieve = query(
    ref(db, "users"),
    orderByChild("email"),
    equalTo(email)
  );
  try {
    const result = await get(retrieve);
    if (result.exists()) {
      toast.warn("Email already exists!");
      throw new Error("Email already exists!");
    }
    return false;
  } catch (error) {
    return error.message;
  }
};

export const validatePassword = (password) => {
  if (password.length < MIN_PASSWORD_LENGTH) {
    toast.warn(
      `Password is required and must be at least ${MIN_PASSWORD_LENGTH} characters"`
    );
    throw new Error(
      `Password must be at least ${MIN_PASSWORD_LENGTH} symbols long!`
    );
  }

  return true;
};
