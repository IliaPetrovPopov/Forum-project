
import PropTypes from "prop-types";
import { auth } from "../../config/firebase-config";
import { dislikePost, undislikePost } from "../../services/post.service";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";

const DownvoteButton = ({ id, dislikedBy, handle, likedBy }) => {
  const [user] = useAuthState(auth);
  const isDisliked = user && dislikedBy && dislikedBy.includes(handle)
  const isNotLiked = !likedBy || !likedBy.includes(handle) 

  const handleDislike = () => {
    if (isNotLiked) {
      if (user) {
        if (isDisliked) {
          undislikePost(handle, id).catch((e) => ("Error disliking post", e));
        } else {
          dislikePost(handle, id).catch((e) => ("Error undisliking post", e));
        }
      } else {
        toast.error(
          <>
            Only logged in users can downvote{" "}
            <Link to="/register">Sign up</Link>
            <br />
            <Link to="/login">Log in</Link>
          </>
        );
      }
    } else {
      toast.warn("You cannot like and dislike at the same time!");
    }
  };

  return (
    <>
      {dislikedBy ? Object.keys(dislikedBy).length : 0}
      <span onClick={handleDislike}>
        {isDisliked ? (
          <i className="bi bi-hand-thumbs-down-fill"></i>
        ) : (
          <i className="bi bi-hand-thumbs-down"></i>
        )}
      </span>
    </>
  );
};

export default DownvoteButton;

DownvoteButton.propTypes = {
  id: PropTypes.string,
  dislikedBy: PropTypes.array,
  likedBy: PropTypes.array,
  handle: PropTypes.string,
};
