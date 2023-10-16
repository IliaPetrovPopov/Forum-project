import PropTypes from "prop-types";
import { auth } from "../../config/firebase-config";
import { savePost, unsavePost } from "../../services/post.service";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";

const SaveButton = ({ postId, handle, savedBy }) => {
  const [user] = useAuthState(auth);
  const isSaved = user && savedBy && savedBy.includes(handle);

  const handleSave = () => {
    if (user) {
      if (isSaved) {
        unsavePost(handle, postId).catch((e) =>
          console.error("Error unsaving post", e)
        );
      } else {
        savePost(handle, postId).catch((e) =>
          console.error("Error saving post", e)
        );
      }
    } else {
      toast.error(
        <>
          Only logged in users can save posts for later{" "}
          <Link to="/register">Sign up</Link>
          <br />
          <Link to="/login">Log in</Link>
        </>
      );
    }
  };

  return (
    <>
      <span onClick={handleSave}>
        {isSaved ? (
          <i className="bi bi-bookmark-check-fill"></i>
        ) : (
          <i className="bi bi-bookmark"></i>
        )}
      </span>
    </>
  );
};

export default SaveButton;

SaveButton.propTypes = {
  postId: PropTypes.string,
  savedBy: PropTypes.array,
  handle: PropTypes.string,
};
