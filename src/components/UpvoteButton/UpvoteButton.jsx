import PropTypes from "prop-types";
import { auth } from "../../config/firebase-config";
import { likePost, unlikePost } from "../../services/post.service";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";

const UpvoteButton = ({ id, likedBy, handle, dislikedBy }) => {
  const [user] = useAuthState(auth);
  const isLiked = user && likedBy && likedBy.includes(handle);
  const isNotDisliked = !dislikedBy || !dislikedBy.includes(handle);

  const handleLike = () => {
    if (isNotDisliked) {
      if (user) {
        if (isLiked) {
          unlikePost(handle, id).catch((e) =>
            console.error("Error unliking post", e)
          );
        } else {
          likePost(handle, id).catch((e) =>
            console.error("Error liking post", e)
          );
        }
      } else {
        toast.error(
          <>
            Only logged in users can upvote <Link to="/register">Sign up</Link>
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
      {likedBy ? Object.keys(likedBy).length : 0}
      <span onClick={handleLike}>
        {isLiked ? (
          <i className="bi bi-hand-thumbs-up-fill"></i>
        ) : (
          <i className="bi bi-hand-thumbs-up"></i>
        )}
      </span>
    </>
  );
};

export default UpvoteButton;

UpvoteButton.propTypes = {
  id: PropTypes.string,
  likedBy: PropTypes.array,
  dislikedBy: PropTypes.array,
  handle: PropTypes.string,
};
