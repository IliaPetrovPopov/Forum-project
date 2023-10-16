import { toast } from "react-toastify";
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_CONTENT_LENGTH,
  MAX_CONTENT_LENGTH,
} from "../../common/constants";

export const titleValidation = (title) => {
  if (title.length < MIN_TITLE_LENGTH || title.length > MAX_TITLE_LENGTH) {
    toast.warn(
      `Title must be between ${MIN_TITLE_LENGTH} and ${MAX_TITLE_LENGTH} characters long`
    );
    throw new Error(
      `Title must be between ${MIN_TITLE_LENGTH} and ${MAX_TITLE_LENGTH} symbols!`
    );
  }

  return true;
};

export const contentValidation = (content) => {
  if (
    content.length < MIN_CONTENT_LENGTH ||
    content.length > MAX_CONTENT_LENGTH
  ) {
    toast.warn(
      `Content must be between ${MIN_CONTENT_LENGTH} and ${MAX_CONTENT_LENGTH} characters long`
    );
    throw new Error(
      `Content must be between ${MIN_CONTENT_LENGTH} and ${MAX_CONTENT_LENGTH} symbols!`
    );
  }

  return true;
};
